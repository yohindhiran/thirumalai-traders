import fs from "fs";
import path from "path";
import type { Category, Enquiry, Product, SiteContent } from "@/types";
import { seedCategories } from "@/data/categories";
import { PRODUCT_SEEDS, slugify, productDescription } from "@/data/products-seed";

interface Db {
  categories: Category[];
  products: Product[];
  enquiries: Enquiry[];
  content: SiteContent;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

export const DEFAULT_CONTENT: SiteContent = {
  heroHeadline: "Serving Quality. Delivering Trust.",
  heroSubtext:
    "Your trusted wholesale grocery partner for schools, colleges, industries, mills, grocery shops and bulk requirements.",
  aboutPreview:
    "Thirumalaai Traders is a trusted wholesale grocery supplier with over 25 years of experience supplying quality grocery and food products. Based in Karungalpalayam, Erode, we specialise in serving college canteens, school canteens, industrial canteens, mill canteens, grocery shops and bulk customers — building long-term relationships on quality, competitive pricing and dependable delivery.",
  highlights: [
    "25+ Years Experience",
    "1000+ Customers",
    "Bulk Supply",
    "Reliable Delivery",
  ],
  officePhone: "93844 82007",
};

function seedDb(): Db {
  const now = new Date().toISOString();
  const categories = seedCategories();
  const products: Product[] = [];
  for (const cat of categories) {
    const seeds = PRODUCT_SEEDS[cat.slug] || [];
    seeds.forEach((s) => {
      products.push({
        id: `prod-${cat.slug}-${slugify(s.name)}`,
        slug: `${cat.slug}-${slugify(s.name)}`,
        name: s.name,
        categoryId: cat.id,
        subcategory: s.subcategory,
        description: productDescription(s.name, cat.name),
        status: "active",
        createdAt: now,
        updatedAt: now,
      });
    });
  }
  return { categories, products, enquiries: [], content: DEFAULT_CONTENT };
}

export function readDb(): Db {
  try {
    if (!fs.existsSync(DB_FILE)) throw new Error("missing");
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw) as Db;
  } catch {
    const db = seedDb();
    writeDb(db);
    return db;
  }
}

export function writeDb(db: Db): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
}

export function getPublicProducts(): Array<Product & { categoryName: string; categorySlug: string }> {
  const db = readDb();
  const catById = new Map(db.categories.map((c) => [c.id, c]));
  return db.products
    .filter((p) => p.status === "active")
    .map((p) => ({
      ...p,
      categoryName: catById.get(p.categoryId)?.name ?? "",
      categorySlug: catById.get(p.categoryId)?.slug ?? "",
    }))
    .filter((p) => p.categorySlug);
}

export function getContent(): SiteContent {
  const db = readDb();
  return { ...DEFAULT_CONTENT, ...db.content };
}

let idCounter = 0;
export function newId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}
