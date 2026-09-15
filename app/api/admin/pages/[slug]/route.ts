import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const db = readDb();
  const page = (db.pages as Record<string, any>)[slug];
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ page });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const body = await request.json().catch(() => null);
  const db = readDb();
  const pagesRecord = db.pages as Record<string, any>;
  const existing = pagesRecord[slug];

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  pagesRecord[slug] = {
    ...existing,
    ...body,
    slug,
  };

  writeDb(db);
  return NextResponse.json({ page: pagesRecord[slug] });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const db = readDb();
  const pagesRecord = db.pages as Record<string, any>;

  if (!pagesRecord[slug]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  delete pagesRecord[slug];
  writeDb(db);
  return NextResponse.json({ success: true });
}