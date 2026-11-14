-- ============================================================================
-- Thirumalaai Traders - Supabase Database Schema
-- Complete schema for wholesale e-commerce platform
-- ============================================================================

-- 1. Enable pgcrypto for UUID generation if needed
create extension if not exists "pgcrypto";

-- 2. Categories Table
create table if not exists public.categories (
  id text primary key,
  slug text unique not null,
  name text not null,
  description text default '',
  image text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Products Table
create table if not exists public.products (
  id text primary key,
  slug text not null,
  name text not null,
  category_id text references public.categories(id) on delete set null,
  subcategory text,
  short_description text,
  description text default '',
  main_image text,
  images jsonb default '[]'::jsonb,
  specs jsonb default '[]'::jsonb,
  purity text,
  color text,
  shelf_life text,
  packaging text,
  quality_info text,
  price numeric(10,2) default 0,
  stock integer default 100,
  unit text default 'kg',
  variants jsonb default '[]'::jsonb,
  status text not null default 'active' check (status in ('active', 'inactive')),
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Orders Table (E-commerce wholesale orders without payment gateway)
create table if not exists public.orders (
  id text primary key,
  order_number text unique not null,
  customer_name text not null,
  business_name text,
  phone text not null,
  whatsapp text,
  email text,
  address text not null,
  city text not null,
  state text not null default 'Tamil Nadu',
  pincode text not null,
  payment_method text not null default 'cod' check (payment_method in ('cod', 'pay_on_delivery', 'invoice')),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'processing', 'dispatched', 'delivered', 'cancelled')),
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(10,2) not null default 0,
  discount numeric(10,2) default 0,
  total numeric(10,2) not null default 0,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. Enquiries Table
create table if not exists public.enquiries (
  id text primary key,
  name text not null,
  company text,
  phone text not null,
  email text,
  customer_type text,
  category text,
  products_required text,
  quantity text,
  delivery_location text,
  message text,
  status text default 'New' check (status in ('New', 'Contacted', 'In Progress', 'Converted', 'Closed')),
  admin_notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Hero Slides Table
create table if not exists public.hero_slides (
  id text primary key,
  image text not null,
  title text default '',
  subtitle text default '',
  button_text text default '',
  button_link text default '',
  status text not null default 'active' check (status in ('active', 'inactive')),
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 7. Testimonials Table
create table if not exists public.testimonials (
  id text primary key,
  name text not null,
  company text default '',
  role text default '',
  content text not null,
  rating integer default 5,
  image text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 8. Valued Customers Table
create table if not exists public.valued_customers (
  id text primary key,
  name text not null,
  logo text not null,
  status text not null default 'active' check (status in ('active', 'inactive')),
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 9. Key-Value Configuration Tables for Site CMS
create table if not exists public.site_config (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- Indexes for blazing fast lookups
create index if not exists idx_categories_slug on public.categories(slug);
create index if not exists idx_categories_status on public.categories(status);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_products_status on public.products(status);
create index if not exists idx_orders_number on public.orders(order_number);
create index if not exists idx_orders_created on public.orders(created_at desc);
create index if not exists idx_enquiries_created on public.enquiries(created_at desc);

-- Row Level Security (RLS)
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.enquiries enable row level security;
alter table public.hero_slides enable row level security;
alter table public.testimonials enable row level security;
alter table public.valued_customers enable row level security;
alter table public.site_config enable row level security;

-- Public read access policies
drop policy if exists "Public can view active categories" on public.categories;
create policy "Public can view active categories" on public.categories for select using (true);

drop policy if exists "Public can view active products" on public.products;
create policy "Public can view active products" on public.products for select using (true);

drop policy if exists "Public can view hero slides" on public.hero_slides;
create policy "Public can view hero slides" on public.hero_slides for select using (true);

drop policy if exists "Public can view testimonials" on public.testimonials;
create policy "Public can view testimonials" on public.testimonials for select using (true);

drop policy if exists "Public can view valued customers" on public.valued_customers;
create policy "Public can view valued customers" on public.valued_customers for select using (true);

drop policy if exists "Public can view site config" on public.site_config;
create policy "Public can view site config" on public.site_config for select using (true);

-- Public creation policies (Customers placing orders or enquiries)
drop policy if exists "Public can create orders" on public.orders;
create policy "Public can create orders" on public.orders for insert with check (true);

drop policy if exists "Public can view own placed order" on public.orders;
create policy "Public can view own placed order" on public.orders for select using (true);

drop policy if exists "Public can submit enquiries" on public.enquiries;
create policy "Public can submit enquiries" on public.enquiries for insert with check (true);

-- Service role / Admin bypass (full access for admin updates)
drop policy if exists "Service role full access categories" on public.categories;
create policy "Service role full access categories" on public.categories using (auth.role() = 'service_role' or auth.role() = 'authenticated');

drop policy if exists "Service role full access products" on public.products;
create policy "Service role full access products" on public.products using (auth.role() = 'service_role' or auth.role() = 'authenticated');

drop policy if exists "Service role full access orders" on public.orders;
create policy "Service role full access orders" on public.orders using (auth.role() = 'service_role' or auth.role() = 'authenticated');

drop policy if exists "Service role full access enquiries" on public.enquiries;
create policy "Service role full access enquiries" on public.enquiries using (auth.role() = 'service_role' or auth.role() = 'authenticated');

drop policy if exists "Service role full access hero" on public.hero_slides;
create policy "Service role full access hero" on public.hero_slides using (auth.role() = 'service_role' or auth.role() = 'authenticated');

drop policy if exists "Service role full access testimonials" on public.testimonials;
create policy "Service role full access testimonials" on public.testimonials using (auth.role() = 'service_role' or auth.role() = 'authenticated');

drop policy if exists "Service role full access valued_customers" on public.valued_customers;
create policy "Service role full access valued_customers" on public.valued_customers using (auth.role() = 'service_role' or auth.role() = 'authenticated');

drop policy if exists "Service role full access site_config" on public.site_config;
create policy "Service role full access site_config" on public.site_config using (auth.role() = 'service_role' or auth.role() = 'authenticated');
