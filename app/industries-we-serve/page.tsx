import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/data/site";
import { getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata = pageMetadata({
  title: "Industries We Serve – Canteen & Institutional Grocery Supply",
  description:
    "Thirumalaai Traders supplies schools, colleges, industrial canteens, mill canteens, factories, grocery shops and bulk customers across Erode and Tamil Nadu.",
  path: "/industries-we-serve",
});

export default function IndustriesPage() {
  const page = getPageContent("industries-we-serve");
  const list = (
    page?.sections?.length
      ? page.sections
      : INDUSTRIES.map((i) => ({ heading: i.title, body: i.desc }))
  ).map((s) => ({ title: s.heading, desc: s.body }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries We Serve", path: "/industries-we-serve" },
        ])}
      />
      <PageHero
        title="Industries We Serve"
        backgroundImage="/images/hero-rice.jpg"
      />

      <section className="section-pad bg-white">
        <div className="container-site space-y-6">
          {list.map((ind, i) => (
            <article
              key={ind.title}
              className={`card grid gap-4 p-8 sm:flex sm:items-center sm:justify-between lg:p-10 ${
                i % 2 === 1 ? "sm:bg-brand-soft" : ""
              }`}
            >
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-brand-ink">{ind.title}</h2>
                <p className="mt-2 leading-relaxed text-brand-muted">{ind.desc}</p>
              </div>
              <Link
                href={`/enquiry?category=${encodeURIComponent(ind.title)}`}
                className="btn-primary shrink-0"
              >
                Request Enquiry
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
