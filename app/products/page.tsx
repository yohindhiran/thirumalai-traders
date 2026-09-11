import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import MostSellingProducts from "@/components/MostSellingProducts";
import ProductGrid from "@/components/ProductGrid";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";
import { CATEGORY_SEEDS } from "@/data/categories";
import { CATEGORY_IMAGES, categoryProductCount } from "@/lib/catalog";
import { getMostSellingProducts, getOurProducts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Categories – Bulk Wholesale Grocery Catalog",
  description:
    "Explore the full range of wholesale grocery categories from Thirumalaai Traders — spices, grains & pulses, rice & lentils, masala, dry fruits & nuts, oils, atta, flour and grocery essentials.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const mostSelling = getMostSellingProducts().map((p) => ({
    name: p.name,
    slug: p.slug,
    categoryName: p.categoryName,
    categorySlug: p.categorySlug,
    image: p.images?.[0],
  }));
  const ourProducts = getOurProducts().map((p) => ({
    name: p.name,
    slug: p.slug,
    categoryName: p.categoryName,
    categorySlug: p.categorySlug,
    image: p.images?.[0],
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />

      {/* Hero */}
      <PageHero title="Product Categories" backgroundImage="/images/hero-warehouse.jpg" />

      {/* Shop by Category */}
      <section id="categories" className="section-pad bg-white">
        <div className="container-site">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green sm:text-sm">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              Product Categories
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Shop by Category
            </h2>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CATEGORY_SEEDS.map((cat) => {
              const img = CATEGORY_IMAGES[cat.slug];
              return (
                <li key={cat.slug}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="card group block h-full overflow-hidden transition-shadow hover:shadow-lift"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-brand-soft">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1 bg-brand-gold opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </div>
                    <div className="flex flex-col p-5">
                      <h3 className="text-lg font-semibold text-brand-green">
                        {cat.name}
                      </h3>
                      <p className="mt-1 text-sm text-brand-muted">
                        {categoryProductCount(cat.slug)}+ Products
                      </p>
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

      {/* Most Selling Products */}
      <MostSellingProducts items={mostSelling} />

      {/* Our Products */}
      <ProductGrid products={ourProducts} />
    </>
  );
}
