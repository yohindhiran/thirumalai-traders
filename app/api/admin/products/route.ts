import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { newId, readDb, writeDb } from "@/lib/db";
import { slugify } from "@/data/products-seed";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDb();
  return NextResponse.json({
    products: db.products,
    categories: db.categories,
  });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const categoryId = typeof body?.categoryId === "string" ? body.categoryId : "";

  if (!name || !categoryId) {
    return NextResponse.json(
      { error: "Product name and category are required." },
      { status: 400 }
    );
  }

  const db = readDb();
  if (!db.categories.some((c) => c.id === categoryId)) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }
  const cat = db.categories.find((c) => c.id === categoryId)!;
  const now = new Date().toISOString();

  const product = {
    id: newId("prod"),
    slug: `${cat.slug}-${slugify(name)}`,
    name,
    categoryId,
    subcategory:
      typeof body?.subcategory === "string" && body.subcategory.trim()
        ? body.subcategory.trim()
        : undefined,
    description:
      typeof body?.description === "string" && body.description.trim()
        ? body.description.trim()
        : `Bulk wholesale supply of ${name.toLowerCase()} — part of our ${cat.name} range.`,
    status: body?.status === "inactive" ? ("inactive" as const) : ("active" as const),
    createdAt: now,
    updatedAt: now,
  };

  db.products.unshift(product);
  writeDb(db);
  return NextResponse.json({ product }, { status: 201 });
}
