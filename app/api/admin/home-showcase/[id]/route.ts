import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getDb, invalidateProductCache, writeDbAsync } from "@/lib/db";

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
  const db = await getDb();
  const item = db.homeShowcase.find((s: any) => s.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (typeof body?.image === "string" && body.image.trim()) item.image = body.image.trim();
  if (typeof body?.alt === "string") item.alt = body.alt.trim();
  if (typeof body?.title === "string") item.title = body.title.trim();
  if (body?.status === "active" || body?.status === "inactive") item.status = body.status;
  if (typeof body?.displayOrder === "number") item.displayOrder = body.displayOrder;

  await writeDbAsync(db);
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
  const db = await getDb();
  const before = db.homeShowcase.length;
  db.homeShowcase = db.homeShowcase.filter((s: any) => s.id !== id);
  if (db.homeShowcase.length === before) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await writeDbAsync(db);
  invalidateProductCache();
  return NextResponse.json({ ok: true });
}
