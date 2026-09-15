"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORY_IMAGES } from "@/lib/catalog";
import { CATEGORY_SEEDS } from "@/data/categories";

// Define or adjust the product interface inline if BrowserProduct isn't exported
export interface CatalogProduct {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  categorySlug?: string;
  categoryId?: string;
  categoryName?: string;
  price?: number;
  unit?: string;
  image?: string;
  images?: string[];
  variants?: any[];
}

interface CatalogBrowserProps {
  products: CatalogProduct[];
  categories?: any[];
}

export default function CatalogBrowser({
  products = [],
  categories = CATEGORY_SEEDS,
}: CatalogBrowserProps) {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const catSlug = cat.slug || cat.id;
          const catImage =
            CATEGORY_IMAGES[catSlug] || cat.image || "/images/placeholder.jpg";

          return (
            <Link
              key={catSlug}
              href={`/products/${catSlug}`}
              className="card group overflow-hidden flex flex-col justify-between border border-gray-100 hover:border-brand-green/40 transition"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={catImage}
                  alt={cat.name || "Category image"}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-ink group-hover:text-brand-green transition">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm text-brand-muted line-clamp-2">
                  {cat.description || `Explore bulk wholesale ${cat.name} in Erode.`}
                </p>
                <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand-green">
                  Browse Products &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}