import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { DEFAULT_CONTENT, getContent, readDb, writeDb } from "@/lib/db";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ content: getContent() });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const db = readDb();

  if (typeof body?.heroHeadline === "string" && body.heroHeadline.trim()) {
    db.content.heroHeadline = body.heroHeadline.trim();
  }
  if (typeof body?.heroSubtext === "string") db.content.heroSubtext = body.heroSubtext.trim();
  if (typeof body?.aboutPreview === "string") db.content.aboutPreview = body.aboutPreview.trim();
  if (typeof body?.officePhone === "string" && body.officePhone.trim()) {
    db.content.officePhone = body.officePhone.trim();
  }
  if (typeof body?.homeAboutImage === "string") {
    db.content.homeAboutImage = body.homeAboutImage.trim() || "/images/about-warehouse.jpg";
  }
  if (typeof body?.homeAboutHeading === "string") {
    db.content.homeAboutHeading = body.homeAboutHeading.trim() || DEFAULT_CONTENT.homeAboutHeading;
  }
  if (typeof body?.homeAboutButtonText === "string") {
    db.content.homeAboutButtonText = body.homeAboutButtonText.trim() || DEFAULT_CONTENT.homeAboutButtonText;
  }
  if (typeof body?.homeAboutButtonLink === "string") {
    db.content.homeAboutButtonLink = body.homeAboutButtonLink.trim() || DEFAULT_CONTENT.homeAboutButtonLink;
  }
  if (Array.isArray(body?.highlights)) {
    const highlights = body.highlights
      .filter((h: unknown) => typeof h === "string" && h.trim())
      .slice(0, 8);
    if (highlights.length >= 1) db.content.highlights = highlights;
  }

  writeDb(db);
  return NextResponse.json({ content: getContent() });
}
