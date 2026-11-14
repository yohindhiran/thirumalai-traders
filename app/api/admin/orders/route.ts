import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getOrders } from "@/lib/db";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { noCacheJson } from "@/lib/http";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // If Supabase is configured, fetch orders from Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(data)) {
          const orders = data.map((o: any) => ({
            id: o.id,
            orderNumber: o.order_number,
            customerName: o.customer_name,
            businessName: o.business_name,
            phone: o.phone,
            whatsapp: o.whatsapp,
            email: o.email,
            address: o.address,
            city: o.city,
            state: o.state,
            pincode: o.pincode,
            paymentMethod: o.payment_method,
            status: o.status,
            items: o.items || [],
            subtotal: Number(o.subtotal) || 0,
            discount: Number(o.discount) || 0,
            total: Number(o.total) || 0,
            notes: o.notes,
            createdAt: o.created_at,
            updatedAt: o.updated_at,
          }));
          return noCacheJson({ orders });
        }
      }
    } catch (err) {
      console.warn("Error reading orders from Supabase:", err);
    }
  }

  // Fallback to local DB
  const orders = getOrders();
  return noCacheJson({ orders });
}
