import HomeShowcaseManager from "@/components/admin/HomeShowcaseManager";

export const dynamic = "force-dynamic";

export default function AdminHomeShowcasePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">What We Supply</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Manage the product images shown in the “What We Supply” section on the homepage.
      </p>
      <div className="mt-6">
        <HomeShowcaseManager />
      </div>
    </div>
  );
}
