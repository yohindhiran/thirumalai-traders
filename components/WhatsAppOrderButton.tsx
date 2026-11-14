"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import type { Order } from "@/types";

export default function WhatsAppOrderButton({ order }: { order: Order }) {
  const itemsText = order.items
    .map((it) => `• ${it.productName} (${it.size || "1 kg"}) × ${it.quantity} = ₹${it.totalPrice}`)
    .join("\n");

  const message = `*NEW WHOLESALE ORDER - #${order.orderNumber}*
---------------------------------------
*Customer:* ${order.customerName}${order.businessName ? ` (${order.businessName})` : ""}
*Phone:* ${order.phone}
*Address:* ${order.address}, ${order.city} - ${order.pincode}
*Payment Method:* ${order.paymentMethod.toUpperCase()}

*Items Ordered:*
${itemsText}

*Total Payable:* ₹${order.total}
${order.notes ? `*Notes:* ${order.notes}` : ""}
---------------------------------------
Please confirm delivery schedule from Thirumalaai Traders.`;

  const waUrl = `https://wa.me/919384482007?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary !bg-emerald-600 hover:!bg-emerald-700 !py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 shadow-lift"
    >
      <MessageCircle className="h-4 w-4" />
      Confirm Order on WhatsApp
    </a>
  );
}
