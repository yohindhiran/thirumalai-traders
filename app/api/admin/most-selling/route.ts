import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, readDb, writeDb } from "@/lib/db";
import { noCacheJson } from "@/lib/http";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDb();
  const items = db.mostSelling.slice().sort((a, b) => a.displayOrder - b.displayOrder);
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
  if (db.mostSelling.some((r) => r.productId === productId)) {
    return NextResponse.json({ error: "Product is already in Most Selling." }, { status: 409 });
  }
  const maxOrder = db.mostSelling.reduce((m, r) => Math.max(m, r.displayOrder), 0);
  const ref = { productId, status: "active" as const, displayOrder: maxOrder + 1 };
  db.mostSelling.push(ref);
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ item: ref }, { status: 201 });
}
