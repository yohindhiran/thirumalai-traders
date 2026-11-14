-- ============================================================================
-- Thirumalaai Traders - Seed Data for Supabase
-- Run this in Supabase SQL Editor to populate all categories, products & settings!
-- ============================================================================

-- Categories
INSERT INTO public.categories (id, slug, name, description, image, status, display_order, created_at, updated_at)
VALUES ('cat-spices', 'spices', 'Spices', 'Whole spices sourced for aroma, purity and consistent quality — supplied in bulk for canteens, kitchens and retail.', NULL, 'active', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order,
  updated_at = now();
INSERT INTO public.categories (id, slug, name, description, image, status, display_order, created_at, updated_at)
VALUES ('cat-grains-pulses', 'grains-pulses', 'Grains & Pulses', 'Dals, pulses, grains and millets in every major variety, cleaned and supplied at wholesale quantities.', NULL, 'active', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order,
  updated_at = now();
INSERT INTO public.categories (id, slug, name, description, image, status, display_order, created_at, updated_at)
VALUES ('cat-rice-lentils', 'rice-lentils', 'Rice & Lentils', 'Premium rice varieties and lentils for institutional kitchens, from Ponni and Idli rice to Basmati.', NULL, 'active', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order,
  updated_at = now();
INSERT INTO public.categories (id, slug, name, description, image, status, display_order, created_at, updated_at)
VALUES ('cat-masala', 'masala', 'Masala', 'Ground masalas and blended spice powders for large-scale cooking, available in bulk packs.', NULL, 'active', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order,
  updated_at = now();
INSERT INTO public.categories (id, slug, name, description, image, status, display_order, created_at, updated_at)
VALUES ('cat-dry-fruits-nuts', 'dry-fruits-nuts', 'Dry Fruits & Nuts', 'Dry fruits, nuts and seeds carefully selected for quality — ideal for sweets, baking and nutrition programs.', NULL, 'active', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order,
  updated_at = now();
INSERT INTO public.categories (id, slug, name, description, image, status, display_order, created_at, updated_at)
VALUES ('cat-oils', 'oils', 'Oils', 'Cooking oils in bulk tins and loose supply, including groundnut, sesame and coconut oil.', NULL, 'active', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order,
  updated_at = now();
INSERT INTO public.categories (id, slug, name, description, image, status, display_order, created_at, updated_at)
VALUES ('cat-atta-flour-grocery', 'atta-flour-grocery', 'Atta, Flour & Grocery', 'Flours, sweeteners and everyday grocery essentials for canteens, bakeries and retail shelves.', NULL, 'active', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order,
  updated_at = now();

-- Products
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-1', 'coriander-seeds', 'Coriander Seeds', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of coriander seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789795441868-78834a110588b030dee5c4dc.jpg"]'::jsonb, '[]'::jsonb, 120, 250, 'kg', '[{"size":"1 kg","price":120},{"size":"5 kg","price":588},{"size":"25 kg Sack","price":2820},{"size":"50 kg Bulk Bag","price":5400}]'::jsonb, 'active', 1, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-2', 'cumin-seeds', 'Cumin Seeds', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of cumin seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789809253541-94a04b717de694456c2da606.jpg"]'::jsonb, '[]'::jsonb, 340, 250, 'kg', '[{"size":"1 kg","price":340},{"size":"5 kg","price":1666},{"size":"25 kg Sack","price":7990},{"size":"50 kg Bulk Bag","price":15300}]'::jsonb, 'active', 2, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-3', 'fennel-seeds', 'Fennel Seeds', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of fennel seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789809583080-73969004a10cc243247ab616.jpg"]'::jsonb, '[]'::jsonb, 190, 250, 'kg', '[{"size":"1 kg","price":190},{"size":"5 kg","price":931},{"size":"25 kg Sack","price":4465},{"size":"50 kg Bulk Bag","price":8550}]'::jsonb, 'active', 3, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-4', 'fenugreek', 'Fenugreek', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of fenugreek — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789809592525-b212003e28486a142083848d.jpg"]'::jsonb, '[]'::jsonb, 85, 250, 'kg', '[{"size":"1 kg","price":85},{"size":"5 kg","price":417},{"size":"25 kg Sack","price":1998},{"size":"50 kg Bulk Bag","price":3825}]'::jsonb, 'active', 4, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-5', 'mustard-seeds', 'Mustard Seeds', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of mustard seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789809832851-46997a29836580ac7fa0a60e.jpg"]'::jsonb, '[]'::jsonb, 95, 250, 'kg', '[{"size":"1 kg","price":95},{"size":"5 kg","price":466},{"size":"25 kg Sack","price":2233},{"size":"50 kg Bulk Bag","price":4275}]'::jsonb, 'active', 5, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-6', 'black-pepper', 'Black Pepper', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of black pepper — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789809843913-98123844bd0efed9cda7007d.jpg"]'::jsonb, '[]'::jsonb, 680, 250, 'kg', '[{"size":"1 kg","price":680},{"size":"5 kg","price":3332},{"size":"25 kg Sack","price":15980},{"size":"50 kg Bulk Bag","price":30600}]'::jsonb, 'active', 6, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-7', 'white-pepper', 'White Pepper', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of white pepper — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 680, 250, 'kg', '[{"size":"1 kg","price":680},{"size":"5 kg","price":3332},{"size":"25 kg Sack","price":15980},{"size":"50 kg Bulk Bag","price":30600}]'::jsonb, 'active', 7, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-8', 'green-cardamom', 'Green Cardamom', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of green cardamom — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789809865996-db907dbc2c09aa0104286223.jpg"]'::jsonb, '[]'::jsonb, 1850, 250, 'kg', '[{"size":"1 kg","price":1850},{"size":"5 kg","price":9065},{"size":"25 kg Sack","price":43475},{"size":"50 kg Bulk Bag","price":83250}]'::jsonb, 'active', 8, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-9', 'black-cardamom', 'Black Cardamom', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of black cardamom — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 1850, 250, 'kg', '[{"size":"1 kg","price":1850},{"size":"5 kg","price":9065},{"size":"25 kg Sack","price":43475},{"size":"50 kg Bulk Bag","price":83250}]'::jsonb, 'active', 9, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-10', 'cloves', 'Cloves', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of cloves — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789795343895-f2e54fa755501fb1427d7edd.jpg"]'::jsonb, '[]'::jsonb, 950, 250, 'kg', '[{"size":"1 kg","price":950},{"size":"5 kg","price":4655},{"size":"25 kg Sack","price":22325},{"size":"50 kg Bulk Bag","price":42750}]'::jsonb, 'active', 10, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-11', 'cinnamon', 'Cinnamon', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of cinnamon — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789809980821-76841b5acd777059f71f1c99.jpg"]'::jsonb, '[]'::jsonb, 480, 250, 'kg', '[{"size":"1 kg","price":480},{"size":"5 kg","price":2352},{"size":"25 kg Sack","price":11280},{"size":"50 kg Bulk Bag","price":21600}]'::jsonb, 'active', 11, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-12', 'star-anise', 'Star Anise', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of star anise — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789810008162-451da75dc600182ab895d51e.jpg"]'::jsonb, '[]'::jsonb, 720, 250, 'kg', '[{"size":"1 kg","price":720},{"size":"5 kg","price":3528},{"size":"25 kg Sack","price":16920},{"size":"50 kg Bulk Bag","price":32400}]'::jsonb, 'active', 12, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-13', 'bay-leaf', 'Bay Leaf', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of bay leaf — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789810038187-7d248c6d304b6a40a3c5927c.jpg"]'::jsonb, '[]'::jsonb, 180, 250, 'kg', '[{"size":"1 kg","price":180},{"size":"5 kg","price":882},{"size":"25 kg Sack","price":4230},{"size":"50 kg Bulk Bag","price":8100}]'::jsonb, 'active', 13, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-14', 'dry-red-chilli', 'Dry Red Chilli', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of dry red chilli — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 180, 250, 'kg', '[{"size":"1 kg","price":180},{"size":"5 kg","price":882},{"size":"25 kg Sack","price":4230},{"size":"50 kg Bulk Bag","price":8100}]'::jsonb, 'active', 14, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-15', 'turmeric', 'Turmeric', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of turmeric — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 160, 250, 'kg', '[{"size":"1 kg","price":160},{"size":"5 kg","price":784},{"size":"25 kg Sack","price":3760},{"size":"50 kg Bulk Bag","price":7200}]'::jsonb, 'active', 15, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-16', 'ajwain', 'Ajwain', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of ajwain — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789810106016-1f3b9a3c2306b18a25be4787.jpg"]'::jsonb, '[]'::jsonb, 180, 250, 'kg', '[{"size":"1 kg","price":180},{"size":"5 kg","price":882},{"size":"25 kg Sack","price":4230},{"size":"50 kg Bulk Bag","price":8100}]'::jsonb, 'active', 16, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-17', 'kalonji', 'Kalonji', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of kalonji — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 180, 250, 'kg', '[{"size":"1 kg","price":180},{"size":"5 kg","price":882},{"size":"25 kg Sack","price":4230},{"size":"50 kg Bulk Bag","price":8100}]'::jsonb, 'active', 17, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-18', 'poppy-seeds', 'Poppy Seeds', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of poppy seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 1400, 250, 'kg', '[{"size":"1 kg","price":1400},{"size":"5 kg","price":6860},{"size":"25 kg Sack","price":32900},{"size":"50 kg Bulk Bag","price":63000}]'::jsonb, 'active', 18, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-19', 'mace', 'Mace', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of mace — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 1100, 250, 'kg', '[{"size":"1 kg","price":1100},{"size":"5 kg","price":5390},{"size":"25 kg Sack","price":25850},{"size":"50 kg Bulk Bag","price":49500}]'::jsonb, 'active', 19, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-20', 'nutmeg', 'Nutmeg', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of nutmeg — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 1100, 250, 'kg', '[{"size":"1 kg","price":1100},{"size":"5 kg","price":5390},{"size":"25 kg Sack","price":25850},{"size":"50 kg Bulk Bag","price":49500}]'::jsonb, 'active', 20, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-21', 'dry-ginger', 'Dry Ginger', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of dry ginger — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 180, 250, 'kg', '[{"size":"1 kg","price":180},{"size":"5 kg","price":882},{"size":"25 kg Sack","price":4230},{"size":"50 kg Bulk Bag","price":8100}]'::jsonb, 'active', 21, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-22', 'stone-flower', 'Stone Flower', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of stone flower — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 180, 250, 'kg', '[{"size":"1 kg","price":180},{"size":"5 kg","price":882},{"size":"25 kg Sack","price":4230},{"size":"50 kg Bulk Bag","price":8100}]'::jsonb, 'active', 22, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-23', 'marathi-moggu', 'Marathi Moggu', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of marathi moggu — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 180, 250, 'kg', '[{"size":"1 kg","price":180},{"size":"5 kg","price":882},{"size":"25 kg Sack","price":4230},{"size":"50 kg Bulk Bag","price":8100}]'::jsonb, 'active', 23, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-24', 'anardana', 'Anardana', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of anardana — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 180, 250, 'kg', '[{"size":"1 kg","price":180},{"size":"5 kg","price":882},{"size":"25 kg Sack","price":4230},{"size":"50 kg Bulk Bag","price":8100}]'::jsonb, 'active', 24, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-25', 'asafoetida', 'Asafoetida', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of asafoetida — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '[]'::jsonb, '[]'::jsonb, 850, 250, 'kg', '[{"size":"1 kg","price":850},{"size":"5 kg","price":4165},{"size":"25 kg Sack","price":19975},{"size":"50 kg Bulk Bag","price":38250}]'::jsonb, 'active', 25, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-26', 'tamarind', 'Tamarind', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of tamarind — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789811000011-d271fc16013781a2afe4363c.jpg"]'::jsonb, '[]'::jsonb, 140, 250, 'kg', '[{"size":"1 kg","price":140},{"size":"5 kg","price":686},{"size":"25 kg Sack","price":3290},{"size":"50 kg Bulk Bag","price":6300}]'::jsonb, 'active', 26, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-27', 'kokum', 'Kokum', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of kokum — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789811008813-adb3639ad8e1563694d20cb8.jpg"]'::jsonb, '[]'::jsonb, 180, 250, 'kg', '[{"size":"1 kg","price":180},{"size":"5 kg","price":882},{"size":"25 kg Sack","price":4230},{"size":"50 kg Bulk Bag","price":8100}]'::jsonb, 'active', 27, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-28', 'saffron', 'Saffron', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of saffron — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789811017637-a0e1c0fd14dda74bb7098888.jpg"]'::jsonb, '[]'::jsonb, 3500, 250, 'kg', '[{"size":"1 kg","price":3500},{"size":"5 kg","price":17150},{"size":"25 kg Sack","price":82250},{"size":"50 kg Bulk Bag","price":157500}]'::jsonb, 'active', 28, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-29', 'curry-leaves', 'Curry Leaves', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of curry leaves — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789811126684-d1a04aeb82c4cdf7eae6280c.jpg"]'::jsonb, '[]'::jsonb, 180, 250, 'kg', '[{"size":"1 kg","price":180},{"size":"5 kg","price":882},{"size":"25 kg Sack","price":4230},{"size":"50 kg Bulk Bag","price":8100}]'::jsonb, 'active', 29, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-30', 'sesame-seeds', 'Sesame Seeds', 'cat-spices', NULL, NULL, 'Bulk wholesale supply of sesame seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Spices range.', NULL, '["/images/uploads/1789811097278-3c94bb549d3c3381764bfe53.jpg"]'::jsonb, '[]'::jsonb, 170, 250, 'kg', '[{"size":"1 kg","price":170},{"size":"5 kg","price":833},{"size":"25 kg Sack","price":3995},{"size":"50 kg Bulk Bag","price":7650}]'::jsonb, 'active', 30, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-31', 'toor-dal', 'Toor Dal', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of toor dal — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '["/images/uploads/1789810299145-2555554eb259fa0441a15bd2.jpg"]'::jsonb, '[]'::jsonb, 155, 250, 'kg', '[{"size":"1 kg","price":155},{"size":"5 kg","price":760},{"size":"25 kg Sack","price":3643},{"size":"50 kg Bulk Bag","price":6975}]'::jsonb, 'active', 31, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-32', 'toor-whole', 'Toor Whole', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of toor whole — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 155, 250, 'kg', '[{"size":"1 kg","price":155},{"size":"5 kg","price":760},{"size":"25 kg Sack","price":3643},{"size":"50 kg Bulk Bag","price":6975}]'::jsonb, 'active', 32, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-33', 'toor-dal-kurunai', 'Toor Dal Kurunai', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of toor dal kurunai — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 155, 250, 'kg', '[{"size":"1 kg","price":155},{"size":"5 kg","price":760},{"size":"25 kg Sack","price":3643},{"size":"50 kg Bulk Bag","price":6975}]'::jsonb, 'active', 33, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-34', 'urad-dal', 'Urad Dal', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of urad dal — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 135, 250, 'kg', '[{"size":"1 kg","price":135},{"size":"5 kg","price":662},{"size":"25 kg Sack","price":3173},{"size":"50 kg Bulk Bag","price":6075}]'::jsonb, 'active', 34, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-35', 'urad-whole', 'Urad Whole', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of urad whole — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '["/images/uploads/1789811171814-96f5be2533a14d3846eaa5fa.jpg"]'::jsonb, '[]'::jsonb, 135, 250, 'kg', '[{"size":"1 kg","price":135},{"size":"5 kg","price":662},{"size":"25 kg Sack","price":3173},{"size":"50 kg Bulk Bag","price":6075}]'::jsonb, 'active', 35, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-36', 'urad-gota', 'Urad Gota', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of urad gota — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 135, 250, 'kg', '[{"size":"1 kg","price":135},{"size":"5 kg","price":662},{"size":"25 kg Sack","price":3173},{"size":"50 kg Bulk Bag","price":6075}]'::jsonb, 'active', 36, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-37', 'urad-dal-split', 'Urad Dal Split', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of urad dal split — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '["/images/uploads/1789811201644-3b2f3cd132a5df8f467b292b.jpg"]'::jsonb, '[]'::jsonb, 135, 250, 'kg', '[{"size":"1 kg","price":135},{"size":"5 kg","price":662},{"size":"25 kg Sack","price":3173},{"size":"50 kg Bulk Bag","price":6075}]'::jsonb, 'active', 37, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-38', 'moong-dal', 'Moong Dal', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of moong dal — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 125, 250, 'kg', '[{"size":"1 kg","price":125},{"size":"5 kg","price":613},{"size":"25 kg Sack","price":2938},{"size":"50 kg Bulk Bag","price":5625}]'::jsonb, 'active', 38, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-39', 'moong-whole', 'Moong Whole', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of moong whole — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '["/images/uploads/1789811253687-772770d9d9aea52292fa1fbc.jpg"]'::jsonb, '[]'::jsonb, 125, 250, 'kg', '[{"size":"1 kg","price":125},{"size":"5 kg","price":613},{"size":"25 kg Sack","price":2938},{"size":"50 kg Bulk Bag","price":5625}]'::jsonb, 'active', 39, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-40', 'green-gram', 'Green Gram', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of green gram — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '["/images/uploads/1789811308982-3c56d305c5460851724ae024.jpg"]'::jsonb, '[]'::jsonb, 90, 250, 'kg', '[{"size":"1 kg","price":90},{"size":"5 kg","price":441},{"size":"25 kg Sack","price":2115},{"size":"50 kg Bulk Bag","price":4050}]'::jsonb, 'active', 40, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-41', 'black-gram', 'Black Gram', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of black gram — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 90, 250, 'kg', '[{"size":"1 kg","price":90},{"size":"5 kg","price":441},{"size":"25 kg Sack","price":2115},{"size":"50 kg Bulk Bag","price":4050}]'::jsonb, 'active', 41, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-42', 'chana-dal', 'Chana Dal', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of chana dal — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 90, 250, 'kg', '[{"size":"1 kg","price":90},{"size":"5 kg","price":441},{"size":"25 kg Sack","price":2115},{"size":"50 kg Bulk Bag","price":4050}]'::jsonb, 'active', 42, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-43', 'bengal-gram', 'Bengal Gram', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of bengal gram — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 90, 250, 'kg', '[{"size":"1 kg","price":90},{"size":"5 kg","price":441},{"size":"25 kg Sack","price":2115},{"size":"50 kg Bulk Bag","price":4050}]'::jsonb, 'active', 43, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-44', 'masoor-dal', 'Masoor Dal', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of masoor dal — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 80, 250, 'kg', '[{"size":"1 kg","price":80},{"size":"5 kg","price":392},{"size":"25 kg Sack","price":1880},{"size":"50 kg Bulk Bag","price":3600}]'::jsonb, 'active', 44, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-45', 'horse-gram', 'Horse Gram', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of horse gram — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 90, 250, 'kg', '[{"size":"1 kg","price":90},{"size":"5 kg","price":441},{"size":"25 kg Sack","price":2115},{"size":"50 kg Bulk Bag","price":4050}]'::jsonb, 'active', 45, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-46', 'cow-peas', 'Cow Peas', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of cow peas — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 75, 250, 'kg', '[{"size":"1 kg","price":75},{"size":"5 kg","price":368},{"size":"25 kg Sack","price":1763},{"size":"50 kg Bulk Bag","price":3375}]'::jsonb, 'active', 46, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-47', 'white-peas', 'White Peas', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of white peas — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 75, 250, 'kg', '[{"size":"1 kg","price":75},{"size":"5 kg","price":368},{"size":"25 kg Sack","price":1763},{"size":"50 kg Bulk Bag","price":3375}]'::jsonb, 'active', 47, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-48', 'green-peas', 'Green Peas', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of green peas — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 75, 250, 'kg', '[{"size":"1 kg","price":75},{"size":"5 kg","price":368},{"size":"25 kg Sack","price":1763},{"size":"50 kg Bulk Bag","price":3375}]'::jsonb, 'active', 48, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-49', 'dried-peas', 'Dried Peas', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of dried peas — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 75, 250, 'kg', '[{"size":"1 kg","price":75},{"size":"5 kg","price":368},{"size":"25 kg Sack","price":1763},{"size":"50 kg Bulk Bag","price":3375}]'::jsonb, 'active', 49, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-50', 'white-pattani', 'White Pattani', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of white pattani — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 75, 250, 'kg', '[{"size":"1 kg","price":75},{"size":"5 kg","price":368},{"size":"25 kg Sack","price":1763},{"size":"50 kg Bulk Bag","price":3375}]'::jsonb, 'active', 50, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-51', 'kabuli-chana', 'Kabuli Chana', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of kabuli chana — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 140, 250, 'kg', '[{"size":"1 kg","price":140},{"size":"5 kg","price":686},{"size":"25 kg Sack","price":3290},{"size":"50 kg Bulk Bag","price":6300}]'::jsonb, 'active', 51, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-52', 'black-chana', 'Black Chana', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of black chana — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 85, 250, 'kg', '[{"size":"1 kg","price":85},{"size":"5 kg","price":417},{"size":"25 kg Sack","price":1998},{"size":"50 kg Bulk Bag","price":3825}]'::jsonb, 'active', 52, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-53', 'rajma', 'Rajma', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of rajma — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 130, 250, 'kg', '[{"size":"1 kg","price":130},{"size":"5 kg","price":637},{"size":"25 kg Sack","price":3055},{"size":"50 kg Bulk Bag","price":5850}]'::jsonb, 'active', 53, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-54', 'soya-beans', 'Soya Beans', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of soya beans — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 95, 250, 'kg', '[{"size":"1 kg","price":95},{"size":"5 kg","price":466},{"size":"25 kg Sack","price":2233},{"size":"50 kg Bulk Bag","price":4275}]'::jsonb, 'active', 54, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-55', 'moth-dal', 'Moth Dal', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of moth dal — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 80, 250, 'kg', '[{"size":"1 kg","price":80},{"size":"5 kg","price":392},{"size":"25 kg Sack","price":1880},{"size":"50 kg Bulk Bag","price":3600}]'::jsonb, 'active', 55, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-56', 'roasted-gram', 'Roasted Gram', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of roasted gram — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 90, 250, 'kg', '[{"size":"1 kg","price":90},{"size":"5 kg","price":441},{"size":"25 kg Sack","price":2115},{"size":"50 kg Bulk Bag","price":4050}]'::jsonb, 'active', 56, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-57', 'fried-gram', 'Fried Gram', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of fried gram — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 90, 250, 'kg', '[{"size":"1 kg","price":90},{"size":"5 kg","price":441},{"size":"25 kg Sack","price":2115},{"size":"50 kg Bulk Bag","price":4050}]'::jsonb, 'active', 57, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-58', 'seval-kadalai', 'Seval Kadalai', 'cat-grains-pulses', 'Pulses', NULL, 'Bulk wholesale supply of seval kadalai — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 80, 250, 'kg', '[{"size":"1 kg","price":80},{"size":"5 kg","price":392},{"size":"25 kg Sack","price":1880},{"size":"50 kg Bulk Bag","price":3600}]'::jsonb, 'active', 58, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-59', 'wheat', 'Wheat', 'cat-grains-pulses', 'Grains', NULL, 'Bulk wholesale supply of wheat — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 40, 250, 'kg', '[{"size":"1 kg","price":40},{"size":"5 kg","price":196},{"size":"25 kg Sack","price":940},{"size":"50 kg Bulk Bag","price":1800}]'::jsonb, 'active', 59, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-60', 'broken-wheat', 'Broken Wheat', 'cat-grains-pulses', 'Grains', NULL, 'Bulk wholesale supply of broken wheat — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 40, 250, 'kg', '[{"size":"1 kg","price":40},{"size":"5 kg","price":196},{"size":"25 kg Sack","price":940},{"size":"50 kg Bulk Bag","price":1800}]'::jsonb, 'active', 60, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-61', 'wheat-rava', 'Wheat Rava', 'cat-grains-pulses', 'Grains', NULL, 'Bulk wholesale supply of wheat rava — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 40, 250, 'kg', '[{"size":"1 kg","price":40},{"size":"5 kg","price":196},{"size":"25 kg Sack","price":940},{"size":"50 kg Bulk Bag","price":1800}]'::jsonb, 'active', 61, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-62', 'maize', 'Maize', 'cat-grains-pulses', 'Grains', NULL, 'Bulk wholesale supply of maize — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 80, 250, 'kg', '[{"size":"1 kg","price":80},{"size":"5 kg","price":392},{"size":"25 kg Sack","price":1880},{"size":"50 kg Bulk Bag","price":3600}]'::jsonb, 'active', 62, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-63', 'maize-grits', 'Maize Grits', 'cat-grains-pulses', 'Grains', NULL, 'Bulk wholesale supply of maize grits — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 80, 250, 'kg', '[{"size":"1 kg","price":80},{"size":"5 kg","price":392},{"size":"25 kg Sack","price":1880},{"size":"50 kg Bulk Bag","price":3600}]'::jsonb, 'active', 63, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-64', 'barley', 'Barley', 'cat-grains-pulses', 'Grains', NULL, 'Bulk wholesale supply of barley — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 80, 250, 'kg', '[{"size":"1 kg","price":80},{"size":"5 kg","price":392},{"size":"25 kg Sack","price":1880},{"size":"50 kg Bulk Bag","price":3600}]'::jsonb, 'active', 64, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-65', 'poha-aval', 'Poha / Aval', 'cat-grains-pulses', 'Grains', NULL, 'Bulk wholesale supply of poha / aval — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 52, 250, 'kg', '[{"size":"1 kg","price":52},{"size":"5 kg","price":255},{"size":"25 kg Sack","price":1222},{"size":"50 kg Bulk Bag","price":2340}]'::jsonb, 'active', 65, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-66', 'rice-rava', 'Rice Rava', 'cat-grains-pulses', 'Grains', NULL, 'Bulk wholesale supply of rice rava — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 80, 250, 'kg', '[{"size":"1 kg","price":80},{"size":"5 kg","price":392},{"size":"25 kg Sack","price":1880},{"size":"50 kg Bulk Bag","price":3600}]'::jsonb, 'active', 66, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-67', 'sago-sabudana', 'Sago / Sabudana', 'cat-grains-pulses', 'Grains', NULL, 'Bulk wholesale supply of sago / sabudana — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 78, 250, 'kg', '[{"size":"1 kg","price":78},{"size":"5 kg","price":382},{"size":"25 kg Sack","price":1833},{"size":"50 kg Bulk Bag","price":3510}]'::jsonb, 'active', 67, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-68', 'ragi', 'Ragi', 'cat-grains-pulses', 'Millets', NULL, 'Bulk wholesale supply of ragi — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 68, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-69', 'bajra', 'Bajra', 'cat-grains-pulses', 'Millets', NULL, 'Bulk wholesale supply of bajra — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 69, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-70', 'jowar', 'Jowar', 'cat-grains-pulses', 'Millets', NULL, 'Bulk wholesale supply of jowar — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 70, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-71', 'foxtail-millet', 'Foxtail Millet', 'cat-grains-pulses', 'Millets', NULL, 'Bulk wholesale supply of foxtail millet — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 71, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-72', 'little-millet', 'Little Millet', 'cat-grains-pulses', 'Millets', NULL, 'Bulk wholesale supply of little millet — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 72, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-73', 'kodo-millet', 'Kodo Millet', 'cat-grains-pulses', 'Millets', NULL, 'Bulk wholesale supply of kodo millet — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 73, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-74', 'barnyard-millet', 'Barnyard Millet', 'cat-grains-pulses', 'Millets', NULL, 'Bulk wholesale supply of barnyard millet — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 74, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-75', 'proso-millet', 'Proso Millet', 'cat-grains-pulses', 'Millets', NULL, 'Bulk wholesale supply of proso millet — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Grains & Pulses range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 75, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-76', 'raw-rice', 'Raw Rice', 'cat-rice-lentils', 'Rice', NULL, 'Bulk wholesale supply of raw rice — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 76, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-77', 'boiled-rice', 'Boiled Rice', 'cat-rice-lentils', 'Rice', NULL, 'Bulk wholesale supply of boiled rice — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 45, 250, 'kg', '[{"size":"1 kg","price":45},{"size":"5 kg","price":221},{"size":"25 kg Sack","price":1058},{"size":"50 kg Bulk Bag","price":2025}]'::jsonb, 'active', 77, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-78', 'ponni-rice', 'Ponni Rice', 'cat-rice-lentils', 'Rice', NULL, 'Bulk wholesale supply of ponni rice — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 58, 250, 'kg', '[{"size":"1 kg","price":58},{"size":"5 kg","price":284},{"size":"25 kg Sack","price":1363},{"size":"50 kg Bulk Bag","price":2610}]'::jsonb, 'active', 78, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-79', 'idli-rice', 'Idli Rice', 'cat-rice-lentils', 'Rice', NULL, 'Bulk wholesale supply of idli rice — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 42, 250, 'kg', '[{"size":"1 kg","price":42},{"size":"5 kg","price":206},{"size":"25 kg Sack","price":987},{"size":"50 kg Bulk Bag","price":1890}]'::jsonb, 'active', 79, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-80', 'basmati-rice', 'Basmati Rice', 'cat-rice-lentils', 'Rice', NULL, 'Bulk wholesale supply of basmati rice — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 110, 250, 'kg', '[{"size":"1 kg","price":110},{"size":"5 kg","price":539},{"size":"25 kg Sack","price":2585},{"size":"50 kg Bulk Bag","price":4950}]'::jsonb, 'active', 80, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-81', 'sona-masuri-rice', 'Sona Masuri Rice', 'cat-rice-lentils', 'Rice', NULL, 'Bulk wholesale supply of sona masuri rice — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 56, 250, 'kg', '[{"size":"1 kg","price":56},{"size":"5 kg","price":274},{"size":"25 kg Sack","price":1316},{"size":"50 kg Bulk Bag","price":2520}]'::jsonb, 'active', 81, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-82', 'samba-rice', 'Samba Rice', 'cat-rice-lentils', 'Rice', NULL, 'Bulk wholesale supply of samba rice — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 62, 250, 'kg', '[{"size":"1 kg","price":62},{"size":"5 kg","price":304},{"size":"25 kg Sack","price":1457},{"size":"50 kg Bulk Bag","price":2790}]'::jsonb, 'active', 82, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-83', 'broken-rice', 'Broken Rice', 'cat-rice-lentils', 'Rice', NULL, 'Bulk wholesale supply of broken rice — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 52, 250, 'kg', '[{"size":"1 kg","price":52},{"size":"5 kg","price":255},{"size":"25 kg Sack","price":1222},{"size":"50 kg Bulk Bag","price":2340}]'::jsonb, 'active', 83, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-84', 'toor-dal', 'Toor Dal', 'cat-rice-lentils', 'Lentils', NULL, 'Bulk wholesale supply of toor dal — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 145, 250, 'kg', '[{"size":"1 kg","price":145},{"size":"5 kg","price":711},{"size":"25 kg Sack","price":3408},{"size":"50 kg Bulk Bag","price":6525}]'::jsonb, 'active', 84, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-85', 'urad-dal', 'Urad Dal', 'cat-rice-lentils', 'Lentils', NULL, 'Bulk wholesale supply of urad dal — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 145, 250, 'kg', '[{"size":"1 kg","price":145},{"size":"5 kg","price":711},{"size":"25 kg Sack","price":3408},{"size":"50 kg Bulk Bag","price":6525}]'::jsonb, 'active', 85, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-86', 'moong-dal', 'Moong Dal', 'cat-rice-lentils', 'Lentils', NULL, 'Bulk wholesale supply of moong dal — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 52, 250, 'kg', '[{"size":"1 kg","price":52},{"size":"5 kg","price":255},{"size":"25 kg Sack","price":1222},{"size":"50 kg Bulk Bag","price":2340}]'::jsonb, 'active', 86, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-87', 'chana-dal', 'Chana Dal', 'cat-rice-lentils', 'Lentils', NULL, 'Bulk wholesale supply of chana dal — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 52, 250, 'kg', '[{"size":"1 kg","price":52},{"size":"5 kg","price":255},{"size":"25 kg Sack","price":1222},{"size":"50 kg Bulk Bag","price":2340}]'::jsonb, 'active', 87, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-88', 'masoor-dal', 'Masoor Dal', 'cat-rice-lentils', 'Lentils', NULL, 'Bulk wholesale supply of masoor dal — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Rice & Lentils range.', NULL, '[]'::jsonb, '[]'::jsonb, 52, 250, 'kg', '[{"size":"1 kg","price":52},{"size":"5 kg","price":255},{"size":"25 kg Sack","price":1222},{"size":"50 kg Bulk Bag","price":2340}]'::jsonb, 'active', 88, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-89', 'chilli-powder', 'Chilli Powder', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of chilli powder — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 240, 250, 'kg', '[{"size":"1 kg","price":240},{"size":"5 kg","price":1176},{"size":"25 kg Sack","price":5640},{"size":"50 kg Bulk Bag","price":10800}]'::jsonb, 'active', 89, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-90', 'turmeric-powder', 'Turmeric Powder', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of turmeric powder — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 160, 250, 'kg', '[{"size":"1 kg","price":160},{"size":"5 kg","price":784},{"size":"25 kg Sack","price":3760},{"size":"50 kg Bulk Bag","price":7200}]'::jsonb, 'active', 90, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-91', 'coriander-powder', 'Coriander Powder', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of coriander powder — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 180, 250, 'kg', '[{"size":"1 kg","price":180},{"size":"5 kg","price":882},{"size":"25 kg Sack","price":4230},{"size":"50 kg Bulk Bag","price":8100}]'::jsonb, 'active', 91, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-92', 'cumin-powder', 'Cumin Powder', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of cumin powder — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 240, 250, 'kg', '[{"size":"1 kg","price":240},{"size":"5 kg","price":1176},{"size":"25 kg Sack","price":5640},{"size":"50 kg Bulk Bag","price":10800}]'::jsonb, 'active', 92, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-93', 'black-pepper-powder', 'Black Pepper Powder', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of black pepper powder — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 240, 250, 'kg', '[{"size":"1 kg","price":240},{"size":"5 kg","price":1176},{"size":"25 kg Sack","price":5640},{"size":"50 kg Bulk Bag","price":10800}]'::jsonb, 'active', 93, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-94', 'garam-masala', 'Garam Masala', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of garam masala — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 320, 250, 'kg', '[{"size":"1 kg","price":320},{"size":"5 kg","price":1568},{"size":"25 kg Sack","price":7520},{"size":"50 kg Bulk Bag","price":14400}]'::jsonb, 'active', 94, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-95', 'sambar-powder', 'Sambar Powder', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of sambar powder — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 260, 250, 'kg', '[{"size":"1 kg","price":260},{"size":"5 kg","price":1274},{"size":"25 kg Sack","price":6110},{"size":"50 kg Bulk Bag","price":11700}]'::jsonb, 'active', 95, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-96', 'rasam-powder', 'Rasam Powder', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of rasam powder — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 260, 250, 'kg', '[{"size":"1 kg","price":260},{"size":"5 kg","price":1274},{"size":"25 kg Sack","price":6110},{"size":"50 kg Bulk Bag","price":11700}]'::jsonb, 'active', 96, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-97', 'curry-powder', 'Curry Powder', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of curry powder — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 210, 250, 'kg', '[{"size":"1 kg","price":210},{"size":"5 kg","price":1029},{"size":"25 kg Sack","price":4935},{"size":"50 kg Bulk Bag","price":9450}]'::jsonb, 'active', 97, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-98', 'biryani-masala', 'Biryani Masala', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of biryani masala — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 340, 250, 'kg', '[{"size":"1 kg","price":340},{"size":"5 kg","price":1666},{"size":"25 kg Sack","price":7990},{"size":"50 kg Bulk Bag","price":15300}]'::jsonb, 'active', 98, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-99', 'chicken-masala', 'Chicken Masala', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of chicken masala — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 240, 250, 'kg', '[{"size":"1 kg","price":240},{"size":"5 kg","price":1176},{"size":"25 kg Sack","price":5640},{"size":"50 kg Bulk Bag","price":10800}]'::jsonb, 'active', 99, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-100', 'mutton-masala', 'Mutton Masala', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of mutton masala — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 240, 250, 'kg', '[{"size":"1 kg","price":240},{"size":"5 kg","price":1176},{"size":"25 kg Sack","price":5640},{"size":"50 kg Bulk Bag","price":10800}]'::jsonb, 'active', 100, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-101', 'fish-masala', 'Fish Masala', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of fish masala — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 240, 250, 'kg', '[{"size":"1 kg","price":240},{"size":"5 kg","price":1176},{"size":"25 kg Sack","price":5640},{"size":"50 kg Bulk Bag","price":10800}]'::jsonb, 'active', 101, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-102', 'vegetable-masala', 'Vegetable Masala', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of vegetable masala — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 240, 250, 'kg', '[{"size":"1 kg","price":240},{"size":"5 kg","price":1176},{"size":"25 kg Sack","price":5640},{"size":"50 kg Bulk Bag","price":10800}]'::jsonb, 'active', 102, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-103', 'chaat-masala', 'Chaat Masala', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of chaat masala — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 240, 250, 'kg', '[{"size":"1 kg","price":240},{"size":"5 kg","price":1176},{"size":"25 kg Sack","price":5640},{"size":"50 kg Bulk Bag","price":10800}]'::jsonb, 'active', 103, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-104', 'kitchen-king-masala', 'Kitchen King Masala', 'cat-masala', NULL, NULL, 'Bulk wholesale supply of kitchen king masala — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Masala range.', NULL, '[]'::jsonb, '[]'::jsonb, 240, 250, 'kg', '[{"size":"1 kg","price":240},{"size":"5 kg","price":1176},{"size":"25 kg Sack","price":5640},{"size":"50 kg Bulk Bag","price":10800}]'::jsonb, 'active', 104, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-105', 'cashew', 'Cashew', 'cat-dry-fruits-nuts', 'Dry Fruits', NULL, 'Bulk wholesale supply of cashew — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 780, 250, 'kg', '[{"size":"1 kg","price":780},{"size":"5 kg","price":3822},{"size":"25 kg Sack","price":18330},{"size":"50 kg Bulk Bag","price":35100}]'::jsonb, 'active', 105, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-106', 'almond', 'Almond', 'cat-dry-fruits-nuts', 'Dry Fruits', NULL, 'Bulk wholesale supply of almond — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 740, 250, 'kg', '[{"size":"1 kg","price":740},{"size":"5 kg","price":3626},{"size":"25 kg Sack","price":17390},{"size":"50 kg Bulk Bag","price":33300}]'::jsonb, 'active', 106, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-107', 'raisins', 'Raisins', 'cat-dry-fruits-nuts', 'Dry Fruits', NULL, 'Bulk wholesale supply of raisins — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 280, 250, 'kg', '[{"size":"1 kg","price":280},{"size":"5 kg","price":1372},{"size":"25 kg Sack","price":6580},{"size":"50 kg Bulk Bag","price":12600}]'::jsonb, 'active', 107, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-108', 'black-raisins', 'Black Raisins', 'cat-dry-fruits-nuts', 'Dry Fruits', NULL, 'Bulk wholesale supply of black raisins — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 280, 250, 'kg', '[{"size":"1 kg","price":280},{"size":"5 kg","price":1372},{"size":"25 kg Sack","price":6580},{"size":"50 kg Bulk Bag","price":12600}]'::jsonb, 'active', 108, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-109', 'dates', 'Dates', 'cat-dry-fruits-nuts', 'Dry Fruits', NULL, 'Bulk wholesale supply of dates — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 220, 250, 'kg', '[{"size":"1 kg","price":220},{"size":"5 kg","price":1078},{"size":"25 kg Sack","price":5170},{"size":"50 kg Bulk Bag","price":9900}]'::jsonb, 'active', 109, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-110', 'dry-dates', 'Dry Dates', 'cat-dry-fruits-nuts', 'Dry Fruits', NULL, 'Bulk wholesale supply of dry dates — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 220, 250, 'kg', '[{"size":"1 kg","price":220},{"size":"5 kg","price":1078},{"size":"25 kg Sack","price":5170},{"size":"50 kg Bulk Bag","price":9900}]'::jsonb, 'active', 110, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-111', 'anjeer-fig', 'Anjeer / Fig', 'cat-dry-fruits-nuts', 'Dry Fruits', NULL, 'Bulk wholesale supply of anjeer / fig — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 890, 250, 'kg', '[{"size":"1 kg","price":890},{"size":"5 kg","price":4361},{"size":"25 kg Sack","price":20915},{"size":"50 kg Bulk Bag","price":40050}]'::jsonb, 'active', 111, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-112', 'apricot', 'Apricot', 'cat-dry-fruits-nuts', 'Dry Fruits', NULL, 'Bulk wholesale supply of apricot — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 112, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-113', 'prunes', 'Prunes', 'cat-dry-fruits-nuts', 'Dry Fruits', NULL, 'Bulk wholesale supply of prunes — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 113, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-114', 'cranberries', 'Cranberries', 'cat-dry-fruits-nuts', 'Dry Fruits', NULL, 'Bulk wholesale supply of cranberries — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 114, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-115', 'dried-blueberry', 'Dried Blueberry', 'cat-dry-fruits-nuts', 'Dry Fruits', NULL, 'Bulk wholesale supply of dried blueberry — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 115, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-116', 'pistachio', 'Pistachio', 'cat-dry-fruits-nuts', 'Nuts', NULL, 'Bulk wholesale supply of pistachio — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 1150, 250, 'kg', '[{"size":"1 kg","price":1150},{"size":"5 kg","price":5635},{"size":"25 kg Sack","price":27025},{"size":"50 kg Bulk Bag","price":51750}]'::jsonb, 'active', 116, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-117', 'walnut', 'Walnut', 'cat-dry-fruits-nuts', 'Nuts', NULL, 'Bulk wholesale supply of walnut — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 950, 250, 'kg', '[{"size":"1 kg","price":950},{"size":"5 kg","price":4655},{"size":"25 kg Sack","price":22325},{"size":"50 kg Bulk Bag","price":42750}]'::jsonb, 'active', 117, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-118', 'peanuts', 'Peanuts', 'cat-dry-fruits-nuts', 'Nuts', NULL, 'Bulk wholesale supply of peanuts — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 118, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-119', 'pine-nuts', 'Pine Nuts', 'cat-dry-fruits-nuts', 'Nuts', NULL, 'Bulk wholesale supply of pine nuts — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 119, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-120', 'brazil-nuts', 'Brazil Nuts', 'cat-dry-fruits-nuts', 'Nuts', NULL, 'Bulk wholesale supply of brazil nuts — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 120, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-121', 'hazelnuts', 'Hazelnuts', 'cat-dry-fruits-nuts', 'Nuts', NULL, 'Bulk wholesale supply of hazelnuts — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 121, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-122', 'pumpkin-seeds', 'Pumpkin Seeds', 'cat-dry-fruits-nuts', 'Seeds', NULL, 'Bulk wholesale supply of pumpkin seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 122, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-123', 'sunflower-seeds', 'Sunflower Seeds', 'cat-dry-fruits-nuts', 'Seeds', NULL, 'Bulk wholesale supply of sunflower seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 123, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-124', 'melon-seeds', 'Melon Seeds', 'cat-dry-fruits-nuts', 'Seeds', NULL, 'Bulk wholesale supply of melon seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 124, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-125', 'chia-seeds', 'Chia Seeds', 'cat-dry-fruits-nuts', 'Seeds', NULL, 'Bulk wholesale supply of chia seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 125, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-126', 'flax-seeds', 'Flax Seeds', 'cat-dry-fruits-nuts', 'Seeds', NULL, 'Bulk wholesale supply of flax seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 126, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-127', 'sesame-seeds', 'Sesame Seeds', 'cat-dry-fruits-nuts', 'Seeds', NULL, 'Bulk wholesale supply of sesame seeds — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Dry Fruits & Nuts range.', NULL, '[]'::jsonb, '[]'::jsonb, 550, 250, 'kg', '[{"size":"1 kg","price":550},{"size":"5 kg","price":2695},{"size":"25 kg Sack","price":12925},{"size":"50 kg Bulk Bag","price":24750}]'::jsonb, 'active', 127, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-128', 'sunflower-oil', 'Sunflower Oil', 'cat-oils', NULL, NULL, 'Bulk wholesale supply of sunflower oil — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Oils range.', NULL, '[]'::jsonb, '[]'::jsonb, 135, 250, 'L', '[{"size":"1 L","price":135},{"size":"5 L","price":662},{"size":"25 L Sack","price":3173},{"size":"50 L Bulk Bag","price":6075}]'::jsonb, 'active', 128, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-129', 'groundnut-oil', 'Groundnut Oil', 'cat-oils', NULL, NULL, 'Bulk wholesale supply of groundnut oil — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Oils range.', NULL, '[]'::jsonb, '[]'::jsonb, 195, 250, 'L', '[{"size":"1 L","price":195},{"size":"5 L","price":956},{"size":"25 L Sack","price":4583},{"size":"50 L Bulk Bag","price":8775}]'::jsonb, 'active', 129, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-130', 'palm-oil', 'Palm Oil', 'cat-oils', NULL, NULL, 'Bulk wholesale supply of palm oil — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Oils range.', NULL, '[]'::jsonb, '[]'::jsonb, 155, 250, 'L', '[{"size":"1 L","price":155},{"size":"5 L","price":760},{"size":"25 L Sack","price":3643},{"size":"50 L Bulk Bag","price":6975}]'::jsonb, 'active', 130, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-131', 'rice-bran-oil', 'Rice Bran Oil', 'cat-oils', NULL, NULL, 'Bulk wholesale supply of rice bran oil — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Oils range.', NULL, '[]'::jsonb, '[]'::jsonb, 155, 250, 'L', '[{"size":"1 L","price":155},{"size":"5 L","price":760},{"size":"25 L Sack","price":3643},{"size":"50 L Bulk Bag","price":6975}]'::jsonb, 'active', 131, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-132', 'sesame-oil', 'Sesame Oil', 'cat-oils', NULL, NULL, 'Bulk wholesale supply of sesame oil — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Oils range.', NULL, '[]'::jsonb, '[]'::jsonb, 280, 250, 'L', '[{"size":"1 L","price":280},{"size":"5 L","price":1372},{"size":"25 L Sack","price":6580},{"size":"50 L Bulk Bag","price":12600}]'::jsonb, 'active', 132, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-133', 'coconut-oil', 'Coconut Oil', 'cat-oils', NULL, NULL, 'Bulk wholesale supply of coconut oil — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Oils range.', NULL, '[]'::jsonb, '[]'::jsonb, 220, 250, 'L', '[{"size":"1 L","price":220},{"size":"5 L","price":1078},{"size":"25 L Sack","price":5170},{"size":"50 L Bulk Bag","price":9900}]'::jsonb, 'active', 133, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-134', 'wheat-atta', 'Wheat Atta', 'cat-atta-flour-grocery', 'Atta & Flour', NULL, 'Bulk wholesale supply of wheat atta — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 45, 250, 'kg', '[{"size":"1 kg","price":45},{"size":"5 kg","price":221},{"size":"25 kg Sack","price":1058},{"size":"50 kg Bulk Bag","price":2025}]'::jsonb, 'active', 134, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-135', 'chakki-atta', 'Chakki Atta', 'cat-atta-flour-grocery', 'Atta & Flour', NULL, 'Bulk wholesale supply of chakki atta — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 45, 250, 'kg', '[{"size":"1 kg","price":45},{"size":"5 kg","price":221},{"size":"25 kg Sack","price":1058},{"size":"50 kg Bulk Bag","price":2025}]'::jsonb, 'active', 135, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-136', 'maida', 'Maida', 'cat-atta-flour-grocery', 'Atta & Flour', NULL, 'Bulk wholesale supply of maida — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 42, 250, 'kg', '[{"size":"1 kg","price":42},{"size":"5 kg","price":206},{"size":"25 kg Sack","price":987},{"size":"50 kg Bulk Bag","price":1890}]'::jsonb, 'active', 136, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-137', 'sooji-rava', 'Sooji / Rava', 'cat-atta-flour-grocery', 'Atta & Flour', NULL, 'Bulk wholesale supply of sooji / rava — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 46, 250, 'kg', '[{"size":"1 kg","price":46},{"size":"5 kg","price":225},{"size":"25 kg Sack","price":1081},{"size":"50 kg Bulk Bag","price":2070}]'::jsonb, 'active', 137, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-138', 'rice-flour', 'Rice Flour', 'cat-atta-flour-grocery', 'Atta & Flour', NULL, 'Bulk wholesale supply of rice flour — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 44, 250, 'kg', '[{"size":"1 kg","price":44},{"size":"5 kg","price":216},{"size":"25 kg Sack","price":1034},{"size":"50 kg Bulk Bag","price":1980}]'::jsonb, 'active', 138, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-139', 'ragi-flour', 'Ragi Flour', 'cat-atta-flour-grocery', 'Atta & Flour', NULL, 'Bulk wholesale supply of ragi flour — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 139, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-140', 'gram-flour-besan', 'Gram Flour / Besan', 'cat-atta-flour-grocery', 'Atta & Flour', NULL, 'Bulk wholesale supply of gram flour / besan — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 88, 250, 'kg', '[{"size":"1 kg","price":88},{"size":"5 kg","price":431},{"size":"25 kg Sack","price":2068},{"size":"50 kg Bulk Bag","price":3960}]'::jsonb, 'active', 140, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-141', 'corn-flour', 'Corn Flour', 'cat-atta-flour-grocery', 'Atta & Flour', NULL, 'Bulk wholesale supply of corn flour — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 141, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-142', 'multigrain-atta', 'Multigrain Atta', 'cat-atta-flour-grocery', 'Atta & Flour', NULL, 'Bulk wholesale supply of multigrain atta — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 45, 250, 'kg', '[{"size":"1 kg","price":45},{"size":"5 kg","price":221},{"size":"25 kg Sack","price":1058},{"size":"50 kg Bulk Bag","price":2025}]'::jsonb, 'active', 142, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-143', 'sugar', 'Sugar', 'cat-atta-flour-grocery', 'Sugar & Sweeteners', NULL, 'Bulk wholesale supply of sugar — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 42, 250, 'kg', '[{"size":"1 kg","price":42},{"size":"5 kg","price":206},{"size":"25 kg Sack","price":987},{"size":"50 kg Bulk Bag","price":1890}]'::jsonb, 'active', 143, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-144', 'brown-sugar', 'Brown Sugar', 'cat-atta-flour-grocery', 'Sugar & Sweeteners', NULL, 'Bulk wholesale supply of brown sugar — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 42, 250, 'kg', '[{"size":"1 kg","price":42},{"size":"5 kg","price":206},{"size":"25 kg Sack","price":987},{"size":"50 kg Bulk Bag","price":1890}]'::jsonb, 'active', 144, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-145', 'jaggery', 'Jaggery', 'cat-atta-flour-grocery', 'Sugar & Sweeteners', NULL, 'Bulk wholesale supply of jaggery — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 65, 250, 'kg', '[{"size":"1 kg","price":65},{"size":"5 kg","price":319},{"size":"25 kg Sack","price":1528},{"size":"50 kg Bulk Bag","price":2925}]'::jsonb, 'active', 145, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-146', 'jaggery-powder', 'Jaggery Powder', 'cat-atta-flour-grocery', 'Sugar & Sweeteners', NULL, 'Bulk wholesale supply of jaggery powder — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 65, 250, 'kg', '[{"size":"1 kg","price":65},{"size":"5 kg","price":319},{"size":"25 kg Sack","price":1528},{"size":"50 kg Bulk Bag","price":2925}]'::jsonb, 'active', 146, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-147', 'palm-jaggery', 'Palm Jaggery', 'cat-atta-flour-grocery', 'Sugar & Sweeteners', NULL, 'Bulk wholesale supply of palm jaggery — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 65, 250, 'kg', '[{"size":"1 kg","price":65},{"size":"5 kg","price":319},{"size":"25 kg Sack","price":1528},{"size":"50 kg Bulk Bag","price":2925}]'::jsonb, 'active', 147, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-148', 'kalkandu', 'Kalkandu', 'cat-atta-flour-grocery', 'Sugar & Sweeteners', NULL, 'Bulk wholesale supply of kalkandu — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 148, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-149', 'salt', 'Salt', 'cat-atta-flour-grocery', 'Other Grocery', NULL, 'Bulk wholesale supply of salt — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 18, 250, 'kg', '[{"size":"1 kg","price":18},{"size":"5 kg","price":88},{"size":"25 kg Sack","price":423},{"size":"50 kg Bulk Bag","price":810}]'::jsonb, 'active', 149, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-150', 'meal-maker-small', 'Meal Maker – Small', 'cat-atta-flour-grocery', 'Other Grocery', NULL, 'Bulk wholesale supply of meal maker – small — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 150, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-151', 'meal-maker-big', 'Meal Maker – Big', 'cat-atta-flour-grocery', 'Other Grocery', NULL, 'Bulk wholesale supply of meal maker – big — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 151, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-152', 'vermicelli', 'Vermicelli', 'cat-atta-flour-grocery', 'Other Grocery', NULL, 'Bulk wholesale supply of vermicelli — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 152, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-153', 'papad', 'Papad', 'cat-atta-flour-grocery', 'Other Grocery', NULL, 'Bulk wholesale supply of papad — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 153, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-154', 'appalam', 'Appalam', 'cat-atta-flour-grocery', 'Other Grocery', NULL, 'Bulk wholesale supply of appalam — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 154, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-155', 'fryums', 'Fryums', 'cat-atta-flour-grocery', 'Other Grocery', NULL, 'Bulk wholesale supply of fryums — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 155, now(), now())
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
  updated_at = now();
INSERT INTO public.products (id, slug, name, category_id, subcategory, short_description, description, main_image, images, specs, price, stock, unit, variants, status, display_order, created_at, updated_at)
VALUES ('prod-156', 'vadam', 'Vadam', 'cat-atta-flour-grocery', 'Other Grocery', NULL, 'Bulk wholesale supply of vadam — quality-checked and packed for canteens, institutions, retail and bulk buyers. Part of our Atta, Flour & Grocery range.', NULL, '[]'::jsonb, '[]'::jsonb, 48, 250, 'kg', '[{"size":"1 kg","price":48},{"size":"5 kg","price":235},{"size":"25 kg Sack","price":1128},{"size":"50 kg Bulk Bag","price":2160}]'::jsonb, 'active', 156, now(), now())
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
  updated_at = now();

-- Site Configurations
INSERT INTO public.site_config (key, value, updated_at) VALUES ('site_settings', '{"companyName":"Thirumalaai Traders","phone":"93844 82007","whatsapp":"919384482007","email":"thirumalaaigroupofcompanies@gmail.com","addressLine1":"Varakappar Street, Janakiammal Layout,","addressLine2":"Karungalpalayam, Erode,","addressState":"Tamil Nadu – 638003, India","footerText":"Trusted wholesale grocery supplier with 25+ years of experience serving institutions, industries, mills, grocery shops and bulk customers across Erode, Tamil Nadu.","copyrightYear":"2026","logo":""}'::jsonb, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
INSERT INTO public.site_config (key, value, updated_at) VALUES ('contact_settings', '{"phone":"93844 82007","whatsapp":"919384482007","email":"thirumalaaigroupofcompanies@gmail.com","addressLine1":"Varakappar Street, Janakiammal Layout,","addressLine2":"Karungalpalayam, Erode,","addressState":"Tamil Nadu – 638003, India","businessHours":"Monday – Saturday: 8:00 AM – 8:00 PM"}'::jsonb, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
INSERT INTO public.site_config (key, value, updated_at) VALUES ('appearance', '{"themeId":"classic-white"}'::jsonb, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
INSERT INTO public.site_config (key, value, updated_at) VALUES ('content', '{"heroHeadline":"Serving Quality. Delivering Trust.","heroSubtext":"Your Trusted Wholesale Partner for School, College & Industrial Canteens.","aboutPreview":"Thirumalaai Traders is a trusted wholesale grocery supplier in Erode with 25+ years of experience.\nWe supply quality grocery and food products to schools, colleges, industries, mills and grocery shops.\nOur wide product range is carefully selected to meet everyday and bulk requirements.\nWe focus on delivering consistent quality at competitive wholesale prices.\nWith reliable sourcing and timely delivery, we support businesses and institutions with confidence.\nOur experienced team understands the needs of bulk customers and provides dependable service.\nWe believe in building long-term relationships through quality, trust and commitment.\nServing Quality. Delivering Trust.","highlights":["25+ Years of Experience","Trusted by 1000+ Customers","Specialized in Canteen & Institutional Supplies","Consistent Quality Assurance"],"officePhone":"93844 82007","homeAboutImage":"/images/about-warehouse.jpg","homeAboutHeading":"A Trusted Name in Wholesale Grocery","homeAboutButtonText":"Know More About Us","homeAboutButtonLink":"/about","stats":[{"value":"25+","label":"Years Experience"},{"value":"1000+","label":"Customers"},{"value":"Bulk","label":"Supply"},{"value":"Reliable","label":"Delivery"}]}'::jsonb, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
