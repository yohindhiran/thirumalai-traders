import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Load .env.local if present
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-project-id")) {
  console.log("\n⚠️  Supabase is not configured yet in .env.local.");
  console.log("To connect Supabase:");
  console.log("1. Go to https://supabase.com and create or open your project.");
  console.log("2. Copy Project URL and Anon/Service-Role Key into .env.local.");
  console.log("3. Run: npm run db:setup\n");
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log(`Connecting to Supabase at: ${supabaseUrl}`);

  const dbPath = path.join(process.cwd(), "data", "database.json");
  if (!fs.existsSync(dbPath)) {
    console.error("data/database.json not found!");
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  // 1. Categories
  console.log(`Upserting ${data.categories.length} categories...`);
  for (const cat of data.categories) {
    const { error } = await supabase.from("categories").upsert({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      description: cat.description || "",
      image: cat.image || null,
      status: cat.status || "active",
      display_order: cat.displayOrder || 1,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      console.warn(`Warning upserting category ${cat.name}:`, error.message);
    }
  }

  // 2. Products
  console.log(`Upserting ${data.products.length} products...`);
  const batchSize = 25;
  for (let i = 0; i < data.products.length; i += batchSize) {
    const batch = data.products.slice(i, i + batchSize).map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category_id: p.categoryId,
      subcategory: p.subcategory || null,
      short_description: p.shortDescription || null,
      description: p.description || "",
      main_image: p.mainImage || null,
      images: p.images || (p.mainImage ? [p.mainImage] : []),
      specs: p.specs || [],
      price: p.price || 0,
      stock: p.stock || 100,
      unit: p.unit || "kg",
      variants: p.variants || [],
      status: p.status || "active",
      display_order: p.displayOrder || 1,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("products").upsert(batch);
    if (error) {
      console.warn(`Warning upserting products batch ${i}-${i + batch.length}:`, error.message);
    }
  }

  // 3. Site Configs
  console.log("Upserting site configurations...");
  const configs = [
    { key: "site_settings", value: data.siteSettings },
    { key: "contact_settings", value: data.contactSettings },
    { key: "appearance", value: data.appearance },
    { key: "content", value: data.content },
  ];
  for (const cfg of configs) {
    if (cfg.value) {
      await supabase.from("site_config").upsert({
        key: cfg.key,
        value: cfg.value,
        updated_at: new Date().toISOString(),
      });
    }
  }

  console.log("\n✅ Supabase database setup completed successfully!");
}

main().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
