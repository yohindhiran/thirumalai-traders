import HomeAboutManager from "@/components/admin/HomeAboutManager";

export const dynamic = "force-dynamic";

export default function AdminHomeAboutPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Home About Section</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Edit the image, heading, description and button of the homepage About section.
      </p>
      <div className="mt-6 max-w-3xl">
        <HomeAboutManager />
      </div>
    </div>
  );
}
