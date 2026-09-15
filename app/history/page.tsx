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

const DEFAULT_MILESTONES = [
  {
    title: "Founded",
    desc: "Started operations as a small local grocery supplier in Erode.",
  },
  {
    title: "Expansion",
    desc: "Expanded into bulk wholesale supply for school canteens and industrial kitchens.",
  },
  {
    title: "25+ Years of Trust",
    desc: "Became one of Karungalpalayam's leading trusted wholesale grocery partners.",
  },
];

export default function HistoryPage() {
  const page = getPageContent("history");
  const milestones = (
    page?.sections?.length
      ? page.sections
      : DEFAULT_MILESTONES.map((m) => ({ heading: m.title, body: m.desc }))
  ).map((s: any) => ({ title: s.heading, desc: s.body }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "History", path: "/history" },
        ])}
      />

      <PageHero
        title={page?.heroTitle || "Our History & Journey"}
        backgroundImage={page?.heroImage || "/images/about-warehouse.jpg"}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink">
              {page?.sectionHeading || "25+ Years of Reliable Wholesale Supply"}
            </h2>
            <span aria-hidden="true" className="mx-auto mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
            <p className="text-brand-muted leading-relaxed">
              {page?.sectionSubheading ||
                "From our humble beginnings in Erode to becoming a staple partner for major institutions and bulk buyers, here is how we grew."}
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {milestones.map((item: any, index: number) => (
              <div
                key={index}
                className="card relative flex flex-col sm:flex-row gap-6 p-6 sm:p-8 border-l-4 border-l-brand-gold"
              >
                <div>
                  <h3 className="text-xl font-bold text-brand-ink">{item.title}</h3>
                  <p className="mt-3 text-brand-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}