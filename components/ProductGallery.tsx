"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const gallery = images.length ? images : ["/images/hero-warehouse.jpg"];
  const [active, setActive] = useState(gallery[0]);

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {/* Thumbnails */}
      <div
        className="flex gap-3 lg:flex-col lg:gap-3"
        role="listbox"
        aria-label={`${name} image thumbnails`}
      >
        {gallery.map((src, i) => {
          const isActive = active === src;
          return (
            <button
              key={`${src}-${i}`}
              type="button"
              role="option"
              aria-selected={isActive}
              aria-label={`Show ${name} image ${i + 1}`}
              onClick={() => setActive(src)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-brand-soft transition-colors",
                isActive
                  ? "border-brand-green"
                  : "border-brand-line hover:border-brand-green/50"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Main image */}
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-brand-line bg-brand-soft shadow-card">
        <div className="relative aspect-square w-full">
          <Image
            src={active}
            alt={name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
