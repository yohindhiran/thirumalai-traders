import Image from "next/image";
import PageHero from "@/components/PageHero";
import { CLIENTS } from "@/data/site";
import { getPageContent, readDb } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Valued Clients – Thirumalaai Traders Erode",
  description:
    "Explore the trusted institutions, canteens, industries, and bulk partners who rely on Thirumalaai Traders for their daily wholesale grocery needs in Erode.",
  path: "/clients",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Default photo + description per client. These are temporary placeholders —
// each client is manageable through Admin → Customers, where the name,
// description and logo/photo can be edited and the photo replaced easily.
// A CMS logo/photo always wins over the default below; CMS entries with no
// photo fall back to the default image for that client.
const CLIENT_META: Record<string, { image: string; contain?: boolean; logo?: string; desc: string }> = {
  Sagar: {
    image: "/images/hero-warehouse.jpg",
    desc: "A valued bulk wholesale partner served with regular grocery supply at competitive wholesale prices. Scheduled deliveries and consistent product quality support their day-to-day requirements without interruption.",
  },
  CMS: {
    image: "/images/cat-grains-pulses.jpg",
    desc: "Supplied with staple grains, pulses and everyday grocery essentials in dependable volumes. Our team plans recurring requirements with them so their operations never run short of stock.",
  },
  "Erode Sengunthar Engineering College": {
    image: "/images/clients/erode-sengunthar.png",
    contain: true,
    logo: "/images/clients/erode-sengunthar.png",
    desc: "An institutional customer served with scheduled wholesale grocery supply for its campus canteen. Rice, dals, oils and spices are delivered on a regular plan suited to student kitchen volumes.",
  },
  "Pallavaa Group": {
    image: "/images/hero-spices.jpg",
    desc: "A bulk buyer relationship built on steady supply and fair wholesale pricing. We handle their recurring grocery indents with careful order preparation and on-time delivery.",
  },
  SPK: {
    image: "/images/cat-rice-lentils.jpg",
    desc: "Supplied with rice, lentils and kitchen staples matched to their consumption pattern. Consistent quality across consignments keeps their kitchen running smoothly through the month.",
  },
  "PSG College": {
    image: "/images/clients/psg-college.png",
    contain: true,
    logo: "/images/clients/psg-college.png",
    desc: "One of the educational institutions we serve with planned canteen supply. Monthly grocery requirements are fulfilled on schedule with dependable quality in every delivery.",
  },
  "Hindusthan College": {
    image: "/images/clients/hindusthan.png",
    contain: true,
    logo: "/images/clients/hindusthan.png",
    desc: "An institutional canteen customer receiving regular bulk grocery supply. We coordinate delivery schedules with their kitchen team to keep stocks steady during working terms.",
  },
  "Best Corporation": {
    image: "/images/hero-oil.jpg",
    desc: "A corporate bulk buyer served with wholesale grocery and cooking essentials in volume. Clear billing and reliable timelines make reordering simple for their purchase team.",
  },
  "SCM Mills": {
    image: "/images/cat-atta-flour-grocery.jpg",
    desc: "A mill customer supported with grocery supply for its workforce kitchens. Flour, staples and provisions are delivered on a recurring plan suited to mill operations.",
  },
  "SKL Mill": {
    image: "/images/hero-pulses.jpg",
    desc: "Supplied with pulses, grains and daily grocery needs for mill canteen requirements. Regular schedules and steady availability help their kitchens serve every shift.",
  },
};

const GENERIC_DESC =
  "A valued bulk wholesale partner served with regular grocery supply, fair wholesale pricing and dependable delivery schedules.";

export default function ClientsPage() {
  const page = getPageContent("clients");
  const db = readDb();

  // CMS-managed customers (Admin → Customers): name, description, logo and
  // photo are all editable there, with display-order support.
  const stored = db.valuedCustomers
    .filter((c: any) => c.status === "active")
    .slice()
    .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const base: Array<{ name: string; cmsDesc?: string; cmsLogo?: string; cmsPhoto?: string }> = stored.length
    ? stored.map((c: any) => ({ name: c.name, cmsDesc: c.description, cmsLogo: c.logo, cmsPhoto: c.photo }))
    : (page?.items?.length
        ? page.items.map((c: any) => ({ name: c.title as string }))
        : [...CLIENTS].map((name) => ({ name })));

  const fallback = Object.values(CLIENT_META);
  const list = base.map((c, index) => {
    const fb = CLIENT_META[c.name] ?? {
      image: fallback[index % fallback.length].image,
      contain: fallback[index % fallback.length].contain,
      desc: GENERIC_DESC,
    };
    const image = c.cmsPhoto || c.cmsLogo || fb.image;
    return {
      name: c.name,
      desc: c.cmsDesc || fb.desc,
      image,
      // CMS-uploaded photos render full-bleed; default logos keep contain.
      contain: !c.cmsPhoto && !c.cmsLogo && fb.contain,
      // Content-side logo mark: CMS logo field wins, else the client's own
      // logo asset. Absent when the client has no logo — no placeholder.
      logo: c.cmsLogo || fb.logo,
    };
  });

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
        <div className="container-site max-w-5xl">
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

          {/* Roadmap timeline — one continuous spine with a node per client.
              Content starts LEFT / photo RIGHT and alternates down the page. */}
          <div className="relative mt-16">
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-brand-gold/60 lg:hidden"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-1/2 top-2 hidden w-0.5 -translate-x-1/2 bg-brand-gold/60 lg:block"
            />
            <ol className="space-y-12 lg:space-y-16">
              {list.map((client, index: number) => (
                <li key={index} className="relative pl-10 lg:pl-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-brand-gold-dark bg-brand-green lg:hidden"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-brand-gold-dark bg-brand-green lg:block"
                  />
                  <div
                    className={`grid items-center gap-6 lg:grid-cols-2 lg:gap-16 ${
                      index % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""
                    }`}
                  >
                    <div>
                      {client.logo && (
                        <Image
                          src={client.logo}
                          alt={`${client.name} logo`}
                          width={160}
                          height={48}
                          className="mb-3 h-10 w-auto object-contain"
                        />
                      )}
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                        Bulk Wholesale Partner
                      </p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-brand-ink">
                        {client.name}
                      </h3>
                      <span aria-hidden="true" className="mb-4 mt-3 block h-1 w-12 bg-brand-gold" />
                      <p className="leading-relaxed text-brand-muted">{client.desc}</p>
                    </div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-brand-soft">
                      <Image
                        src={client.image}
                        alt={client.name}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className={client.contain ? "object-contain p-8" : "object-cover"}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
