import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, newId, readDb, writeDb } from "@/lib/db";
import { noCacheJson } from "@/lib/http";
import { slugify } from "@/data/products-seed";
import type { Product, ProductSpec } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      /* fall through */
    }
    return value.split("\n").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function toSpecs(value: unknown): ProductSpec[] {
  const map = (arr: any[]) =>
    arr
      .map((s) => ({
        label: String(s?.label ?? ""),
        value: String(s?.value ?? ""),
      }))
      .filter((s) => s.label && s.value);
  if (Array.isArray(value)) return map(value);
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return map(parsed);
    } catch {
      /* ignore */
    }
  }
  return [];
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDb();
  return noCacheJson({
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
  const cat = db.categories.find((c) => c.id === categoryId);
  if (!cat) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }

  const now = new Date().toISOString();
  const maxOrder = db.products.reduce((m, p) => Math.max(m, p.displayOrder ?? 0), 0);
  const slug = `${cat.slug}-${slugify(name)}`;
  const images = toArray(body?.images);

  const price = typeof body?.price === "number" ? body.price : parseFloat(body?.price) || 0;
  const stock = typeof body?.stock === "number" ? body.stock : parseInt(body?.stock, 10) || 100;
  const unit = typeof body?.unit === "string" && body.unit.trim() ? body.unit.trim() : (cat.slug === "oils" ? "L" : "kg");
  const variants = Array.isArray(body?.variants) && body.variants.length > 0 ? body.variants : [
    { size: `1 ${unit}`, price: price },
    { size: `5 ${unit}`, price: Math.round(price * 5 * 0.98) },
    { size: `25 ${unit} Sack`, price: Math.round(price * 25 * 0.94) },
    { size: `50 ${unit} Bulk Bag`, price: Math.round(price * 50 * 0.90) },
  ];

  const product: Product = {
    id: newId(), // Supports your db.ts export
    slug,
    name,
    categoryId,
    subcategory:
      typeof body?.subcategory === "string" && body.subcategory.trim()
        ? body.subcategory.trim()
        : undefined,
    shortDescription:
      typeof body?.shortDescription === "string"
        ? body.shortDescription.trim()
        : undefined,
    description:
      typeof body?.description === "string" && body.description.trim()
        ? body.description.trim()
        : `Bulk wholesale supply of ${name.toLowerCase()} — part of our ${cat.name} range.`,
    mainImage: images[0] || undefined,
    images,
    specs: toSpecs(body?.specs),
    purity: typeof body?.purity === "string" ? body.purity : undefined,
    color: typeof body?.color === "string" ? body.color : undefined,
    shelfLife: typeof body?.shelfLife === "string" ? body.shelfLife : undefined,
    packaging: typeof body?.packaging === "string" ? body.packaging : undefined,
    qualityInfo:
      typeof body?.qualityInfo === "string" ? body.qualityInfo : undefined,
    price,
    stock,
    unit,
    variants,
    status: body?.status === "inactive" ? "inactive" : "active",
    displayOrder: maxOrder + 1,
    createdAt: now,
    updatedAt: now,
  };

  db.products.unshift(product);
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ product }, { status: 201 });
}