import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";
import { slugify } from "@/data/products-seed";

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
  if (typeof body?.description === "string")
    category.description = body.description.trim();
  if (typeof body?.image === "string") category.image = body.image.trim() || undefined;
  if (body?.status === "active" || body?.status === "inactive")
    category.status = body.status;
  if (typeof body?.displayOrder === "number") category.displayOrder = body.displayOrder;
  if (typeof body?.slug === "string" && body.slug.trim()) {
    const slug = slugify(body.slug);
    if (slug && slug !== category.slug) {
      if (db.categories.some((c) => c.slug === slug && c.id !== category.id)) {
        return NextResponse.json(
          { error: "Another category already uses this slug." },
          { status: 409 }
        );
      }
      category.slug = slug;
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
  const category = db.categories.find((c) => c.id === id);
  if (!category) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const productCount = db.products.filter((p) => p.categoryId === id).length;
  if (productCount > 0) {
    return NextResponse.json(
      {
        error: `Cannot delete: ${productCount} product(s) are assigned to this category. Reassign or delete them first.`,
      },
      { status: 409 }
    );
  }
  db.categories = db.categories.filter((c) => c.id !== id);
  writeDb(db);
  return NextResponse.json({ ok: true });
}
