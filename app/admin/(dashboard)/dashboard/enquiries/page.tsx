import EnquiriesManager from "@/components/admin/EnquiriesManager";

export const dynamic = "force-dynamic";

export default function AdminEnquiriesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Enquiries</h1>
      <p className="mt-1 text-sm text-brand-muted">
        View, manage and track wholesale enquiries from the website.
      </p>
      <div className="mt-6">
        <EnquiriesManager />
      </div>
    </div>
  );
}
