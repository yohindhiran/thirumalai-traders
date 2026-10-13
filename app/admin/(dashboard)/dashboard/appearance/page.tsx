import AppearanceManager from "@/components/admin/AppearanceManager";

export const dynamic = "force-dynamic";

export default function AdminAppearancePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Appearance</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Choose the public website background theme, preview it and save it for all visitors.
      </p>
      <div className="mt-6 max-w-4xl">
        <AppearanceManager />
      </div>
    </div>
  );
}
