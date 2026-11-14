"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, totalCount } = useCart();

  const isFreeDelivery = subtotal >= 1000;
  const deliveryCharge = isFreeDelivery || items.length === 0 ? 0 : 60;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="bg-brand-soft min-h-[75vh] py-8 sm:py-12">
      <div className="container-site">
        {/* Breadcrumb / Title */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-brand-muted">
              <Link href="/" className="hover:text-brand-green">Home</Link>
              <span>/</span>
              <span className="text-brand-ink font-semibold">Shopping Cart</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-brand-ink">
              Wholesale Shopping Cart
            </h1>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-green hover:text-brand-green-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="card py-16 text-center max-w-xl mx-auto shadow-card">
            <div className="h-16 w-16 rounded-full bg-brand-soft flex items-center justify-center text-brand-muted mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-brand-muted/70" />
            </div>
            <h2 className="text-xl font-bold text-brand-ink">Your Wholesale Cart is Empty</h2>
            <p className="mt-2 text-sm text-brand-muted max-w-sm mx-auto">
              Add premium spices, dals, pulses, grains, oils and flours to your cart at competitive wholesale pricing.
            </p>
            <Link href="/products" className="btn-primary mt-6 inline-flex items-center gap-2">
              Browse Wholesale Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-semibold text-brand-muted">
                  {totalCount} item{totalCount === 1 ? "" : "s"} in cart
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear Cart
                </button>
              </div>

              {/* Items Card */}
              <div className="card divide-y divide-brand-line overflow-hidden shadow-card">
                {items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={item.image || "/images/hero-warehouse.jpg"}
                        alt={item.name}
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover bg-brand-soft border border-brand-line shrink-0"
                      />
                      <div className="min-w-0">
                        {item.categoryName && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                            {item.categoryName}
                          </span>
                        )}
                        <h3 className="text-base font-bold text-brand-ink truncate">{item.name}</h3>
                        <p className="text-xs text-brand-muted mt-0.5">
                          Package size: <span className="font-semibold text-brand-ink">{item.size}</span>
                        </p>
                        <p className="text-xs font-semibold text-brand-green mt-1">
                          ₹{item.price} / pack
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6">
                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded-lg border border-brand-line bg-brand-soft">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 text-brand-muted hover:text-brand-ink transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center text-xs font-bold text-brand-ink">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 text-brand-muted hover:text-brand-ink transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Total & Delete */}
                      <div className="text-right">
                        <div className="text-sm font-bold text-brand-ink">
                          ₹{item.price * item.quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 hover:text-red-700 mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Free delivery bar */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 flex items-center gap-3">
                <Truck className="h-5 w-5 text-emerald-700 shrink-0" />
                <div className="text-xs text-emerald-900">
                  {isFreeDelivery ? (
                    <strong className="font-semibold">Congratulations! Your order qualifies for Free Wholesale Delivery.</strong>
                  ) : (
                    <span>Add ₹{1000 - subtotal} more of wholesale products to get <strong>Free Delivery across Erode</strong>!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="card p-6 shadow-card space-y-4">
                <h2 className="text-lg font-bold text-brand-ink border-b border-brand-line pb-3">
                  Order Summary
                </h2>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-brand-muted">
                    <span>Subtotal ({totalCount} items)</span>
                    <span className="font-semibold text-brand-ink">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-brand-muted">
                    <span>Wholesale Delivery</span>
                    <span className="font-semibold text-emerald-700">
                      {isFreeDelivery ? "FREE" : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-brand-muted">
                    <span>Payment Method</span>
                    <span className="font-medium text-brand-ink">COD / Pay on Delivery</span>
                  </div>
                  <div className="border-t border-brand-line pt-3 flex justify-between text-lg font-extrabold text-brand-ink">
                    <span>Total Amount</span>
                    <span className="text-brand-green">₹{grandTotal}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-brand-soft p-3 text-xs text-brand-muted space-y-1.5 border border-brand-line">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Zero Online Payment Risk</span>
                  </div>
                  <p>
                    Pay cash or UPI upon delivery, or receive an official wholesale invoice for NEFT/bank transfer.
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="btn-primary w-full !py-3.5 text-center flex items-center justify-center gap-2 font-bold shadow-lift"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
