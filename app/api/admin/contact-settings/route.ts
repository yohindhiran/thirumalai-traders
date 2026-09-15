import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, readDb, writeDb } from "@/lib/db";
import type { ContactSettings } from "@/types";

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
  return NextResponse.json({ settings: readDb().contactSettings });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const db = readDb();
  for (const field of FIELDS) {
    const v = body?.[field];
    if (typeof v === "string") {
      (db.contactSettings as any)[field] = v;
    }
  }
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ settings: db.contactSettings });
}
