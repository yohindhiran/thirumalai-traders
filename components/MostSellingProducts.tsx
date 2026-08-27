"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORY_IMAGES, MOST_SELLING, resolveFeatured } from "@/lib/catalog";

export default function MostSellingProducts() {
  const items = MOST_SELLING.map(resolveFeatured).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
  const n = items.length;

  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(5);
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mqs = [
      window.matchMedia("(min-width: 1280px)"),
      window.matchMedia("(min-width: 1024px)"),
      window.matchMedia("(min-width: 640px)"),
    ];
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setPerView(mqs[0].matches ? 5 : mqs[1].matches ? 3 : mqs[2].matches ? 2 : 1);
    const updateReduced = () => setReduced(rmq.matches);
    update();
    updateReduced();
    mqs.forEach((m) => m.addEventListener("change", update));
    rmq.addEventListener("change", updateReduced);
    return () => {
      mqs.forEach((m) => m.removeEventListener("change", update));
      rmq.removeEventListener("change", updateReduced);
    };
  }, []);

  useEffect(() => {
    setIndex((i) => i % n);
  }, [n]);

  const settle = useCallback((fn: () => void) => {
    requestAnimationFrame(() => requestAnimationFrame(fn));
  }, []);

  const next = useCallback(() => setIndex((i) => i + 1), []);

  const prev = useCallback(() => {
    if (index <= 0 && !reduced) {
      setAnim(false);
      setIndex(n);
      settle(() => {
        setAnim(true);
        setIndex(n - 1);
      });
    } else {
      setIndex((i) => Math.max(0, i - 1));
    }
  }, [index, n, reduced, settle]);

  const onTransitionEnd = () => {
    if (index >= n && !reduced) {
      setAnim(false);
      setIndex(index - n);
      settle(() => setAnim(true));
    }
  };

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, reduced, next]);

  const extended = reduced ? items : [...items, ...items];
  const step = 100 / perView;

  return (
    <section className="section-pad bg-white">
      <div className="container-site">
        <div className="rounded-3xl bg-brand-soft px-4 py-12 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green sm:text-sm">
              <span
                aria-hidden="true"
                className="h-px w-6 bg-brand-gold-dark"
              />
              Most Selling Products
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Most Selling Products
            </h2>
            <span
              aria-hidden="true"
              className="mx-auto mt-4 flex h-1 w-20 overflow-hidden rounded-full"
            >
              <span className="h-full w-1/2 bg-brand-green" />
              <span className="h-full w-1/2 bg-brand-gold" />
            </span>
          </div>

          <div className="relative mt-10">
            {/* Previous / Next */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous products"
              className="absolute -left-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-brand-green text-white shadow-lift transition-colors hover:bg-brand-green-dark sm:flex lg:-left-4"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next products"
              className="absolute -right-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-brand-green text-white shadow-lift transition-colors hover:bg-brand-green-dark sm:flex lg:-right-4"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="-mx-2 overflow-hidden">
              <div
                className={`flex ${anim && !reduced ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{ transform: `translateX(-${index * step}%)` }}
                onTransitionEnd={onTransitionEnd}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onTouchStart={(e) => {
                  touchX.current = e.touches[0].clientX;
                  setPaused(true);
                }}
                onTouchEnd={(e) => {
                  if (touchX.current !== null) {
                    const dx = e.changedTouches[0].clientX - touchX.current;
                    if (Math.abs(dx) > 40) {
                      if (dx < 0) next();
                      else prev();
                    }
                  }
                  touchX.current = null;
                  setPaused(false);
                }}
              >
                {extended.map((p, i) => {
                  const img = CATEGORY_IMAGES[p.categorySlug];
                  return (
                    <div
                      key={`${p.slug}-${i}`}
                      className="shrink-0 px-2"
                      style={{ width: `${step}%` }}
                    >
                      <article className="card group h-full overflow-hidden transition-shadow hover:shadow-lift">
                        <div className="relative aspect-[4/3] overflow-hidden bg-white">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="text-base font-semibold text-brand-ink">
                            {p.name}
                          </h3>
                          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-green/80">
                            {p.categoryName}
                          </p>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile arrows */}
          <div className="mt-6 flex justify-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous products"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next products"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
