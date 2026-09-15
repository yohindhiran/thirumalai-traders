import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, newId, readDb, writeDb } from "@/lib/db";
import type { Testimonial } from "@/types";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDb();
  const items = db.testimonials.slice().sort((a, b) => a.displayOrder - b.displayOrder);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const quote = typeof body?.quote === "string" ? body.quote.trim() : "";
  if (!name || !quote) {
    return NextResponse.json(
      { error: "Customer name and testimonial text are required." },
      { status: 400 }
    );
  }
  const db = readDb();
  const maxOrder = db.testimonials.reduce((m, t) => Math.max(m, t.displayOrder), 0);
  const item: Testimonial = {
    id: newId("t"),
    name,
    company: typeof body?.company === "string" ? body.company : "",
    quote,
    image: typeof body?.image === "string" ? body.image : "",
    status: "active",
    displayOrder: maxOrder + 1,
  };
  db.testimonials.push(item);
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ item }, { status: 201 });
}
