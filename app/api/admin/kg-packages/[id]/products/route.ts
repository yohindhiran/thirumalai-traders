import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, readDb, writeDb } from "@/lib/db";
import { noCacheJson } from "@/lib/http";
import type { KgPackageRef } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function cleanString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function syncLegacyMirror(db: ReturnType<typeof readDb>): void {
  const sizes = (db.kgPackageSizes ?? []).slice().sort((a, b) => a.displayOrder - b.displayOrder);
  const def = sizes.find((s) => s.name.trim().toLowerCase() === "1 kg") ?? sizes[0];
  db.kgPackages = (def?.items ?? []).slice().sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const db = readDb();
  const size = (db.kgPackageSizes ?? []).find((s) => s.id === id);
  if (!size) return NextResponse.json({ error: "Package size not found." }, { status: 404 });
  const items = (size.items ?? []).slice().sort((a, b) => a.displayOrder - b.displayOrder);
  return noCacheJson({ size, items, products: db.products });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const productId = typeof body?.productId === "string" ? body.productId : "";
  if (!productId) {
    return NextResponse.json({ error: "Product is required." }, { status: 400 });
  }
  const db = readDb();
  const size = (db.kgPackageSizes ?? []).find((s) => s.id === id);
  if (!size) return NextResponse.json({ error: "Package size not found." }, { status: 404 });
  if (!db.products.some((p) => p.id === productId)) {
    return NextResponse.json({ error: "Invalid product." }, { status: 400 });
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
  return NextResponse.json({ item: ref }, { status: 201 });
}
