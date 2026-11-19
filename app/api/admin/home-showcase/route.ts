import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getDb, invalidateProductCache, newId, writeDbAsync } from "@/lib/db";
import { noCacheJson } from "@/lib/http";
import type { HomeShowcaseItem } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = await getDb();
  const items = db.homeShowcase.slice().sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  return noCacheJson({ items });
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
  const db = await getDb();
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
  await writeDbAsync(db);
  invalidateProductCache();
  return NextResponse.json({ item }, { status: 201 });
}