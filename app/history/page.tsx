import PageHero from "@/components/PageHero";
import AboutRoadmap from "@/components/AboutRoadmap";
import { getPageContent } from "@/lib/db";
import { getMilestones } from "@/lib/milestones";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our History & Journey – Thirumalaai Traders Erode",
  description:
    "Explore over 25 years of history and growth of Thirumalaai Traders — a trusted wholesale grocery supplier in Erode, Tamil Nadu.",
  path: "/history",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HistoryPage() {
  // Admin may supply a custom hero image and manage timeline milestones
  // via Admin → Company Pages → Our History (heading = year,
  // subtitle = title, body = description, image = photo). Shared helper
  // keeps About + History in sync with the same approved fallback copy.
  const page = getPageContent("history");
  const milestones = getMilestones();

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
        <div className="container-site max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-700">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Our Journey
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            25+ Years of Trust & Growth
          </h2>
          <span aria-hidden="true" className="mx-auto mb-5 mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-400" />
          <p className="leading-relaxed text-brand-muted">
            From a small beginning to a trusted wholesale partner — our journey
            is built on quality, reliability and serving better every day.
          </p>
        </div>
      </section>

      {/* Timeline — horizontal left-to-right roadmap */}
      <section className="section-pad bg-gradient-to-b from-emerald-50/60 via-white to-amber-50/50">
        <div className="container-site">
          <AboutRoadmap milestones={milestones} />
        </div>
      </section>

      {/* Ending */}
      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
            Our Journey Continues
          </h2>
          <span aria-hidden="true" className="mx-auto mb-5 mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400" />
          <p className="leading-relaxed text-brand-muted">
            With the same values and vision, we look forward to growing together
            with our customers, partners and community.
          </p>
        </div>
      </section>
    </>
  );
}
