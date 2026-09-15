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