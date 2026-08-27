import ProductsManager from "@/components/admin/ProductsManager";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Product Management</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Add, edit, deactivate or remove products from the catalog.
      </p>
      <div className="mt-6">
        <ProductsManager />
      </div>
    </div>
  );
}
