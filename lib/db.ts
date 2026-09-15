import fs from "fs";
import path from "path";
import { CATEGORY_SEEDS } from "@/data/categories";
import { PRODUCT_SEEDS, slugify, productDescription } from "@/data/products-seed";
import type {
  Category,
  Product,
  Enquiry,
  SiteContent,
  HeroSlide,
  Testimonial,
  ValuedCustomer,
  ProductRef,
  Faq,
  AboutContent,
  CompanyPageContent,
  SiteSettings,
  ContactSettings,
  DbData,
} from "@/types";

const DB_FILE = path.join(process.cwd(), "data", "database.json");

export const DEFAULT_CONTENT: SiteContent = {
  heroHeadline: "Serving Quality. Delivering Trust.",
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

export function newId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}

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
        { title: "Quality", desc: "Focus on supplying reliable and quality products." },
        { title: "Trust", desc: "Building long-term relationships through dependable business practices." },
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
      footerText: "Trusted wholesale grocery supplier in Erode.",
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

export function readDb(): DbData {
  try {
    if (typeof window !== "undefined") {
      return seedDb();
    }
    if (!fs.existsSync(DB_FILE)) {
      const db = seedDb();
      writeDb(db);
      return db;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const db = JSON.parse(raw) as DbData;
    const seed = seedDb();
    for (const key of Object.keys(seed) as Array<keyof DbData>) {
      if (db[key] === undefined) {
        // @ts-expect-error dynamic backfill
        db[key] = seed[key];
      }
    }
    return db;
  } catch {
    const db = seedDb();
    writeDb(db);
    return db;
  }
}

export function writeDb(data: DbData): void {
  try {
    if (typeof window !== "undefined") return;
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing DB:", error);
  }
}

// Helper getter functions required by public pages & layouts
export function getAbout(): AboutContent {
  return readDb().about;
}

export function getActiveTestimonials(): Testimonial[] {
  return readDb().testimonials.filter((t) => t.status === "active");
}

export function getContent(): SiteContent {
  return readDb().content;
}

export function getPageContent(slug: string): CompanyPageContent | undefined {
  const db = readDb();
  return db.pages?.[slug];
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

export function getProductForDisplay(slug: string): Product | undefined {
  const db = readDb();
  return db.products.find((p) => p.slug === slug || p.id === slug);
}

export function getRelatedProducts(
  productId: string,
  categoryId?: string,
  limit = 4
): Product[] {
  const db = readDb();
  const targetCat = categoryId || db.products.find((p) => p.id === productId)?.categoryId;
  return db.products
    .filter((p) => p.id !== productId && (!targetCat || p.categoryId === targetCat))
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

export function getHomeShowcase() {
  return readDb().homeShowcase || [];
}