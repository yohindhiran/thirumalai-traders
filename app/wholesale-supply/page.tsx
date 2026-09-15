import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { Truck, PackageCheck, Scale, Clock } from "lucide-react";

export const metadata = pageMetadata({
  title: "Wholesale Supply & Capabilities – Thirumalaai Traders Erode",
  description:
    "Learn about our wholesale supply capabilities, bulk packaging, scheduling, and distribution network in Erode, Tamil Nadu.",
  path: "/wholesale-supply",
});

const CAPABILITIES = [
  {
    title: "Bulk Volume Supply",
    desc: "Consistent inventory of grains, pulses, oils, and spices ready for large commercial orders.",
  },
  {
    title: "Scheduled Dispatches",
    desc: "Reliable, on-time deliveries tailored to your kitchen or business operating cycle.",
  },
  {
    title: "Customized Packaging",
    desc: "Flexible wholesale weight options and moisture-resistant packaging for safe storage.",
  },
  {
    title: "Direct Wholesale Pricing",
    desc: "Competitive, transparent pricing structures designed for regular institutional and trade buyers.",
  },
];

const CAP_ICONS = [PackageCheck, Clock, Scale, Truck];

export default function WholesaleSupplyPage() {
  const page = getPageContent("wholesale-supply");
  const capabilities = (
    page?.sections?.length
      ? page.sections
      : CAPABILITIES.map((c) => ({ heading: c.title, body: c.desc }))
  ).map((s: any, i: number) => ({
    title: s.heading,
    desc: s.body,
    icon: CAP_ICONS[i % CAP_ICONS.length],
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Wholesale Supply", path: "/wholesale-supply" },
        ])}
      />

      <PageHero
        title={page?.heroTitle || "Wholesale Supply & Capabilities"}
        backgroundImage={page?.heroImage || "/images/about-warehouse.jpg"}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink">
              {page?.sectionHeading || "Built for Scale & Reliability"}
            </h2>
            <span aria-hidden="true" className="mx-auto mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
            <p className="text-brand-muted leading-relaxed">
              {page?.sectionSubheading ||
                "Discover how our supply chain and distribution network support your daily wholesale requirements seamlessly."}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {capabilities.map((item: any, index: number) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="card flex flex-col justify-between p-6 sm:p-8 border-l-4 border-l-brand-green"
                >
                  <div>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-ink">{item.title}</h3>
                    <p className="mt-3 text-brand-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}