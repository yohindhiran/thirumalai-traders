"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

interface ProductVariant {
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  category?: string;
  image?: string;
  price?: number;
  unit?: string;
  stock?: number;
  status?: string;
  variants?: ProductVariant[];
}

export default function ProductCard({
  product,
  href,
}: {
  product: Product;
  href?: string;
}) {
  const { addToCart } = useCart();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const variants =
    product.variants && product.variants.length > 0
      ? product.variants
      : [{ size: `1 ${product.unit || "kg"}`, price: product.price || 100 }];

  const activeVariant = variants[selectedIdx] || variants[0];
  const activePrice = activeVariant?.price ?? product.price ?? 100;
  const activeSize = activeVariant?.size ?? `1 ${product.unit || "kg"}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart({
      productId: product.id,
      name: product.name,
      categoryName: product.category,
      image: product.image || DEFAULT_PRODUCT_IMAGE,
      size: activeSize,
      unit: product.unit || "kg",
      price: activePrice,
      quantity: 1,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Thirumalaai Traders, I would like to order/enquire about ${product.name} (${activeSize}) - ₹${activePrice}. Availability: ${isOutOfStock ? "Out of Stock" : "In Stock"}.`
  );

  return (
    <div className="card-lift flex h-full flex-col justify-between p-4 group">
      <div>
        {/* Product Image */}
        <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-white ring-1 ring-brand-line/60">
          {href ? (
            <Link href={href} aria-label={`View ${product.name}`}>
              <img
                src={product.image || DEFAULT_PRODUCT_IMAGE}
                alt={product.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </Link>
          ) : (
            <img
              src={product.image || DEFAULT_PRODUCT_IMAGE}
              alt={product.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          )}
          {product.category && (
            <span className="absolute top-2 left-2 rounded-full bg-gradient-to-r from-emerald-800 to-emerald-950 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-100 shadow-sm border border-emerald-600/30">
              {product.category}
            </span>
          )}
          {isOutOfStock ? (
            <span className="absolute top-2 right-2 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              Out of Stock
            </span>
          ) : product.stock !== undefined && product.stock > 0 && product.stock <= 10 ? (
            <span className="absolute top-2 right-2 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              Low Stock
            </span>
          ) : null}
        </div>

        {/* Product Title */}
        {href ? (
          <Link href={href} className="transition-colors hover:text-brand-green">
            <h3 className="font-semibold text-brand-ink text-base line-clamp-1">{product.name}</h3>
          </Link>
        ) : (
          <h3 className="font-semibold text-brand-ink text-base line-clamp-1">{product.name}</h3>
        )}

        {/* Price & Stock Display */}
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-brand-green">₹{activePrice}</span>
            <span className="text-xs text-brand-muted">/ {activeSize}</span>
          </div>
          {product.stock !== undefined && (
            <span
              className={`text-[11px] font-semibold ${
                product.stock <= 0
                  ? "text-red-600 font-bold"
                  : product.stock <= 10
                  ? "text-amber-600"
                  : "text-emerald-700"
              }`}
            >
              {product.stock <= 0
                ? "Out of stock"
                : `${product.stock} ${product.unit || "kg"}`}
            </span>
          )}
        </div>

        {/* Variant selector */}
        {variants.length > 1 && (
          <div className="mt-2.5">
            <select
              value={selectedIdx}
              onChange={(e) => setSelectedIdx(Number(e.target.value))}
              aria-label="Select product pack size"
              className="w-full rounded-lg border border-brand-line bg-brand-soft/80 p-1.5 text-xs text-brand-ink font-medium focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
            >
              {variants.map((v, i) => (
                <option key={i} value={i}>
                  {v.size} — ₹{v.price}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {isOutOfStock ? (
          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-1.5 text-xs py-2.5 rounded-lg font-semibold bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          >
            Out of Stock
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 text-xs py-2.5 rounded-lg font-semibold transition shadow-sm ${
              justAdded
                ? "bg-emerald-700 text-white"
                : "bg-brand-green text-white hover:bg-brand-green-dark"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Add to Cart
              </>
            )}
          </button>
        )}

        <a
          href={`https://wa.me/919384482007?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs py-2.5 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition shadow-sm"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
