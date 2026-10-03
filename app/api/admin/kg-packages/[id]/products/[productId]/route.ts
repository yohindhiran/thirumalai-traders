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

function syncLegacyMirror(db: ReturnType<typeof readDb>): void {
  const sizes = (db.kgPackageSizes ?? []).slice().sort((a, b) => a.displayOrder - b.displayOrder);
  const def = sizes.find((s) => s.name.trim().toLowerCase() === "1 kg") ?? sizes[0];
  db.kgPackages = (def?.items ?? []).slice().sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; productId: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, productId } = await params;
  const body = await request.json().catch(() => null);
  const db = readDb();
  const size = (db.kgPackageSizes ?? []).find((s) => s.id === id);
  if (!size) return NextResponse.json({ error: "Package size not found." }, { status: 404 });
  const ref = (size.items ?? []).find((r) => r.productId === productId);
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
  syncLegacyMirror(db);
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ item: ref });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; productId: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, productId } = await params;
  const db = readDb();
  const size = (db.kgPackageSizes ?? []).find((s) => s.id === id);
  if (!size) return NextResponse.json({ error: "Package size not found." }, { status: 404 });
  const before = (size.items ?? []).length;
  // Remove from this KG size only — the master product stays untouched in
  // the main Products catalogue (and in every other KG size).
  size.items = (size.items ?? []).filter((r) => r.productId !== productId);
  if (size.items.length === before) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  syncLegacyMirror(db);
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ ok: true });
}
