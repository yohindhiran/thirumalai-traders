import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, readDb, writeDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function cleanString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
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
  const ref = (db.kgPackages ?? []).find((r) => r.productId === id);
  if (!ref) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (body?.status === "active" || body?.status === "inactive") {
    ref.status = body.status;
  }
  if (typeof body?.displayOrder === "number") ref.displayOrder = body.displayOrder;
  if (body && "customName" in body) {
    const v = cleanString(body.customName);
    if (v) ref.customName = v;
    else delete ref.customName;
  }
  if (body && "customImage" in body) {
    const v = cleanString(body.customImage);
    if (v) ref.customImage = v;
    else delete ref.customImage;
  }
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ item: ref });
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
  const before = (db.kgPackages ?? []).length;
  // Remove from the 1 KG Packages section only — the master product stays
  // untouched in the main Products catalogue.
  db.kgPackages = (db.kgPackages ?? []).filter((r) => r.productId !== id);
  if (db.kgPackages.length === before) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ ok: true });
}
