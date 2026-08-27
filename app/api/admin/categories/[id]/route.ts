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
  const category = db.categories.find((c) => c.id === id);
  if (!category) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (typeof body?.name === "string" && body.name.trim()) category.name = body.name.trim();
  if (typeof body?.description === "string") category.description = body.description.trim();
  if (body?.status === "active" || body?.status === "inactive") {
    // cascade status to products so public catalog stays consistent
    if (category.status !== body.status) {
      db.products.forEach((p) => {
        if (p.categoryId === category.id && p.status === "active" && body.status === "inactive") {
          p.status = "inactive";
          p.updatedAt = new Date().toISOString();
        }
      });
      category.status = body.status;
    }
  }
  category.updatedAt = new Date().toISOString();

  writeDb(db);
  return NextResponse.json({ category });
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
  const hasProducts = db.products.some((p) => p.categoryId === id);
  if (hasProducts) {
    return NextResponse.json(
      { error: "Cannot delete a category that still has products. Remove or reassign its products first." },
      { status: 409 }
    );
  }
  const before = db.categories.length;
  db.categories = db.categories.filter((c) => c.id !== id);
  if (db.categories.length === before) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeDb(db);
  return NextResponse.json({ ok: true });
}
