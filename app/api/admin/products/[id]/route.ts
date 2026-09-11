import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";
import type { ProductSpec } from "@/types";

function str(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function toArray(value: unknown): string[] | undefined {
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
  return undefined;
}

function toSpecs(value: unknown): ProductSpec[] | undefined {
  const map = (arr: any[]) =>
    arr
      .map((s) => ({ label: String(s?.label ?? ""), value: String(s?.value ?? "") }))
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
  return undefined;
}

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
  if (typeof body?.description === "string")
    product.description = body.description.trim();
  if (typeof body?.shortDescription === "string")
    product.shortDescription = body.shortDescription.trim() || undefined;
  if (typeof body?.categoryId === "string" && body.categoryId)
    product.categoryId = body.categoryId;
  if (typeof body?.subcategory === "string")
    product.subcategory = body.subcategory.trim() || undefined;
  if (typeof body?.purity === "string") product.purity = body.purity.trim() || undefined;
  if (typeof body?.color === "string") product.color = body.color.trim() || undefined;
  if (typeof body?.shelfLife === "string")
    product.shelfLife = body.shelfLife.trim() || undefined;
  if (typeof body?.packaging === "string")
    product.packaging = body.packaging.trim() || undefined;
  if (typeof body?.qualityInfo === "string")
    product.qualityInfo = body.qualityInfo.trim() || undefined;
  if (typeof body?.mainImage === "string")
    product.mainImage = body.mainImage.trim() || undefined;
  const images = toArray(body?.images);
  if (images) product.images = images;
  const specs = toSpecs(body?.specs);
  if (specs) product.specs = specs;
  if (body?.status === "active" || body?.status === "inactive")
    product.status = body.status;
  if (typeof body?.displayOrder === "number") product.displayOrder = body.displayOrder;

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
  // Remove from most-selling / our-products references.
  db.mostSelling = db.mostSelling.filter((r) => r.productId !== id);
  db.ourProducts = db.ourProducts.filter((r) => r.productId !== id);
  writeDb(db);
  return NextResponse.json({ ok: true });
}
