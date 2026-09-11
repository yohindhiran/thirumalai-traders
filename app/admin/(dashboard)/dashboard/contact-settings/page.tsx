import ContactSettingsManager from "@/components/admin/ContactSettingsManager";

export const dynamic = "force-dynamic";

export default function AdminContactSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Contact Settings</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Manage the contact details shown across the site.
      </p>
      <div className="mt-6 max-w-3xl">
        <ContactSettingsManager />
      </div>
    </div>
  );
}
