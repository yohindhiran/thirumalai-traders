import React from "react";
import Link from "next/link";
import { CheckCircle, Phone, Printer, ShoppingBag, Truck } from "lucide-react";
import { getOrderById } from "@/lib/db";
import WhatsAppOrderButton from "@/components/WhatsAppOrderButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="bg-brand-soft min-h-[70vh] py-16">
        <div className="container-site max-w-lg mx-auto text-center card p-8 shadow-card">
          <CheckCircle className="h-12 w-12 text-brand-green mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-brand-ink">Order Received!</h1>
          <p className="mt-2 text-sm text-brand-muted">
            Thank you! Your wholesale order has been recorded successfully.
          </p>
          <p className="mt-1 text-xs text-brand-muted">
            Our dispatch team will contact you shortly to confirm the delivery schedule.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const paymentLabels: Record<string, string> = {
    cod: "Cash on Delivery",
    pay_on_delivery: "Pay via UPI on Delivery",
    invoice: "Wholesale Commercial Invoice (NEFT/RTGS)",
  };

  return (
    <div className="bg-brand-soft min-h-screen py-10 sm:py-16">
      <div className="container-site max-w-3xl mx-auto">
        {/* Success Header Card */}
        <div className="card p-6 sm:p-8 text-center shadow-lift border-t-4 border-t-emerald-600 mb-6">
          <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10" />
          </div>
          <span className="eyebrow mx-auto justify-center">Order Confirmed</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mt-2">
            Thank You for Your Order!
          </h1>
          <p className="mt-2 text-sm text-brand-muted max-w-md mx-auto">
            Your wholesale grocery order <strong className="text-brand-ink">#{order.orderNumber}</strong> has been placed. No online payment required!
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <WhatsAppOrderButton order={order} />
            <Link
              href="/products"
              className="btn-outline !py-2.5 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Order More Products
            </Link>
          </div>
        </div>

        {/* Printable Order Receipt */}
        <div className="card p-6 sm:p-8 shadow-card space-y-6">
          {/* Receipt Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-line pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Thirumalaai Traders · Wholesale Grocery
              </p>
              <h2 className="text-xl font-extrabold text-brand-ink mt-1">
                Order Receipt #{order.orderNumber}
              </h2>
              <p className="text-xs text-brand-muted mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="text-right sm:text-right">
              <span className="inline-block rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold uppercase">
                Status: {order.status}
              </span>
            </div>
          </div>

          {/* Customer & Delivery Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-xs">
            <div className="rounded-xl border border-brand-line p-4 bg-brand-soft/50 space-y-1.5">
              <div className="font-bold text-brand-ink text-sm flex items-center gap-1.5 mb-2">
                <span>Customer Details</span>
              </div>
              <p><strong className="text-brand-ink">Name:</strong> {order.customerName}</p>
              {order.businessName && (
                <p><strong className="text-brand-ink">Establishment:</strong> {order.businessName}</p>
              )}
              <p><strong className="text-brand-ink">Phone:</strong> {order.phone}</p>
              {order.email && <p><strong className="text-brand-ink">Email:</strong> {order.email}</p>}
            </div>

            <div className="rounded-xl border border-brand-line p-4 bg-brand-soft/50 space-y-1.5">
              <div className="font-bold text-brand-ink text-sm flex items-center gap-1.5 mb-2">
                <Truck className="h-4 w-4 text-emerald-700" />
                <span>Delivery Address & Payment</span>
              </div>
              <p><strong className="text-brand-ink">Address:</strong> {order.address}, {order.city}, {order.state} - {order.pincode}</p>
              <p><strong className="text-brand-ink">Payment:</strong> {paymentLabels[order.paymentMethod] || order.paymentMethod}</p>
              {order.notes && <p><strong className="text-brand-ink">Notes:</strong> {order.notes}</p>}
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="font-bold text-sm text-brand-ink mb-3">Ordered Items</h3>
            <div className="overflow-x-auto rounded-xl border border-brand-line">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-soft border-b border-brand-line text-brand-muted uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">Item</th>
                    <th className="px-4 py-3">Pack Size</th>
                    <th className="px-4 py-3 text-center">Qty</th>
                    <th className="px-4 py-3 text-right">Unit Price</th>
                    <th className="px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-line">
                  {order.items.map((it) => (
                    <tr key={it.id} className="hover:bg-brand-soft/30">
                      <td className="px-4 py-3 font-semibold text-brand-ink">
                        {it.productName}
                      </td>
                      <td className="px-4 py-3 text-brand-muted">{it.size || "1 kg"}</td>
                      <td className="px-4 py-3 text-center font-bold">{it.quantity}</td>
                      <td className="px-4 py-3 text-right text-brand-muted">₹{it.unitPrice}</td>
                      <td className="px-4 py-3 text-right font-bold text-brand-ink">
                        ₹{it.totalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-brand-soft/80 font-semibold border-t border-brand-line">
                  <tr>
                    <td colSpan={4} className="px-4 py-2.5 text-right text-brand-muted">
                      Subtotal:
                    </td>
                    <td className="px-4 py-2.5 text-right font-bold text-brand-ink">
                      ₹{order.subtotal}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="px-4 py-2 text-right text-brand-muted">
                      Delivery:
                    </td>
                    <td className="px-4 py-2 text-right text-emerald-700 font-bold">
                      {order.total - order.subtotal === 0 ? "FREE" : `₹${order.total - order.subtotal}`}
                    </td>
                  </tr>
                  <tr className="border-t border-brand-line text-sm">
                    <td colSpan={4} className="px-4 py-3 text-right font-extrabold text-brand-ink">
                      Grand Total Payable:
                    </td>
                    <td className="px-4 py-3 text-right font-extrabold text-brand-green text-base">
                      ₹{order.total}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Help & Contact */}
          <div className="rounded-xl border border-brand-line bg-brand-soft/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-brand-muted">
            <div>
              <p className="font-semibold text-brand-ink">Need changes to your order?</p>
              <p>Contact our Karungalpalayam office directly with your Order Number #{order.orderNumber}.</p>
            </div>
            <a
              href="tel:9384482007"
              className="btn-outline !py-2 !px-4 text-xs font-semibold shrink-0 inline-flex items-center gap-1.5"
            >
              <Phone className="h-3.5 w-3.5" />
              Call 93844 82007
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
