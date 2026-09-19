export type ProductStatus = "active" | "inactive";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName?: string;
  subcategory?: string;
  shortDescription?: string;
  description: string;
  mainImage?: string;
  images?: string[];
  specs?: ProductSpec[];
  purity?: string;
  color?: string;
  shelfLife?: string;
  packaging?: string;
  qualityInfo?: string;
  price?: number;
  stock?: number;
  status: ProductStatus;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  variants?: Array<{ size?: string; price?: number }>;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  status: ProductStatus;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Converted" | "Closed";

export interface Enquiry {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  customerType: string;
  category: string;
  productsRequired: string;
  quantity: string;
  deliveryLocation: string;
  message: string;
  status: EnquiryStatus;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteContent {
  heroHeadline: string;
  heroSubtext: string;
  aboutPreview: string;
  highlights: string[];
  officePhone: string;
  homeAboutImage?: string;
  homeAboutHeading?: string;
  homeAboutButtonText?: string;
  homeAboutButtonLink?: string;
}

export interface HomeShowcaseItem {
  id: string;
  image: string;
  alt: string;
  title?: string;
  status: ProductStatus;
  displayOrder: number;
}

export interface HeroSlide {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  status: ProductStatus;
  displayOrder: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  quote: string;
  image?: string;
  status: ProductStatus;
  displayOrder: number;
}

export interface ValuedCustomer {
  id: string;
  name: string;
  logo?: string;
  photo?: string;
  description?: string;
  status: ProductStatus;
  displayOrder: number;
}

export interface ProductRef {
  productId: string;
  status: ProductStatus;
  displayOrder: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  status: ProductStatus;
  displayOrder: number;
}

export interface AboutContent {
  content: string;
  vision: string;
  mission: string[];
  coreValues: { title: string; desc: string; status?: ProductStatus; displayOrder?: number }[];
  images: string[];
  heroImage?: string;
  visionImage?: string;
  missionImage?: string;
}

export interface CompanyPageSection {
  heading: string;
  subtitle?: string;
  body: string;
  image?: string;
  status?: ProductStatus;
  displayOrder?: number;
}

export interface CompanyPageContent {
  title: string;
  intro?: string;
  heroTitle?: string;
  heroImage?: string;
  sectionHeading?: string;
  sectionSubheading?: string;
  sections: CompanyPageSection[];
  items?: { title: string; body: string }[];
  images: string[];
}

export interface SiteSettings {
  companyName: string;
  logo?: string;
  favicon?: string;
  phone: string;
  whatsapp: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressState: string;
  footerText: string;
  copyrightYear: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
}

export interface ContactSettings {
  phone: string;
  whatsapp: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressState: string;
  businessHours: string;
  mapsLink?: string;
  team?: { name: string; role: string; phone: string }[];
}

export interface DbData {
  categories: Category[];
  products: Product[];
  enquiries: Enquiry[];
  content: SiteContent;
  heroSlides: HeroSlide[];
  testimonials: Testimonial[];
  valuedCustomers: ValuedCustomer[];
  mostSelling: ProductRef[];
  ourProducts: ProductRef[];
  faqs: Faq[];
  about: AboutContent;
  homeShowcase: HomeShowcaseItem[];
  pages: Record<string, CompanyPageContent>;
  siteSettings: SiteSettings;
  contactSettings: ContactSettings;
  customers: any[];
  hero: any[];
}