import { NextResponse } from "next/server";
import { invalidateProductCache, newId, readDb, writeDb } from "@/lib/db";
import type { Enquiry } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

    const name = str(body.name);
    const phone = str(body.phone);
    const deliveryLocation = str(body.deliveryLocation);

    if (!name || !phone || !deliveryLocation) {
      return NextResponse.json(
        { error: "Name, phone number and delivery location are required." },
        { status: 400 }
      );
    }
    if (!/^[0-9+ -]{7,15}$/.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }
    if (body.email && str(body.email) && !/^\S+@\S+\.\S+$/.test(str(body.email))) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const enquiry: Enquiry = {
      id: newId("enq"),
      name,
      company: str(body.company),
      phone,
      email: str(body.email),
      customerType: str(body.customerType),
      category: str(body.category),
      productsRequired: str(body.productsRequired),
      quantity: str(body.quantity),
      deliveryLocation,
      message: str(body.message).slice(0, 2000),
      status: "New",
      adminNotes: "",
      createdAt: now,
      updatedAt: now,
    };

    const db = readDb();
    db.enquiries.unshift(enquiry);
    // keep the store bounded
    db.enquiries = db.enquiries.slice(0, 5000);
    writeDb(db);
    invalidateProductCache();

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
