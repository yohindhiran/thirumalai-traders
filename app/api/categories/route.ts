import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const categories = readDb()
    .categories.filter((c) => c.status === "active")
    .map((c) => ({ id: c.id, slug: c.slug, name: c.name }));
  return NextResponse.json({ categories });
}