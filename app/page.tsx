import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone, ShieldCheck, Truck } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductCarousel, { type CarouselProduct } from "@/components/ProductCarousel";
import HomeTopSelling, { type HomeTopSellingItem } from "@/components/HomeTopSelling";
import TrustStrip from "@/components/TrustStrip";
import CategoryGrid from "@/components/CategoryGrid";
import Testimonials, { type TestimonialItem } from "@/components/Testimonials";
import ValuedCustomers, { type ValuedCustomerItem } from "@/components/ValuedCustomers";
import ContactSection from "@/components/ContactSection";
import { getMostSellingProducts, readDb } from "@/lib/db";
import { CATEGORY_IMAGES, DEFAULT_PRODUCT_IMAGE } from "@/lib/catalog";
import type { Product } from "@/types";
import { telHref, whatsappHref } from "@/lib/utils";

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

  const carouselProducts: CarouselProduct[] = db.products
    .filter((p) => p.status === "active")
    .slice(0, 12)
    .map((p) => ({
      name: p.name,
      slug: p.slug,
      categoryName: catById.get(p.categoryId)?.name,
      categorySlug: catById.get(p.categoryId)?.slug,
      subcategory: p.subcategory,
      image: imageOf(p),
    }));

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

  const testimonials: TestimonialItem[] | undefined = db.testimonials.length
    ? db.testimonials
        .filter((t) => t.status === "active")
        .map((t) => ({
          quote: t.quote,
          name: t.name,
          role: t.company,
          image: t.image,
        }))
    : undefined;

  const customers: ValuedCustomerItem[] | undefined = db.valuedCustomers.length
    ? db.valuedCustomers
        .filter((c) => c.status === "active")
        .map((c) => ({ name: c.name, logo: c.logo }))
    : undefined;

  const highlights = content.highlights ?? [];

  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-green-deep">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-warehouse.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green-deep via-brand-green-deep/85 to-brand-green/60" />
        </div>

        <div className="container-site relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-gold">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              25+ Years of Trusted Wholesale Supply
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {content.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              {content.heroSubtext}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="btn-gold !px-6 !py-3.5 !text-sm"
              >
                Browse Products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !px-6 !py-3.5 !text-sm"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp Enquiry
              </a>
              <a
                href={telHref(content.officePhone || "9384482007")}
                className="btn-outline !border-white/40 !bg-transparent !px-6 !py-3.5 !text-sm !text-white hover:!border-white hover:!text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {content.officePhone || "93844 82007"}
              </a>
            </div>

            {highlights.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                {highlights.slice(0, 4).map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-xs font-medium text-white/75"
                  >
                    <Truck className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Scrollable product carousel */}
      <ProductCarousel products={carouselProducts} />

      {/* Top selling section */}
      <HomeTopSelling items={topSelling} />

      {/* Shop by category */}
      <CategoryGrid />

      {/* About preview */}
      <section className="section-pad bg-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={content.homeAboutImage || "/images/about-warehouse.jpg"}
              alt="Thirumalaai Traders warehouse and operations"
              width={720}
              height={480}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              About Us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              {content.homeAboutHeading || "A Trusted Name in Wholesale Grocery"}
            </h2>
            <p className="mt-5 leading-relaxed text-brand-muted">
              {content.aboutPreview}
            </p>
            <Link
              href={content.homeAboutButtonLink || "/about"}
              className="btn-primary mt-7"
            >
              {content.homeAboutButtonText || "Know More About Us"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} />

      <ValuedCustomers customers={customers} />

      <ContactSection withForm={false} />
    </>
  );
}