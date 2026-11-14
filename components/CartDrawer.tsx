"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalCount } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-md transform bg-white shadow-2xl transition ease-in-out duration-300 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 bg-gradient-to-r from-brand-mist/50 via-white to-brand-cream/50">
            <div className="flex items-center gap-2">
              <span className="icon-soft-emerald !h-9 !w-9">
                <ShoppingBag className="h-5 w-5 text-brand-green" />
              </span>
              <div>
                <h2 className="text-base font-bold text-brand-ink">Your Wholesale Cart</h2>
                <p className="text-xs text-brand-muted">{totalCount} item{totalCount === 1 ? "" : "s"} selected</p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart"
              className="rounded-full p-2 text-brand-muted hover:bg-gray-100 hover:text-brand-ink transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Delivery notice */}
          <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center gap-2 text-xs text-emerald-800">
            <Truck className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>
              {subtotal >= 1000 ? (
                <strong className="font-semibold">Eligible for Free Wholesale Delivery across Erode!</strong>
              ) : (
                <>Add ₹{1000 - subtotal} more for <strong className="font-semibold">Free Delivery</strong></>
              )}
            </span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-brand-soft flex items-center justify-center text-brand-muted mb-4">
                  <ShoppingBag className="h-8 w-8 text-brand-muted/60" />
                </div>
                <h3 className="text-base font-semibold text-brand-ink">Your cart is empty</h3>
                <p className="mt-1 text-xs text-brand-muted max-w-xs">
                  Explore our premium spices, dals, pulses, grains and flours at wholesale rates.
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="mt-5 btn-primary !py-2 !px-5 text-xs inline-flex items-center gap-1.5"
                >
                  Browse Catalog
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-brand-line p-3 bg-white hover:border-emerald-200 transition shadow-sm"
                >
                  <img
                    src={item.image || "/images/hero-warehouse.jpg"}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover bg-brand-soft border border-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-sm font-semibold text-brand-ink truncate">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-brand-muted hover:text-red-600 transition p-0.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-brand-muted">Package: {item.size}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-green">
                        ₹{item.price * item.quantity}
                      </span>
                      <div className="flex items-center rounded-lg border border-brand-line bg-brand-soft/70">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-brand-muted hover:text-brand-ink"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-brand-ink min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 text-brand-muted hover:text-brand-ink"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-brand-soft/40 space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-brand-muted">
                  <span>Subtotal ({totalCount} items)</span>
                  <span className="font-semibold text-brand-ink">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-brand-muted">
                  <span>Delivery</span>
                  <span className="font-medium text-emerald-700">
                    {subtotal >= 1000 ? "FREE" : "Calculated at checkout"}
                  </span>
                </div>
                <div className="border-t border-brand-line pt-2 flex justify-between text-base font-bold text-brand-ink">
                  <span>Estimated Total</span>
                  <span className="text-brand-green">₹{subtotal}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-brand-muted bg-white p-2 rounded-lg border border-brand-line">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Cash on Delivery & Pay on Delivery available. No online payment required!</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="btn-outline !py-2.5 text-center text-xs font-semibold"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-primary !py-2.5 text-center text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  Checkout
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
