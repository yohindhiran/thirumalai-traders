import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { newId, readDb, writeDb } from "@/lib/db";
import { slugify } from "@/data/products-seed";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ categories: readDb().categories });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Category name is required." }, { status: 400 });
  }
  const db = readDb();
  const slug = slugify(name);
  if (db.categories.some((c) => c.slug === slug)) {
    return NextResponse.json({ error: "A category with this name already exists." }, { status: 409 });
  }
  const now = new Date().toISOString();
  const category = {
    id: newId("cat"),
    slug,
    name,
    description:
      typeof body?.description === "string"
        ? body.description.trim()
        : `Wholesale ${name.toLowerCase()} supplied in bulk by Thirumalaai Traders.`,
    status: "active" as const,
    createdAt: now,
    updatedAt: now,
  };
  db.categories.push(category);
  writeDb(db);
  return NextResponse.json({ category }, { status: 201 });
}
