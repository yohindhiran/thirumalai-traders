import { SITE } from "@/data/site";
import { JsonLd, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";

export const metadata = pageMetadata({
  title: "Contact Us – Wholesale Grocery Supplier in Erode",
  description:
    "Contact Thirumalaai Traders in Karungalpalayam, Erode. Call our office or sales team, WhatsApp us, or send a wholesale grocery enquiry online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          ...{
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Contact ${SITE.name}`,
            url: `${SITE.url}/contact`,
          },
        }}
      />
      <PageHero
        title="Contact"
        backgroundImage="/images/hero-warehouse.jpg"
      />
      <ContactSection />
    </>
  );
}
