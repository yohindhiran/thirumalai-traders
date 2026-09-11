import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";

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
  const item = db.faqs.find((f) => f.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (typeof body?.question === "string" && body.question.trim())
    item.question = body.question.trim();
  if (typeof body?.answer === "string") item.answer = body.answer;
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
  const before = db.faqs.length;
  db.faqs = db.faqs.filter((f) => f.id !== id);
  if (db.faqs.length === before) return NextResponse.json({ error: "Not found" }, { status: 404 });
  writeDb(db);
  return NextResponse.json({ ok: true });
}
