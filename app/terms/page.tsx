import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions for using the ${SITE.name} website.`,
  path: "/terms",
});

const SECTIONS = [
  {
    h: "Use of This Website",
    p: "This website provides information about the wholesale grocery products and services of Thirumalaai Traders. By using this website, you agree to use it lawfully and for its intended purpose — learning about our business and contacting us regarding wholesale requirements.",
  },
  {
    h: "Product Information",
    p: "Product listings on this website indicate availability within our wholesale range. Specific varieties, grades, pack sizes and brands may vary. Please confirm product details with our sales team before placing orders.",
  },
  {
    h: "Enquiries and Orders",
    p: "Submitting an enquiry through this website is not an order confirmation or a contract. All orders, pricing and supply terms are confirmed through direct communication with our team.",
  },
  {
    h: "Pricing",
    p: "Wholesale pricing is provided on request based on product, quantity and delivery location. Prices communicated by our sales team apply at the time of quotation and may change with market conditions.",
  },
  {
    h: "Intellectual Property",
    p: "The content, design and branding on this website belong to Thirumalaai Traders and may not be reproduced without permission.",
  },
  {
    h: "Limitation of Liability",
    p: "While we strive to keep the information on this website accurate and up to date, we make no warranties about completeness or suitability and accept no liability for any reliance placed on such information.",
  },
  {
    h: "Contact",
    p: `For any questions about these terms, contact us at ${SITE.email} or call our office at ${SITE.officePhone}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        backgroundImage="/images/hero-warehouse.jpg"
      />
      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl">
          {SECTIONS.map((s) => (
            <div key={s.h} className="mb-8">
              <h2 className="text-lg font-semibold text-brand-ink">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-brand-muted">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
