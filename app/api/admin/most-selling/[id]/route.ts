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
  const ref = db.mostSelling.find((r) => r.productId === id);
  if (!ref) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (body?.status === "active" || body?.status === "inactive") ref.status = body.status;
  if (typeof body?.displayOrder === "number") ref.displayOrder = body.displayOrder;
  await writeDbAsync(db);
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
  const db = await getDb();
  const before = db.mostSelling.length;
  db.mostSelling = db.mostSelling.filter((r) => r.productId !== id);
  if (db.mostSelling.length === before)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  await writeDbAsync(db);
  invalidateProductCache();
  return NextResponse.json({ ok: true });
}
