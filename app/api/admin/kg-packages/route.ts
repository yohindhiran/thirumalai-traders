import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, newId, readDb, writeDb } from "@/lib/db";
import { noCacheJson } from "@/lib/http";
import type { KgPackageRef, KgPackageSize } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function cleanString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function sortedSizes(db: ReturnType<typeof readDb>): KgPackageSize[] {
  return (db.kgPackageSizes ?? []).slice().sort((a, b) => a.displayOrder - b.displayOrder);
}

function syncLegacyMirror(db: ReturnType<typeof readDb>): void {
  const sizes = sortedSizes(db);
  const def =
    sizes.find((s) => s.name.trim().toLowerCase() === "1 kg") ?? sizes[0];
  db.kgPackages = (def?.items ?? []).slice().sort((a, b) => a.displayOrder - b.displayOrder);
}

function defaultSize(db: ReturnType<typeof readDb>): KgPackageSize | undefined {
  const sizes = sortedSizes(db);
  return sizes.find((s) => s.name.trim().toLowerCase() === "1 kg") ?? sizes[0];
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDb();
  const sizes = sortedSizes(db);
  // Backward compatibility: legacy `items` = default size's products.
  const def = defaultSize(db);
  const items = (def?.items ?? []).slice().sort((a, b) => a.displayOrder - b.displayOrder);
  return noCacheJson({ sizes, items, products: db.products });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const db = readDb();
  if (!Array.isArray(db.kgPackageSizes)) db.kgPackageSizes = [];

  // Mode 1: create a new KG package size — { name }.
  const sizeName = cleanString(body?.name ?? body?.sizeName);
  const productIdRaw = typeof body?.productId === "string" ? body.productId : "";
  if (sizeName && !productIdRaw) {
    const exists = (db.kgPackageSizes ?? []).some(
      (s) => s.name.trim().toLowerCase() === sizeName.toLowerCase()
    );
    if (exists) {
      return NextResponse.json({ error: "That package size already exists." }, { status: 409 });
    }
    if (sizeName.length > 20) {
      return NextResponse.json({ error: "Package size name too long (max 20)." }, { status: 400 });
    }
    const maxOrder = (db.kgPackageSizes ?? []).reduce((m, s) => Math.max(m, s.displayOrder), 0);
    const size: KgPackageSize = {
      id: newId("size"),
      name: sizeName,
      status: "active",
      displayOrder: maxOrder + 1,
      items: [],
    };
    db.kgPackageSizes = [...(db.kgPackageSizes ?? []), size];
    syncLegacyMirror(db);
    writeDb(db);
    invalidateProductCache();
    return NextResponse.json({ size }, { status: 201 });
  }

  // Mode 2: add a product to a size — { productId, sizeId? }.
  const productId = productIdRaw;
  if (!productId) {
    return NextResponse.json({ error: "Product is required." }, { status: 400 });
  }
  if (!db.products.some((p) => p.id === productId)) {
    return NextResponse.json({ error: "Invalid product." }, { status: 400 });
  }
  const sizeId = typeof body?.sizeId === "string" ? body.sizeId : "";
  const size = (sizeId ? (db.kgPackageSizes ?? []).find((s) => s.id === sizeId) : undefined) || defaultSize(db);
  if (!size) {
    return NextResponse.json({ error: "No package size found. Create one first." }, { status: 400 });
  }
  if ((size.items ?? []).some((r) => r.productId === productId)) {
    return NextResponse.json(
      { error: `Product is already in ${size.name}.` },
      { status: 409 }
    );
  }
  const maxOrder = (size.items ?? []).reduce((m, r) => Math.max(m, r.displayOrder), 0);
  const ref: KgPackageRef = { productId, status: "active", displayOrder: maxOrder + 1 };
  const customName = cleanString(body?.customName);
  const customImage = cleanString(body?.customImage);
  if (customName) ref.customName = customName;
  if (customImage) ref.customImage = customImage;
  size.items = [...(size.items ?? []), ref];
  syncLegacyMirror(db);
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ item: ref, sizeId: size.id }, { status: 201 });
}
