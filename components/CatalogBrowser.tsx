"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageSearch, Search as SearchIcon } from "lucide-react";
import { CATEGORY_IMAGES } from "@/lib/catalog";
import { CATEGORY_SEEDS } from "@/data/categories";

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

interface CatalogBrowserProps {
  products: CatalogProduct[];
  categories?: any[];
  fixedCategorySlug?: string;
}

export default function CatalogBrowser({
  products = [],
  categories = CATEGORY_SEEDS,
  fixedCategorySlug,
}: CatalogBrowserProps) {
  const [activeCat, setActiveCat] = useState(fixedCategorySlug || "");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) {
      const slug = p.categorySlug || "";
      if (slug) map.set(slug, (map.get(slug) || 0) + 1);
    }
    return map;
  }, [products]);

  const filtered = useMemo(() => {
    let list = fixedCategorySlug
      ? products.filter((p) => p.categorySlug === fixedCategorySlug || p.categoryId === fixedCategorySlug)
      : activeCat
      ? products.filter((p) => p.categorySlug === activeCat)
      : products;

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(q))
      );
    }
    return list;
  }, [products, activeCat, query, fixedCategorySlug]);

  const sidebarItems = [
    { slug: "", name: "All Categories", count: products.length },
    ...CATEGORY_SEEDS.map((c) => ({
      slug: c.slug,
      name: c.name,
      count: counts.get(c.slug) || 0,
    })),
  ];

  const renderCard = (p: CatalogProduct) => {
    const imgObj = CATEGORY_IMAGES[p.categorySlug || ""] || {
      src: p.image || p.images?.[0] || "/images/hero-warehouse.jpg",
      alt: p.name,
    };
    return (
      <li key={`${p.categorySlug || ""}-${p.slug}`}>
        <article className="card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lift">
          <div className="relative h-40 overflow-hidden bg-brand-soft">
            <Image
              src={imgObj.src}
              alt={imgObj.alt || p.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1 bg-brand-gold opacity-0 transition-opacity group-hover:opacity-100"
            />
          </div>
          <div className="flex flex-1 flex-col p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              {p.categoryName || "Grocery"}
              {p.subcategory ? ` · ${p.subcategory}` : ""}
            </p>
            <h3 className="mt-1.5 text-base font-semibold text-brand-ink">
              {p.name}
            </h3>
            <Link
              href={`/enquiry?product=${encodeURIComponent(p.name)}&category=${encodeURIComponent(
                p.categoryName || ""
              )}`}
              className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-brand-green hover:text-brand-green-dark"
            >
              Enquire
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </article>
      </li>
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
      {!fixedCategorySlug && (
        <aside aria-label="Filter by category">
          <h3 className="hidden text-sm font-bold uppercase tracking-widest text-brand-muted lg:block">
            Categories
          </h3>
          <nav className="scrollbar-hide mt-0 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0">
            {sidebarItems.map((c) => {
              const active = c.slug === activeCat;
              return (
                <button
                  key={c.slug || "all"}
                  type="button"
                  onClick={() => setActiveCat(c.slug)}
                  aria-pressed={active}
                  className={`flex shrink-0 items-center justify-between gap-3 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors lg:w-full ${
                    active
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-brand-line bg-white text-brand-ink hover:border-brand-green hover:text-brand-green"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className={`text-xs ${active ? "text-white/80" : "text-brand-muted"}`}>
                    ({c.count})
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>
      )}

      <div className={fixedCategorySlug ? "lg:col-span-2" : ""}>
        <div className="relative mb-6 max-w-md">
          <SearchIcon
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
            aria-hidden="true"
          />
          <label htmlFor="catalog-search" className="sr-only">
            Search products
          </label>
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="input !pl-10"
          />
        </div>

        <p className="mb-5 text-sm text-brand-muted" role="status">
          Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>

        {filtered.length === 0 ? (
          <div className="card mx-auto max-w-md p-12 text-center">
            <PackageSearch
              className="mx-auto h-12 w-12 text-brand-muted/50"
              aria-hidden="true"
            />
            <h3 className="mt-4 text-lg font-semibold text-brand-ink">
              No products found
            </h3>
            <p className="mt-2 text-sm text-brand-muted">
              Try a different search term or clear the filters. Can&apos;t find
              what you need? Ask us — we may still be able to supply it.
            </p>
            {!fixedCategorySlug && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCat("");
                }}
                className="btn-outline mt-6"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map(renderCard)}
          </ul>
        )}
      </div>
    </div>
  );
}