import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Compass,
  Eye,
  Handshake,
  Heart,
  ShieldCheck,
  Target,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import AboutRoadmap from "@/components/AboutRoadmap";
import { CORE_VALUES, MISSION, VISION } from "@/data/site";
import { getAbout, getActiveTestimonials } from "@/lib/db";
import { getMilestones } from "@/lib/milestones";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import Testimonials from "@/components/Testimonials";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About Us – Wholesale Grocery Supplier in Erode",
  description:
    "Learn about Thirumalaai Traders — a trusted wholesale grocery supplier in Erode with over 25 years of experience serving institutions, industries and bulk customers.",
  path: "/about",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Short, scannable defaults — same facts, fewer words.
const DEFAULT_APPROACH = [
  {
    icon: ShieldCheck,
    title: "Quality Commitment",
    desc: "Careful sourcing, consistent checks and hygienic packing in every delivery.",
  },
  {
    icon: Handshake,
    title: "Customer Relationships",
    desc: "A partnership approach — we learn your volumes, schedules and needs.",
  },
  {
    icon: Compass,
    title: "Business Approach",
    desc: "Honest pricing, dependable supply and long-term thinking for 25+ years.",
  },
];

const DEFAULT_WHO_WE_ARE = [
  "Thirumalaai Traders is a trusted wholesale grocery supplier in Karungalpalayam, Erode — serving canteens, mills, shops and bulk buyers for 25+ years.",
  "Relationship-first and dependable: quality products, fair wholesale pricing and on-time supply.",
];

const APPROACH_ACCENTS = [
  "bg-emerald-600",
  "bg-amber-600",
  "bg-teal-600",
];

const VALUE_ACCENTS = [
  { bar: "border-t-emerald-500", iconBg: "bg-emerald-50", iconText: "text-emerald-700", icon: ShieldCheck },
  { bar: "border-t-amber-500", iconBg: "bg-amber-50", iconText: "text-amber-700", icon: Heart },
  { bar: "border-t-teal-500", iconBg: "bg-teal-50", iconText: "text-teal-700", icon: Award },
  { bar: "border-t-orange-500", iconBg: "bg-orange-50", iconText: "text-orange-700", icon: Handshake },
  { bar: "border-t-sky-500", iconBg: "bg-sky-50", iconText: "text-sky-700", icon: Target },
];

export default function AboutPage() {
  const about = getAbout();
  const vision = about.vision || VISION;
  const mission = about.mission.length ? about.mission : MISSION;
  // Merge saved values with the full default set so the complete
  // Core Values section is always visible (saved list may be partial).
  // Saved entries take precedence; defaults fill any missing values.
  const coreValues = (about.coreValues.length ? about.coreValues : CORE_VALUES)
    .filter((v: any) => v && v.status !== "inactive" && v.title)
    .slice()
    .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  // Admin-managed Who We Are + approach cards (Admin → About); fall back
  // to the approved copy when unsaved.
  const whoWeAre =
    about.whoWeAre?.length
      ? about.whoWeAre
      : DEFAULT_WHO_WE_ARE;
  const approachIcons = [ShieldCheck, Handshake, Compass];
  const approach = about.approaches?.length
    ? about.approaches.map((a: any, i: number) => ({
        icon: approachIcons[i % approachIcons.length],
        title: a.title,
        desc: a.desc,
      }))
    : DEFAULT_APPROACH;

  const milestones = getMilestones();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Hero */}
      <PageHero title="About Us" backgroundImage={about.heroImage || "/images/about-warehouse.jpg"} />

      {/* Who We Are */}
      <section className="section-pad bg-white">
        <div className="container-site grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-700">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Who We Are
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink">
              25+ Years of Wholesale Trust in Erode
            </h2>
            <span aria-hidden="true" className="mb-5 mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400" />
            <div className="prose-site">
              {whoWeAre.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["25+ Years", "Erode, Tamil Nadu", "Institutions & Bulk Buyers"].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-brand-line bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-ink"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <ul className="space-y-4">
            {approach.map((a, i) => (
              <li key={a.title} className="card flex gap-4 p-5 shadow-card">
                <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm", APPROACH_ACCENTS[i % APPROACH_ACCENTS.length])}>
                  <a.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-brand-ink">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-muted">{a.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey — horizontal roadmap */}
      <section className="section-pad bg-gradient-to-b from-emerald-50/70 via-white to-amber-50/60">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-700 shadow-sm ring-1 ring-emerald-100">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Our Journey
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
              From a Small Shop to a Trusted Partner
            </h2>
            <span aria-hidden="true" className="mx-auto mb-4 mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-400" />
            <p className="text-sm leading-relaxed text-brand-muted sm:text-base">
              25+ years of growth with our customers, team and community — built on quality and reliability.
            </p>
          </div>

          <div className="mt-8">
            <AboutRoadmap milestones={milestones} />
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/history"
              className="btn-outline !py-2.5"
            >
              View Our Full History
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-pad bg-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50/60 p-7 sm:p-9">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              Our Vision
            </p>
            <blockquote className="mt-4 text-base font-normal leading-relaxed text-brand-ink sm:text-lg">
              &ldquo;{vision}&rdquo;
            </blockquote>
            <span aria-hidden="true" className="mt-6 block h-1 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lift ring-1 ring-emerald-100">
            <Image
              src={about.visionImage || "/images/about-warehouse.jpg"}
              alt="Bulk grocery stock inside the Thirumalaai Traders warehouse"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad bg-gradient-to-b from-amber-50/70 to-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative order-last aspect-[4/3] overflow-hidden rounded-2xl shadow-lift ring-1 ring-amber-100 lg:order-first">
            <Image
              src={about.missionImage || "/images/hero-spices.jpg"}
              alt="Assorted wholesale spices supplied by Thirumalaai Traders"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-800">
              <Target className="h-3.5 w-3.5" aria-hidden="true" />
              Our Mission
            </p>
            <ul className="mt-5 space-y-3">
              {mission.map((m: any) => (
                <li key={m} className="flex gap-3 rounded-xl border border-brand-line bg-white p-4 leading-relaxed text-brand-ink shadow-card">
                  <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-amber-500 to-orange-500" />
                  <span className="text-sm sm:text-[15px]">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Testimonials
        items={getActiveTestimonials().map((t: any) => ({
          quote: t.quote,
          name: t.name,
          role: t.company,
        }))}
      />

      {/* Core Values */}
      <section className="section-pad bg-brand-soft">
        <div className="container-site">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-emerald-700">
            What Guides Us
          </p>
          <h2 className="mt-2 text-center text-2xl font-bold text-brand-ink sm:text-3xl">
            Core Values
          </h2>
          <span aria-hidden="true" className="mx-auto mb-2 mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400" />
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((v: any, i: number) => {
              const accent = VALUE_ACCENTS[i % VALUE_ACCENTS.length];
              const Icon = accent.icon;
              return (
                <li key={v.title} className={cn("card border-t-4 p-6 text-center shadow-card", accent.bar)}>
                  <span className={cn("mx-auto flex h-11 w-11 items-center justify-center rounded-xl", accent.iconBg, accent.iconText)}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 font-semibold text-brand-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{v.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
