"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus, ShoppingBag, Zap, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/lib/cart";

interface Variant {
  size: string;
  price: number;
}

interface ProductDetailActionsProps {
  product: {
    id: string;
    name: string;
    categoryName?: string;
    image: string;
    price: number;
    unit?: string;
    stock?: number;
    status?: string;
    variants?: Variant[];
  };
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const variants: Variant[] =
    product.variants && product.variants.length > 0
      ? product.variants
      : [{ size: `1 ${product.unit || "kg"}`, price: product.price || 100 }];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const activeVariant = variants[selectedIdx] || variants[0];
  const unitPrice = activeVariant?.price ?? product.price ?? 100;
  const activeSize = activeVariant?.size ?? `1 ${product.unit || "kg"}`;
  const total = unitPrice * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart({
      productId: product.id,
      name: product.name,
      categoryName: product.categoryName,
      image: product.image,
      size: activeSize,
      unit: product.unit || "kg",
      price: unitPrice,
      quantity,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart({
      productId: product.id,
      name: product.name,
      categoryName: product.categoryName,
      image: product.image,
      size: activeSize,
      unit: product.unit || "kg",
      price: unitPrice,
      quantity,
    });
    router.push("/checkout");
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Thirumalaai Traders, I would like to order/enquire about ${product.name} (${activeSize}) - ₹${unitPrice}.`
  );

  return (
    <div className="space-y-6">
      {/* Price & Unit & Stock Display */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-3xl font-extrabold text-brand-green">₹{unitPrice}</span>
        <span className="text-sm font-medium text-brand-muted">/ {activeSize}</span>
        {quantity > 1 && !isOutOfStock && (
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
            Total: ₹{total}
          </span>
        )}
        {isOutOfStock ? (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 border border-red-200">
            Out of Stock
          </span>
        ) : product.stock !== undefined ? (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold border ${
              product.stock <= 10
                ? "bg-amber-50 text-amber-800 border-amber-200 font-bold"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}
          >
            {product.stock <= 10
              ? `Low Stock: Only ${product.stock} ${product.unit || "kg"} left`
              : `In Stock (${product.stock} ${product.unit || "kg"} available)`}
          </span>
        ) : null}
      </div>

      {isOutOfStock && (
        <div className="rounded-xl border border-red-200 bg-red-50/80 p-4 text-xs text-red-800">
          <p className="font-bold text-sm text-red-900 mb-1">Currently Out of Stock in Erode Warehouse</p>
          <p>This item is currently awaiting dispatch from suppliers. You can still message our office on WhatsApp to pre-order or check arrival dates.</p>
        </div>
      )}

      {/* Package Size Options */}
      {variants.length > 0 && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
            Select Pack / Wholesale Size
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {variants.map((v, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIdx(i)}
                className={`rounded-xl border p-2.5 text-center transition ${
                  selectedIdx === i
                    ? "border-brand-green bg-brand-green/10 text-brand-green ring-1 ring-brand-green font-semibold"
                    : "border-brand-line bg-white text-brand-ink hover:border-emerald-300"
                }`}
              >
                <div className="text-xs font-bold">{v.size}</div>
                <div className="text-[11px] text-brand-muted mt-0.5">₹{v.price}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Stepper */}
      {!isOutOfStock && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
            Quantity (Units)
          </label>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-xl border border-brand-line bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="p-2.5 text-brand-muted hover:text-brand-ink disabled:opacity-40 transition"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-sm font-bold text-brand-ink">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2.5 text-brand-muted hover:text-brand-ink transition"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-xs text-brand-muted">
              Wholesale bulk quantities available for dispatch
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons: Add to Cart & Buy Now */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
        {isOutOfStock ? (
          <button
            type="button"
            disabled
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed text-center sm:col-span-2"
          >
            Out of Stock
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleAddToCart}
              className={`btn-outline !py-3 flex items-center justify-center gap-2 font-semibold shadow-sm transition ${
                justAdded ? "!border-emerald-600 !text-emerald-700 !bg-emerald-50" : ""
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="btn-primary !py-3 flex items-center justify-center gap-2 font-semibold shadow-lift"
            >
              <Zap className="h-4 w-4" />
              Buy Now (COD / Invoice)
            </button>
          </>
        )}
      </div>

      {/* Assurance info */}
      <div className="rounded-xl border border-emerald-100 bg-brand-mist/50 p-3.5 space-y-2 text-xs text-brand-muted">
        <div className="flex items-center gap-2 text-brand-ink font-semibold">
          <Truck className="h-4 w-4 text-emerald-700" />
          <span>Same-day or Next-day Delivery across Erode & Tamil Nadu</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-700" />
          <span>No payment gateway required · Pay cash or UPI upon delivery or request official invoice</span>
        </div>
      </div>
    </div>
  );
}
