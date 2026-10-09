import { FAQS } from "@/data/site";
import { getActiveFaqs, getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata = pageMetadata({
  title: "FAQ – Wholesale Grocery Supply Questions",
  description:
    "Answers to common questions about bulk supply, institutional canteens, wholesale pricing, deliveries and contacting the Thirumalaai Traders sales team.",
  path: "/faq",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function FaqPage() {
  const faqs = getActiveFaqs();
  const faqList = faqs.length
    ? faqs.map((f) => ({ q: f.question, a: f.answer }))
    : FAQS.map((f) => ({ q: f.q, a: f.a }));
  // Admin-managed hero (Admin → Company Pages → FAQ).
  const page = getPageContent("faq");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqSchema(faqList),
        ]}
      />
      <PageHero
        title={page?.heroTitle || "FAQ"}
        backgroundImage={page?.heroImage || "/images/cat-masala.jpg"}
      />
      <section className="section-pad tint-warm">
        <div className="container-site max-w-4xl">
          <div className="space-y-4">
            {faqList.map((f, i) => (
              <details key={f.q} className="card-lift group px-6 py-5 open:border-emerald-200 open:bg-gradient-to-br open:from-white open:to-brand-mist/50" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xl leading-none text-amber-700 ring-1 ring-amber-200 transition-transform group-open:rotate-45 group-open:bg-emerald-600 group-open:text-white group-open:ring-emerald-600"
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
    </>
  );
}
