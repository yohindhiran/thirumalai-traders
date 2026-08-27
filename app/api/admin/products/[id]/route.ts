import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const db = readDb();
  const product = db.products.find((p) => p.id === id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (typeof body?.name === "string" && body.name.trim()) product.name = body.name.trim();
  if (typeof body?.description === "string") product.description = body.description.trim();
  if (typeof body?.categoryId === "string" && body.categoryId) product.categoryId = body.categoryId;
  if (typeof body?.subcategory === "string") product.subcategory = body.subcategory.trim() || undefined;
  if (body?.status === "active" || body?.status === "inactive") product.status = body.status;
  product.updatedAt = new Date().toISOString();

  writeDb(db);
  return NextResponse.json({ product });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const db = readDb();
  const before = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length === before) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeDb(db);
  return NextResponse.json({ ok: true });
}
