import Image from "next/image";
import PageHero from "@/components/PageHero";
import { WHY_CHOOSE_US } from "@/data/site";
import { getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Why Choose Us – Thirumalaai Traders Erode",
  description:
    "Discover why leading businesses, institutions, and wholesale buyers choose Thirumalaai Traders for reliable grocery supply in Erode, Tamil Nadu.",
  path: "/why-choose-us",
});

export default function WhyChooseUsPage() {
  const page = getPageContent("why-choose-us");
  const reasons = (
    page?.sections?.length
      ? page.sections
      : WHY_CHOOSE_US.map((w: any) => ({ heading: w.title, body: w.desc }))
  ).map((s: any) => ({ title: s.heading, desc: s.body }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Why Choose Us", path: "/why-choose-us" },
        ])}
      />

      <PageHero
        title={page?.heroTitle || "Why Choose Us"}
        backgroundImage={page?.heroImage || "/images/about-warehouse.jpg"}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink">
              {page?.sectionHeading || "Your Trusted Wholesale Partner"}
            </h2>
            <span aria-hidden="true" className="mx-auto mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
            <p className="text-brand-muted leading-relaxed">
              {page?.sectionSubheading ||
                "We combine decades of market trust, transparent pricing, and dependable delivery to keep your kitchen or business running without interruption."}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {reasons.map((item: any, index: number) => (
              <div
                key={index}
                className="card flex flex-col justify-between p-6 sm:p-8 border-l-4 border-l-brand-gold"
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