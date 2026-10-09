import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductForDisplay, getRelatedProducts, readDb } from "@/lib/db";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import EnquiryForm from "@/components/EnquiryForm";
import { ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const product = getProductForDisplay(slug, category);
  if (!product) return {};
  return pageMetadata({
    title: `${product.name} – Bulk Wholesale ${(product as any).categoryName || "Grocery"} in Erode`,
    description: `Buy ${product.name} in bulk at wholesale prices from Thirumalaai Traders, Karungalpalayam, Erode. High quality grocery supplier for canteens and industries.`,
    path: `/products/${category}/${slug}`,
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const product = getProductForDisplay(slug, category);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id);
  const catById = new Map(readDb().categories.map((c) => [c.id, c.slug]));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: (product as any).categoryName || "Category", path: `/products/${category}` },
          { name: product.name, path: `/products/${category}/${slug}` },
        ])}
      />

      <div className="border-b border-emerald-100/70 bg-gradient-to-r from-brand-mist/70 via-white to-brand-cream/60 py-4">
        <div className="container-site">
          <Link
            href={`/products/${category}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-brand-muted shadow-sm ring-1 ring-brand-line transition hover:text-brand-green hover:ring-emerald-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {(product as any).categoryName || "Products"}
          </Link>
        </div>
      </div>

      <section className="section-pad bg-white">
        <div className="container-site grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <ProductGallery images={product.images || []} name={product.name} />
          </div>

          <div>
            <span className="eyebrow">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {(product as any).categoryName || "Wholesale Grocery"}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              {product.name}
            </h1>
            <span aria-hidden="true" className="accent-line my-6" />

            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-2xl font-bold text-brand-green">
                ₹{(product as any).price ?? (product as any).variants?.[0]?.price ?? "Contact for Pricing"}
              </span>
             <span className="text-sm text-brand-muted">
  {(product as any).unit ? `/ ${(product as any).unit}` : ""} (Wholesale & Bulk Rates Available)
</span>
            </div>

            <div className="mt-6 prose-site text-brand-muted leading-relaxed">
              <p>{product.description || "Premium grade wholesale product sourced and packed securely for commercial and industrial kitchens in Erode."}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-brand-line bg-gradient-to-br from-white to-brand-mist/50 p-4 sm:grid-cols-2 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="icon-soft-emerald !h-10 !w-10">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-brand-ink text-sm">Strict Quality Check</h3>
                  <p className="text-xs text-brand-muted mt-0.5">Sourced and sorted for commercial standard kitchens.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="icon-soft-teal !h-10 !w-10">
                  <Truck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-brand-ink text-sm">Dependable Delivery</h3>
                  <p className="text-xs text-brand-muted mt-0.5">Prompt supply across Erode and neighboring regions.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-100 bg-gradient-to-br from-brand-mist/70 via-white to-brand-cream/70 p-6 shadow-card">
              <h3 className="font-bold text-brand-ink text-lg mb-2">Request Bulk Quote or Order</h3>
              <p className="text-xs text-brand-muted mb-4">Fill out the quick enquiry form below regarding {product.name} and our team will get back to you right away.</p>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="section-pad tint-warm border-t border-brand-line/60">
          <div className="container-site">
            <h2 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl text-center">
              Related Wholesale Products
            </h2>
            <span aria-hidden="true" className="accent-line mx-auto mb-10 mt-4" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((rel: any) => (
                <ProductCard
                  key={rel.id}
                  href={`/products/${catById.get(rel.categoryId) || (rel.categoryId || "").replace(/^cat-/, "") || "spices"}/${rel.slug || rel.id}`}
                  product={{
                    id: rel.id,
                    name: rel.name,
                    category: (rel as any).categoryName || "Wholesale Grocery",
                    image: rel.images?.[0] || rel.mainImage || "",
                    variants: rel.variants || [],
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}