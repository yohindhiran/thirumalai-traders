import React from "react";
import Link from "next/link";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/catalog";

interface ProductVariant {
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  variants: ProductVariant[];
}

export default function ProductCard({
  product,
  href,
}: {
  product: Product;
  href?: string;
}) {
  const whatsappMessage = encodeURIComponent(
    `Hello Thirumalaai Traders, I would like to enquire about ${product.name}.`
  );

  return (
    <div className="card-lift flex flex-col justify-between p-4">
      <div>
        <div className="relative h-44 w-full mb-3 overflow-hidden rounded-lg bg-white ring-1 ring-brand-line/60">
          {href ? (
            <Link href={href} aria-label={`View ${product.name}`}>
              <img
                src={product.image || DEFAULT_PRODUCT_IMAGE}
                alt={product.name}
                className="h-full w-full object-cover hover:scale-105 transition duration-300"
              />
            </Link>
          ) : (
            <img
              src={product.image || DEFAULT_PRODUCT_IMAGE}
              alt={product.name}
              className="h-full w-full object-cover hover:scale-105 transition duration-300"
            />
          )}
          <span className="absolute top-2 left-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {product.category}
          </span>
        </div>
        {href ? (
          <Link href={href} className="transition-colors hover:text-brand-green">
            <h3 className="font-semibold text-brand-ink text-base line-clamp-1">{product.name}</h3>
          </Link>
        ) : (
          <h3 className="font-semibold text-brand-ink text-base line-clamp-1">{product.name}</h3>
        )}

        {product.variants?.length ? (
          <div className="my-3">
            <select
              aria-label="Select product size and price"
              className="w-full text-xs border border-brand-line rounded-lg p-2 bg-brand-soft focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none"
            >
              {product.variants.map((v, i) => (
                <option key={i} value={v.size}>
                  {v.size} — Rs.{v.price}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <a
          href="tel:9384482007"
          className="flex items-center justify-center bg-brand-green text-white text-xs py-2.5 rounded-lg font-semibold hover:bg-brand-green-dark transition shadow-sm"
        >
          Call Now
        </a>
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