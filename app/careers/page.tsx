import Link from "next/link";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata = pageMetadata({
  title: "Careers – Join Thirumalaai Traders",
  description:
    "Interested in joining Thirumalaai Traders? Contact us to explore opportunities with an established wholesale grocery supplier in Erode.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <PageHero
        title="Careers"
        backgroundImage="/images/hero-nuts.jpg"
      />
      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl text-center">
          <p className="leading-relaxed text-brand-muted">
            Thirumalaai Traders is a growing wholesale grocery business serving
            institutions, industries and businesses across the region. We do not
            currently list specific openings here — but if you are interested in
            working with us, we would like to hear from you.
          </p>
          <p className="mt-4 leading-relaxed text-brand-muted">
            Reach out to our office to introduce yourself and share your area of
            interest. Suitable candidates will be contacted when opportunities arise.
          </p>
          <Link href="/contact" className="btn-primary mt-10">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
