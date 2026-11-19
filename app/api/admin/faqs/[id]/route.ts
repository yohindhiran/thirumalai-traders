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
  const item = db.faqs.find((f) => f.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (typeof body?.question === "string" && body.question.trim())
    item.question = body.question.trim();
  if (typeof body?.answer === "string") item.answer = body.answer;
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
  const before = db.faqs.length;
  db.faqs = db.faqs.filter((f) => f.id !== id);
  if (db.faqs.length === before) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await writeDbAsync(db);
  invalidateProductCache();
  return NextResponse.json({ ok: true });
}
