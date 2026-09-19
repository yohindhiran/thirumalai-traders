"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export interface TestimonialItem {
  quote: string;
  name: string;
  role?: string;
  image?: string;
}

// Slow, continuous forward scroll (pixels per millisecond).
const SPEED = 0.025;
const ARROW_TWEEN_MS = 500;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Testimonials({
  items: provided,
}: {
  items?: TestimonialItem[];
}) {
  const source = provided && provided.length ? provided : TESTIMONIALS;
  const TESTIMONIAL_ITEMS: TestimonialItem[] = source.map((t) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    image: (t as { image?: string }).image,
  }));

  // Duplicate the set once so the loop can wrap seamlessly.
  const items = [...TESTIMONIAL_ITEMS, ...TESTIMONIAL_ITEMS];

  const trackRef = useRef<HTMLUListElement>(null);
  const copyWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const tweenRef = useRef<{ from: number; to: number; start: number } | null>(
    null
  );
  const [perView, setPerView] = useState(3);
  const reducedMotionRef = useRef(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (track && first) {
      copyWidthRef.current = first.offsetWidth * TESTIMONIAL_ITEMS.length;
    }
  }, [TESTIMONIAL_ITEMS.length]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const queries: Array<[MediaQueryList, number]> = [
      [window.matchMedia("(min-width: 1024px)"), 3],
      [window.matchMedia("(min-width: 640px)"), 2],
    ];
    const update = () => {
      setPerView(queries.find(([mq]) => mq.matches)?.[1] ?? 1);
    };
    update();
    queries.forEach(([mq]) => mq.addEventListener("change", update));
    return () => {
      queries.forEach(([mq]) => mq.removeEventListener("change", update));
    };
  }, []);

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
        } else if (!reducedMotionRef.current) {
          offsetRef.current = (offsetRef.current + SPEED * dt) % copy;
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
    tweenRef.current = {
      from: offsetRef.current,
      to: offsetRef.current + direction * step,
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
    <section className="section-pad bg-white">
      <div className="container-site">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
            <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
            Testimonials
            <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            What Our Customers Say
          </h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-16 bg-brand-gold" />
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink shadow-card transition-colors hover:border-brand-green hover:text-brand-green sm:flex h-10 w-10"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="overflow-hidden px-1 py-2 sm:px-14">
            <ul
              ref={trackRef}
              className="flex will-change-transform motion-reduce:transform-none"
              style={{ transform: "translateX(0px)" }}
            >
              {items.map((t, i) => (
                <li
                  key={`${t.name}-${i}`}
                  aria-hidden={
                    i >= TESTIMONIAL_ITEMS.length ? "true" : undefined
                  }
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${((i % TESTIMONIAL_ITEMS.length) + 1)} of ${TESTIMONIAL_ITEMS.length}`}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / perView}%` }}
                >
                  <figure className="card relative flex h-full flex-col p-8">
                    <blockquote className="flex-1 leading-relaxed text-brand-muted">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 border-t border-brand-line pt-5">
                      <span className="block font-semibold text-brand-ink">
                        {t.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-brand-muted">
                        {t.role}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink shadow-card transition-colors hover:border-brand-green hover:text-brand-green sm:flex h-10 w-10"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <p className="sr-only">
            Use the left and right arrow keys or the previous and next buttons to
            browse testimonials. The carousel advances automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
