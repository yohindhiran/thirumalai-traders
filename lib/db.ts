'use server';
import fs from "fs";
import path from "path";
import type {
   AboutContent,
   Category,
   CompanyPageContent,
   ContactSettings,
   DbData,
   Enquiry,
   Faq,
   HeroSlide,
   HomeShowcaseItem,
   Product,
   ProductRef,
   SiteContent,
   SiteSettings,
   Testimonial,
   ValuedCustomer,
} from "@/types";
import { seedCategories } from "@/data/categories";
import { PRODUCT_SEEDS, slugify, productDescription } from "@/data/products-seed";
import {
   CLIENTS,
   CORE_VALUES,
   FAQS,
   INDUSTRIES,
   MISSION,
   SITE,
   VISION,
   WHY_CHOOSE_US,
} from "@/data/site";

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
   homeAboutImage: "/images/about-warehouse.jpg",
   homeAboutHeading: "A Trusted Name in Wholesale Grocery Since Over Two Decades",
   homeAboutButtonText: "Know More About Us",
   homeAboutButtonLink: "/about",
};

const CATEGORY_IMAGE_MAP: Record<string, string> = {
   spices: "/images/cat-spices.jpg",
   "grains-pulses": "/images/cat-grains-pulses.jpg",
   "rice-lentils": "/images/cat-rice-lentils.jpg",
   masala: "/images/cat-masala.jpg",
   "dry-fruits-nuts": "/images/cat-dry-fruits-nuts.jpg",
   oils: "/images/cat-oils.jpg",
   "atta-flour-grocery": "/images/cat-atta-flour-grocery.jpg",
};

export function productImageFor(categorySlug: string): string {
   return CATEGORY_IMAGE_MAP[categorySlug] || "/images/hero-warehouse.jpg";
}

function seedDb(): DbData {
   const now = new Date().toISOString();
   const categories = seedCategories();
   const catBySlug = new Map(categories.map((c) => [c.slug, c]));
   const products: Product[] = [];
   let order = 0;
   for (const cat of categories) {
     const seeds = PRODUCT_SEEDS[cat.slug] || [];
     seeds.forEach((s) => {
       const slug = `${cat.slug}-${slugify(s.name)}`;
       products.push({
         id: `prod-${slug}`,
         slug,
         name: s.name,
         categoryId: cat.id,
         subcategory: s.subcategory,
         description: productDescription(s.name, cat.name),
         images: [productImageFor(cat.slug)],
         specs: [],
         status: "active",
         displayOrder: order++,
         createdAt: now,
         updatedAt: now,
       });
     });
   }

   const heroSlides: HeroSlide[] = [
     { id: "hs-1", image: "/images/hero-warehouse.jpg", status: "active", displayOrder: 1 },
     { id: "hs-2", image: "/images/hero-rice.jpg", status: "active", displayOrder: 2 },
     { id: "hs-3", image: "/images/hero-pulses.jpg", status: "active", displayOrder: 3 },
     { id: "hs-4", image: "/images/hero-spices.jpg", status: "active", displayOrder: 4 },
     { id: "hs-5", image: "/images/hero-nuts.jpg", status: "active", displayOrder: 5 },
     { id: "hs-6", image: "/images/hero-oil.jpg", status: "active", displayOrder: 6 },
   ];

   const testimonials: Testimonial[] = [
     { id: "t-1", name: "Customer Review", company: "Replace with approved customer details", quote: "Customer review placeholder — replace this text with an approved customer testimonial before publishing.", status: "active", displayOrder: 1 },
     { id: "t-2", name: "Customer Review", company: "Replace with approved customer details", quote: "Customer review placeholder — replace this text with an approved customer testimonial before publishing.", status: "active", displayOrder: 2 },
     { id: "t-3", name: "Customer Review", company: "Replace with approved customer details", quote: "Customer review placeholder — replace this text with an approved customer testimonial before publishing.", status: "active", displayOrder: 3 },
     { id: "t-4", name: "Customer Review", company: "Replace with approved customer details", quote: "Customer review placeholder — replace this text with an approved customer testimonial before publishing.", status: "active", displayOrder: 4 },
     { id: "t-5", name: "Customer Review", company: "Replace with approved customer details", quote: "Customer review placeholder — replace this text with an approved customer testimonial before publishing.", status: "active", displayOrder: 5 },
     { id: "t-6", name: "Customer Review", company: "Replace with approved customer details", quote: "Customer review placeholder — replace this text with an approved customer testimonial before publishing.", status: "active", displayOrder: 6 },
   ];

   const valuedCustomerLogos: Record<string, string> = {
     "Erode Sengunthar Engineering College": "/images/clients/erode-sengunthar.png",
     "PSG College": "/images/clients/psg-college.png",
     "Hindusthan College": "/images/clients/hindusthan.png",
   };
   const valuedCustomers: ValuedCustomer[] = CLIENTS.map((name, i) => ({
     id: `vc-${i + 1}`,
     name,
     logo: valuedCustomerLogos[name],
     status: "active",
     displayOrder: i + 1,
   }));

   const mostSelling: ProductRef[] = [
     { productId: "prod-grains-pulses-toor-dal", status: "active", displayOrder: 1 },
     { productId: "prod-spices-coriander-seeds", status: "active", displayOrder: 2 },
     { productId: "prod-oils-sunflower-oil", status: "active", displayOrder: 3 },
     { productId: "prod-rice-lentils-basmati-rice", status: "active", displayOrder: 4 },
     { productId: "prod-dry-fruits-nuts-almond", status: "active", displayOrder: 5 },
     { productId: "prod-dry-fruits-nuts-cashew", status: "active", displayOrder: 6 },
     { productId: "prod-atta-flour-grocery-wheat-atta", status: "active", displayOrder: 7 },
   ];

   const ourProducts: ProductRef[] = [
     { productId: "prod-masala-turmeric-powder", status: "active", displayOrder: 1 },
     { productId: "prod-spices-black-pepper", status: "active", displayOrder: 2 },
     { productId: "prod-grains-pulses-urad-dal", status: "active", displayOrder: 3 },
     { productId: "prod-rice-lentils-raw-rice", status: "active", displayOrder: 4 },
     { productId: "prod-masala-chilli-powder", status: "active", displayOrder: 5 },
     { productId: "prod-dry-fruits-nuts-cashew", status: "active", displayOrder: 6 },
     { productId: "prod-oils-groundnut-oil", status: "active", displayOrder: 7 },
     { productId: "prod-atta-flour-grocery-wheat-atta", status: "active", displayOrder: 8 },
     { productId: "prod-atta-flour-grocery-sooji-rava", status: "active", displayOrder: 9 },
     { productId: "prod-spices-cumin-seeds", status: "active", displayOrder: 10 },
   ];

   const faqs: Faq[] = FAQS.map((f, i) => ({
     id: `f-${i + 1}`,
     question: f.q,
     answer: f.a,
     status: "active",
     displayOrder: i + 1,
   }));

   const about: AboutContent = {
     content: "",
     vision: VISION,
     mission: [...MISSION],
     coreValues: CORE_VALUES.map((c, i) => ({
       title: c.title,
       desc: c.desc,
       status: "active" as const,
       displayOrder: i + 1,
     })),
     images: ["/images/about-warehouse.jpg", "/images/hero-spices.jpg"],
     heroImage: "/images/about-warehouse.jpg",
     visionImage: "/images/about-warehouse.jpg",
     missionImage: "/images/hero-spices.jpg",
   };

   const pages: Record<string, CompanyPageContent> = {
     "wholesale-supply": {
       title: "Wholesale Supply",
       intro: "",
       sections: [
         { heading: "Bulk Ordering", body: "Supply capability for large-volume orders across our entire grocery range." },
         { heading: "Wholesale Pricing", body: "Competitive volume-based pricing for institutions and businesses." },
         { heading: "Regular Supply", body: "Recurring supply arrangements so your kitchen is never short of essentials." },
         { heading: "Institutional Supply", body: "Dedicated support for schools, colleges, industrial canteens and mills." },
         { heading: "Scheduled Deliveries", body: "Delivery schedules planned around your kitchen's requirements." },
         { heading: "Quality Checking & Packing", body: "Products checked and hygienically packed before dispatch — with flexible order quantities from small to bulk." },
       ],
       items: [
         { title: "Share your requirement", body: "Share your requirement through enquiry, call or WhatsApp." },
         { title: "Receive wholesale pricing", body: "Receive wholesale pricing and supply details from our team." },
         { title: "Get reliable delivery", body: "Get reliable delivery on schedule — order after order." },
       ],
       images: ["/images/hero-pulses.jpg"],
     },
     history: {
       title: "History",
       intro: "",
       sections: [
         { heading: "Establishment", body: "Thirumalaai Traders began operations at Karungalpalayam, Erode — supplying quality grocery products to local businesses at honest wholesale prices." },
         { heading: "Business Growth", body: "Consistent product quality and reliable service earned word-of-mouth referrals, steadily growing the customer base across the region." },
         { heading: "Institutional Supply", body: "The company became a specialised supplier to school and college canteens, industrial canteens and mills — building expertise in institutional kitchen requirements." },
         { heading: "Expansion of Range & Reach", body: "Product range expanded to cover the full spectrum — spices, grains, pulses, rice, masalas, dry fruits, oils, flours and everyday grocery essentials." },
         { heading: "Long-Term Customer Relationships", body: "Many customers stayed with us for years and decades. Today we proudly serve more than 1000 customers across institutions, industries and retail." },
         { heading: "Present Capabilities", body: "Today Thirumalaai Traders combines bulk supply capability, flexible order quantities, hygienic packing and dependable delivery schedules." },
         { heading: "Future Growth", body: "We continue to expand our product availability and supply capabilities, staying committed to the values that built this business." },
       ],
       items: [],
       images: ["/images/hero-spices.jpg"],
     },
     "industries-we-serve": {
       title: "Industries We Serve",
       intro: "",
       sections: INDUSTRIES.map((i) => ({ heading: i.title, body: i.desc })),
       items: [],
       images: ["/images/hero-rice.jpg"],
     },
     "why-choose-us": {
       title: "Why Choose Us",
       intro: "",
       sections: WHY_CHOOSE_US.map((i) => ({ heading: i.title, body: i.desc })),
       items: [],
       images: [],
     },
     clients: {
       title: "Clients",
       intro: "",
       sections: [],
       items: CLIENTS.map((name) => ({ title: name, body: "" })),
       images: [],
     },
     quality: {
       title: "Quality",
       intro: "",
       sections: [
         { heading: "Sourcing", body: "We source carefully from trusted suppliers so every product begins with quality you can rely on." },
         { heading: "Quality Checks", body: "Products are checked before they reach your kitchen, so consistency is never left to chance." },
         { heading: "Hygienic Packing", body: "Clean, careful packing protects product quality from our warehouse to your door." },
       ],
       items: [],
       images: ["/images/about-warehouse.jpg"],
     },
   };

   const showcaseImages: Array<{ src: string; alt: string }> = [
     { src: "/images/hero-rice.jpg", alt: "Premium raw rice grains supplied in bulk" },
     { src: "/images/hero-pulses.jpg", alt: "Pulses and dals supplied wholesale" },
     { src: "/images/hero-spices.jpg", alt: "Whole spices and masalas" },
     { src: "/images/hero-oil.jpg", alt: "Cooking oil supplied in bulk" },
     { src: "/images/hero-nuts.jpg", alt: "Bulk dry fruits and nuts" },
     { src: "/images/cat-spices.jpg", alt: "Spices category" },
     { src: "/images/cat-grains-pulses.jpg", alt: "Grains and pulses category" },
     { src: "/images/cat-rice-lentils.jpg", alt: "Rice and lentils category" },
     { src: "/images/cat-masala.jpg", alt: "Masala category" },
     { src: "/images/cat-dry-fruits-nuts.jpg", alt: "Dry fruits and nuts category" },
     { src: "/images/cat-oils.jpg", alt: "Oils category" },
     { src: "/images/cat-atta-flour-grocery.jpg", alt: "Atta and flour grocery category" },
   ];

   const homeShowcase: HomeShowcaseItem[] = showcaseImages.map((img, i) => ({
     id: `hs-showcase-${i + 1}`,
     image: img.src,
     alt: img.alt,
     title: "",
     status: "active",
     displayOrder: i + 1,
   }));

   const siteSettings: SiteSettings = {
     companyName: SITE.name,
     logo: "",
     favicon: "",
     phone: SITE.officePhone,
     whatsapp: SITE.whatsapp,
     email: SITE.email,
     addressLine1: SITE.address.line1,
     addressLine2: SITE.address.line2,
     addressState: SITE.address.state,
     footerText:
       "Trusted wholesale grocery supplier with 25+ years of experience serving institutions, industries, mills, grocery shops and bulk customers across Erode, Tamil Nadu.",
     copyrightYear: "2026",
     facebook: "",
     instagram: "",
     youtube: "",
     linkedin: "",
   };

   const contactSettings: ContactSettings = {
     phone: SITE.officePhone,
     whatsapp: SITE.whatsapp,
     email: SITE.email,
     addressLine1: SITE.address.line1,
     addressLine2: SITE.address.line2,
     addressState: SITE.address.state,
     businessHours: "Monday – Saturday, 9:00 AM – 8:00 PM",
     mapsLink: "",
   };

   const db: DbData = {
     categories,
     products,
     enquiries: [],
     content: DEFAULT_CONTENT,
     heroSlides,
     testimonials,
     valuedCustomers,
     mostSelling,
     ourProducts,
     faqs,
     about,
     homeShowcase,
     pages,
     siteSettings,
     contactSettings,
   };

   let cache: DbData | null = null;

   export function readDb(): DbData {
     try {
       if (!fs.existsSync(DB_FILE)) throw new Error("missing");
       const raw = fs.readFileSync(DB_FILE, "utf-8");
       const db = JSON.parse(raw) as DbData;
       // Backfill any collections that an older db.json may be missing.
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

   export function writeDb(db: DbData): void {
     const tempPath = DB_FILE + ".tmp";
     fs.writeFileSync(tempPath, JSON.stringify(db, null, 2), "utf-8");
     fs.renameSync(tempPath, DB_FILE);
   }

   export function getContent(): SiteContent {
     const db = readDb();
     return { ...DEFAULT_CONTENT, ...db.content };
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
       .filter((p) => p.categorySlug)
       .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
   }

   export function getProductById(id: string): Product | undefined {
     return readDb().products.find((p) => p.id === id);
   }

   export function getProductForDisplay(categorySlug: string, slug: string): (Product & { categoryName: string; categorySlug: string }) | undefined {
     const db = readDb();
     const cat = db.categories.find((c) => c.slug === categorySlug);
     if (!cat) return undefined;
     const product = db.products.find((p) => p.categoryId === cat.id && p.slug === slug);
     if (!product) return undefined;
     return {
       ...product,
       images: product.images && product.images.length ? product.images : [productImageFor(categorySlug)],
       categoryName: cat.name,
       categorySlug: cat.slug,
     };
   }

   export function getRelatedProducts(categorySlug: string, slug: string, count = 5): Array<Product & { categoryName: string; categorySlug: string }> {
     const db = readDb();
     const cat = db.categories.find((c) => c.slug === categorySlug);
     if (!cat) return [];
     const catProducts = db.products
       .filter((p) => p.categoryId === cat.id && p.slug !== slug && p.status === "active")
       .map((p) => ({ ...p, categoryName: cat.name, categorySlug: cat.slug }));
     if (catProducts.length >= count) return catProducts.slice(0, count);
     const others = db.products
       .filter((p) => p.categoryId !== cat.id && p.slug !== slug && p.status === "active")
       .map((p) => {
         const c = db.categories.find((x) => x.id === p.categoryId);
         return { ...p, categoryName: c?.name ?? "", categorySlug: c?.slug ?? "" };
       });
     return [...catProducts, ...others].slice(0, count);
   }

   function resolveRefs(refs: ProductRef[]): Array<Product & { categoryName: string; categorySlug: string }> {
     const db = readDb();
     const catById = new Map(db.categories.map((c) => [c.id, c]));
     return refs
       .filter((r) => r.status === "active")
       .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
       .map((r) => db.products.find((p) => p.id === r.productId))
       .filter((p): p is Product => Boolean(p) && p!.status === "active")
       .map((p) => {
         const c = catById.get(p.categoryId);
         return { ...p, images: p.images && p.images.length ? p.images : [productImageFor(c?.slug ?? "")], categoryName: c?.name ?? "", categorySlug: c?.slug ?? "" };
       });
   }

   export function getMostSellingProducts() {
     return resolveRefs(readDb().mostSelling);
   }

   export function getOurProducts() {
     return resolveRefs(readDb().ourProducts);
   }

   export function getActiveHeroSlides(): HeroSlide[] {
     return readDb().heroSlides.filter((s) => s.status === "active").sort((a, b) => a.displayOrder - b.displayOrder);
   }

   export function getActiveTestimonials(): Testimonial[] {
     return readDb().testimonials.filter((t) => t.status === "active").sort((a, b) => a.displayOrder - b.displayOrder);
   }

   export function getActiveValuedCustomers(): ValuedCustomer[] {
     return readDb().valuedCustomers.filter((c) => c.status === "active").sort((a, b) => a.displayOrder - b.displayOrder);
   }

   export function getHomeShowcase(): HomeShowcaseItem[] {
     return readDb()
       .homeShowcase.filter((s) => s.status === "active")
       .sort((a, b) => a.displayOrder - b.displayOrder);
   }

   export function getHomeAbout() {
     const db = readDb();
     return {
       ...DEFAULT_CONTENT,
       ...db.content,
     } as SiteContent;
   }

   export function getActiveFaqs(): Faq[] {
     return readDb().faqs.filter((f) => f.status === "active").sort((a, b) => a.displayOrder - b.displayOrder);
   }

   export function getAbout(): AboutContent {
     return readDb().about;
   }

   export function getPageContent(slug: string): CompanyPageContent | undefined {
     return readDb().pages[slug];
   }

   export function getSiteSettings(): SiteSettings {
     return readDb().siteSettings;
   }

   export function getContactSettings(): ContactSettings {
     return readDb().contactSettings;
   }

   export function searchEnquiries(opts: { status?: string; q?: string } = {}) {
     let list = readDb().enquiries.slice();
     if (opts.status) list = list.filter((e) => e.status === opts.status);
     if (opts.q) {
       const q = opts.q.toLowerCase();
       list = list.filter(
         (e) =>
           e.name.toLowerCase().includes(q) ||
           e.company.toLowerCase().includes(q) ||
           e.phone.toLowerCase().includes(q) ||
           e.email.toLowerCase().includes(q)
       );
     }
     return list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
   }

   let idCounter = 0;
   export function newId(prefix: string): string {
     idCounter += 1;
     return `${prefix}-${Date.now()}-${idCounter}`;
   }