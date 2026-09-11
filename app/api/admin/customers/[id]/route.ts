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
  const item = db.valuedCustomers.find((c) => c.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (typeof body?.name === "string" && body.name.trim()) item.name = body.name.trim();
  if (typeof body?.logo === "string") item.logo = body.logo;
  if (typeof body?.description === "string") item.description = body.description;
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
  const before = db.valuedCustomers.length;
  db.valuedCustomers = db.valuedCustomers.filter((c) => c.id !== id);
  if (db.valuedCustomers.length === before)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  writeDb(db);
  return NextResponse.json({ ok: true });
}
