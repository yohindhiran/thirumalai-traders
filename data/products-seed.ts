export interface ProductSeed {
  name: string;
  subcategory?: string;
}

const spices: ProductSeed[] = [
  { name: "Coriander Seeds" }, { name: "Cumin Seeds" }, { name: "Fennel Seeds" },
  { name: "Fenugreek" }, { name: "Mustard Seeds" }, { name: "Black Pepper" },
  { name: "White Pepper" }, { name: "Green Cardamom" }, { name: "Black Cardamom" },
  { name: "Cloves" }, { name: "Cinnamon" }, { name: "Star Anise" },
  { name: "Bay Leaf" }, { name: "Dry Red Chilli" }, { name: "Turmeric" },
  { name: "Ajwain" }, { name: "Kalonji" }, { name: "Poppy Seeds" },
  { name: "Mace" }, { name: "Nutmeg" }, { name: "Dry Ginger" },
  { name: "Stone Flower" }, { name: "Marathi Moggu" }, { name: "Anardana" },
  { name: "Asafoetida" }, { name: "Tamarind" }, { name: "Kokum" },
  { name: "Saffron" }, { name: "Curry Leaves" }, { name: "Sesame Seeds" },
];

const grainsPulses: ProductSeed[] = [
  { name: "Toor Dal", subcategory: "Pulses" }, { name: "Toor Whole", subcategory: "Pulses" },
  { name: "Toor Dal Kurunai", subcategory: "Pulses" }, { name: "Urad Dal", subcategory: "Pulses" },
  { name: "Urad Whole", subcategory: "Pulses" }, { name: "Urad Gota", subcategory: "Pulses" },
  { name: "Urad Dal Split", subcategory: "Pulses" }, { name: "Moong Dal", subcategory: "Pulses" },
  { name: "Moong Whole", subcategory: "Pulses" }, { name: "Green Gram", subcategory: "Pulses" },
  { name: "Black Gram", subcategory: "Pulses" }, { name: "Chana Dal", subcategory: "Pulses" },
  { name: "Bengal Gram", subcategory: "Pulses" }, { name: "Masoor Dal", subcategory: "Pulses" },
  { name: "Horse Gram", subcategory: "Pulses" }, { name: "Cow Peas", subcategory: "Pulses" },
  { name: "White Peas", subcategory: "Pulses" }, { name: "Green Peas", subcategory: "Pulses" },
  { name: "Dried Peas", subcategory: "Pulses" }, { name: "White Pattani", subcategory: "Pulses" },
  { name: "Kabuli Chana", subcategory: "Pulses" }, { name: "Black Chana", subcategory: "Pulses" },
  { name: "Rajma", subcategory: "Pulses" }, { name: "Soya Beans", subcategory: "Pulses" },
  { name: "Moth Dal", subcategory: "Pulses" }, { name: "Roasted Gram", subcategory: "Pulses" },
  { name: "Fried Gram", subcategory: "Pulses" }, { name: "Seval Kadalai", subcategory: "Pulses" },
  { name: "Wheat", subcategory: "Grains" }, { name: "Broken Wheat", subcategory: "Grains" },
  { name: "Wheat Rava", subcategory: "Grains" }, { name: "Maize", subcategory: "Grains" },
  { name: "Maize Grits", subcategory: "Grains" }, { name: "Barley", subcategory: "Grains" },
  { name: "Poha / Aval", subcategory: "Grains" }, { name: "Rice Rava", subcategory: "Grains" },
  { name: "Sago / Sabudana", subcategory: "Grains" },
  { name: "Ragi", subcategory: "Millets" }, { name: "Bajra", subcategory: "Millets" },
  { name: "Jowar", subcategory: "Millets" }, { name: "Foxtail Millet", subcategory: "Millets" },
  { name: "Little Millet", subcategory: "Millets" }, { name: "Kodo Millet", subcategory: "Millets" },
  { name: "Barnyard Millet", subcategory: "Millets" }, { name: "Proso Millet", subcategory: "Millets" },
];

const riceLentils: ProductSeed[] = [
  { name: "Raw Rice", subcategory: "Rice" }, { name: "Boiled Rice", subcategory: "Rice" },
  { name: "Ponni Rice", subcategory: "Rice" }, { name: "Idli Rice", subcategory: "Rice" },
  { name: "Basmati Rice", subcategory: "Rice" }, { name: "Sona Masuri Rice", subcategory: "Rice" },
  { name: "Samba Rice", subcategory: "Rice" }, { name: "Broken Rice", subcategory: "Rice" },
  { name: "Toor Dal", subcategory: "Lentils" }, { name: "Urad Dal", subcategory: "Lentils" },
  { name: "Moong Dal", subcategory: "Lentils" }, { name: "Chana Dal", subcategory: "Lentils" },
  { name: "Masoor Dal", subcategory: "Lentils" },
];

const masala: ProductSeed[] = [
  { name: "Chilli Powder" }, { name: "Turmeric Powder" }, { name: "Coriander Powder" },
  { name: "Cumin Powder" }, { name: "Black Pepper Powder" }, { name: "Garam Masala" },
  { name: "Sambar Powder" }, { name: "Rasam Powder" }, { name: "Curry Powder" },
  { name: "Biryani Masala" }, { name: "Chicken Masala" }, { name: "Mutton Masala" },
  { name: "Fish Masala" }, { name: "Vegetable Masala" }, { name: "Chaat Masala" },
  { name: "Kitchen King Masala" },
];

const dryFruitsNuts: ProductSeed[] = [
  { name: "Cashew", subcategory: "Dry Fruits" }, { name: "Almond", subcategory: "Dry Fruits" },
  { name: "Raisins", subcategory: "Dry Fruits" }, { name: "Black Raisins", subcategory: "Dry Fruits" },
  { name: "Dates", subcategory: "Dry Fruits" }, { name: "Dry Dates", subcategory: "Dry Fruits" },
  { name: "Anjeer / Fig", subcategory: "Dry Fruits" }, { name: "Apricot", subcategory: "Dry Fruits" },
  { name: "Prunes", subcategory: "Dry Fruits" }, { name: "Cranberries", subcategory: "Dry Fruits" },
  { name: "Dried Blueberry", subcategory: "Dry Fruits" },
  { name: "Pistachio", subcategory: "Nuts" }, { name: "Walnut", subcategory: "Nuts" },
  { name: "Peanuts", subcategory: "Nuts" }, { name: "Pine Nuts", subcategory: "Nuts" },
  { name: "Brazil Nuts", subcategory: "Nuts" }, { name: "Hazelnuts", subcategory: "Nuts" },
  { name: "Pumpkin Seeds", subcategory: "Seeds" }, { name: "Sunflower Seeds", subcategory: "Seeds" },
  { name: "Melon Seeds", subcategory: "Seeds" }, { name: "Chia Seeds", subcategory: "Seeds" },
  { name: "Flax Seeds", subcategory: "Seeds" }, { name: "Sesame Seeds", subcategory: "Seeds" },
];

const oils: ProductSeed[] = [
  { name: "Sunflower Oil" }, { name: "Groundnut Oil" }, { name: "Palm Oil" },
  { name: "Rice Bran Oil" }, { name: "Sesame Oil" }, { name: "Coconut Oil" },
];

const attaFlourGrocery: ProductSeed[] = [
  { name: "Wheat Atta", subcategory: "Atta & Flour" }, { name: "Chakki Atta", subcategory: "Atta & Flour" },
  { name: "Maida", subcategory: "Atta & Flour" }, { name: "Sooji / Rava", subcategory: "Atta & Flour" },
  { name: "Rice Flour", subcategory: "Atta & Flour" }, { name: "Ragi Flour", subcategory: "Atta & Flour" },
  { name: "Gram Flour / Besan", subcategory: "Atta & Flour" }, { name: "Corn Flour", subcategory: "Atta & Flour" },
  { name: "Multigrain Atta", subcategory: "Atta & Flour" },
  { name: "Sugar", subcategory: "Sugar & Sweeteners" }, { name: "Brown Sugar", subcategory: "Sugar & Sweeteners" },
  { name: "Jaggery", subcategory: "Sugar & Sweeteners" }, { name: "Jaggery Powder", subcategory: "Sugar & Sweeteners" },
  { name: "Palm Jaggery", subcategory: "Sugar & Sweeteners" }, { name: "Kalkandu", subcategory: "Sugar & Sweeteners" },
  { name: "Salt", subcategory: "Other Grocery" }, { name: "Meal Maker – Small", subcategory: "Other Grocery" },
  { name: "Meal Maker – Big", subcategory: "Other Grocery" }, { name: "Vermicelli", subcategory: "Other Grocery" },
  { name: "Papad", subcategory: "Other Grocery" }, { name: "Appalam", subcategory: "Other Grocery" },
  { name: "Fryums", subcategory: "Other Grocery" }, { name: "Vadam", subcategory: "Other Grocery" },
];

export const PRODUCT_SEEDS: Record<string, ProductSeed[]> = {
  spices,
  "grains-pulses": grainsPulses,
  "rice-lentils": riceLentils,
  masala,
  "dry-fruits-nuts": dryFruitsNuts,
  oils,
  "atta-flour-grocery": attaFlourGrocery,
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[–—/]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function productDescription(name: string, categoryName: string): string {
  return `Bulk wholesale supply of ${name.toLowerCase()} — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our ${categoryName} range.`;
}
