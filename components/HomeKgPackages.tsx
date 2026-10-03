"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
} from "lucide-react";
import { telHref, whatsappHref } from "@/lib/utils";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export interface HomeKgPackageItem {
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
  description?: string;
  image?: string;
}

export interface HomeKgPackageSize {
  id: string;
  name: string;
  items: HomeKgPackageItem[];
}

const AUTOPLAY_MS = 30000;
const ARROW_TWEEN_MS = 500;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Standalone Home "KG PACKAGES" section. Fully independent: its own
 * component, its own data (kgPackageSizes refs + kgPackagesSection copy) and
 * its own internal slider. Shares nothing with Bestsellers, Product
 * Categories or the main Products catalogue.
 *
 * Layout: descriptive copy on the LEFT, package-size tabs/chips plus a
 * horizontally sliding product card carousel on the RIGHT (stacked on
 * mobile). Selecting a size shows only that size's products.
 */
export default function HomeKgPackages({
  sizes,
  title,
  description,
}: {
  sizes: HomeKgPackageSize[];
  title: string;
  description: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const copyWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const tweenRef = useRef<{ from: number; to: number; start: number } | null>(
    null
  );
  const reducedMotionRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [paused] = useState(false);
  const [selectedId, setSelectedId] = useState(sizes[0]?.id ?? "");

  // Keep selection valid when Admin configuration changes.
  useEffect(() => {
    if (!sizes.length) {
      setSelectedId("");
      return;
    }
    if (!sizes.some((s) => s.id === selectedId)) {
      setSelectedId(sizes[0].id);
    }
  }, [sizes, selectedId]);

  const active = sizes.find((s) => s.id === selectedId) ?? sizes[0];
  const items = active?.items ?? [];
  const activeName = active?.name ?? "";

  const autoScroll = !paused && !hovered && items.length > 1;
  const doubled = [...items, ...items];

  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (track && first) {
      copyWidthRef.current = first.offsetWidth * items.length;
    }
  }, [items.length]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Restart the carousel from the beginning whenever the package size changes.
  useEffect(() => {
    offsetRef.current = 0;
    tweenRef.current = null;
    if (trackRef.current) {
      trackRef.current.style.transform = "translateX(0px)";
    }
    measure();
  }, [selectedId, measure]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const copy = copyWidthRef.current;
      if (copy > 0 && trackRef.current) {
        const tween = tweenRef.current;
        if (tween) {
          const t = Math.min((now - tween.start) / ARROW_TWEEN_MS, 1);
          offsetRef.current =
            ((tween.from + (tween.to - tween.from) * easeInOutCubic(t)) % copy + copy) %
            copy;
          if (t >= 1) tweenRef.current = null;
        } else if (!reducedMotionRef.current && autoScroll) {
          offsetRef.current = (offsetRef.current + (copy / AUTOPLAY_MS) * dt) % copy;
        }
        trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoScroll]);

  const go = useCallback((direction: number) => {
    const copy = copyWidthRef.current;
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    if (!copy || !first) return;
    const step = first.offsetWidth;
    const base = tweenRef.current ? tweenRef.current.to : offsetRef.current;
    tweenRef.current = {
      from: offsetRef.current,
      to: base + direction * step,
      start: performance.now(),
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  if (!sizes.length || !items.length) return null;

  return (
    <section className="section-pad overflow-hidden bg-white">
      {/* TOP: section copy, left-aligned — followed BELOW by the full-width carousel */}
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green sm:text-sm">
            <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
            KG PACKAGES
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-base">
            {description}
          </p>
        </div>

        {/* Package-size selector: premium tabs/chips. Visible only when
            multiple sizes are configured; single-size stays clean. */}
        {sizes.length > 1 && (
          <div
            role="tablist"
            aria-label="Select package size"
            className="mt-6 flex flex-wrap gap-2"
          >
            {sizes.map((s) => {
              const selected = s.id === active?.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setSelectedId(s.id)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                    selected
                      ? "border-brand-green bg-brand-green text-white shadow-sm"
                      : "border-brand-line bg-white text-brand-ink hover:border-brand-green hover:text-brand-green"
                  )}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        )}

        {/* BELOW: full-width horizontal product slider.
            Hovering the product area pauses auto-scroll immediately; leaving
            resumes from the exact same position. Manual arrows/keys always work. */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={`${activeName} package products`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative mt-10 outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
        >
          <div className="overflow-hidden">
            <ul
              ref={trackRef}
              className="flex w-max will-change-transform motion-reduce:transform-none"
              style={{ transform: "translateX(0px)" }}
            >
              {doubled.map((p, i) => (
                <li
                  key={`${active?.id}-${p.slug}-${i}`}
                  aria-hidden={i >= items.length ? "true" : undefined}
                  className="w-56 shrink-0 px-2.5 sm:w-64"
                >
                  <article className="card group flex h-full flex-col overflow-hidden rounded-xl transition-shadow hover:shadow-lift">
                    <Link
                      href={`/products/${p.categorySlug ?? "spices"}/${p.slug}`}
                      className="relative block aspect-square overflow-hidden bg-brand-soft"
                      aria-label={`View ${p.name}`}
                    >
                      <Image
                        src={p.image || DEFAULT_PRODUCT_IMAGE}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 16rem"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-brand-green px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {activeName} Pack
                      </span>
                    </Link>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
                        {p.categoryName || "Wholesale Grocery"}
                      </p>
                      <h3 className="mt-1.5 text-base font-semibold text-brand-ink line-clamp-1">
                        {p.name}
                      </h3>
                      <Link
                        href={`/products/${p.categorySlug ?? "spices"}/${p.slug}`}
                        className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-brand-green hover:text-brand-green-dark"
                      >
                        View Product
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <a
                          href={telHref("9384482007")}
                          className="inline-flex items-center justify-center gap-1 rounded-md border border-brand-line px-2 py-1.5 text-[11px] font-semibold text-brand-ink transition-colors hover:border-brand-green hover:text-brand-green"
                        >
                          <Phone className="h-3 w-3" aria-hidden="true" />
                          Call
                        </a>
                        <a
                          href={whatsappHref(
                            `Hello Thirumalaai Traders, I would like to enquire about ${p.name} (${activeName} Pack) at wholesale rates.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 rounded-md bg-brand-green px-2 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-brand-green-dark"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <p className="sr-only">
            Use the left and right arrow keys or the previous and next buttons to browse
            {activeName} package products. The slider advances automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
