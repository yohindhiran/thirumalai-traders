import type { Category } from "@/types";

export interface CategorySeed {
  slug: string;
  name: string;
  description: string;
}

export const CATEGORY_SEEDS: CategorySeed[] = [
  {
    slug: "spices",
    name: "Spices",
    description:
      "Whole spices sourced for aroma, purity and consistent quality — supplied in bulk for canteens, kitchens and retail.",
  },
  {
    slug: "grains-pulses",
    name: "Grains & Pulses",
    description:
      "Dals, pulses, grains and millets in every major variety, cleaned and supplied at wholesale quantities.",
  },
  {
    slug: "rice-lentils",
    name: "Rice & Lentils",
    description:
      "Premium rice varieties and lentils for institutional kitchens, from Ponni and Idli rice to Basmati.",
  },
  {
    slug: "masala",
    name: "Masala",
    description:
      "Ground masalas and blended spice powders for large-scale cooking, available in bulk packs.",
  },
  {
    slug: "dry-fruits-nuts",
    name: "Dry Fruits & Nuts",
    description:
      "Dry fruits, nuts and seeds carefully selected for quality — ideal for sweets, baking and nutrition programs.",
  },
  {
    slug: "oils",
    name: "Oils",
    description:
      "Cooking oils in bulk tins and loose supply, including groundnut, sesame and coconut oil.",
  },
  {
    slug: "atta-flour-grocery",
    name: "Atta, Flour & Grocery",
    description:
      "Flours, sweeteners and everyday grocery essentials for canteens, bakeries and retail shelves.",
  },
];

export function seedCategories(): Category[] {
  return CATEGORY_SEEDS.map((c) => ({
    id: `cat-${c.slug}`,
    slug: c.slug,
    name: c.name,
    description: c.description,
    status: "active" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}
