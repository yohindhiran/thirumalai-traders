import { NextResponse } from "next/server";
import { newId, saveOrder } from "@/lib/db";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import type { Order, OrderItem, PaymentMethod } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON request" }, { status: 400 });
    }

    const {
      customerName,
      businessName,
      phone,
      whatsapp,
      email,
      address,
      city,
      state = "Tamil Nadu",
      pincode,
      paymentMethod = "cod",
      items = [],
      subtotal = 0,
      discount = 0,
      total = 0,
      notes = "",
    } = body;

    if (!customerName || !phone || !address || !city || !pincode) {
      return NextResponse.json(
        { error: "Customer name, phone, address, city, and pincode are required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty. Please add products before placing an order." },
        { status: 400 }
      );
    }

    const orderNumber = `TT-${Date.now().toString().slice(-5)}${Math.floor(10 + Math.random() * 90)}`;
    const now = new Date().toISOString();
    const orderId = newId("order");

    const orderItems: OrderItem[] = items.map((it: any, index: number) => ({
      id: `${orderId}-it-${index + 1}`,
      productId: String(it.productId || it.id || ""),
      productName: String(it.name || "Product"),
      categoryName: it.categoryName ? String(it.categoryName) : undefined,
      image: it.image ? String(it.image) : undefined,
      size: it.size ? String(it.size) : undefined,
      unit: it.unit ? String(it.unit) : undefined,
      quantity: Number(it.quantity) || 1,
      unitPrice: Number(it.price) || 0,
      totalPrice: (Number(it.price) || 0) * (Number(it.quantity) || 1),
    }));

    const order: Order = {
      id: orderId,
      orderNumber,
      customerName: customerName.trim(),
      businessName: businessName?.trim() || undefined,
      phone: phone.trim(),
      whatsapp: whatsapp?.trim() || phone.trim(),
      email: email?.trim() || undefined,
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      paymentMethod: (paymentMethod as PaymentMethod) || "cod",
      status: "pending",
      items: orderItems,
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      total: Number(total) || 0,
      notes: notes?.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    };

    // 1. If Supabase is configured, save directly to Supabase
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          const { error: sbError } = await supabase.from("orders").insert({
            id: order.id,
            order_number: order.orderNumber,
            customer_name: order.customerName,
            business_name: order.businessName || null,
            phone: order.phone,
            whatsapp: order.whatsapp || null,
            email: order.email || null,
            address: order.address,
            city: order.city,
            state: order.state,
            pincode: order.pincode,
            payment_method: order.paymentMethod,
            status: order.status,
            items: order.items,
            subtotal: order.subtotal,
            discount: order.discount || 0,
            total: order.total,
            notes: order.notes || null,
            created_at: order.createdAt,
            updated_at: order.updatedAt,
          });
          if (sbError) {
            console.warn("Supabase order insert warning:", sbError.message);
          }
        }
      } catch (err) {
        console.warn("Supabase order save error:", err);
      }
    }

    // 2. Save locally in db.ts
    saveOrder(order);

    return NextResponse.json(
      {
        ok: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        message: "Order placed successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order placement failed:", error);
    return NextResponse.json(
      { error: "Failed to place order. Please try again or call our office." },
      { status: 500 }
    );
  }
}
