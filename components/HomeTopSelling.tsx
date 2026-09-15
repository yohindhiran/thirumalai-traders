import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { telHref, whatsappHref } from "@/lib/utils";

export interface HomeTopSellingItem {
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
  description?: string;
  image?: string;
}

export default function HomeTopSelling({
  items,
}: {
  items: HomeTopSellingItem[];
}) {
  return (
    <section className="section-pad bg-brand-soft">
      <div className="container-site">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green sm:text-sm">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              Bestsellers
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Top Selling Wholesale Products
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-brand-muted sm:text-base">
              The most ordered items across canteens, institutions and bulk buyers —
              available at ready wholesale rates.
            </p>
          </div>
          <Link href="/products" className="btn-primary shrink-0 self-start sm:self-auto">
            View Full Catalog
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => {
            const imgSrc = p.image || "/images/hero-warehouse.jpg";
            return (
              <li key={`${p.categorySlug}-${p.slug}`}>
                <article className="card group flex h-full flex-col overflow-hidden bg-white transition-shadow hover:shadow-lift">
                  <Link
                    href={`/products/${p.categorySlug}/${p.slug}`}
                    className="relative block aspect-[4/3] overflow-hidden bg-brand-soft"
                    aria-label={`View ${p.name}`}
                  >
                    <Image
                      src={imgSrc}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-brand-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-green-deep">
                      Hot
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-green/80">
                      {p.categoryName || "Wholesale Grocery"}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-brand-ink line-clamp-1">
                      {p.name}
                    </h3>
                    {p.description && (
                      <p className="mt-1.5 text-xs leading-relaxed text-brand-muted line-clamp-2">
                        {p.description}
                      </p>
                    )}

                    <div className="mt-auto pt-4">
                      <Link
                        href={`/products/${p.categorySlug}/${p.slug}`}
                        className="mb-2.5 flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-green px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-green-dark"
                      >
                        View & Enquire
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={telHref("9384482007")}
                          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-brand-line px-3 py-2 text-xs font-medium text-brand-ink transition-colors hover:border-brand-green hover:text-brand-green"
                        >
                          <Phone className="h-3 w-3" aria-hidden="true" />
                          Call Now
                        </a>
                        <a
                          href={whatsappHref(
                            `Hello Thirumalaai Traders, I would like to enquire about bulk pricing for ${p.name}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-brand-green px-3 py-2 text-xs font-medium text-brand-green transition-colors hover:bg-brand-green hover:text-white"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
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