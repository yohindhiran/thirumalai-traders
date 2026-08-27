import CategoriesManager from "@/components/admin/CategoriesManager";

export const dynamic = "force-dynamic";

export default function AdminCategoriesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Category Management</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Add, edit or deactivate product categories.
      </p>
      <div className="mt-6 max-w-3xl">
        <CategoriesManager />
      </div>
    </div>
  );
}
