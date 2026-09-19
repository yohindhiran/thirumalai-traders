import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import { INDUSTRIES } from "@/data/site";
import { getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Serve – Thirumalaai Traders Erode",
  description:
    "Discover the diverse industries, commercial kitchens, canteens, and bulk buyers served by Thirumalaai Traders in Erode, Tamil Nadu.",
  path: "/industries-we-serve",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

const INDUSTRY_META: Record<
  string,
  { image: string; alt: string; customerType: string }
> = {
  "School Canteens": {
    image: "/images/cat-rice-lentils.jpg",
    alt: "Rice and lentils for school canteen meals",
    customerType: "School",
  },
  "College Canteens": {
    image: "/images/hero-pulses.jpg",
    alt: "Pulses supplied in bulk to college canteens",
    customerType: "College",
  },
  "Industrial Canteens": {
    image: "/images/hero-warehouse.jpg",
    alt: "Wholesale warehouse supporting industrial canteens",
    customerType: "Industrial Canteen",
  },
  "Mill Canteens": {
    image: "/images/cat-atta-flour-grocery.jpg",
    alt: "Flour and grocery staples for mill canteens",
    customerType: "Mill",
  },
  Factories: {
    image: "/images/about-warehouse.jpg",
    alt: "Bulk grocery storage for factory supply",
    customerType: "Factory",
  },
  "Grocery Shops": {
    image: "/images/cat-spices.jpg",
    alt: "Whole spices for retail grocery shops",
    customerType: "Grocery Shop",
  },
  "Bulk Customers": {
    image: "/images/hero-oil.jpg",
    alt: "Cooking oil supplied in bulk quantities",
    customerType: "Bulk Buyer",
  },
};

const FALLBACK_META = Object.values(INDUSTRY_META);

export default function IndustriesWeServePage() {
  const page = getPageContent("industries-we-serve");
  // Admin-managed sections (Admin → Company Pages → Industries We Serve)
  // support title, description, photo, enable/disable and ordering.
  // Anything without a saved photo falls back to the matching default image.
  const raw = (
    page?.sections?.length
      ? page.sections
          .filter((s: any) => s.status !== "inactive" && (s.heading || s.body))
          .slice()
          .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      : INDUSTRIES.map((i) => ({ heading: i.title, body: i.desc }))
  );
  const industries = raw.map((s: any, index: number) => {
    const known = INDUSTRY_META[s.heading as string];
    const meta = known ?? FALLBACK_META[index % FALLBACK_META.length];
    return {
      title: s.heading,
      desc: s.body,
      image: s.image || meta.image,
      alt: s.heading || meta.alt,
      customerType: known?.customerType || "Other",
    };
  });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries We Serve", path: "/industries-we-serve" },
        ])}
      />

      <PageHero
        title={page?.heroTitle || "Industries We Serve"}
        backgroundImage={page?.heroImage || "/images/about-warehouse.jpg"}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink">
              {page?.sectionHeading || "Tailored Wholesale Supply Across Sectors"}
            </h2>
            <span aria-hidden="true" className="mx-auto mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
            <p className="text-brand-muted leading-relaxed">
              {page?.sectionSubheading ||
                "We cater to a wide range of commercial and institutional kitchens with reliable, volume-based grocery supply."}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((item) => (
              <article
                key={item.title}
                className="card flex flex-col overflow-hidden shadow-card"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-brand-ink">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">
                    {item.desc}
                  </p>
                  <Link
                    href={`/enquiry?customerType=${encodeURIComponent(item.customerType)}`}
                    className="btn-primary mt-5 w-full !py-2.5 !text-sm"
                  >
                    Enquire Now
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-pad bg-brand-green-deep">
        <div className="container-site max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Looking for a Reliable Wholesale Partner?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/85">
            Get in touch with us for your bulk and regular supply needs.
          </p>
          <Link
            href="/enquiry"
            className="btn mt-7 bg-white text-brand-green-deep hover:bg-brand-gold hover:text-brand-green-deep"
          >
            Enquire Now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
