import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";
import type { Product } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("q")?.toLowerCase() ?? "";
  const categoryId = searchParams.get("categoryId");
  const status = searchParams.get("status");

  let db = readDb();
  let products = db.products;

  // Filter products
  if (search) {
    filtered = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (categoryId) {
    filtered = filtered.filter((p) => p.categoryId === categoryId);
  }

  if (status) {
    filtered = filtered.filter((p) => p.status === status);
  }

  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const db = readDb();

  // Validate required fields
  if (!body?.name || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Product name is required" }, { status: 400 });
  }

  // Generate unique ID
  const newId = `prod-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

  const newProduct: Product = {
    id: newId,
    slug: slugify(body.name),
    name: body.name.trim(),
    categoryId: body.categoryId,
    subcategory: body.subcategory?.trim() || undefined,
    description: body.description?.trim() || undefined,
    shortDescription: body.shortDescription?.trim() || undefined,
    images: body.images ? (Array.isArray(body.images) ? body.images : [body.images]) : undefined,
    specs: body.specs ? (Array.isArray(body.specs) ? body.specs : [body.specs]) : undefined,
    status: body.status ?? "active",
    displayOrder: body.displayOrder ? Number(body.displayOrder) : 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // Add stock field if not present
    ...(body.stock !== undefined && typeof body.stock === "number" ? { stock: body.stock } : {}),
    ...(body?.specs && typeof body.specs === "object" ? { specs: body.specs } : {}),
  });

  db.products.push(newProduct);
  writeDb(db);
  return NextResponse.json({ product: newProduct }, { status: 201 });
}