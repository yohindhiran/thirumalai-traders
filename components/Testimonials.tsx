"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

const AUTOPLAY_MS = 5500;
const TRANSITION_MS = 900;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [perView, setPerView] = useState(3);
  const reducedMotionRef = useRef(false);

  // Clone the full set once so the loop can wrap seamlessly.
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

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

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, items.length - 1));
  }, [items.length]);

  const goPrev = useCallback(() => {
    if (reducedMotionRef.current) {
      setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      return;
    }
    setIndex((i) => {
      if (i > 0) return i - 1;
      // Step back from the first slide: jump instantly to the cloned copy,
      // then animate to the last real slide on the next frame.
      setInstant(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setInstant(false);
          setIndex(TESTIMONIALS.length - 1);
        });
      });
      return TESTIMONIALS.length;
    });
  }, []);

  // Autoplay: one slide roughly every 5.5 seconds, very slow and smooth.
  useEffect(() => {
    if (reducedMotionRef.current) return undefined;
    const id = window.setInterval(() => {
      goNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [goNext]);

  // After sliding onto a cloned copy, snap back silently to the real slide.
  const handleTransitionEnd = useCallback(() => {
    setIndex((i) => {
      if (i >= TESTIMONIALS.length) {
        setInstant(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setInstant(false);
            setIndex(i - TESTIMONIALS.length);
          });
        });
        return i;
      }
      return i;
    });
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
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
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink shadow-card transition-colors hover:border-brand-green hover:text-brand-green sm:flex h-10 w-10"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="overflow-hidden px-1 py-2 sm:px-14">
            <ul
              className="flex will-change-transform motion-reduce:transition-none"
              style={{
                transform: `translateX(-${index * (100 / perView)}%)`,
                transition: instant
                  ? "none"
                  : reducedMotionRef.current
                    ? "none"
                    : `transform ${TRANSITION_MS}ms ease-in-out`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {items.map((t, i) => (
                <li
                  key={`${t.name}-${i}`}
                  aria-hidden={i >= TESTIMONIALS.length && index < TESTIMONIALS.length ? "true" : undefined}
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${((i % TESTIMONIALS.length) + 1)} of ${TESTIMONIALS.length}`}
                  className="min-w-[100%] px-3 sm:min-w-[50%] lg:min-w-[33.3333%]"
                >
                  <figure className="card relative flex h-full flex-col p-8">
                    <blockquote className="flex-1 leading-relaxed text-brand-muted">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-line pt-5">
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-brand-gold"
                      >
                        &ldquo;
                      </span>
                      <span>
                        <span className="block font-semibold text-brand-ink">
                          {t.name}
                        </span>
                        <span className="block text-xs text-brand-muted">
                          {t.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={goNext}
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
