import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, readDb, writeDb } from "@/lib/db";

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
  const item = db.testimonials.find((t) => t.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (typeof body?.name === "string" && body.name.trim()) item.name = body.name.trim();
  if (typeof body?.company === "string") item.company = body.company;
  if (typeof body?.quote === "string") item.quote = body.quote;
  if (typeof body?.image === "string") item.image = body.image;
  if (body?.status === "active" || body?.status === "inactive") item.status = body.status;
  if (typeof body?.displayOrder === "number") item.displayOrder = body.displayOrder;
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ item });
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
  const before = db.testimonials.length;
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  if (db.testimonials.length === before)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ ok: true });
}
