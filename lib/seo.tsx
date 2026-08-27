import type { Metadata } from "next";
import { SITE } from "@/data/site";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = opts.path ? `${SITE.url}${opts.path}` : SITE.url;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}

const ORG_ID = `${SITE.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    "@id": ORG_ID,
    name: SITE.name,
    slogan: SITE.tagline,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    telephone: "+919384482007",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Varakappar Street, Janakiammal Layout, Karungalpalayam",
      addressLocality: "Erode",
      addressRegion: "Tamil Nadu",
      postalCode: "638003",
      addressCountry: "IN",
    },
    areaServed: ["Erode", "Tamil Nadu", "India"],
    knowsAbout: [
      "wholesale grocery supplier in Erode",
      "bulk grocery supplier Tamil Nadu",
      "canteen grocery supplier",
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export function faqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
