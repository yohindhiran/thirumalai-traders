"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Milestone } from "@/lib/milestones";
import { cn } from "@/lib/utils";

/**
 * Horizontal left-to-right company roadmap. Chronological along a
 * visible connecting line with colourful markers and cards.
 * Mobile: smooth horizontal scroll with snap. Desktop: arrow buttons
 * plus native scroll. Vertical page scroll is never affected.
 */
const ACCENTS = [
  {
    badge: "bg-emerald-600",
    soft: "bg-emerald-50",
    ring: "ring-emerald-200",
    bar: "bg-emerald-500",
    text: "text-emerald-700",
  },
  {
    badge: "bg-amber-600",
    soft: "bg-amber-50",
    ring: "ring-amber-200",
    bar: "bg-amber-500",
    text: "text-amber-700",
  },
  {
    badge: "bg-teal-600",
    soft: "bg-teal-50",
    ring: "ring-teal-200",
    bar: "bg-teal-500",
    text: "text-teal-700",
  },
  {
    badge: "bg-orange-600",
    soft: "bg-orange-50",
    ring: "ring-orange-200",
    bar: "bg-orange-500",
    text: "text-orange-700",
  },
  {
    badge: "bg-sky-600",
    soft: "bg-sky-50",
    ring: "ring-sky-200",
    bar: "bg-sky-500",
    text: "text-sky-700",
  },
  {
    badge: "bg-rose-600",
    soft: "bg-rose-50",
    ring: "ring-rose-200",
    bar: "bg-rose-500",
    text: "text-rose-700",
  },
];

export default function AboutRoadmap({
  milestones,
}: {
  milestones: Milestone[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCards = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-roadmap-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCards(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCards(1);
    }
  };

  if (!milestones.length) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Company journey timeline. Use left and right arrows to browse milestones."
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 rounded-xl"
    >
      <div className="mb-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Scroll timeline to earlier milestones"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink shadow-card transition-colors hover:border-brand-green hover:text-brand-green"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Scroll timeline to later milestones"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink shadow-card transition-colors hover:border-brand-green hover:text-brand-green"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative">
        {/* Visible connecting line behind the markers */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-7 hidden h-1 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-400 sm:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 rounded-full bg-brand-line sm:hidden"
        />

        <div
          ref={scrollerRef}
          className="roadmap-scroll flex gap-5 overflow-x-auto pb-6 pt-1 sm:px-2"
        >
          {milestones.map((m, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <article
                key={`${m.year}-${i}`}
                data-roadmap-card
                aria-roledescription="slide"
                aria-label={`${m.year}: ${m.title}`}
                className={cn(
                  "group flex w-[248px] shrink-0 flex-col overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card transition-shadow hover:shadow-lift sm:w-[300px]"
                )}
              >
                {/* Marker row: dot on the line + year badge */}
                <div className="relative flex items-center gap-3 px-5 pt-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white shadow-sm ring-4",
                      accent.badge,
                      accent.ring
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 text-sm font-bold text-white shadow-sm",
                      accent.badge
                    )}
                  >
                    {m.year}
                  </span>
                </div>

                <div className="relative mx-5 mt-4 aspect-[16/9] overflow-hidden rounded-xl bg-brand-soft">
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    sizes="(min-width: 640px) 300px, 248px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  <span
                    aria-hidden="true"
                    className={cn("h-1 w-10 rounded-full", accent.bar)}
                  />
                  <h3 className="mt-3 font-semibold leading-snug text-brand-ink">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-brand-muted">
                    {m.desc}
                  </p>
                  <span
                    className={cn(
                      "mt-4 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                      accent.soft,
                      accent.text
                    )}
                  >
                    Milestone {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-brand-muted sm:text-left">
        Scroll sideways or use the arrows to explore our journey from{" "}
        {milestones[0]?.year} to{" "}
        {milestones[milestones.length - 1]?.year}.
      </p>
    </div>
  );
}
