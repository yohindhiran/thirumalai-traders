import AboutManager from "@/components/admin/AboutManager";

export const dynamic = "force-dynamic";

export default function AdminAboutPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">About Us</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Edit the About content, vision, mission, core values and images.
      </p>
      <div className="mt-6 max-w-3xl">
        <AboutManager />
      </div>
    </div>
  );
}
