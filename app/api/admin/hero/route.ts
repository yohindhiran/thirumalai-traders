import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { newId, readDb, writeDb } from "@/lib/db";
import type { HeroSlide } from "@/types";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDb();
  const slides = db.heroSlides.slice().sort((a, b) => a.displayOrder - b.displayOrder);
  return NextResponse.json({ slides });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const image = typeof body?.image === "string" ? body.image.trim() : "";
  if (!image) {
    return NextResponse.json({ error: "Slide image is required." }, { status: 400 });
  }
  const db = readDb();
  const maxOrder = db.heroSlides.reduce((m, s) => Math.max(m, s.displayOrder), 0);
  const slide: HeroSlide = {
    id: newId("hs"),
    image,
    title: typeof body?.title === "string" ? body.title : "",
    subtitle: typeof body?.subtitle === "string" ? body.subtitle : "",
    buttonText: typeof body?.buttonText === "string" ? body.buttonText : "",
    buttonLink: typeof body?.buttonLink === "string" ? body.buttonLink : "",
    status: "active",
    displayOrder: maxOrder + 1,
  };
  db.heroSlides.push(slide);
  writeDb(db);
  return NextResponse.json({ slide }, { status: 201 });
}
