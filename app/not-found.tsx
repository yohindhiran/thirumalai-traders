import Link from "next/link";
import { Home, PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section-pad tint-warm">
      <div className="container-site max-w-xl py-16 text-center">
        <span className="icon-soft-emerald mx-auto !h-16 !w-16 !rounded-2xl">
          <PackageSearch className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6">
          <span className="chip-soft">Error 404</span>
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-brand-ink">
          Page Not Found
        </h1>
        <p className="mt-4 leading-relaxed text-brand-muted">
          The page you are looking for doesn&apos;t exist or may have moved. Explore
          our product range or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
          <Link href="/products" className="btn-outline">
            Explore Products
          </Link>
        </div>
      </div>
    </section>
  );
}
