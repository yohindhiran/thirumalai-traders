import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { updateOrderStatus, updateOrderStatusAsync, getOrderById } from "@/lib/db";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import type { OrderStatus } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status as OrderStatus;

  const validStatuses: OrderStatus[] = [
    "pending",
    "confirmed",
    "processing",
    "dispatched",
    "delivered",
    "cancelled",
  ];

  if (!status || !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid order status." }, { status: 400 });
  }

  // 1. Update Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase
          .from("orders")
          .update({
            status,
            updated_at: new Date().toISOString(),
          })
          .or(`id.eq.${id},order_number.eq.${id}`);
      }
    } catch (err) {
      console.warn("Error updating order in Supabase:", err);
    }
  }

  // 2. Update local DB & Supabase app_state
  const ok = await updateOrderStatusAsync(id, status);
  const order = getOrderById(id);

  return NextResponse.json({ ok, order });
}
