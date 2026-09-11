import TestimonialsManager from "@/components/admin/TestimonialsManager";

export const dynamic = "force-dynamic";

export default function AdminTestimonialsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Testimonials</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Add and manage customer testimonials shown on the website.
      </p>
      <div className="mt-6">
        <TestimonialsManager />
      </div>
    </div>
  );
}
