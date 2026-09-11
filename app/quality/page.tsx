import {
  BadgeCheck,
  ClipboardCheck,
  Handshake,
  Headset,
  PackageCheck,
  SearchCheck,
  Timer,
  Truck,
} from "lucide-react";
import { getPageContent } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata = pageMetadata({
  title: "Quality & Service – Our Wholesale Commitment",
  description:
    "Careful supplier selection, quality checking, hygienic packing and dependable delivery — how Thirumalaai Traders maintains quality and service in wholesale supply.",
  path: "/quality",
});

const PILLARS = [
  { icon: BadgeCheck, title: "Product Quality", desc: "We supply products that meet the consistent standard institutional kitchens depend on, order after order." },
  { icon: SearchCheck, title: "Supplier Selection", desc: "We choose our sources carefully, working with established suppliers for reliable raw materials and brands." },
  { icon: ClipboardCheck, title: "Quality Checking", desc: "Products are checked before they reach you — because a rejected consignment costs your kitchen time." },
  { icon: PackageCheck, title: "Hygienic Packing", desc: "Goods are packed cleanly and securely to preserve quality through storage, transport and handling." },
  { icon: Timer, title: "Reliable Supply", desc: "Consistent availability across our range means fewer substitutions and fewer shortfalls." },
  { icon: Truck, title: "Timely Delivery", desc: "Delivery schedules built around your kitchen's planning — not the other way around." },
  { icon: Headset, title: "Customer Support", desc: "A dedicated sales team that answers quickly and follows through on every requirement." },
  { icon: Handshake, title: "Consistency", desc: "The same quality, pricing discipline and service — whether your order is small or in tonnes." },
];

export default function QualityPage() {
  const page = getPageContent("quality");
  const PILLAR_ICONS = [
    BadgeCheck,
    SearchCheck,
    ClipboardCheck,
    PackageCheck,
    Timer,
    Truck,
    Headset,
    Handshake,
  ];
  const list = (
    page?.sections?.length
      ? page.sections
      : PILLARS.map((p) => ({ heading: p.title, body: p.desc }))
  ).map((s, i) => ({
    title: s.heading,
    desc: s.body,
    icon: PILLAR_ICONS[i % PILLAR_ICONS.length],
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Quality & Service", path: "/quality" },
        ])}
      />
      <PageHero
        title="Quality"
        backgroundImage="/images/about-warehouse.jpg"
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => (
              <li key={p.title} className="card p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-green/10 text-brand-green">
                  <p.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-semibold text-brand-ink">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
