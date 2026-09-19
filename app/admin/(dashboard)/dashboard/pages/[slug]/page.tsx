import { notFound } from "next/navigation";
import CompanyPagesManager from "@/components/admin/CompanyPagesManager";

export const dynamic = "force-dynamic";

const LABELS: Record<string, string> = {
  history: "History",
  "industries-we-serve": "Industries We Serve",
  quality: "Quality",
  products: "Products Page",
  contact: "Contact Page",
};

export default async function AdminCompanySectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = LABELS[slug];
  if (!label) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">{label}</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Edit the content for the {label} page.
      </p>
      <div className="mt-6 max-w-3xl">
        <CompanyPagesManager initialSlug={slug} hideSelector />
      </div>
    </div>
  );
}
