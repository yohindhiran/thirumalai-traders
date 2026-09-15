import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, newId, readDb, writeDb } from "@/lib/db";
import type { HomeShowcaseItem } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = readDb().homeShowcase.slice().sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const image = typeof body?.image === "string" ? body.image.trim() : "";
  if (!image) {
    return NextResponse.json({ error: "Image is required." }, { status: 400 });
  }
  const db = readDb();
  const maxOrder = db.homeShowcase.reduce((m: number, s: any) => Math.max(m, s.displayOrder ?? 0), 0);
  const item: HomeShowcaseItem = {
    id: newId("show"),
    image,
    alt: typeof body?.alt === "string" ? body.alt.trim() : "",
    title: typeof body?.title === "string" ? body.title.trim() : "",
    status: "active",
    displayOrder: maxOrder + 1,
  };
  db.homeShowcase.push(item);
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ item }, { status: 201 });
}