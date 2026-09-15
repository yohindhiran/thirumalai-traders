import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, readDb, writeDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  const slide = db.heroSlides.find((s) => s.id === id);
  if (!slide) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (typeof body?.image === "string" && body.image.trim()) slide.image = body.image.trim();
  if (typeof body?.title === "string") slide.title = body.title;
  if (typeof body?.subtitle === "string") slide.subtitle = body.subtitle;
  if (typeof body?.buttonText === "string") slide.buttonText = body.buttonText;
  if (typeof body?.buttonLink === "string") slide.buttonLink = body.buttonLink;
  if (body?.status === "active" || body?.status === "inactive") slide.status = body.status;
  if (typeof body?.displayOrder === "number") slide.displayOrder = body.displayOrder;
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ slide });
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
  const before = db.heroSlides.length;
  db.heroSlides = db.heroSlides.filter((s) => s.id !== id);
  if (db.heroSlides.length === before)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ ok: true });
}
