import OurProductsManager from "@/components/admin/OurProductsManager";

export const dynamic = "force-dynamic";

export default function AdminOurProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Our Products</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Curate the products featured under &ldquo;Our Products&rdquo; on the storefront.
      </p>
      <div className="mt-6">
        <OurProductsManager />
      </div>
    </div>
  );
}
