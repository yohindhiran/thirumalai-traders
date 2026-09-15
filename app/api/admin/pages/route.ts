import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb } from "@/lib/db";
import { noCacheJson } from "@/lib/http";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return noCacheJson({ pages: readDb().pages });
}
