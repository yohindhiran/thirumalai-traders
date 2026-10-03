import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import HomeKgPackages, { type HomeKgPackageSize } from "@/components/HomeKgPackages";
import HomeTopSelling, { type HomeTopSellingItem } from "@/components/HomeTopSelling";
import CategoryGrid from "@/components/CategoryGrid";
import ValuedCustomers, { type ValuedCustomerItem } from "@/components/ValuedCustomers";
import { getKgPackageSizesForPublic, getKgPackagesSection, getMostSellingProducts, readDb } from "@/lib/db";
import { CATEGORY_IMAGES, DEFAULT_PRODUCT_IMAGE } from "@/lib/catalog";
import type { Product } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  const db = readDb();
  const content = db.content;

  const catById = new Map(db.categories.map((c) => [c.id, c]));
  const imageOf = (p: Product) =>
    p.images?.[0] ||
    p.mainImage ||
    CATEGORY_IMAGES[catById.get(p.categoryId)?.slug ?? "spices"]?.src ||
    DEFAULT_PRODUCT_IMAGE;

  const kgSection = getKgPackagesSection();

  const kgSizes: HomeKgPackageSize[] = getKgPackageSizesForPublic().map(
    ({ size, items }) => ({
      id: size.id,
      name: size.name,
      items: items.map(({ ref, product, displayName }) => ({
        name: displayName,
        slug: product.slug,
        categoryName: catById.get(product.categoryId)?.name ?? "Wholesale Grocery",
        categorySlug: catById.get(product.categoryId)?.slug ?? "spices",
        description: product.shortDescription || product.description,
        image: ref.customImage?.trim() || imageOf(product),
      })),
    })
  );

  const topSelling: HomeTopSellingItem[] = getMostSellingProducts()
    .filter((p) => p.status === "active")
    .slice(0, 8)
    .map((p) => ({
      name: p.name,
      slug: p.slug,
      categoryName: catById.get(p.categoryId)?.name ?? "Wholesale Grocery",
      categorySlug: catById.get(p.categoryId)?.slug ?? "spices",
      description: p.shortDescription || p.description,
      image: imageOf(p),
    }));

  const customers: ValuedCustomerItem[] | undefined = db.valuedCustomers.length
    ? db.valuedCustomers
        .filter((c) => c.status === "active")
        .map((c) => ({ name: c.name, logo: c.logo }))
    : undefined;

  const heroSlides = db.heroSlides
    .filter((s) => s.status === "active")
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((s) => ({ src: s.image, alt: s.title || "Wholesale grocery highlight" }));

  return (
    <>
      {/* Hero: clean image-focused slider, no text panel */}
      <HeroSlider slides={heroSlides.length ? heroSlides : undefined} />

      {/* KG Packages — Our Products (directly below Hero) */}
      <HomeKgPackages
        sizes={kgSizes}
        title={kgSection.title}
        description={kgSection.description}
      />

      {/* Bestsellers — Top selling section */}
      <HomeTopSelling items={topSelling} />

      {/* Product Categories */}
      <CategoryGrid />

      {/* About section */}
      <section className="section-pad bg-brand-green-deep">
        <div className="container-site grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={content.homeAboutImage || "/images/about-warehouse.jpg"}
              alt="Thirumalaai Traders warehouse and operations"
              width={720}
              height={400}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-64 w-full object-cover sm:h-80 lg:h-[320px]"
            />
          </div>
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold" />
              About Us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.homeAboutHeading || "A Trusted Name in Wholesale Grocery"}
            </h2>
            <p className="mt-5 leading-relaxed text-white/85">
              {content.aboutPreview}
            </p>
            <Link
              href={content.homeAboutButtonLink || "/about"}
              className="btn mt-7 bg-white text-brand-green-deep hover:bg-brand-gold hover:text-brand-green-deep"
            >
              {content.homeAboutButtonText || "Know More About Us"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Valued Customers (restored) */}
      <ValuedCustomers customers={customers} />
    </>
  );
}
