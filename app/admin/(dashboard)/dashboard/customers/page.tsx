import CustomersManager from "@/components/admin/CustomersManager";

export const dynamic = "force-dynamic";

export default function AdminCustomersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Valued Customers</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Showcase the brands and businesses you serve.
      </p>
      <div className="mt-6">
        <CustomersManager />
      </div>
    </div>
  );
}
