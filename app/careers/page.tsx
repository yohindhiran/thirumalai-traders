import Link from "next/link";
import { getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata = pageMetadata({
  title: "Careers – Join Thirumalaai Traders",
  description:
    "Interested in joining Thirumalaai Traders? Contact us to explore opportunities with an established wholesale grocery supplier in Erode.",
  path: "/careers",
});

const DEFAULT_PARAS = [
  "Thirumalaai Traders is a growing wholesale grocery business serving institutions, industries and businesses across the region. We do not currently list specific openings here — but if you are interested in working with us, we would like to hear from you.",
  "Reach out to our office to introduce yourself and share your area of interest. Suitable candidates will be contacted when opportunities arise.",
];

export default function CareersPage() {
  // Admin-managed paragraphs (Admin → Company Pages → Careers).
  const page = getPageContent("careers");
  const paras = page?.sections?.length
    ? page.sections
        .filter((s: any) => s.status !== "inactive" && s.body)
        .slice()
        .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
        .map((s: any) => s.body as string)
    : DEFAULT_PARAS;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <PageHero
        title={page?.heroTitle || "Careers"}
        backgroundImage={page?.heroImage || "/images/hero-nuts.jpg"}
      />
      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl text-center">
          {paras.map((p, i) => (
            <p key={i} className="leading-relaxed text-brand-muted [&:not(:first-child)]:mt-4">
              {p}
            </p>
          ))}
          <Link href="/contact" className="btn-primary mt-10">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
