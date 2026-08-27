export type ProductStatus = "active" | "inactive";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  subcategory?: string;
  description: string;
  status: ProductStatus;
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
}
