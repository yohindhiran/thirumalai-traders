import CompanyPagesManager from "@/components/admin/CompanyPagesManager";

export const dynamic = "force-dynamic";

export default function AdminCompanyPagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Company Pages</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Edit the content for each company information page.
      </p>
      <div className="mt-6 max-w-3xl">
        <CompanyPagesManager />
      </div>
    </div>
  );
}
