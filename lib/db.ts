import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'database.json');

export const DEFAULT_CONTENT = {
  heroTitle: "Wholesale Grocery Supplier",
  heroSubtitle: "Trusted Quality for Over Two Decades",
};

export const categories: any[] = [];
export const products: any[] = [];
export const heroSlides: any[] = [];
export const testimonials: any[] = [];
export const valuedCustomers: any[] = [];
export const mostSelling: any[] = [];
export const ourProducts: any[] = [];
export const faqs: any[] = [];
export const about: any = {};
export const homeShowcase: any = {};
export const pages: any[] = [];
export const siteSettings: any = {};
export const contactSettings: any = {};

export interface DbData {
  products: any[];
  categories: any[];
  enquiries: any[];
  content: any;
  heroSlides: any[];
  testimonials: any[];
  valuedCustomers: any[];
  mostSelling: any[];
  ourProducts: any[];
  faqs: any[];
  about: any;
  homeShowcase: any;
  pages: any[];
  siteSettings: any;
  contactSettings: any;
  customers: any[];
  hero: any[];
}

// Generate unique IDs for new records
export function newId(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function seedDb(): DbData {
  const db: DbData = {
    categories: [
      { id: '1', name: 'Pulses & Lentils', slug: 'pulses-lentils' },
      { id: '2', name: 'Spices & Masala', slug: 'spices-masala' },
      { id: '3', name: 'Oils & Ghee', slug: 'oils-ghee' },
      { id: '4', name: 'Grains & Rice', slug: 'grains-rice' }
    ],
    products: [
      { id: '1', name: 'Coriander Powder / மல்லித்தூள்', categoryId: '2', categoryName: 'Spices & Masala', price: 75, stock: 100, status: 'active', variants: [{ size: '250 gm', price: 75 }, { size: '1 Kg', price: 280 }] },
      { id: '2', name: 'Toor Dal / துவரம் பருப்பு', categoryId: '1', categoryName: 'Pulses & Lentils', price: 155, stock: 150, status: 'active', variants: [{ size: '1 Kg', price: 155 }] }
    ],
    enquiries: [],
    content: DEFAULT_CONTENT,
    heroSlides: [],
    testimonials: [],
    valuedCustomers: [],
    mostSelling: [],
    ourProducts: [],
    faqs: [],
    about: { title: "About Us", description: "Trusted wholesale grocery suppliers." },
    homeShowcase: {},
    pages: [],
    siteSettings: { siteName: "Thirumalaai Traders", phone: "9384482007" },
    contactSettings: { phone: "9384482007", email: "info@thirumalaaitraders.com" },
    customers: [],
    hero: []
  };
  return db;
}

export function readDb(): DbData {
  try {
    if (typeof window !== 'undefined') {
      // Safe fallback if called on browser side
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
  } catch (error) {
    console.error("Error reading DB:", error);
    return seedDb();
  }
}

export function writeDb(data: DbData): void {
  try {
    if (typeof window !== 'undefined') return;
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing DB:", error);
  }
}

// Helper getters required by components and pages
export function getAbout() { const db = readDb(); return db.about; }
export function getActiveTestimonials() { const db = readDb(); return db.testimonials; }
export function getContent() { const db = readDb(); return db.content; }
export function getPageContent(slug: string) { const db = readDb(); return db.pages.find((p: any) => p.slug === slug); }
export function getActiveFaqs() { const db = readDb(); return db.faqs; }
export function getSiteSettings() { const db = readDb(); return db.siteSettings; }
export function getContactSettings() { const db = readDb(); return db.contactSettings; }
export function getProductForDisplay(slug: string) { const db = readDb(); return db.products.find((p: any) => p.slug === slug || p.id === slug); }
export function getRelatedProducts(categoryId: string) { const db = readDb(); return db.products.filter((p: any) => p.categoryId === categoryId); }
export function getMostSellingProducts() { const db = readDb(); return db.mostSelling; }
export function getOurProducts() { const db = readDb(); return db.ourProducts; }