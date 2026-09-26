import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { CATEGORY_SEEDS } from "@/data/categories";
import {
  PRODUCT_SEEDS,
  slugify,
  productDescription,
} from "@/data/products-seed";
import type {
  Category,
  Product,
  Enquiry,
  SiteContent,
  HeroSlide,
  Testimonial,
  ValuedCustomer,
  ProductRef,
  KgPackageRef,
  KgPackagesSection,
  Faq,
  AboutContent,
  CompanyPageContent,
  SiteSettings,
  ContactSettings,
  DbData,
} from "@/types";

const DB_FILE = path.join(process.cwd(), "data", "database.json");

/* -------------------------------------------------------------------------- */
/*  In-memory global cache — a fast layer in front of the JSON file. On a    */
/*  self-hosted server (writable disk) the FILE is the source of truth and    */
/*  `readDb` re-reads it whenever its mtime changes (safe across processes),   */
/*  so admin edits propagate to every worker instantly. On Vercel (read-only   */
/*  fs) the cache is authoritative for the lifetime of the warm container.    */
/* -------------------------------------------------------------------------- */

const CACHE_KEY = "__thirumalai_traders_db";
const CACHE_MTIME_KEY = "__thirumalai_traders_db_mtime";

type GlobalStore = Record<string, unknown>;

function getCachedDb(): DbData | undefined {
  const store = globalThis as unknown as GlobalStore;
  const value = store[CACHE_KEY];
  return typeof value === "object" && value !== null
    ? (value as DbData)
    : undefined;
}

function setCachedDb(db: DbData): void {
  (globalThis as unknown as GlobalStore)[CACHE_KEY] = db;
}

function getCachedMtime(): number | undefined {
  const store = globalThis as unknown as GlobalStore;
  const value = store[CACHE_MTIME_KEY];
  return typeof value === "number" ? value : undefined;
}

function setCachedMtime(mtime: number): void {
  (globalThis as unknown as GlobalStore)[CACHE_MTIME_KEY] = mtime;
}

/* -------------------------------------------------------------------------- */
/*  Constants & helpers                                                       */
/* -------------------------------------------------------------------------- */

export const DEFAULT_CONTENT: SiteContent = {  heroHeadline: "Serving Quality. Delivering Trust.",
  heroSubtext:
    "Your Trusted Wholesale Partner for School, College & Industrial Canteens.",
  aboutPreview:
    "Thirumalaai Traders is a trusted wholesale grocery supplier in Erode with 25+ years of experience serving schools, colleges, industries, mills, grocery shops and bulk customers.",
  highlights: [
    "25+ Years of Experience",
    "Trusted by 1000+ Customers",
    "Specialized in Canteen & Institutional Supplies",
    "Consistent Quality Assurance",
  ],
  officePhone: "93844 82007",
  homeAboutImage: "/images/about-warehouse.jpg",
  homeAboutHeading: "A Trusted Name in Wholesale Grocery",
  homeAboutButtonText: "Know More About Us",
  homeAboutButtonLink: "/about",
};

/* Default copy for the standalone Home "1 KG PACKAGES" section. */
export const DEFAULT_KG_PACKAGES_SECTION: KgPackagesSection = {
  title: "Our Products",
  description:
    "Wholesale-quality spices, dals, pulses, dry fruits and nuts packed in convenient 1 kg packages — ready for retail shops, canteens and bulk buyers.",
};

export function newId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}

/* -------------------------------------------------------------------------- */
/*  1 KG Packages seed — the 16 launch products for the Home "1 KG PACKAGES / */
/*  Our Products" section. Each entry references a master product (reusing    */
/*  existing catalogue data/images) with its own display label, status and    */
/*  order. Resolved by (category slug, product slug) so fresh installs seed   */
/*  deterministically.                                                         */
/* -------------------------------------------------------------------------- */

const KG_PACKAGE_SEEDS: Array<[string, string, string]> = [
  ["spices", "cumin-seeds", "Cumin Seed"],
  ["spices", "fenugreek", "Fenugreek Seed"],
  ["spices", "fennel-seeds", "Fennel Seed"],
  ["spices", "mustard-seeds", "Mustard Seed"],
  ["spices", "green-cardamom", "Cardamom Seed"],
  ["spices", "cloves", "Clove Seed"],
  ["spices", "star-anise", "Star Anise Seed"],
  ["dry-fruits-nuts", "pistachio", "Pista"],
  ["dry-fruits-nuts", "raisins", "Raisins"],
  ["dry-fruits-nuts", "almond", "Badam"],
  ["dry-fruits-nuts", "cashew", "Cashew"],
  ["grains-pulses", "toor-dal", "Toor Dal"],
  ["grains-pulses", "kabuli-chana", "White Chickpea"],
  ["grains-pulses", "moong-dal", "Moong Dal"],
  ["grains-pulses", "urad-dal", "Urad Dal"],
  ["grains-pulses", "black-chana", "Black Chickpea"],
];

function buildKgPackageSeeds(products: Product[]): KgPackageRef[] {
  const byKey = new Map(products.map((p) => [`${p.categoryId}|${p.slug}`, p]));
  const refs: KgPackageRef[] = [];
  KG_PACKAGE_SEEDS.forEach(([catSlug, slug, customName], i) => {
    const product = byKey.get(`cat-${catSlug}|${slug}`);
    if (!product) return;
    refs.push({
      productId: product.id,
      status: "active",
      displayOrder: i + 1,
      customName,
    });
  });
  return refs;
}

/* -------------------------------------------------------------------------- */
/*  Seed data — used on first run or when no file/cache exists                */
/* -------------------------------------------------------------------------- */

export function seedDb(): DbData {
  const categories: Category[] = CATEGORY_SEEDS.map((c, i) => ({
    id: `cat-${c.slug}`,
    slug: c.slug,
    name: c.name,
    description: c.description,
    status: "active",
    displayOrder: i + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const products: Product[] = [];
  let pIdx = 1;
  for (const cat of CATEGORY_SEEDS) {
    const seeds = PRODUCT_SEEDS[cat.slug] || [];
    for (const s of seeds) {
      products.push({
        id: `prod-${pIdx++}`,
        slug: slugify(s.name),
        name: s.name,
        categoryId: `cat-${cat.slug}`,
        subcategory: s.subcategory,
        description: productDescription(s.name, cat.name),
        status: "active",
        displayOrder: products.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }

  return {
    categories,
    products,
    enquiries: [],
    content: DEFAULT_CONTENT,
    heroSlides: [],
    testimonials: [],
    valuedCustomers: [],
    mostSelling: [],
    ourProducts: [],
    kgPackages: buildKgPackageSeeds(products),
    kgPackagesSection: { ...DEFAULT_KG_PACKAGES_SECTION },
    faqs: [],
    about: {
      content: DEFAULT_CONTENT.aboutPreview,
      vision:
        "To become one of the most trusted and preferred wholesale grocery partners for institutions, industries, canteens and businesses.",
      mission: [
        "Supply quality grocery and food products at competitive wholesale prices.",
        "Ensure timely and reliable delivery for regular and bulk requirements.",
      ],
      coreValues: [
        {
          title: "Quality",
          desc: "Focus on supplying reliable and quality products.",
        },
        {
          title: "Trust",
          desc: "Building long-term relationships through dependable business practices.",
        },
      ],
      images: [],
    },
    homeShowcase: [],
    pages: {},
    siteSettings: {
      companyName: "Thirumalaai Traders",
      phone: "93844 82007",
      whatsapp: "919384482007",
      email: "thirumalaaigroupofcompanies@gmail.com",
      addressLine1: "Varakappar Street, Janakiammal Layout,",
      addressLine2: "Karungalpalayam, Erode,",
      addressState: "Tamil Nadu – 638003, India",
      footerText:
        "Trusted wholesale grocery supplier with 25+ years of experience serving institutions, industries, mills, grocery shops and bulk customers across Erode, Tamil Nadu.",
      copyrightYear: "2026",
    },
    contactSettings: {
      phone: "93844 82007",
      whatsapp: "919384482007",
      email: "thirumalaaigroupofcompanies@gmail.com",
      addressLine1: "Varakappar Street, Janakiammal Layout,",
      addressLine2: "Karungalpalayam, Erode,",
      addressState: "Tamil Nadu – 638003, India",
      businessHours: "Monday – Saturday: 8:00 AM – 8:00 PM",
    },
    customers: [],
    hero: [],
  };
}

/* -------------------------------------------------------------------------- */
/*  Backfill — ensure every key from the seed schema exists in a loaded row   */
/* -------------------------------------------------------------------------- */

function backfill(db: DbData): DbData {
  const seed = seedDb();
  for (const key of Object.keys(seed) as Array<keyof DbData>) {
    if (db[key] === undefined) {
      // @ts-expect-error dynamic backfill
      db[key] = seed[key];
    }
  }
  return db;
}

/* -------------------------------------------------------------------------- */
/*  readDb — prefers the JSON file (source of truth on self-hosted),         */
/*           re-reading whenever the file changes on disk so edits made by   */
/*           any process/worker are picked up without a restart. Falls back  */
/*           to the global cache (warm container) then to seed.              */
/* -------------------------------------------------------------------------- */

export function readDb(): DbData {
  // Client components get seed data (no fs access).
  if (typeof window !== "undefined") {
    return seedDb();
  }

  // 1. File exists — it is authoritative on writable disk. Re-read when the
  //    tracked mtime differs so other workers' writes are observed.
  if (fs.existsSync(DB_FILE)) {
    try {
      const stat = fs.statSync(DB_FILE);
      const cached = getCachedDb();
      if (cached && getCachedMtime() === stat.mtimeMs) {
        return cached;
      }
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const db = backfill(JSON.parse(raw) as DbData);
      setCachedDb(db);
      setCachedMtime(stat.mtimeMs);
      return db;
    } catch {
      // Corrupt file or fs error — fall through to the global cache.
    }
  }

  // 2. No readable file — use the warm-container cache if available.
  const cached = getCachedDb();
  if (cached) return cached;

  // 3. Nothing anywhere — hydrate from seed and try to persist.
  const db = seedDb();
  setCachedDb(db);
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
    setCachedMtime(fs.statSync(DB_FILE).mtimeMs);
  } catch {
    // Filesystem read-only (Vercel) — the global cache is populated.
  }
  return db;
}

/* -------------------------------------------------------------------------- */
/*  invalidateProductCache — explicit Next.js cache invalidation. Called      */
/*  from writeDb() (universal) and from every admin mutation route handler.   */
/* -------------------------------------------------------------------------- */

export function invalidateProductCache(): void {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/products", "layout");
    revalidatePath("/products/[category]", "page");
  } catch {
    // revalidatePath only works inside request context; ignore elsewhere.
  }
}

/* -------------------------------------------------------------------------- */
/*  writeDb — always updates the global cache, persists to disk (best-effort) */
/*  and invalidates cached routes so pages rebuild on the next request.       */
/* -------------------------------------------------------------------------- */

export function writeDb(data: DbData): void {
  // Persist to disk FIRST so a failure throws before the cache is touched.
  // This THROWS on failure (e.g. read-only filesystem) so API routes report
  // an error instead of false success. Callers rely on the throw; do not
  // re-add a silent catch here.
  if (typeof window === "undefined") {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    setCachedMtime(fs.statSync(DB_FILE).mtimeMs);
  }

  // 1. Update the in-memory cache only after the disk write succeeded.
  setCachedDb(data);

  // 2. Invalidate Next.js caches so storefront pages re-render on next request.
  invalidateProductCache();
}

/* -------------------------------------------------------------------------- */
/*  Public getter helpers — used by pages, layouts and components.            */
/* -------------------------------------------------------------------------- */

export function getAbout(): AboutContent {
  return readDb().about;
}

export function getActiveTestimonials(): Testimonial[] {
  return readDb().testimonials.filter((t) => t.status === "active");
}

export function getContent(): SiteContent {
  return readDb().content;
}

export function getPageContent(
  slug: string
): CompanyPageContent | undefined {
  return readDb().pages?.[slug];
}

export function getActiveFaqs(): Faq[] {
  return readDb().faqs.filter((f) => f.status === "active");
}

export function getSiteSettings(): SiteSettings {
  return readDb().siteSettings;
}

export function getContactSettings(): ContactSettings {
  return readDb().contactSettings;
}

export function getProductForDisplay(slug: string, categorySlug?: string): Product | undefined {
  const db = readDb();
  const matches = db.products.filter((p) => p.slug === slug || p.id === slug);
  if (!categorySlug) return matches[0];
  // Slugs can repeat across categories (e.g. toor-dal) — prefer the product
  // that actually belongs to the URL category, fall back to first match.
  const cat = db.categories.find((c) => c.slug === categorySlug);
  return (cat && matches.find((p) => p.categoryId === cat.id)) || matches[0];
}

export function getRelatedProducts(
  productId: string,
  categoryId?: string,
  limit = 4
): Product[] {
  const db = readDb();
  const targetCat =
    categoryId || db.products.find((p) => p.id === productId)?.categoryId;
  return db.products
    .filter(
      (p) => p.id !== productId && (!targetCat || p.categoryId === targetCat)
    )
    .slice(0, limit);
}

export function getMostSellingProducts(): Product[] {
  const db = readDb();
  if (db.mostSelling?.length) {
    return db.mostSelling
      .map((ref) => db.products.find((p) => p.id === ref.productId))
      .filter((p): p is Product => Boolean(p));
  }
  return db.products.slice(0, 4);
}

export function getOurProducts(): Product[] {
  const db = readDb();
  if (db.ourProducts?.length) {
    return db.ourProducts
      .map((ref) => db.products.find((p) => p.id === ref.productId))
      .filter((p): p is Product => Boolean(p));
  }
  return db.products.slice(4, 12);
}

export interface KgPackageDisplayItem {
  ref: KgPackageRef;
  product: Product;
  displayName: string;
}

/**
 * Resolved 1 KG Packages for the Home page: enabled section entries in
 * display order, each joined to its master product. Disabled entries (or
 * entries whose master product is inactive/missing) are excluded from the
 * storefront but remain in the DB for the Admin Panel.
 */
export function getKgPackages(): KgPackageDisplayItem[] {  const db = readDb();
  return (db.kgPackages ?? [])
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((ref) => {
      const product = db.products.find((p) => p.id === ref.productId);
      if (!product || product.status !== "active" || ref.status !== "active") {
        return undefined;
      }
      const displayName =
        ref.customName?.trim() || product.name;
      return { ref, product, displayName };
    })
    .filter((x): x is KgPackageDisplayItem => Boolean(x));
}

/**
 * Copy (title/description) for the standalone Home "1 KG PACKAGES" section.
 * Falls back to defaults when the key is missing (older databases).
 */
export function getKgPackagesSection(): KgPackagesSection {
  const section = readDb().kgPackagesSection;
  return {
    title: section?.title?.trim() || DEFAULT_KG_PACKAGES_SECTION.title,
    description:
      section?.description?.trim() || DEFAULT_KG_PACKAGES_SECTION.description,
  };
}

export function getHomeShowcase() {
  return readDb().homeShowcase || [];
}