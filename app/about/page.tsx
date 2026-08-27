import Image from "next/image";
import { Compass, Handshake, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import { CORE_VALUES, MISSION, VISION } from "@/data/site";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import Testimonials from "@/components/Testimonials";

export const metadata = pageMetadata({
  title: "About Us – Wholesale Grocery Supplier in Erode",
  description:
    "Learn about Thirumalaai Traders — a trusted wholesale grocery supplier in Erode with over 25 years of experience serving institutions, industries and bulk customers.",
  path: "/about",
});

const APPROACH = [
  {
    icon: ShieldCheck,
    title: "Quality Commitment",
    desc: "We source carefully, check consistently and pack hygienically so every delivery meets the standard your kitchen depends on.",
  },
  {
    icon: Handshake,
    title: "Customer Relationships",
    desc: "We believe wholesale is a partnership business. We invest in understanding each customer's requirements, schedules and volumes.",
  },
  {
    icon: Compass,
    title: "Business Approach",
    desc: "Honest pricing, dependable supply and long-term thinking — the principles that have carried us for over two decades.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Hero */}
      <PageHero title="About Us" backgroundImage="/images/about-warehouse.jpg" />

      {/* Who We Are */}
      <section className="section-pad bg-white">
        <div className="container-site grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink">
              Who We Are
            </h2>
            <span aria-hidden="true" className="mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
            <div className="prose-site">
              <p>
                Thirumalaai Traders is a trusted wholesale grocery supplier based
                in Karungalpalayam, Erode, Tamil Nadu. For over 25 years we have
                been supplying grocery and food products to a wide range of
                customers — school and college canteens, industrial kitchens,
                mills, grocery shops and bulk buyers.
              </p>
              <p>
                Our approach has always been relationship-first. Many of our
                customers have been with us for years because we consistently
                deliver on three things: quality products, competitive wholesale
                pricing and dependable, timely supply.
              </p>
            </div>
          </div>

          <ul className="space-y-5">
            {APPROACH.map((a) => (
              <li key={a.title} className="card flex gap-4 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-green/10 text-brand-green">
                  <a.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-brand-ink">{a.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{a.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vision */}
      <section className="section-pad bg-brand-soft">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              Our Vision
            </p>
            <blockquote className="text-base font-normal not-italic leading-relaxed tracking-normal text-brand-muted sm:text-lg">
              &ldquo;{VISION}&rdquo;
            </blockquote>
            <span aria-hidden="true" className="mt-8 block h-1 w-16 bg-brand-gold" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lift">
            <Image
              src="/images/about-warehouse.jpg"
              alt="Bulk grocery stock inside the Thirumalaai Traders warehouse"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad bg-white">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last aspect-[4/3] overflow-hidden rounded-2xl shadow-lift lg:order-first">
            <Image
              src="/images/hero-spices.jpg"
              alt="Assorted wholesale spices supplied by Thirumalaai Traders"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              Our Mission
            </p>
            <ul className="space-y-4">
              {MISSION.map((m) => (
                <li key={m} className="flex gap-3 leading-relaxed text-brand-muted">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
                  {m}
                </li>
              ))}
            </ul>
            <span aria-hidden="true" className="mt-8 block h-1 w-16 bg-brand-gold" />
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Core Values */}
      <section className="section-pad bg-brand-soft">
        <div className="container-site">
          <h2 className="text-center text-2xl font-bold text-brand-ink sm:text-3xl">
            Core Values
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {CORE_VALUES.map((v) => (
              <li key={v.title} className="card border-t-2 border-t-brand-gold p-6 text-center">
                <h3 className="font-semibold text-brand-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
