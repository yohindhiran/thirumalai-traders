"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <Link
      href="/"
      aria-label="Thirumalaai Traders – Home"
      className={cn("inline-flex items-center", className)}
    >
      {failed ? (
        <span className="inline-flex items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-gold font-bold text-brand-green-deep">
            TT
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className={cn(
                "text-sm font-bold uppercase tracking-wide sm:text-base",
                variant === "dark" ? "text-white" : "text-brand-ink"
              )}
            >
              Thirumalaai Traders
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
              Wholesale Grocery
            </span>
          </span>
        </span>
      ) : (
        <Image
          src="/images/logo.png"
          alt="Thirumalaai Traders"
          width={220}
          height={56}
          priority
          onError={() => setFailed(true)}
          className="h-auto w-[170px] object-contain sm:w-[190px] lg:w-[220px]"
        />
      )}
    </Link>
  );
}