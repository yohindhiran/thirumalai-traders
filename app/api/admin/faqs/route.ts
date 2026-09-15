import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, newId, readDb, writeDb } from "@/lib/db";
import { noCacheJson } from "@/lib/http";
import type { Faq } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDb();
  const items = db.faqs.slice().sort((a, b) => a.displayOrder - b.displayOrder);
  return noCacheJson({ items });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const question = typeof body?.question === "string" ? body.question.trim() : "";
  const answer = typeof body?.answer === "string" ? body.answer.trim() : "";
  if (!question || !answer) {
    return NextResponse.json({ error: "Question and answer are required." }, { status: 400 });
  }
  const db = readDb();
  const maxOrder = db.faqs.reduce((m, f) => Math.max(m, f.displayOrder), 0);
  const item: Faq = {
    id: newId("f"),
    question,
    answer,
    status: "active",
    displayOrder: maxOrder + 1,
  };
  db.faqs.push(item);
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ item }, { status: 201 });
}
