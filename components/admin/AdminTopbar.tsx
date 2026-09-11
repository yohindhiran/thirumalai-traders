"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function AdminTopbar() {
  return (
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-brand-line bg-white px-4 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-brand-ink">Business Management</p>
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
      >
        View Website
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </header>
  );
}
