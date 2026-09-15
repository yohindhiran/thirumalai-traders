import Image from "next/image";
import PageHero from "@/components/PageHero";
import { CLIENTS } from "@/data/site";
import { getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Valued Clients – Thirumalaai Traders Erode",
  description:
    "Explore the trusted institutions, canteens, industries, and bulk partners who rely on Thirumalaai Traders for their daily wholesale grocery needs in Erode.",
  path: "/clients",
});

export default function ClientsPage() {
  const page = getPageContent("clients");
  const list = page?.items?.length ? page.items.map((c: any) => c.title) : CLIENTS;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Clients", path: "/clients" },
        ])}
      />

      <PageHero
        title={page?.heroTitle || "Our Valued Clients"}
        backgroundImage={page?.heroImage || "/images/hero-warehouse.jpg"}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink">
              {page?.sectionHeading || "Trusted by Leading Institutions & Businesses"}
            </h2>
            <span aria-hidden="true" className="mx-auto mb-6 mt-4 block h-1 w-14 bg-brand-gold" />
            <p className="text-brand-muted">
              {page?.sectionSubheading ||
                "For over two decades, we have built lasting relationships by consistently supplying quality wholesale goods on schedule."}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((clientName: string, index: number) => (
              <div
                key={index}
                className="card flex items-center gap-4 p-6 border-l-4 border-l-brand-green"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft font-bold text-brand-green">
                  {clientName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-brand-ink">{clientName}</h3>
                  <p className="text-xs text-brand-muted">Bulk Wholesale Partner</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}