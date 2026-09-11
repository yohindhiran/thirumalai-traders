import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";

export const dynamic = "force-dynamic";

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
  const item = db.homeShowcase.find((s) => s.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (typeof body?.image === "string" && body.image.trim()) item.image = body.image.trim();
  if (typeof body?.alt === "string") item.alt = body.alt.trim();
  if (typeof body?.title === "string") item.title = body.title.trim();
  if (body?.status === "active" || body?.status === "inactive") item.status = body.status;
  if (typeof body?.displayOrder === "number") item.displayOrder = body.displayOrder;

  writeDb(db);
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
  const before = db.homeShowcase.length;
  db.homeShowcase = db.homeShowcase.filter((s) => s.id !== id);
  if (db.homeShowcase.length === before) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeDb(db);
  return NextResponse.json({ ok: true });
}
