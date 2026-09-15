import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { ShieldCheck, Award, CheckCircle2, Leaf } from "lucide-react";

export const metadata = pageMetadata({
  title: "Quality Assurance & Standards – Thirumalaai Traders Erode",
  description:
    "Learn about our strict quality assurance, grading, and wholesale standards for pulses, grains, oils, and spices in Erode, Tamil Nadu.",
  path: "/quality",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PILLARS = [
  {
    title: "Rigorous Sourcing",
    desc: "We handpick grains, pulses, and spices directly from trusted growers and mills.",
  },
  {
    title: "Hygienic Processing",
    desc: "All products undergo multi-stage cleaning, grading, and moisture control.",
  },
  {
    title: "Consistent Grading",
    desc: "Standardized size, purity, and quality across every wholesale batch we dispatch.",
  },
  {
    title: "Safe Bulk Packaging",
    desc: "Packed to preserve freshness, aroma, and shelf-life during commercial storage and transport.",
  },
];

const PILLAR_ICONS = [ShieldCheck, Award, CheckCircle2, Leaf];

export default function QualityPage() {
  const page = getPageContent("quality");
  const pillars = (
    page?.sections?.length
      ? page.sections
      : PILLARS.map((p) => ({ heading: p.title, body: p.desc }))
  ).map((s: any, i: number) => ({
    title: s.heading,
    desc: s.body,
    icon: PILLAR_ICONS[i % PILLAR_ICONS.length],
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Quality", path: "/quality" },
        ])}
      />

      <PageHero
        title={page?.heroTitle || "Quality Assurance & Standards"}
        backgroundImage={page?.heroImage || "/images/about-warehouse.jpg"}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink">
              {page?.sectionHeading || "Uncompromising Quality in Every Batch"}
            </h2>
            <span aria-hidden="true" className="mx-auto mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
            <p className="text-brand-muted leading-relaxed">
              {page?.sectionSubheading ||
                "We adhere to strict sorting, grading, and storage protocols to ensure every grain, pulse, and spice meets high commercial standards."}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pillars.map((item: any, index: number) => {
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