import {
  CalendarCheck,
  ClipboardCheck,
  Package,
  Scale,
  Truck,
  Warehouse,
} from "lucide-react";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata = pageMetadata({
  title: "Wholesale Supply – Bulk Grocery Ordering & Delivery",
  description:
    "Bulk ordering, wholesale pricing, scheduled deliveries and institutional supply — learn how Thirumalaai Traders serves large and recurring grocery requirements.",
  path: "/wholesale-supply",
});

const CAPABILITIES = [
  { icon: Package, title: "Bulk Ordering", desc: "Supply capability for large-volume orders across our entire grocery range." },
  { icon: Scale, title: "Wholesale Pricing", desc: "Competitive volume-based pricing for institutions and businesses." },
  { icon: CalendarCheck, title: "Regular Supply", desc: "Recurring supply arrangements so your kitchen is never short of essentials." },
  { icon: Warehouse, title: "Institutional Supply", desc: "Dedicated support for schools, colleges, industrial canteens and mills." },
  { icon: Truck, title: "Scheduled Deliveries", desc: "Delivery schedules planned around your kitchen's requirements." },
  { icon: ClipboardCheck, title: "Quality Checking & Packing", desc: "Products checked and hygienically packed before dispatch — with flexible order quantities from small to bulk." },
];

export default function WholesaleSupplyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Wholesale Supply", path: "/wholesale-supply" },
        ])}
      />
      <PageHero
        title="Wholesale Supply"
        backgroundImage="/images/hero-pulses.jpg"
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <li key={c.title} className="card p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-green text-brand-gold">
                  <c.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-lg font-semibold text-brand-ink">{c.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{c.desc}</p>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-16 max-w-3xl rounded-lg border border-brand-line bg-brand-soft p-8 text-center lg:p-10">
            <h2 className="text-xl font-bold text-brand-ink">How It Works</h2>
            <ol className="mt-6 grid gap-4 text-left sm:grid-cols-3">
              {[
                "Share your requirement through enquiry, call or WhatsApp.",
                "Receive wholesale pricing and supply details from our team.",
                "Get reliable delivery on schedule — order after order.",
              ].map((s, i) => (
                <li key={s} className="rounded-md border border-brand-line bg-white p-5">
                  <span className="text-sm font-bold text-brand-gold-dark">{`Step ${i + 1}`}</span>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
