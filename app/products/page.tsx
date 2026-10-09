import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import MostSellingProducts from "@/components/MostSellingProducts";
import ProductGrid from "@/components/ProductGrid";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";
import { CATEGORY_IMAGES, DEFAULT_PRODUCT_IMAGE } from "@/lib/catalog";
import { getMostSellingProducts, getOurProducts, getPageContent, readDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Categories – Bulk Wholesale Grocery Catalog",
  description:
    "Explore the full range of wholesale grocery categories from Thirumalaai Traders — spices, grains & pulses, rice & lentils, masala, dry fruits & nuts, oils, atta, flour and grocery essentials.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const db = readDb();
  // Admin-managed hero (Admin → Company Pages → Products Page).
  const page = getPageContent("products");
  const catById = new Map(db.categories.map((c) => [c.id, c]));
  const activeCategories = db.categories.filter((c) => c.status === "active");

  const mapProduct = (p: any) => {
    const cat = catById.get(p.categoryId);
    const categorySlug =
      cat?.slug || p.categoryId?.replace("cat-", "") || "spices";
    return {
      name: p.name,
      slug: p.slug,
      categoryName: cat?.name || "Wholesale Grocery",
      categorySlug,
      image:
        p.images?.[0] ||
        p.mainImage ||
        CATEGORY_IMAGES[categorySlug]?.src ||
        DEFAULT_PRODUCT_IMAGE,
    };
  };

  const mostSelling = getMostSellingProducts().map((p: any) => mapProduct(p));
  const ourProducts = getOurProducts().map((p: any) => mapProduct(p));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />

      {/* Hero */}
      <PageHero
        title={page?.heroTitle || "Product Categories"}
        backgroundImage={page?.heroImage || "/images/hero-warehouse.jpg"}
      />

      {/* Shop by Category */}
      <section id="categories" className="section-pad tint-warm">
        <div className="container-site">
          <div className="text-center">
            <p className="eyebrow mb-3">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Product Categories
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Shop by Category
            </h2>
            <span aria-hidden="true" className="accent-line mx-auto mb-2 mt-4" />
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activeCategories.map((cat) => {
              const img =
                CATEGORY_IMAGES[cat.slug] ?? {
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
                    className="card-lift group block h-full overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-white">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span aria-hidden="true" className="card-bar" />
                    </div>
                    <div className="flex flex-col p-5">
                      <h3 className="text-lg font-semibold text-emerald-800">
                        {cat.name}
                      </h3>
                      <p className="mt-2">
                        <span className="chip-soft">
                          {count}+ Products
                        </span>
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