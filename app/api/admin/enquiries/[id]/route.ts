import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, readDb, writeDb } from "@/lib/db";
import { ENQUIRY_STATUSES } from "@/data/site";

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
  const enquiry = db.enquiries.find((e) => e.id === id);
  if (!enquiry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (typeof body?.status === "string" && ENQUIRY_STATUSES.includes(body.status as never)) {
    enquiry.status = body.status as (typeof ENQUIRY_STATUSES)[number];
  }
  if (typeof body?.adminNotes === "string") {
    enquiry.adminNotes = body.adminNotes.slice(0, 2000);
  }
  enquiry.updatedAt = new Date().toISOString();

  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ enquiry });
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
  const before = db.enquiries.length;
  db.enquiries = db.enquiries.filter((e) => e.id !== id);
  if (db.enquiries.length === before) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ ok: true });
}
