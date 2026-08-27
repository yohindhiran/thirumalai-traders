import ContentManager from "@/components/admin/ContentManager";

export const dynamic = "force-dynamic";

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Content Management</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Update key homepage content and company highlights.
      </p>
      <div className="mt-6 max-w-2xl">
        <ContentManager />
      </div>
    </div>
  );
}
