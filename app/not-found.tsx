import Link from "next/link";
import { Home, PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section-pad bg-brand-soft">
      <div className="container-site max-w-xl py-16 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
          <PackageSearch className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-brand-gold-dark">
          Error 404
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
