"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Phone, Play } from "lucide-react";
import { telHref, whatsappHref } from "@/lib/utils";

export interface CarouselProduct {
  name: string;
  slug: string;
  categoryName?: string;
  categorySlug?: string;
  subcategory?: string;
  image?: string;
}

const AUTOPLAY_MS = 30000;
const ARROW_TWEEN_MS = 500;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ProductCarousel({
  products,
}: {
  products: CarouselProduct[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const copyWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const tweenRef = useRef<{ from: number; to: number; start: number } | null>(
    null
  );
  const reducedMotionRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);

  const autoScroll = !paused && !hovered && products.length > 1;
  const items = [...products, ...products];

  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (track && first) {
      copyWidthRef.current = first.offsetWidth * products.length;
    }
  }, [products.length]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

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

  return (
    <section className="section-pad overflow-hidden bg-white">
      <div className="container-site">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green sm:text-sm">
              <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
              Wholesale Range
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Explore Our Products
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-brand-muted sm:text-base">
              Quality-checked grains, pulses, spices, oils, dry fruits and grocery
              essentials supplied in bulk at wholesale rates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Start automatic scrolling" : "Pause automatic scrolling"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink transition-colors hover:border-brand-green hover:text-brand-green"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Scroll to previous products"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink transition-colors hover:border-brand-green hover:text-brand-green"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Scroll to next products"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink transition-colors hover:border-brand-green hover:text-brand-green"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured wholesale products"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
        >
          <div className="overflow-hidden">
            <ul
              ref={trackRef}
              className="flex w-max will-change-transform motion-reduce:transform-none"
              style={{ transform: "translateX(0px)" }}
            >
              {items.map((p, i) => (
                <li
                  key={`${p.slug}-${i}`}
                  aria-hidden={i >= products.length ? "true" : undefined}
                  className="w-64 shrink-0 px-3 sm:w-72"
                >
                  <article className="card group flex h-full flex-col overflow-hidden rounded-xl transition-shadow hover:shadow-lift">
                    <Link
                      href={`/products/${p.categorySlug ?? "spices"}/${p.slug}`}
                      className="relative block aspect-[4/3] overflow-hidden bg-brand-soft"
                      aria-label={`View ${p.name}`}
                    >
                      <Image
                        src={p.image || "/images/hero-warehouse.jpg"}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 16rem"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1 bg-brand-gold opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
                        {p.categoryName || "Wholesale Grocery"}
                        {p.subcategory ? ` · ${p.subcategory}` : ""}
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
                            `Hello Thirumalaai Traders, I would like to enquire about ${p.name} at wholesale rates.`
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
            products. The carousel advances automatically.
          </p>
        </div>
      </div>
    </section>
  );
}