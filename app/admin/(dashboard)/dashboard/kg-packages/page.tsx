import KgPackagesManager from "@/components/admin/KgPackagesManager";

export const dynamic = "force-dynamic";

export default function AdminKgPackagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">KG Packages</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Manage the standalone Home page &ldquo;KG Packages&rdquo; section:
        package sizes and their slider products. Add, edit,
        enable/disable, reorder or remove sizes and entries — changes affect only this
        section and appear on the Home page immediately. Removing an entry
        only takes it off this section; the master product stays in the
        Products catalogue.
      </p>
      <div className="mt-6">
        <KgPackagesManager />
      </div>
    </div>
  );
}
