"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  CreditCard,
  FileText,
  Loader2,
  Phone,
  ShieldCheck,
  Truck,
  User,
  Wallet,
} from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, totalCount, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    businessName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "Erode",
    state: "Tamil Nadu",
    pincode: "638001",
    paymentMethod: "cod",
    notes: "",
  });

  const isFreeDelivery = subtotal >= 1000;
  const deliveryCharge = isFreeDelivery || items.length === 0 ? 0 : 60;
  const grandTotal = subtotal + deliveryCharge;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty. Please add items before placing an order.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          whatsapp: formData.whatsapp || formData.phone,
          items,
          subtotal,
          discount: 0,
          total: grandTotal,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to place order.");
      }

      clearCart();
      router.push(`/order-success/${data.orderId || data.orderNumber}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-brand-soft min-h-[70vh] py-16">
        <div className="container-site max-w-lg mx-auto text-center card p-8 shadow-card">
          <Truck className="h-12 w-12 text-brand-muted mx-auto mb-4" />
          <h1 className="text-xl font-bold text-brand-ink">Your cart is empty</h1>
          <p className="mt-2 text-sm text-brand-muted">
            You cannot proceed to checkout with an empty cart. Please add some wholesale products.
          </p>
          <Link href="/products" className="btn-primary mt-6 inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-soft min-h-screen py-8 sm:py-12">
      <div className="container-site">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-brand-green">Cart</Link>
            <span>/</span>
            <span className="text-brand-ink font-semibold">Checkout</span>
          </div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-green hover:text-brand-green-dark"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Cart
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mb-6">
          Wholesale Order Checkout
        </h1>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Customer & Delivery Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="card p-6 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-brand-ink border-b border-brand-line pb-3">
                <User className="h-5 w-5 text-brand-green" />
                <span>Customer & Business Information</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="customerName" className="label">
                    Full Name *
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    required
                    placeholder="e.g. R. Senthil Kumar"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="businessName" className="label">
                    Shop / Canteen / Mill / Company Name (Optional)
                  </label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
                    <input
                      id="businessName"
                      name="businessName"
                      placeholder="e.g. Annapoorna Canteen / Uravu Traders"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="input !pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="label">
                    Phone Number (for delivery coordination) *
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input !pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="whatsapp" className="label">
                    WhatsApp Number (for instant invoice/dispatch updates)
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="Same as phone or enter number"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="label">
                    Email Address (Optional)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. purchase@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="card p-6 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-brand-ink border-b border-brand-line pb-3">
                <Truck className="h-5 w-5 text-brand-green" />
                <span>Delivery Address in Erode & Tamil Nadu</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="label">
                    Street Address, Building, Landmark *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={3}
                    placeholder="e.g. 45 Varakappar Street, Near Karungalpalayam Bus Stop"
                    value={formData.address}
                    onChange={handleChange}
                    className="input resize-y"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="label">
                    City / Town *
                  </label>
                  <input
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="pincode" className="label">
                    Postal Pincode *
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="label">
                    Delivery Instructions / Special Notes (Optional)
                  </label>
                  <input
                    id="notes"
                    name="notes"
                    placeholder="e.g. Deliver before 11 AM, Call before dispatch"
                    value={formData.notes}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method (No payment gateway needed) */}
            <div className="card p-6 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-brand-ink border-b border-brand-line pb-3">
                <Wallet className="h-5 w-5 text-brand-green" />
                <span>Payment Method (Zero Online Payment Hassle)</span>
              </div>

              <p className="text-xs text-brand-muted">
                No credit card or online payment gateway required. Select your preferred wholesale settlement option:
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-1">
                {/* Option 1: Cash on Delivery */}
                <label
                  className={`flex flex-col justify-between rounded-xl border p-4 cursor-pointer transition ${
                    formData.paymentMethod === "cod"
                      ? "border-brand-green bg-emerald-50/50 ring-2 ring-brand-green/30"
                      : "border-brand-line bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <Wallet className="h-5 w-5 text-emerald-700" />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="text-brand-green focus:ring-brand-green"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="font-bold text-sm text-brand-ink">Cash on Delivery</div>
                    <div className="text-[11px] text-brand-muted mt-1 leading-snug">
                      Pay cash directly upon receiving your wholesale grocery bags.
                    </div>
                  </div>
                </label>

                {/* Option 2: Pay on Delivery / UPI */}
                <label
                  className={`flex flex-col justify-between rounded-xl border p-4 cursor-pointer transition ${
                    formData.paymentMethod === "pay_on_delivery"
                      ? "border-brand-green bg-emerald-50/50 ring-2 ring-brand-green/30"
                      : "border-brand-line bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <CreditCard className="h-5 w-5 text-emerald-700" />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pay_on_delivery"
                      checked={formData.paymentMethod === "pay_on_delivery"}
                      onChange={handleChange}
                      className="text-brand-green focus:ring-brand-green"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="font-bold text-sm text-brand-ink">Pay via UPI on Delivery</div>
                    <div className="text-[11px] text-brand-muted mt-1 leading-snug">
                      Scan QR code via Google Pay, PhonePe, Paytm when the goods arrive.
                    </div>
                  </div>
                </label>

                {/* Option 3: Commercial Invoice */}
                <label
                  className={`flex flex-col justify-between rounded-xl border p-4 cursor-pointer transition ${
                    formData.paymentMethod === "invoice"
                      ? "border-brand-green bg-emerald-50/50 ring-2 ring-brand-green/30"
                      : "border-brand-line bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <FileText className="h-5 w-5 text-emerald-700" />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="invoice"
                      checked={formData.paymentMethod === "invoice"}
                      onChange={handleChange}
                      className="text-brand-green focus:ring-brand-green"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="font-bold text-sm text-brand-ink">Wholesale Invoice (B2B)</div>
                    <div className="text-[11px] text-brand-muted mt-1 leading-snug">
                      Official GST bill provided for canteens & institutions; pay via NEFT/bank.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="space-y-6">
            <div className="card p-6 shadow-card space-y-4 sticky top-24">
              <h2 className="text-lg font-bold text-brand-ink border-b border-brand-line pb-3">
                Order Items ({totalCount})
              </h2>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-brand-line/50 pr-1">
                {items.map((it) => (
                  <div key={it.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold text-brand-ink truncate">{it.name}</div>
                      <div className="text-brand-muted text-[11px]">
                        {it.size} × {it.quantity}
                      </div>
                    </div>
                    <div className="font-bold text-brand-ink shrink-0">
                      ₹{it.price * it.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="border-t border-brand-line pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-ink">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-emerald-700">
                    {isFreeDelivery ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="border-t border-brand-line pt-3 flex justify-between text-base font-extrabold text-brand-ink">
                  <span>Total Payable</span>
                  <span className="text-brand-green">₹{grandTotal}</span>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-brand-mist/50 p-3 text-[11px] text-brand-muted flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  Our delivery team will confirm your order via call/WhatsApp before dispatch from Karungalpalayam, Erode.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !py-3.5 flex items-center justify-center gap-2 font-bold text-sm shadow-lift"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Placing Order…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Confirm & Place Order
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
