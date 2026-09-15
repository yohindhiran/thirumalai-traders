import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, newId, readDb, writeDb } from "@/lib/db";
import type { ValuedCustomer } from "@/types";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDb();
  const items = db.valuedCustomers.slice().sort((a, b) => a.displayOrder - b.displayOrder);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Customer name is required." }, { status: 400 });
  }
  const db = readDb();
  const maxOrder = db.valuedCustomers.reduce((m, c) => Math.max(m, c.displayOrder), 0);
  const item: ValuedCustomer = {
    id: newId("vc"),
    name,
    logo: typeof body?.logo === "string" ? body.logo : "",
    status: "active",
    displayOrder: maxOrder + 1,
  };
  db.valuedCustomers.push(item);
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ item }, { status: 201 });
}
