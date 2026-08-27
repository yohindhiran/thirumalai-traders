import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CATEGORY_IMAGES,
  OUR_PRODUCTS,
  resolveFeatured,
} from "@/lib/catalog";

export default function ProductGrid() {
  const products = OUR_PRODUCTS.map(resolveFeatured).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );

  return (
    <section className="section-pad bg-brand-soft">
      <div className="container-site">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green sm:text-sm">
              <span
                aria-hidden="true"
                className="h-px w-6 bg-brand-gold-dark"
              />
              Browse Other Products
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Our Products
            </h2>
          </div>
          <Link href="#categories" className="btn-primary shrink-0 self-start sm:self-auto">
            View All Products
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p) => {
            const img = CATEGORY_IMAGES[p.categorySlug];
            return (
              <li key={`${p.categorySlug}-${p.slug}`}>
                <article className="card group flex h-full flex-col overflow-hidden rounded-xl transition-shadow hover:shadow-lift">
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1 bg-brand-gold opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-base font-semibold text-brand-ink">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-green/80">
                      {p.categoryName}
                    </p>
                    <Link
                      href={`/enquiry?product=${encodeURIComponent(p.name)}&category=${encodeURIComponent(p.categoryName)}`}
                      className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-brand-green hover:text-brand-green-dark"
                    >
                      Enquire Now
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
