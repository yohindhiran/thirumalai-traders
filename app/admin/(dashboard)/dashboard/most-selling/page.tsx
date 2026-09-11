import MostSellingManager from "@/components/admin/MostSellingManager";

export const dynamic = "force-dynamic";

export default function AdminMostSellingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Most Selling Products</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Curate the products highlighted as most selling on the storefront.
      </p>
      <div className="mt-6">
        <MostSellingManager />
      </div>
    </div>
  );
}
