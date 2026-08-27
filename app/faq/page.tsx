import { FAQS } from "@/data/site";
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata = pageMetadata({
  title: "FAQ – Wholesale Grocery Supply Questions",
  description:
    "Answers to common questions about bulk supply, institutional canteens, wholesale pricing, deliveries and contacting the Thirumalaai Traders sales team.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqSchema(FAQS.map((f) => ({ q: f.q, a: f.a }))),
        ]}
      />
      <PageHero
        title="FAQ"
        backgroundImage="/images/cat-masala.jpg"
      />
      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <details key={f.q} className="card group px-6 py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl text-brand-green transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-brand-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CTABanner title="Still Have a Question?" subtitle="Call or WhatsApp our sales team — we respond quickly." />
    </>
  );
}
