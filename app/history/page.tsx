import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our History & Journey – Thirumalaai Traders Erode",
  description:
    "Explore over 25 years of history and growth of Thirumalaai Traders — a trusted wholesale grocery supplier in Erode, Tamil Nadu.",
  path: "/history",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MILESTONES = [
  {
    year: "2000",
    title: "The Beginning",
    desc: "Thirumalaai Traders began its journey with a simple vision — to supply quality grocery products at fair prices and build lasting relationships with our customers.",
    image: "/images/cat-spices.jpg",
    alt: "Traditional whole spices at a grocery shop",
  },
  {
    year: "2003",
    title: "Building Our Network",
    desc: "With growing trust, we expanded our supplier network and product range, serving more grocery shops and local businesses in and around Erode.",
    image: "/images/cat-grains-pulses.jpg",
    alt: "Bulk grains and pulses supplied wholesale",
  },
  {
    year: "2008",
    title: "Growing Stronger",
    desc: "We started supplying to schools, colleges and industrial canteens, becoming a trusted wholesale partner for institutions with consistent quality and service.",
    image: "/images/hero-rice.jpg",
    alt: "Premium raw rice supplied in bulk to institutions",
  },
  {
    year: "2012",
    title: "Expanding Our Range",
    desc: "We expanded our product categories to meet the diverse requirements of our customers, including grains, pulses, spices, masalas, oils and other essential grocery products.",
    image: "/images/hero-spices.jpg",
    alt: "Assorted spices and masalas in the wholesale range",
  },
  {
    year: "2016",
    title: "Modern Infrastructure",
    desc: "We strengthened our storage and handling facilities to support better quality control, efficient processing and reliable, timely delivery.",
    image: "/images/about-warehouse.jpg",
    alt: "Thirumalaai Traders warehouse storage facility",
  },
  {
    year: "2020",
    title: "Serving More Communities",
    desc: "During challenging times, we remained committed to our customers and continued supporting schools, colleges, industries and local businesses with dependable grocery supplies.",
    image: "/images/hero-pulses.jpg",
    alt: "Essential grocery supplies for community kitchens",
  },
  {
    year: "2023",
    title: "Digital Transformation",
    desc: "We enhanced our systems and processes to serve customers better, with improved inventory management, communication and faster order fulfilment.",
    image: "/images/hero-oil.jpg",
    alt: "Cooking oil stocked for faster wholesale order fulfilment",
  },
  {
    year: "2025",
    title: "25+ Years of Trust",
    desc: "Today, we proudly stand with 25+ years of experience, serving communities and institutions across Erode and beyond with quality products, dependable supply and trusted service.",
    image: "/images/hero-nuts.jpg",
    alt: "Premium dry fruits marking 25 plus years of trusted supply",
  },
];

export default function HistoryPage() {
  // Admin may supply a custom hero image (e.g. a delivery-truck photo) and
  // manage timeline milestones via Admin → Company Pages → Our History.
  // Milestone convention: heading = year, subtitle = milestone title,
  // body = description, image = milestone photo. Falls back to the approved
  // copy below when nothing is saved.
  const page = getPageContent("history");
  const FALLBACK_IMAGES = MILESTONES.map((m) => ({ image: m.image, alt: m.alt }));
  const milestones = page?.sections?.length
    ? page.sections
        .filter((s: any) => s.status !== "inactive" && (s.heading || s.body))
        .slice()
        .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
        .map((s: any, i: number) => ({
          year: s.heading || `Milestone ${i + 1}`,
          title: s.subtitle || "",
          desc: s.body || "",
          image: s.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length].image,
          alt: s.subtitle || s.heading || "Company milestone",
        }))
    : MILESTONES;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "History", path: "/history" },
        ])}
      />

      <PageHero
        title="Our History & Journey"
        backgroundImage={page?.heroImage || "/images/hero-warehouse.jpg"}
      />

      {/* Intro */}
      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
            <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
            Our Journey
            <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            25+ Years of Trust, Growth and Togetherness
          </h2>
          <span aria-hidden="true" className="mx-auto mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
          <p className="leading-relaxed text-brand-muted">
            From a small beginning to a trusted wholesale partner, Thirumalaai
            Traders has grown over the past 25+ years with the support of our
            customers, team and community. Our journey is built on quality,
            reliability and a commitment to serve better, every day.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-brand-soft">
        <div className="container-site max-w-5xl">
          <ol className="relative space-y-12 border-l-2 border-brand-gold/60 pl-8 sm:pl-12 lg:space-y-16">
            {milestones.map((m, index) => (
              <li key={m.year} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand-gold-dark bg-brand-green sm:-left-12"
                />
                <div
                  className={`grid items-center gap-6 lg:grid-cols-2 lg:gap-12 ${
                    index % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src={m.image}
                      alt={m.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-brand-green sm:text-4xl">
                      {m.year}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-brand-ink">
                      {m.title}
                    </h3>
                    <span aria-hidden="true" className="mb-4 mt-3 block h-1 w-12 bg-brand-gold" />
                    <p className="leading-relaxed text-brand-muted">{m.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ending */}
      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
            Our Journey Continues
          </h2>
          <span aria-hidden="true" className="mx-auto mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
          <p className="leading-relaxed text-brand-muted">
            With the same values and vision, we look forward to serving many
            more years, growing together with our customers, partners and
            community.
          </p>
        </div>
      </section>
    </>
  );
}
