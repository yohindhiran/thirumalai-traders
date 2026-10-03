import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  DEFAULT_KG_PACKAGES_SECTION,
  invalidateProductCache,
  readDb,
  writeDb,
} from "@/lib/db";
import { noCacheJson } from "@/lib/http";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Standalone copy settings for the Home "KG PACKAGES" section.
 * Independent from every other section — edits here only ever change the
 * KG Packages block on the Home page.
 */
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDb();
  return noCacheJson({
    section: db.kgPackagesSection ?? DEFAULT_KG_PACKAGES_SECTION,
  });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const description =
    typeof body?.description === "string" ? body.description.trim() : "";
  if (!title) {
    return NextResponse.json(
      { error: "Section title is required." },
      { status: 400 }
    );
  }
  if (!description) {
    return NextResponse.json(
      { error: "Section description is required." },
      { status: 400 }
    );
  }
  if (title.length > 80 || description.length > 500) {
    return NextResponse.json(
      { error: "Title (max 80) or description (max 500) too long." },
      { status: 400 }
    );
  }
  const db = readDb();
  db.kgPackagesSection = { title, description };
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ section: db.kgPackagesSection });
}
