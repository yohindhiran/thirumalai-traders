
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Search, X } from "lucide-react";
import { CATEGORY_IMAGES, DEFAULT_PRODUCT_IMAGE } from "@/lib/catalog";

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
  subcategory?: string;
}

interface ProductsBrowserProps {
  products: CatalogProduct[];
  categories?: any[];
  fixedCategorySlug?: string;
}

export default function ProductsBrowser({
  products = [],
  categories = [],
  fixedCategorySlug,
}: ProductsBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(fixedCategorySlug || "all");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        fixedCategorySlug
          ? p.categorySlug === fixedCategorySlug || p.categoryId === fixedCategorySlug
          : selectedCategory === "all" ||
            p.categorySlug === selectedCategory ||
            p.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory, fixedCategorySlug]);

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-brand-soft p-4 border border-gray-100">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            placeholder="Search wholesale products, grains, pulses, spices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-brand-ink placeholder:text-brand-muted/70 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {!fixedCategorySlug && categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                selectedCategory === "all"
                  ? "bg-brand-green text-white shadow-sm"
                  : "bg-white text-brand-muted hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug || cat.id}
                onClick={() => setSelectedCategory(cat.slug || cat.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  selectedCategory === (cat.slug || cat.id)
                    ? "bg-brand-green text-white shadow-sm"
                    : "bg-white text-brand-muted hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-lg font-semibold text-brand-ink">No matching products found</p>
          <p className="mt-1 text-sm text-brand-muted">
            Try adjusting your search query or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 rounded-xl bg-brand-green px-4 py-2 text-xs font-semibold text-white hover:bg-brand-green/90 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((p) => {
            const catSlug =
              p.categorySlug ||
              (p.categoryId || "").replace("cat-", "") ||
              "spices";
            const image =
              p.image ||
              p.images?.[0] ||
              CATEGORY_IMAGES[catSlug]?.src ||
              DEFAULT_PRODUCT_IMAGE;
            const images = p.images?.length ? p.images : [image];
            return (
              <li key={`${p.categorySlug || p.categoryId}-${p.slug || p.id}`}>
                <ProductCard
                  product={
                    {
                      ...p,
                      id: p.slug || p.id,
                      category: p.categorySlug || p.categoryId || "",
                      image,
                      images,
                      variants: p.variants || [],
                    } as any
                  }
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}