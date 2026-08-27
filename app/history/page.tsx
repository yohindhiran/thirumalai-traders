import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata = pageMetadata({
  title: "Our History – 25+ Years in Wholesale Grocery",
  description:
    "The journey of Thirumalaai Traders — over 25 years of wholesale grocery supply, institutional partnerships and steady growth from Erode, Tamil Nadu.",
  path: "/history",
});

const MILESTONES = [
  {
    title: "Establishment",
    desc: "Thirumalaai Traders began operations at Karungalpalayam, Erode — supplying quality grocery products to local businesses at honest wholesale prices.",
  },
  {
    title: "Business Growth",
    desc: "Consistent product quality and reliable service earned word-of-mouth referrals, steadily growing the customer base across the region.",
  },
  {
    title: "Institutional Supply",
    desc: "The company became a specialised supplier to school and college canteens, industrial canteens and mills — building expertise in institutional kitchen requirements.",
  },
  {
    title: "Expansion of Range & Reach",
    desc: "Product range expanded to cover the full spectrum — spices, grains, pulses, rice, masalas, dry fruits, oils, flours and everyday grocery essentials.",
  },
  {
    title: "Long-Term Customer Relationships",
    desc: "Many customers stayed with us for years and decades. Today we proudly serve more than 1000 customers across institutions, industries and retail.",
  },
  {
    title: "Present Capabilities",
    desc: "Today Thirumalaai Traders combines bulk supply capability, flexible order quantities, hygienic packing and dependable delivery schedules.",
  },
  {
    title: "Future Growth",
    desc: "We continue to expand our product availability and supply capabilities, staying committed to the values that built this business.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "History", path: "/history" },
        ])}
      />
      <PageHero
        title="History"
        backgroundImage="/images/hero-spices.jpg"
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <ol className="relative mx-auto max-w-3xl space-y-12 border-l-2 border-brand-green/20 pl-8 sm:pl-10">
            {MILESTONES.map((m, i) => (
              <li key={m.title} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[45px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold sm:-left-[57px] ${
                    i === 0 || i === MILESTONES.length - 1
                      ? "border-brand-gold-dark bg-brand-gold text-brand-green-deep"
                      : "border-brand-green bg-white text-brand-green"
                  }`}
                >
                  {i + 1}
                </span>
                <h2 className="text-xl font-semibold text-brand-ink">{m.title}</h2>
                <p className="mt-2 leading-relaxed text-brand-muted">{m.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTABanner title="Join Our Next Chapter of Growth" />
    </>
  );
}
