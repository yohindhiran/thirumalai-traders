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

/**
 * PATCH /api/admin/kg-packages/:id
 * - When :id matches a package SIZE id → size ops { name, status, displayOrder }.
 * - Otherwise (backward compatibility) when :id matches a PRODUCT id →
 *   legacy product ops { status, displayOrder, customName, customImage }
 *   applied to body.sizeId (or the default size, or the first size holding it).
 */
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
  if (!Array.isArray(db.kgPackageSizes)) db.kgPackageSizes = [];

  const size = (db.kgPackageSizes ?? []).find((s) => s.id === id);
  if (size) {
    if (body && "name" in body) {
      const v = cleanString(body.name);
      if (!v) return NextResponse.json({ error: "Package size name is required." }, { status: 400 });
      if (v.length > 20) {
        return NextResponse.json({ error: "Package size name too long (max 20)." }, { status: 400 });
      }
      const clash = (db.kgPackageSizes ?? []).some(
        (s) => s.id !== size.id && s.name.trim().toLowerCase() === v.toLowerCase()
      );
      if (clash) {
        return NextResponse.json({ error: "That package size already exists." }, { status: 409 });
      }
      size.name = v;
    }
    if (body?.status === "active" || body?.status === "inactive") {
      size.status = body.status;
    }
    if (typeof body?.displayOrder === "number") size.displayOrder = body.displayOrder;
    syncLegacyMirror(db);
    writeDb(db);
    invalidateProductCache();
    return NextResponse.json({ size });
  }

  // Legacy fallback: :id is a productId.
  const sizeId = typeof body?.sizeId === "string" ? body.sizeId : "";
  const target =
    (sizeId ? (db.kgPackageSizes ?? []).find((s) => s.id === sizeId) : undefined) ||
    (db.kgPackageSizes ?? []).find((s) => s.name.trim().toLowerCase() === "1 kg") ||
    (db.kgPackageSizes ?? []).find((s) => (s.items ?? []).some((r) => r.productId === id));
  const ref = target?.items?.find((r) => r.productId === id);
  if (!ref || !target) return NextResponse.json({ error: "Not found" }, { status: 404 });
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
  return NextResponse.json({ item: ref, sizeId: target.id });
}

/**
 * DELETE /api/admin/kg-packages/:id
 * - When :id matches a SIZE id → deletes the whole size (products stay in catalogue).
 * - Otherwise → legacy removal of product :id from body.sizeId (or default/first holding size).
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let sizeId = "";
  try {
    const url = new URL(request.url);
    sizeId = url.searchParams.get("sizeId") ?? "";
  } catch {
    sizeId = "";
  }
  const db = readDb();
  if (!Array.isArray(db.kgPackageSizes)) db.kgPackageSizes = [];

  const sizeIdx = (db.kgPackageSizes ?? []).findIndex((s) => s.id === id);
  if (sizeIdx >= 0) {
    const [removed] = db.kgPackageSizes.splice(sizeIdx, 1);
    // Remove from the KG Packages section only — master products stay
    // untouched in the main Products catalogue.
    void removed;
    syncLegacyMirror(db);
    writeDb(db);
    invalidateProductCache();
    return NextResponse.json({ ok: true });
  }

  // Legacy fallback: :id is a productId.
  const target =
    (sizeId ? (db.kgPackageSizes ?? []).find((s) => s.id === sizeId) : undefined) ||
    (db.kgPackageSizes ?? []).find((s) => s.name.trim().toLowerCase() === "1 kg") ||
    (db.kgPackageSizes ?? []).find((s) => (s.items ?? []).some((r) => r.productId === id));
  if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const before = (target.items ?? []).length;
  // Remove from the KG Packages section only — the master product stays
  // untouched in the main Products catalogue.
  target.items = (target.items ?? []).filter((r) => r.productId !== id);
  if (target.items.length === before) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  syncLegacyMirror(db);
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ ok: true });
}
