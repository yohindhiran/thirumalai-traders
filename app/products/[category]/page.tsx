import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductsBrowser from "@/components/ProductsBrowser";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";
import { CATEGORY_SEEDS } from "@/data/categories";
import { CATEGORY_IMAGES } from "@/lib/catalog";
import { PRODUCT_SEEDS, productDescription } from "@/data/products-seed";

export function generateStaticParams() {
  return CATEGORY_SEEDS.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORY_SEEDS.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.name} – Bulk Wholesale Supply in Erode`,
    description: cat.description,
    alternates: { canonical: `/products/${category}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORY_SEEDS.find((c) => c.slug === category);
  if (!cat) notFound();

  const products = (PRODUCT_SEEDS[category] || []).map((p) => ({
    name: p.name,
    slug: p.name
      .toLowerCase()
      .replace(/[–—/]/g, "-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    description: productDescription(p.name, cat.name),
    subcategory: p.subcategory,
    categoryName: cat.name,
    categorySlug: cat.slug,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: cat.name, path: `/products/${category}` },
        ])}
      />
      <PageHero
        title={cat.name}
        backgroundImage={
          CATEGORY_IMAGES[category]?.src ?? "/images/hero-warehouse.jpg"
        }
      />
      <section className="section-pad bg-brand-soft">
        <div className="container-site">
          <Suspense fallback={<div className="py-20 text-center text-sm text-brand-muted">Loading…</div>}>
            <ProductsBrowser products={products} fixedCategorySlug={category} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
