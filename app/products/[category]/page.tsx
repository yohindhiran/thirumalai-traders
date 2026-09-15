import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductsBrowser from "@/components/ProductsBrowser";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";
import { readDb } from "@/lib/db";
import { CATEGORY_IMAGES, DEFAULT_PRODUCT_IMAGE } from "@/lib/catalog";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = readDb().categories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.name} – Bulk Wholesale Supply in Erode`,
    description:
      cat.description || `Bulk wholesale supply of ${cat.name} across Erode, Tamil Nadu.`,
    alternates: { canonical: `/products/${category}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const db = readDb();
  const cat = db.categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const defaultImage = CATEGORY_IMAGES[cat.slug]?.src || DEFAULT_PRODUCT_IMAGE;

  const products = db.products
    .filter((p) => p.categoryId === cat.id && p.status === "active")
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.shortDescription || p.description,
      subcategory: p.subcategory,
      categoryName: cat.name,
      categorySlug: cat.slug,
      categoryId: cat.id,
      image: p.images?.[0] || p.mainImage || defaultImage,
      images: p.images?.length ? p.images : [defaultImage],
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
      <PageHero title={cat.name} backgroundImage={defaultImage} />
      <section className="section-pad bg-brand-soft">
        <div className="container-site">
          <Suspense
            fallback={
              <div className="py-20 text-center text-sm text-brand-muted">
                Loading…
              </div>
            }
          >
            <ProductsBrowser products={products} fixedCategorySlug={category} />
          </Suspense>
        </div>
      </section>
    </>
  );
}