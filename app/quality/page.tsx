import Image from "next/image";
import Link from "next/link";
import { CATEGORY_SEEDS } from "@/data/categories";
import { getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Quality Assurance & Standards – Thirumalaai Traders Erode",
  description:
    "Learn about our strict quality assurance, grading, and wholesale standards for pulses, grains, oils, and spices in Erode, Tamil Nadu.",
  path: "/quality",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PROCESS_STEPS = [
  {
    no: "01",
    title: "Careful Sourcing",
    desc: "Products are sourced from reliable suppliers based on quality and consistency.",
  },
  {
    no: "02",
    title: "Product Selection",
    desc: "Products are checked for overall condition, freshness and suitability before supply.",
  },
  {
    no: "03",
    title: "Storage & Handling",
    desc: "Products are handled and stored appropriately to help maintain quality.",
  },
  {
    no: "04",
    title: "Order Preparation",
    desc: "Bulk orders are prepared carefully according to customer requirements.",
  },
  {
    no: "05",
    title: "Final Quality Check",
    desc: "Orders are reviewed before dispatch.",
  },
  {
    no: "06",
    title: "Reliable Delivery",
    desc: "Products are supplied to customers in a timely and organized manner.",
  },
];

const COMMITMENTS = [
  {
    title: "Freshness",
    desc: "Stock is rotated sensibly so customers receive products in good, fresh condition.",
  },
  {
    title: "Consistent Quality",
    desc: "The same dependable standard, order after order, across all categories.",
  },
  {
    title: "Hygienic Handling",
    desc: "Clean storage and careful handling from our floor to your kitchen.",
  },
  {
    title: "Reliable Sourcing",
    desc: "Long-standing relationships with suppliers we know and trust.",
  },
  {
    title: "Careful Packaging",
    desc: "Packed to protect quality during storage and transport.",
  },
  {
    title: "Timely Supply",
    desc: "Deliveries planned around your schedule, month after month.",
  },
];

const CATEGORY_IMAGES: Record<string, string> = {
  spices: "/images/cat-spices.jpg",
  "grains-pulses": "/images/cat-grains-pulses.jpg",
  "rice-lentils": "/images/cat-rice-lentils.jpg",
  masala: "/images/cat-masala.jpg",
  "dry-fruits-nuts": "/images/cat-dry-fruits-nuts.jpg",
  oils: "/images/cat-oils.jpg",
  "atta-flour-grocery": "/images/cat-atta-flour-grocery.jpg",
};

const BULK_POINTS = [
  "Consistency across larger quantities — every bag held to the same standard.",
  "Careful order preparation matched to each customer's requirement.",
  "Steady product availability for planned monthly and weekly indents.",
  "Proper handling through storage, packing and loading.",
  "Reliable supply for recurring requirements of schools, colleges, industrial canteens, grocery shops and bulk buyers.",
];

export default function QualityPage() {
  const page = getPageContent("quality");

  // Admin-managed content (Admin → Company Pages → Quality):
  // sections[] become the numbered process steps (heading = step title,
  // body = description, image = step photo), items[] become the commitment
  // cards. Everything falls back to the approved copy below when unsaved.
  const FALLBACK_STEP_IMAGES = [
    "/images/cat-spices.jpg",
    "/images/hero-spices.jpg",
    "/images/about-warehouse.jpg",
    "/images/hero-warehouse.jpg",
    "/images/hero-rice.jpg",
    "/images/hero-oil.jpg",
  ];
  const steps: Array<{ no: string; title: string; desc: string; image?: string }> = page?.sections?.length
    ? page.sections
        .filter((s: any) => s.status !== "inactive" && (s.heading || s.body))
        .slice()
        .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
        .map((s: any, i: number) => ({
          no: String(i + 1).padStart(2, "0"),
          title: s.heading || `Step ${i + 1}`,
          desc: s.body || "",
          image: s.image || "",
        }))
    : PROCESS_STEPS;
  const commitments = page?.items?.length
    ? page.items
        .filter((s: any) => s.title)
        .map((s: any) => ({ title: s.title, desc: s.body || "" }))
    : COMMITMENTS;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Quality", path: "/quality" },
        ])}
      />

      {/* Hero — same look and height as the shared PageHero, plus a subtitle */}
      <section className="relative flex h-[240px] items-center justify-center overflow-hidden sm:h-[280px] lg:h-[320px]">
        <Image
          src={page?.heroImage || "/images/about-warehouse.jpg"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-brand-green-deep/60" />
        <div className="container-site relative flex flex-col items-center py-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Quality Assurance
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Fresh products, careful handling and dependable wholesale supply you can plan around.
          </p>
          <span aria-hidden="true" className="mt-3 block h-1 w-14 bg-brand-gold" />
        </div>
      </section>

      {/* Introduction */}
      <section className="section-pad bg-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              Our Approach to Quality
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Quality, From Sourcing to Delivery
            </h2>
            <div className="prose-site mt-5">
              <p>
                At Thirumalaai Traders, quality is maintained at every stage —
                from sourcing to delivery. Our products are selected from
                reliable sources we have worked with for years, and freshness
                and product condition are considered before anything is
                supplied.
              </p>
              <p>
                Bulk orders are handled with the same consistent care as small
                ones. We supply schools, colleges, industrial canteens,
                grocery shops and other bulk buyers with a single focus:
                dependable quality and consistent supply, every time.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src="/images/hero-warehouse.jpg"
              alt="Wholesale grocery stock stored at Thirumalaai Traders"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quality process */}
      <section className="section-pad bg-brand-soft">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              How We Work
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Our Quality Process
            </h2>
            <span aria-hidden="true" className="mx-auto mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <li
                key={s.no}
                className="card overflow-hidden border-t-2 border-t-brand-gold"
              >
                {s.image ? (
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6 sm:p-8">
                  <span aria-hidden="true" className="text-3xl font-bold tracking-tight text-brand-gold-dark">
                    {s.no}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-brand-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quality commitments */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Our Quality Commitments
            </h2>
            <span aria-hidden="true" className="mx-auto mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c) => (
              <div key={c.title} className="card border-t-2 border-t-brand-gold p-6">
                <h3 className="font-semibold text-brand-ink">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product quality across categories */}
      <section className="section-pad bg-brand-soft">
        <div className="container-site grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              Across Our Range
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Quality in Every Category
            </h2>
            <p className="mt-5 leading-relaxed text-brand-muted">
              Quality and suitability are considered across every product
              category we supply to wholesale and institutional customers —
              from daily staples to specialty items.
            </p>
          </div>
          <ul className="space-y-4">
            {CATEGORY_SEEDS.map((c) => (
              <li key={c.slug} className="card flex items-center gap-4 p-4">
                <span className="relative block h-16 w-20 shrink-0 overflow-hidden rounded-sm">
                  <Image
                    src={CATEGORY_IMAGES[c.slug]}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <Link
                    href={`/products/${c.slug}`}
                    className="font-semibold text-brand-ink transition-colors hover:text-brand-green"
                  >
                    {c.name}
                  </Link>
                  <span className="mt-1 block text-sm leading-relaxed text-brand-muted">
                    {c.description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bulk order quality */}
      <section className="section-pad bg-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last aspect-[4/3] overflow-hidden rounded-md lg:order-first">
            <Image
              src="/images/hero-rice.jpg"
              alt="Bulk rice prepared for large institutional orders"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              Bulk Requirements
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Quality That Scales With Your Order
            </h2>
            <ul className="mt-6 space-y-3.5">
              {BULK_POINTS.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-brand-muted sm:text-base">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="section-pad bg-brand-green-deep">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src="/images/hero-spices.jpg"
              alt="Wholesale spices supplied with dependable quality"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Quality You Can Rely On
            </h2>
            <span aria-hidden="true" className="mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
            <p className="leading-relaxed text-white/85">
              Long-term customer relationships are built on dependable
              products, consistent service and timely supply. That is how
              Thirumalaai Traders has served institutions and businesses for
              over 25 years — and how we intend to serve for many more.
            </p>
            <Link
              href="/enquiry"
              className="btn mt-7 bg-white text-brand-green-deep hover:bg-brand-gold hover:text-brand-green-deep"
            >
              Request an Enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
