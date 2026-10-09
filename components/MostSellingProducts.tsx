"use client";

import Image from "next/image";
import Link from "next/link";
import { CATEGORY_IMAGES, DEFAULT_PRODUCT_IMAGE } from "@/lib/catalog";

export interface MostSellingItem {
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
  description?: string;
  image?: string;
}

export default function MostSellingProducts({
  items = [],
}: {
  items?: MostSellingItem[];
}) {
  if (!items.length) return null;

  return (
    <section className="section-pad tint-cool">
      <div className="container-site">
        <div className="rounded-2xl bg-gradient-to-br from-brand-mist via-white to-brand-cream px-4 py-10 shadow-card ring-1 ring-emerald-100/60 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="eyebrow mb-3">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Most Selling Products
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Most Selling Products
            </h2>
            <span
              aria-hidden="true"
              className="accent-line mx-auto mb-2 mt-4"
            />
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => {
              const img = p.image
                ? { src: p.image, alt: p.name }
                : CATEGORY_IMAGES[p.categorySlug ?? "spices"] ?? {
                    src: DEFAULT_PRODUCT_IMAGE,
                    alt: p.name,
                  };
              return (
                <li key={`${p.categorySlug}-${p.slug}`}>
                  <article className="card-lift group h-full overflow-hidden">
                    <Link
                      href={`/products/${p.categorySlug}/${p.slug}`}
                      className="relative block aspect-[4/3] overflow-hidden bg-white"
                      aria-label={`View ${p.name}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span aria-hidden="true" className="card-bar" />
                    </Link>
                    <div className="p-4 text-center">
                      <Link
                        href={`/products/${p.categorySlug}/${p.slug}`}
                        className="text-base font-semibold text-brand-ink hover:text-brand-green"
                      >
                        {p.name}
                      </Link>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-green/80">
                        {p.categoryName}
                      </p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}