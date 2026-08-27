import { Suspense } from "react";
import { SITE } from "@/data/site";
import { telHref } from "@/lib/utils";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata = pageMetadata({
  title: "Request Wholesale Enquiry – Bulk Grocery Pricing",
  description:
    "Request wholesale pricing for bulk grocery supply. Share your requirement and the Thirumalaai Traders sales team will contact you with details.",
  path: "/enquiry",
});

export default function EnquiryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Wholesale Enquiry", path: "/enquiry" },
        ])}
      />
      <PageHero
        title="Enquiry"
        backgroundImage="/images/cat-oils.jpg"
      />
      <section className="section-pad bg-brand-soft">
        <div className="container-site grid items-start gap-10 lg:grid-cols-[1fr_320px]">
          <Suspense fallback={<div className="card mx-auto max-w-xl p-10 text-center text-sm text-brand-muted">Loading form…</div>}>
            <div className="w-full">
              <EnquiryForm />
            </div>
          </Suspense>
          <aside className="card p-7 lg:sticky lg:top-32">
            <h2 className="font-semibold text-brand-ink">Prefer to talk?</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              Call our office or message us on WhatsApp — we are happy to discuss your
              requirement directly.
            </p>
            <a href={telHref(SITE.officePhone)} className="btn-primary mt-5 w-full !text-sm">
              Call Office: {SITE.officePhone}
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-3 w-full !text-sm"
            >
              WhatsApp Us
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
