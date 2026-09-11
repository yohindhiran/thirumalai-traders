import SiteSettingsManager from "@/components/admin/SiteSettingsManager";

export const dynamic = "force-dynamic";

export default function AdminSiteSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Site Settings</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Manage global site details, branding and social links.
      </p>
      <div className="mt-6 max-w-3xl">
        <SiteSettingsManager />
      </div>
    </div>
  );
}
