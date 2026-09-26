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

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDb();
  const items = (db.kgPackages ?? [])
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);
  return noCacheJson({ items, products: db.products });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const productId = typeof body?.productId === "string" ? body.productId : "";
  if (!productId) {
    return NextResponse.json({ error: "Product is required." }, { status: 400 });
  }
  const db = readDb();
  if (!db.products.some((p) => p.id === productId)) {
    return NextResponse.json({ error: "Invalid product." }, { status: 400 });
  }
  if ((db.kgPackages ?? []).some((r) => r.productId === productId)) {
    return NextResponse.json(
      { error: "Product is already in 1 KG Packages." },
      { status: 409 }
    );
  }
  const maxOrder = (db.kgPackages ?? []).reduce(
    (m, r) => Math.max(m, r.displayOrder),
    0
  );
  const ref: KgPackageRef = { productId, status: "active", displayOrder: maxOrder + 1 };
  const customName = cleanString(body?.customName);
  const customImage = cleanString(body?.customImage);
  if (customName) ref.customName = customName;
  if (customImage) ref.customImage = customImage;
  db.kgPackages = [...(db.kgPackages ?? []), ref];
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ item: ref }, { status: 201 });
}
