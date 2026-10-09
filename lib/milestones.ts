import { getPageContent } from "@/lib/db";

export interface Milestone {
  year: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

/**
 * Canonical company-history milestones. Same approved copy as the
 * History page fallback — no invented dates. When the admin manages
 * timeline entries via Admin → Company Pages → Our History, those
 * entries take precedence (heading = year, subtitle = title,
 * body = description, image = photo).
 */
export const DEFAULT_MILESTONES: Milestone[] = [
  {
    year: "2000",
    title: "The Beginning",
    desc: "Thirumalaai Traders began with a simple vision — quality groceries at fair prices and lasting customer relationships.",
    image: "/images/cat-spices.jpg",
    alt: "Traditional whole spices at a grocery shop",
  },
  {
    year: "2003",
    title: "Building Our Network",
    desc: "Growing trust helped us expand suppliers and range, serving more shops and businesses around Erode.",
    image: "/images/cat-grains-pulses.jpg",
    alt: "Bulk grains and pulses supplied wholesale",
  },
  {
    year: "2008",
    title: "Growing Stronger",
    desc: "We became a trusted partner for schools, colleges and industrial canteens with consistent quality.",
    image: "/images/hero-rice.jpg",
    alt: "Premium raw rice supplied in bulk to institutions",
  },
  {
    year: "2012",
    title: "Expanding Our Range",
    desc: "We added grains, pulses, spices, masalas, oils and essentials to meet diverse customer needs.",
    image: "/images/hero-spices.jpg",
    alt: "Assorted spices and masalas in the wholesale range",
  },
  {
    year: "2016",
    title: "Modern Infrastructure",
    desc: "Stronger storage and handling improved quality control and reliable, timely delivery.",
    image: "/images/about-warehouse.jpg",
    alt: "Thirumalaai Traders warehouse storage facility",
  },
  {
    year: "2020",
    title: "Serving More Communities",
    desc: "Through challenging times, we kept supporting institutions and local businesses with dependable supply.",
    image: "/images/hero-pulses.jpg",
    alt: "Essential grocery supplies for community kitchens",
  },
  {
    year: "2023",
    title: "Digital Transformation",
    desc: "Better inventory, communication and fulfilment helped us serve customers faster.",
    image: "/images/hero-oil.jpg",
    alt: "Cooking oil stocked for faster wholesale order fulfilment",
  },
  {
    year: "2025",
    title: "25+ Years of Trust",
    desc: "Today we serve communities across Erode and beyond with quality, reliability and trusted service.",
    image: "/images/hero-nuts.jpg",
    alt: "Premium dry fruits marking 25 plus years of trusted supply",
  },
];

const FALLBACK_IMAGES = DEFAULT_MILESTONES.map((m) => ({
  image: m.image,
  alt: m.alt,
}));

/** Resolve admin-managed milestones, falling back to approved copy. */
export function getMilestones(): Milestone[] {
  const page = getPageContent("history");
  if (!page?.sections?.length) return DEFAULT_MILESTONES;
  const resolved = page.sections
    .filter((s: any) => s.status !== "inactive" && (s.heading || s.body))
    .slice()
    .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((s: any, i: number) => ({
      year: s.heading || `Milestone ${i + 1}`,
      title: s.subtitle || "",
      desc: s.body || "",
      image: s.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length].image,
      alt: s.subtitle || s.heading || "Company milestone",
    }));
  return resolved.length ? resolved : DEFAULT_MILESTONES;
}
