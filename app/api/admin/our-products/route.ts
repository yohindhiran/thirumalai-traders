import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDb();
  const items = db.ourProducts.slice().sort((a, b) => a.displayOrder - b.displayOrder);
  return NextResponse.json({ items, products: db.products });
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
  if (db.ourProducts.some((r) => r.productId === productId)) {
    return NextResponse.json({ error: "Product is already in Our Products." }, { status: 409 });
  }
  const maxOrder = db.ourProducts.reduce((m, r) => Math.max(m, r.displayOrder), 0);
  const ref = { productId, status: "active" as const, displayOrder: maxOrder + 1 };
  db.ourProducts.push(ref);
  writeDb(db);
  return NextResponse.json({ item: ref }, { status: 201 });
}
