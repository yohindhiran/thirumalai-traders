import fs from "fs";
import path from "path";

const DB_FILE = path.join(process.cwd(), "data", "database.json");
const SEED_SQL_FILE = path.join(process.cwd(), "supabase", "seed.sql");

const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));

function getPriceForProduct(name, catSlug) {
  const n = name.toLowerCase();
  if (catSlug === "spices") {
    if (n.includes("cardamom") || n.includes("elachi")) return 1850;
    if (n.includes("clove")) return 950;
    if (n.includes("pepper")) return 680;
    if (n.includes("star anise")) return 720;
    if (n.includes("cinnamon")) return 480;
    if (n.includes("mace") || n.includes("nutmeg")) return 1100;
    if (n.includes("cumin")) return 340;
    if (n.includes("fennel")) return 190;
    if (n.includes("mustard")) return 95;
    if (n.includes("fenugreek")) return 85;
    if (n.includes("coriander")) return 120;
    if (n.includes("turmeric")) return 160;
    if (n.includes("poppy") || n.includes("kasa kasa")) return 1400;
    if (n.includes("saffron")) return 3500;
    if (n.includes("asafoetida")) return 850;
    if (n.includes("sesame")) return 170;
    if (n.includes("tamarind")) return 140;
    return 180;
  }
  if (catSlug === "grains-pulses") {
    if (n.includes("toor")) return 155;
    if (n.includes("urad")) return 135;
    if (n.includes("moong")) return 125;
    if (n.includes("chana dal")) return 90;
    if (n.includes("kabuli chana")) return 140;
    if (n.includes("black chana")) return 85;
    if (n.includes("rajma")) return 130;
    if (n.includes("soya")) return 95;
    if (n.includes("peas") || n.includes("pattani")) return 75;
    if (n.includes("gram")) return 90;
    if (n.includes("wheat")) return 40;
    if (n.includes("millet") || n.includes("ragi") || n.includes("bajra") || n.includes("jowar")) return 48;
    if (n.includes("poha") || n.includes("aval")) return 52;
    if (n.includes("sabudana") || n.includes("sago")) return 78;
    return 80;
  }
  if (catSlug === "rice-lentils") {
    if (n.includes("basmati")) return 110;
    if (n.includes("ponni")) return 58;
    if (n.includes("sona masuri") || n.includes("sona masoori")) return 56;
    if (n.includes("raw rice")) return 48;
    if (n.includes("idli rice")) return 42;
    if (n.includes("boiled rice")) return 45;
    if (n.includes("samba")) return 62;
    if (n.includes("toor") || n.includes("urad")) return 145;
    return 52;
  }
  if (catSlug === "dry-fruits-nuts") {
    if (n.includes("almond") || n.includes("badam")) return 740;
    if (n.includes("cashew") || n.includes("kaju")) return 780;
    if (n.includes("pista") || n.includes("pistachio")) return 1150;
    if (n.includes("raisin") || n.includes("kishmish")) return 280;
    if (n.includes("walnut")) return 950;
    if (n.includes("dates")) return 220;
    if (n.includes("fig") || n.includes("anjeer")) return 890;
    return 550;
  }
  if (catSlug === "masala") {
    if (n.includes("garam masala")) return 320;
    if (n.includes("biryani masala") || n.includes("meat")) return 340;
    if (n.includes("sambar") || n.includes("rasam")) return 260;
    if (n.includes("chilli powder")) return 240;
    if (n.includes("coriander powder")) return 180;
    if (n.includes("turmeric powder")) return 160;
    if (n.includes("curry powder")) return 210;
    return 240;
  }
  if (catSlug === "oils") {
    if (n.includes("groundnut") || n.includes("peanut")) return 195;
    if (n.includes("sesame") || n.includes("gingelly")) return 280;
    if (n.includes("coconut")) return 220;
    if (n.includes("sunflower")) return 135;
    if (n.includes("mustard")) return 160;
    if (n.includes("castor")) return 180;
    return 155;
  }
  if (catSlug === "atta-flour-grocery") {
    if (n.includes("wheat atta") || n.includes("atta")) return 45;
    if (n.includes("maida")) return 42;
    if (n.includes("rava") || n.includes("sooji")) return 46;
    if (n.includes("besan") || n.includes("gram flour")) return 88;
    if (n.includes("rice flour")) return 44;
    if (n.includes("sugar")) return 42;
    if (n.includes("jaggery")) return 65;
    if (n.includes("salt")) return 18;
    return 48;
  }
  return 90;
}

const catMap = new Map(data.categories.map((c) => [c.id, c.slug]));

// 1. Enrich all products with price, unit, stock, variants
data.products = data.products.map((p) => {
  const catSlug = catMap.get(p.categoryId) || "spices";
  const unit = catSlug === "oils" ? "L" : "kg";
  const price = p.price && p.price > 0 ? p.price : getPriceForProduct(p.name, catSlug);
  const stock = p.stock && p.stock > 0 ? p.stock : 250;

  const variants = [
    { size: `1 ${unit}`, price: price },
    { size: `5 ${unit}`, price: Math.round(price * 5 * 0.98) },
    { size: `25 ${unit} Sack`, price: Math.round(price * 25 * 0.94) },
    { size: `50 ${unit} Bulk Bag`, price: Math.round(price * 50 * 0.90) },
  ];

  return {
    ...p,
    price,
    stock,
    unit,
    variants,
  };
});

// 2. Ensure orders array exists
if (!Array.isArray(data.orders)) {
  data.orders = [];
}

// Write enriched data back to database.json
fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
console.log(`Updated ${data.products.length} products with wholesale pricing and variants.`);

// 3. Generate supabase/seed.sql
function sqlEscape(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  return "'" + String(val).replace(/'/g, "''") + "'";
}

let sql = `-- ============================================================================
-- Thirumalaai Traders - Seed Data for Supabase
-- Run this in Supabase SQL Editor to populate all categories, products & settings!
-- ============================================================================

-- Categories
`;

for (const c of data.categories) {
  sql += `INSERT INTO public.categories (id, slug, name, description, image, status, display_order, created_at, updated_at)
VALUES (${sqlEscape(c.id)}, ${sqlEscape(c.slug)}, ${sqlEscape(c.name)}, ${sqlEscape(c.description)}, ${sqlEscape(c.image || null)}, ${sqlEscape(c.status || "active")}, ${c.displayOrder || 1}, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order,
  updated_at = now();\n`;
}

sql += `\n-- Products\n`;
for (const p of data.products) {
  const imagesJson = JSON.stringify(p.images || (p.mainImage ? [p.mainImage] : []));
  const specsJson = JSON.stringify(p.specs || []);
  const variantsJson = JSON.stringify(p.variants || []);

  sql += `INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES (${sqlEscape(p.id)}, ${sqlEscape(p.slug)}, ${sqlEscape(p.name)}, ${sqlEscape(p.categoryId)}, ${sqlEscape(p.subcategory || null)}, ${sqlEscape(p.shortDescription || null)}, ${sqlEscape(p.description || "")}, ${sqlEscape(p.mainImage || null)}, ${sqlEscape(imagesJson)}::jsonb, ${sqlEscape(specsJson)}::jsonb, ${p.price || 0}, ${p.stock || 100}, ${sqlEscape(p.unit || "kg")}, ${sqlEscape(variantsJson)}::jsonb, ${sqlEscape(p.status || "active")}, ${p.displayOrder || 1}, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  price = EXCLUDED.price,
  stock = EXCLUDED.stock,
  unit = EXCLUDED.unit,
  variants = EXCLUDED.variants,
  description = EXCLUDED.description,
  main_image = EXCLUDED.main_image,
  images = EXCLUDED.images,
  status = EXCLUDED.status,
  updated_at = now();\n`;
}

// Site config
sql += `\n-- Site Configurations\n`;
if (data.siteSettings) {
  sql += `INSERT INTO public.site_config (key, value, updated_at) VALUES ('site_settings', ${sqlEscape(JSON.stringify(data.siteSettings))}::jsonb, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();\n`;
}
if (data.contactSettings) {
  sql += `INSERT INTO public.site_config (key, value, updated_at) VALUES ('contact_settings', ${sqlEscape(JSON.stringify(data.contactSettings))}::jsonb, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();\n`;
}
if (data.appearance) {
  sql += `INSERT INTO public.site_config (key, value, updated_at) VALUES ('appearance', ${sqlEscape(JSON.stringify(data.appearance))}::jsonb, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();\n`;
}
if (data.content) {
  sql += `INSERT INTO public.site_config (key, value, updated_at) VALUES ('content', ${sqlEscape(JSON.stringify(data.content))}::jsonb, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();\n`;
}

fs.writeFileSync(SEED_SQL_FILE, sql, "utf-8");
console.log(`Generated ${SEED_SQL_FILE} successfully (${Math.round(sql.length / 1024)} KB).`);
