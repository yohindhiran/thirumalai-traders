import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";
import type { SiteSettings } from "@/types";

const FIELDS: Array<[keyof SiteSettings, "string" | "number"]> = [
  ["companyName", "string"],
  ["logo", "string"],
  ["favicon", "string"],
  ["phone", "string"],
  ["whatsapp", "string"],
  ["email", "string"],
  ["addressLine1", "string"],
  ["addressLine2", "string"],
  ["addressState", "string"],
  ["footerText", "string"],
  ["copyrightYear", "string"],
  ["facebook", "string"],
  ["instagram", "string"],
  ["youtube", "string"],
  ["linkedin", "string"],
];

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ settings: readDb().siteSettings });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const db = readDb();
  for (const [field, kind] of FIELDS) {
    const v = body?.[field];
    if (kind === "string" && typeof v === "string") {
      (db.siteSettings as any)[field] = v;
    }
  }
  writeDb(db);
  return NextResponse.json({ settings: db.siteSettings });
}
