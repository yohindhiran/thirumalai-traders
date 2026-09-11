import FaqsManager from "@/components/admin/FaqsManager";

export const dynamic = "force-dynamic";

export default function AdminFaqsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">FAQs</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Manage frequently asked questions displayed to customers.
      </p>
      <div className="mt-6">
        <FaqsManager />
      </div>
    </div>
  );
}
