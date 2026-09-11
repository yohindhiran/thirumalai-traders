import HeroManager from "@/components/admin/HeroManager";

export const dynamic = "force-dynamic";

export default function AdminHeroPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Hero Slides</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Manage the homepage hero carousel slides.
      </p>
      <div className="mt-6">
        <HeroManager />
      </div>
    </div>
  );
}
