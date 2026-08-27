"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CUSTOMERS = [
  "Sagar",
  "CMS",
  "Erode Sengunthar Engineering College",
  "Pallavaa Group",
  "SPK",
  "PSG College",
  "Hindusthan College",
  "Best Corporation",
  "SCM Mills",
  "SKL Mill",
];

function initials(name: string) {
  const words = name
    .replace(/[^a-zA-Z ]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "TT";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const CYCLE_MS = 30000;
const ARROW_TWEEN_MS = 500;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ValuedCustomers() {
  const trackRef = useRef<HTMLDivElement>(null);
  const copyWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const tweenRef = useRef<{
    from: number;
    to: number;
    start: number;
  } | null>(null);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (track && first) {
      copyWidthRef.current = first.offsetWidth * CUSTOMERS.length;
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const copy = copyWidthRef.current;
      if (copy > 0) {
        const tween = tweenRef.current;
        if (tween) {
          const t = Math.min((now - tween.start) / ARROW_TWEEN_MS, 1);
          offsetRef.current =
            ((tween.from + (tween.to - tween.from) * easeInOutCubic(t)) %
              copy +
              copy) %
            copy;
          if (t >= 1) tweenRef.current = null;
        } else {
          offsetRef.current =
            (offsetRef.current + (copy / CYCLE_MS) * dt) % copy;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

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

  const items = [...CUSTOMERS, ...CUSTOMERS];

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-brand-soft">
      <div className="container-site">
        <div className="mb-7 text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
            <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
            Trusted By
            <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            Valued Customers
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous customers"
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink shadow-card transition-colors hover:border-brand-green hover:text-brand-green sm:flex h-10 w-10"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="overflow-hidden px-1 py-2 sm:px-12">
            <div
              ref={trackRef}
              className="flex will-change-transform"
              style={{ transform: "translateX(0px)" }}
            >
              {items.map((customer, i) => (
                <div
                  key={`${customer}-${i}`}
                  aria-hidden={i >= CUSTOMERS.length}
                  className="flex w-28 shrink-0 flex-col items-center pr-6 sm:w-32"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-green text-lg font-bold text-brand-gold shadow-card sm:h-24 sm:w-24">
                    {initials(customer)}
                  </div>
                  <p className="mt-3 text-center text-xs font-medium leading-snug text-brand-ink sm:text-sm">
                    {customer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next customers"
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink shadow-card transition-colors hover:border-brand-green hover:text-brand-green sm:flex h-10 w-10"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
