import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";
import { noCacheJson } from "@/lib/http";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const categories = readDb()
    .categories.filter((c) => c.status === "active")
    .map((c) => ({ id: c.id, slug: c.slug, name: c.name }));
  return noCacheJson({ categories });
}