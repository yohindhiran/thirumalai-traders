import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { readDb } from "@/lib/db";
import { CATEGORY_IMAGES, DEFAULT_PRODUCT_IMAGE } from "@/lib/catalog";

export default function CategoryGrid() {
  const db = readDb();
  const categories = db.categories.filter((c) => c.status === "active");

  return (
    <section className="py-12 sm:py-14 lg:py-16 tint-warm">
      <div className="container-site">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Product Categories
        </h2>
        <span aria-hidden="true" className="accent-line mx-auto mb-2 mt-5" />

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => {
            const img = CATEGORY_IMAGES[cat.slug] ?? {
              src: DEFAULT_PRODUCT_IMAGE,
              alt: cat.name,
            };
            const count = db.products.filter(
              (p) => p.categoryId === cat.id && p.status === "active"
            ).length;
            return (
              <li key={cat.id}>
                <Link
                  href={`/products/${cat.slug}`}
                  className="card-lift group block overflow-hidden"
                >
                  <div className="relative h-44 overflow-hidden bg-white">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span aria-hidden="true" className="card-bar" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-emerald-800">{cat.name}</h3>
                    {count > 0 && (
                      <p className="mt-2">
                        <span className="chip-soft">
                          {count}+ Products
                        </span>
                      </p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                      View Products
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}