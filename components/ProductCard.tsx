import Link from "next/link";
import { Package } from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export default function ProductCard({
  product,
  categoryName,
  categorySlug,
  className,
}: {
  product: Product;
  categoryName: string;
  categorySlug?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "card group flex flex-col overflow-hidden transition-shadow hover:shadow-lift",
        className
      )}
    >
      <Link
        href={`/products/${categorySlug || ""}?product=${encodeURIComponent(product.name)}`}
        className="relative flex h-36 items-center justify-center overflow-hidden bg-brand-soft"
        aria-label={`Enquire about ${product.name}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-green via-brand-gold to-brand-green opacity-0 transition-opacity group-hover:opacity-100"
        />
        <Package
          className="h-10 w-10 text-brand-green/30 transition-colors group-hover:text-brand-green/50"
          aria-hidden="true"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
          {categoryName}
          {product.subcategory ? ` · ${product.subcategory}` : ""}
        </p>
        <h3 className="mt-2 text-base font-semibold text-brand-ink">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-muted">
          {product.description}
        </p>
        <div className="mt-4 pt-4 mt-auto">
          <Link
            href={`/enquiry?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(categoryName)}`}
            className="btn-primary w-full !py-2.5 !text-xs sm:!text-sm"
          >
            Request Wholesale Price
          </Link>
        </div>
      </div>
    </article>
  );
}
