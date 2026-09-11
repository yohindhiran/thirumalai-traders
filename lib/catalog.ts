import { CATEGORY_SEEDS } from "@/data/categories";
import {
  PRODUCT_SEEDS,
  slugify,
  productDescription,
} from "@/data/products-seed";
import type { BrowserProduct } from "@/components/ProductsBrowser";

export const CATEGORY_IMAGES: Record<string, { src: string; alt: string }> = {
  spices: {
    src: "/images/cat-spices.jpg",
    alt: "Assorted whole spices — coriander, pepper, cardamom and chilli",
  },
  "grains-pulses": {
    src: "/images/cat-grains-pulses.jpg",
    alt: "Bowl of chickpeas — dals and pulses supplied in bulk",
  },
  "rice-lentils": {
    src: "/images/cat-rice-lentils.jpg",
    alt: "Premium raw rice grains supplied wholesale",
  },
  masala: {
    src: "/images/cat-masala.jpg",
    alt: "Ground masala and spice powders in spoons",
  },
  "dry-fruits-nuts": {
    src: "/images/cat-dry-fruits-nuts.jpg",
    alt: "Almonds — dry fruits and nuts in bulk",
  },
  oils: {
    src: "/images/cat-oils.jpg",
    alt: "Cooking oil supplied in bulk tins and containers",
  },
  "atta-flour-grocery": {
    src: "/images/cat-atta-flour-grocery.jpg",
    alt: "Bowl of wheat atta flour with grocery essentials",
  },
};

export function buildFullCatalog(): BrowserProduct[] {
  const all: BrowserProduct[] = [];
  for (const cat of CATEGORY_SEEDS) {
    const seeds = PRODUCT_SEEDS[cat.slug] || [];
    for (const p of seeds) {
      all.push({
        name: p.name,
        slug: slugify(p.name),
        description: productDescription(p.name, cat.name),
        subcategory: p.subcategory,
        categoryName: cat.name,
        categorySlug: cat.slug,
      });
    }
  }
  return all;
}

export function categoryProductCount(slug: string): number {
  return (PRODUCT_SEEDS[slug] || []).length;
}

export interface FeaturedProduct {
  name: string;
  categorySlug: string;
}

function fp(name: string, categorySlug: string): FeaturedProduct {
  return { name, categorySlug };
}

export const MOST_SELLING: FeaturedProduct[] = [
  fp("Toor Dal", "grains-pulses"),
  fp("Coriander Seeds", "spices"),
  fp("Sunflower Oil", "oils"),
  fp("Basmati Rice", "rice-lentils"),
  fp("Almond", "dry-fruits-nuts"),
  fp("Cashew", "dry-fruits-nuts"),
  fp("Wheat Atta", "atta-flour-grocery"),
];

export const OUR_PRODUCTS: FeaturedProduct[] = [
  fp("Turmeric Powder", "masala"),
  fp("Black Pepper", "spices"),
  fp("Urad Dal", "grains-pulses"),
  fp("Raw Rice", "rice-lentils"),
  fp("Chilli Powder", "masala"),
  fp("Cashew", "dry-fruits-nuts"),
  fp("Groundnut Oil", "oils"),
  fp("Wheat Atta", "atta-flour-grocery"),
  fp("Sooji / Rava", "atta-flour-grocery"),
  fp("Cumin Seeds", "spices"),
];

export function resolveFeatured(
  item: FeaturedProduct
): BrowserProduct | undefined {
  const cat = CATEGORY_SEEDS.find((c) => c.slug === item.categorySlug);
  const seed = (PRODUCT_SEEDS[item.categorySlug] || []).find(
    (p) => p.name === item.name
  );
  if (!cat || !seed) return undefined;
  return {
    name: seed.name,
    slug: slugify(seed.name),
    description: productDescription(seed.name, cat.name),
    subcategory: seed.subcategory,
    categoryName: cat.name,
    categorySlug: cat.slug,
  };
}

/**
 * Per-category image sets reused as product imagery. These reference existing
 * assets in /public/images so we never need to download external images.
 */
export const PRODUCT_IMAGE_SET: Record<string, string[]> = {
  spices: ["/images/cat-spices.jpg", "/images/hero-spices.jpg"],
  "grains-pulses": ["/images/cat-grains-pulses.jpg", "/images/hero-pulses.jpg"],
  "rice-lentils": ["/images/cat-rice-lentils.jpg", "/images/hero-rice.jpg"],
  masala: ["/images/cat-masala.jpg"],
  "dry-fruits-nuts": [
    "/images/cat-dry-fruits-nuts.jpg",
    "/images/hero-nuts.jpg",
  ],
  oils: ["/images/cat-oils.jpg", "/images/hero-oil.jpg"],
  "atta-flour-grocery": ["/images/cat-atta-flour-grocery.jpg"],
};

export function getProductImages(categorySlug: string): string[] {
  return PRODUCT_IMAGE_SET[categorySlug] ?? ["/images/hero-warehouse.jpg"];
}

export function getAllProducts(): BrowserProduct[] {
  return buildFullCatalog();
}

export function getProduct(
  categorySlug: string,
  slug: string
): BrowserProduct | undefined {
  const cat = CATEGORY_SEEDS.find((c) => c.slug === categorySlug);
  const seed = (PRODUCT_SEEDS[categorySlug] || []).find(
    (p) => slugify(p.name) === slug
  );
  if (!cat || !seed) return undefined;
  return {
    name: seed.name,
    slug: slugify(seed.name),
    description: productDescription(seed.name, cat.name),
    subcategory: seed.subcategory,
    categoryName: cat.name,
    categorySlug: cat.slug,
  };
}

export function getRelatedProducts(
  categorySlug: string,
  slug: string,
  count = 5
): BrowserProduct[] {
  const all = buildFullCatalog();
  const sameCat = all.filter(
    (p) => p.categorySlug === categorySlug && p.slug !== slug
  );
  if (sameCat.length >= count) return sameCat.slice(0, count);
  const others = all.filter(
    (p) => p.categorySlug !== categorySlug && p.slug !== slug
  );
  return [...sameCat, ...others].slice(0, count);
}
