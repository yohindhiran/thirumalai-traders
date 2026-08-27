import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/db";
import { JsonLd, organizationSchema, pageMetadata } from "@/lib/seo";
import HeroSlider from "@/components/HeroSlider";
import TrustStrip from "@/components/TrustStrip";
import ProductShowcase from "@/components/ProductShowcase";
import CategoryGrid from "@/components/CategoryGrid";
import ValuedCustomers from "@/components/ValuedCustomers";

export const metadata = pageMetadata({
  title: "Thirumalaai Traders | Wholesale Grocery Supplier in Erode",
  description:
    "Thirumalaai Traders is a trusted wholesale grocery supplier in Erode with 25+ years of experience serving schools, colleges, industries, mills, grocery shops and bulk customers.",
  path: "/",
});

export default function HomePage() {
  const content = getContent();

  return (
    <>
      <JsonLd data={organizationSchema()} />

      {/* 2. HERO IMAGE SLIDER */}
      <HeroSlider />

      {/* 3. TRUST / STATISTICS STRIP */}
      <TrustStrip />

      {/* 4. ABOUT SECTION */}
      <section className="section-pad bg-brand-soft">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-72 overflow-hidden rounded-lg shadow-card sm:h-96 lg:h-[480px]">
            <Image
              src="/images/about-warehouse.jpg"
              alt="Wholesale grocery warehouse with stocked shelves of bulk food products"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              About Thirumalaai Traders
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              A Trusted Name in Wholesale Grocery Since Over Two Decades
            </h2>
            <span aria-hidden="true" className="mb-6 mt-5 block h-1 w-14 bg-brand-gold" />
            <p className="leading-relaxed text-brand-muted">{content.aboutPreview}</p>
            <Link href="/about" className="btn-primary mt-8">
              Know More About Us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT SHOWCASE */}
      <ProductShowcase />

      {/* 6. PRODUCT CATEGORIES */}
      <CategoryGrid />

      {/* 7. VALUED CUSTOMERS */}
      <ValuedCustomers />
    </>
  );
}
