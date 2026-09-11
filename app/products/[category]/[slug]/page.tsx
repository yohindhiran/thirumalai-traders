import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  Ban,
  Boxes,
  FlaskConical,
  Layers,
  Leaf,
  Package,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";
import { getProductForDisplay, getRelatedProducts, readDb } from "@/lib/db";
import { whatsappHref } from "@/lib/utils";
import ProductGallery from "@/components/ProductGallery";

export function generateStaticParams() {
  const db = readDb();
  const catById = new Map(db.categories.map((c) => [c.id, c]));
  return db.products
    .filter((p) => p.status === "active")
    .map((p) => ({ category: catById.get(p.categoryId)?.slug ?? "", slug: p.slug }))
    .filter((p) => p.category);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const product = getProductForDisplay(category, slug);
  if (!product) return {};
  return {
    title: `${product.name} – Bulk Wholesale ${product.categoryName} in Erode`,
    description: product.description,
    alternates: { canonical: `/products/${category}/${slug}` },
  };
}

const ASSURANCES = [
  {
    icon: Leaf,
    title: "Pure & Natural",
    text: "Sourced for natural quality, free from artificial adulteration.",
  },
  {
    icon: Award,
    title: "High Quality",
    text: "Consistent grade and purity suited to institutional supply.",
  },
  {
    icon: Ban,
    title: "No Additives",
    text: "Supplied without added colour or preservatives.",
  },
  {
    icon: PackageCheck,
    title: "Hygienically Packed",
    text: "Packed in clean conditions to protect product quality.",
  },
  {
    icon: Sparkles,
    title: "Rich Aroma",
    text: "Carefully stored to retain natural aroma and flavour.",
  },
  {
    icon: FlaskConical,
    title: "Lab Tested",
    text: "Quality-checked before it reaches your kitchen.",
  },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product = getProductForDisplay(category, slug);
  if (!product) notFound();

  const images = product.images && product.images.length ? product.images : ["/images/hero-warehouse.jpg"];
  const related = getRelatedProducts(category, slug, 5);

  const enquiryHref = `/enquiry?product=${encodeURIComponent(
    product.name
  )}&category=${encodeURIComponent(product.categoryName)}`;
  const whatsappMessage = `Hello Thirumalaai Traders, I would like to enquire about ${product.name} (${product.categoryName}).`;
  const whatsappLink = whatsappHref(whatsappMessage);

  const details: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Layers, label: "Category", value: product.categoryName },
    ...(product.subcategory
      ? [{ icon: Package, label: "Type", value: product.subcategory }]
      : []),
    ...(product.purity
      ? [{ icon: Sparkles, label: "Purity", value: product.purity }]
      : []),
    ...(product.color
      ? [{ icon: Layers, label: "Color", value: product.color }]
      : []),
    ...(product.shelfLife
      ? [{ icon: Package, label: "Shelf Life", value: product.shelfLife }]
      : []),
    ...(product.packaging
      ? [{ icon: Package, label: "Packaging", value: product.packaging }]
      : []),
    ...(product.specs && product.specs.length
      ? product.specs.map((s) => ({ icon: Layers, label: s.label, value: s.value }))
      : []),
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          {
            name: product.categoryName,
            path: `/products/${product.categorySlug}`,
          },
          { name: product.name, path: `/products/${category}/${slug}` },
        ])}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          {/* Breadcrumb (no hero) */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-brand-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-brand-green">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/products" className="hover:text-brand-green">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/products/${product.categorySlug}`}
                  className="hover:text-brand-green"
                >
                  {product.categoryName}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-brand-ink">{product.name}</li>
            </ol>
          </nav>

          {/* Product layout: thumbnails | main image | info */}
          <div className="grid gap-8 lg:grid-cols-[88px_minmax(0,1fr)_380px] lg:gap-10">
            <ProductGallery images={images} name={product.name} />

            <div className="lg:col-start-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-green">
                {product.categoryName}
                {product.subcategory ? ` · ${product.subcategory}` : ""}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 leading-relaxed text-brand-muted">
                {product.description}
              </p>
              {product.qualityInfo && (
                <p className="mt-4 rounded-lg border border-brand-line bg-brand-soft/60 p-4 text-sm leading-relaxed text-brand-muted">
                  {product.qualityInfo}
                </p>
              )}

              {/* Product details */}
              <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-brand-ink">
                  Product Details
                </h2>
                <dl className="mt-4 divide-y divide-brand-line border-y border-brand-line">
                  {details.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="flex items-center gap-3 py-3"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-green">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <dt className="w-28 shrink-0 text-sm font-medium text-brand-muted">
                          {s.label}
                        </dt>
                        <dd className="text-sm font-semibold text-brand-ink">
                          {s.value}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={enquiryHref}
                  className="btn-primary w-full sm:w-auto"
                >
                  Request Enquiry
                </Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full sm:w-auto"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="section-pad bg-brand-soft">
        <div className="container-site">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              Our Promise
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Quality Assurance
            </h2>
            <p className="mt-4 leading-relaxed text-brand-muted">
              Every product we supply is backed by consistent quality checks and
              hygienic handling, so your kitchen always receives the best.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {ASSURANCES.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.title} className="text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-green shadow-card">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-brand-ink">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-brand-muted">
                    {a.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Related Products */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="mb-10 text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              You may also need
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Related Products
            </h2>
          </div>

          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-5">
              {related.map((p) => {
               const img = (p.images && p.images[0]) || "/images/hero-warehouse.jpg";
              return (
                <li key={`${p.categorySlug}-${p.slug}`}>
                  <article className="card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lift">
                    <Link
                      href={`/products/${p.categorySlug}/${p.slug}`}
                      className="relative block aspect-[4/3] overflow-hidden bg-brand-soft"
                      aria-label={`View ${p.name}`}
                    >
                      <Image
                        src={img}
                        alt={`${p.name} — ${p.categoryName}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-brand-green/80">
                        {p.categoryName}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-brand-ink">
                        {p.name}
                      </h3>
                      <Link
                        href={`/products/${p.categorySlug}/${p.slug}`}
                        className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-brand-green hover:text-brand-green-dark"
                      >
                        View Product
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
    </>
  );
}
