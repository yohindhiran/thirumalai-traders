import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, readDb, writeDb } from "@/lib/db";
import { noCacheJson } from "@/lib/http";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  return noCacheJson({ page });
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
  const existing = pagesRecord[slug] ?? {
    title: "",
    intro: "",
    sections: [],
    images: [],
  };

  pagesRecord[slug] = {
    ...existing,
    ...body,
    slug,
  };

  writeDb(db);
  invalidateProductCache();
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
  invalidateProductCache();
  return NextResponse.json({ success: true });
}