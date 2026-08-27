import Link from "next/link";
import { CLIENTS } from "@/data/site";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata = pageMetadata({
  title: "Our Clients – Trusted by 1000+ Customers",
  description:
    "Colleges, mills, corporations and businesses trust Thirumalaai Traders for wholesale grocery supply — see our valued customers.",
  path: "/clients",
});

export default function ClientsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Clients", path: "/clients" },
        ])}
      />
      <PageHero
        title="Clients"
        backgroundImage="/images/hero-nuts.jpg"
      />

      <section className="section-pad bg-brand-soft">
        <div className="container-site">
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {CLIENTS.map((c) => (
              <li key={c} className="card flex min-h-[120px] items-center justify-center p-8 text-center">
                <span className="text-base font-bold uppercase tracking-wide text-brand-ink/80 sm:text-lg">
                  {c}
                </span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-12 max-w-2xl text-center leading-relaxed text-brand-muted">
            Alongside these organisations, more than <strong className="text-brand-ink">1000 customers</strong> —
            including canteens, mills, factories and retail grocery shops — rely on
            Thirumalaai Traders for their bulk grocery requirements.{" "}
            <Link href="/enquiry" className="font-semibold text-brand-green hover:underline">
              Join them today.
            </Link>
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
