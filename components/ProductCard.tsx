import React from "react";
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

export default function ProductCard({ product }: { product: Product }) {
  const whatsappMessage = encodeURIComponent(
    `Hello Thirumalaai Traders, I would like to enquire about ${product.name}.`
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="relative h-44 w-full mb-3 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image || DEFAULT_PRODUCT_IMAGE}
            alt={product.name}
            className="h-full w-full object-cover hover:scale-105 transition duration-300"
          />
          <span className="absolute top-2 left-2 text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded font-medium">
            {product.category}
          </span>
        </div>
        <h3 className="font-semibold text-gray-800 text-base line-clamp-1">{product.name}</h3>

        {product.variants?.length ? (
          <div className="my-3">
            <select
              aria-label="Select product size and price"
              className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-amber-500 outline-none"
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
          className="flex items-center justify-center bg-emerald-700 text-white text-xs py-2.5 rounded-lg font-medium hover:bg-emerald-800 transition shadow-sm"
        >
          Call Now
        </a>
        <a
          href={`https://wa.me/919384482007?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-green-600 text-white text-xs py-2.5 rounded-lg font-medium hover:bg-green-700 transition shadow-sm"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}