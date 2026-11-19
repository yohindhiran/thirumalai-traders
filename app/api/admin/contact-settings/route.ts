import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getDb, invalidateProductCache, writeDbAsync } from "@/lib/db";
import { noCacheJson } from "@/lib/http";
import type { ContactSettings } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const FIELDS: Array<keyof ContactSettings> = [
  "phone",
  "whatsapp",
  "email",
  "addressLine1",
  "addressLine2",
  "addressState",
  "businessHours",
  "mapsLink",
];

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = await getDb();
  return noCacheJson({ settings: db.contactSettings });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const db = await getDb();
  for (const field of FIELDS) {
    const v = body?.[field];
    if (typeof v === "string") {
      (db.contactSettings as any)[field] = v;
    }
  }
  if (Array.isArray(body?.team)) {
    db.contactSettings.team = body.team
      .filter(
        (m: any) =>
          m && typeof m.name === "string" && m.name.trim() && typeof m.phone === "string" && m.phone.trim()
      )
      .map((m: any) => ({
        name: m.name.trim(),
        role: typeof m.role === "string" ? m.role.trim() : "",
        phone: m.phone.trim(),
      }));
  }
  await writeDbAsync(db);
  invalidateProductCache();
  return NextResponse.json({ settings: db.contactSettings });
}
