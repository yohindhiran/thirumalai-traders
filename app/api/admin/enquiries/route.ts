import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readDb } from "@/lib/db";

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url);
  const status = url.searchParams.get("status") || "";
  const q = (url.searchParams.get("q") || "").trim().toLowerCase();

  let enquiries = readDb().enquiries;
  if (status) enquiries = enquiries.filter((e) => e.status === status);
  if (q) {
    enquiries = enquiries.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.email.toLowerCase().includes(q)
    );
  }
  return NextResponse.json({ enquiries });
}
