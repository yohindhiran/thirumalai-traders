import Image from "next/image";
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

export default function IndustriesWeServePage() {
  const page = getPageContent("industries-we-serve");
  const industries = (
    page?.sections?.length
      ? page.sections
      : INDUSTRIES.map((i) => ({ heading: i.title, body: i.desc }))
  ).map((s: any) => ({ title: s.heading, desc: s.body }));

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
        <div className="container-site max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink">
              {page?.sectionHeading || "Tailored Wholesale Supply Across Sectors"}
            </h2>
            <span aria-hidden="true" className="mx-auto mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
            <p className="text-brand-muted leading-relaxed">
              {page?.sectionSubheading ||
                "We cater to a wide range of commercial and institutional kitchens with reliable, volume-based grocery supply."}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {industries.map((item: any, index: number) => (
              <div
                key={index}
                className="card flex flex-col justify-between p-6 sm:p-8 border-t-2 border-t-brand-gold"
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