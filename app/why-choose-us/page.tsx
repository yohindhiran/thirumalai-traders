import { CheckCircle2 } from "lucide-react";
import { WHY_CHOOSE_US } from "@/data/site";
import { getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import StatsSection from "@/components/StatsSection";

export const metadata = pageMetadata({
  title: "Why Choose Us – Trusted Wholesale Grocery Supplier",
  description:
    "25+ years of experience, 1000+ customers, consistent quality, competitive wholesale prices and timely delivery — why institutions choose Thirumalaai Traders.",
  path: "/why-choose-us",
});

export default function WhyChooseUsPage() {
  const page = getPageContent("why-choose-us");
  const list = (
    page?.sections?.length
      ? page.sections
      : WHY_CHOOSE_US.map((w) => ({ heading: w.title, body: w.desc }))
  ).map((s) => ({ title: s.heading, desc: s.body }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Why Choose Us", path: "/why-choose-us" },
        ])}
      />
      <PageHero
        title="Why Choose Us"
        backgroundImage="/images/hero-oil.jpg"
      />

      <StatsSection />

      <section className="section-pad bg-white">
        <div className="container-site">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((w, i) => (
              <li key={w.title} className="card group p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-green text-brand-gold">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <span aria-hidden="true" className="mt-4 block text-xs font-bold tracking-widest text-brand-line">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-1.5 font-semibold text-brand-ink">{w.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{w.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
