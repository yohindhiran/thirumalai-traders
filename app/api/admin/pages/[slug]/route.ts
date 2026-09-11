import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";

const VALID_SLUGS = [
  "wholesale-supply",
  "history",
  "industries-we-serve",
  "why-choose-us",
  "clients",
  "quality",
];

function toSections(value: unknown) {
  if (!Array.isArray(value)) return undefined;
  const arr = value
    .map((s: any) => ({ heading: String(s?.heading ?? ""), body: String(s?.body ?? "") }))
    .filter((s: { heading: string; body: string }) => s.heading || s.body);
  return arr.length ? arr : undefined;
}

function toItems(value: unknown) {
  if (!Array.isArray(value)) return undefined;
  const arr = value
    .map((s: any) => ({ title: String(s?.title ?? ""), body: String(s?.body ?? "") }))
    .filter((s: { title: string; body: string }) => s.title);
  return arr.length ? arr : undefined;
}

function toImages(value: unknown) {
  if (!Array.isArray(value)) return undefined;
  const arr = value.map((x: unknown) => String(x)).filter((x: string) => x.trim());
  return arr.length ? arr : undefined;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const page = readDb().pages[slug];
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
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
  if (!VALID_SLUGS.includes(slug)) {
    return NextResponse.json({ error: "Invalid page." }, { status: 400 });
  }
  const body = await request.json().catch(() => null);
  const db = readDb();
  const page = db.pages[slug] || { title: slug, sections: [], items: [], images: [] };

  if (typeof body?.title === "string" && body.title.trim()) page.title = body.title.trim();
  if (typeof body?.intro === "string") page.intro = body.intro;
  const sections = toSections(body?.sections);
  if (sections) page.sections = sections;
  const items = toItems(body?.items);
  if (items) page.items = items;
  const images = toImages(body?.images);
  if (images) page.images = images;

  db.pages[slug] = page;
  writeDb(db);
  return NextResponse.json({ page });
}
