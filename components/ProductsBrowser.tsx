"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchX, Search as SearchIcon } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { CATEGORY_SEEDS } from "@/data/categories";
import type { Category, Product } from "@/types";

export interface BrowserProduct {
  name: string;
  slug: string;
  description: string;
  subcategory?: string;
  categoryName: string;
  categorySlug: string;
}

export default function ProductsBrowser({
  products,
  fixedCategorySlug,
  allCategories = false,
}: {
  /** Pre-filtered list (category pages). If omitted, the full catalog is loaded. */
  products?: BrowserProduct[];
  fixedCategorySlug?: string;
  allCategories?: boolean;
}) {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState(
    params.get("category") || fixedCategorySlug || ""
  );
  const [group, setGroup] = useState(params.get("group") || "");

  const catalog: BrowserProduct[] = useMemo(() => products ?? [], [products]);

  const filtered = useMemo(() => {
    let list = catalog;
    if (!fixedCategorySlug && activeCat) {
      list = list.filter((p) => p.categorySlug === activeCat);
    }
    if (group) {
      list = list.filter((p) => p.subcategory === group);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [catalog, query, activeCat, group, fixedCategorySlug]);

  const groups = useMemo(() => {
    if (fixedCategorySlug) {
      return [...new Set(catalog.map((p) => p.subcategory).filter(Boolean) as string[])];
    }
    return [];
  }, [catalog, fixedCategorySlug]);

  const catTabs = useMemo(() => {
    if (!allCategories) return [];
    return CATEGORY_SEEDS.map((c) => ({ slug: c.slug, name: c.name }));
  }, [allCategories]);

  return (
    <div>
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
            aria-hidden="true"
          />
          <label htmlFor="product-search" className="sr-only">
            Search products by name or category
          </label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. turmeric, dal, rice…"
            className="input !pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {!fixedCategorySlug && (
            <select
              aria-label="Filter by category"
              value={activeCat}
              onChange={(e) => setActiveCat(e.target.value)}
              className="input sm:w-56"
            >
              <option value="">All Categories</option>
              {(catTabs.length ? catTabs : CATEGORY_SEEDS.map((c) => ({ slug: c.slug, name: c.name }))).map(
                (c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                )
              )}
            </select>
          )}
          {groups.length > 0 && (
            <select
              aria-label="Filter by group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="input sm:w-56"
            >
              <option value="">All Groups</option>
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <p className="mb-6 text-sm text-brand-muted" role="status">
        Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}
      </p>

      {filtered.length === 0 ? (
        <div className="card mx-auto max-w-md p-12 text-center">
          <SearchX className="mx-auto h-12 w-12 text-brand-muted/50" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold text-brand-ink">No products found</h2>
          <p className="mt-2 text-sm text-brand-muted">
            Try a different search term or clear the filters. Can&apos;t find what you
            need? Ask us — we may still be able to supply it.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCat(fixedCategorySlug || "");
              setGroup("");
            }}
            className="btn-outline mt-6"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <li key={`${p.categorySlug}-${p.slug}`}>
              <ProductCard
                product={
                  {
                    ...p,
                    id: p.slug,
                    categoryId: "",
                    status: "active",
                    displayOrder: 0,
                    createdAt: "",
                    updatedAt: "",
                  } as Product
                }
                categoryName={p.categoryName}
                categorySlug={p.categorySlug}
                className="h-full"
              />
            </li>
          ))}
        </ul>
      )}

      {fixedCategorySlug && (
        <div className="mt-12 text-center">
          <Link href="/products" className="btn-outline">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
