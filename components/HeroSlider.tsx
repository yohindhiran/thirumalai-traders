"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const DEFAULT_SLIDES = [
  {
    src: "/images/hero-warehouse.jpg",
    alt: "Wholesale grocery warehouse with stocked racks and bulk inventory",
  },
  {
    src: "/images/hero-rice.jpg",
    alt: "Premium raw rice grains supplied in bulk",
  },
  {
    src: "/images/hero-pulses.jpg",
    alt: "Bowl of chickpeas — pulses and dals supplied wholesale",
  },
  {
    src: "/images/hero-spices.jpg",
    alt: "Bowls of whole spices and masalas at a wholesale spice market",
  },
  {
    src: "/images/hero-nuts.jpg",
    alt: "Bulk dry fruits and nuts — almonds close-up",
  },
  {
    src: "/images/hero-oil.jpg",
    alt: "Cooking oil supplied in bulk for institutional kitchens",
  },
];

const AUTOPLAY_MS = 3000;

export interface HeroSliderSlide {
  src: string;
  alt: string;
}

export default function HeroSlider({ slides }: { slides?: HeroSliderSlide[] }) {
  const SLIDES = slides?.length ? slides : DEFAULT_SLIDES;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, [SLIDES.length]);

  useEffect(() => {
    setIndex((i) => (SLIDES.length ? i % SLIDES.length : 0));
  }, [SLIDES.length]);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reducedMotion]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Wholesale grocery highlights"
      className="relative overflow-hidden bg-brand-green-deep"
    >
      <div className="relative h-[420px] sm:h-[450px] lg:h-[510px]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-5">
          <div className="container-site flex items-center justify-between">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-7 bg-brand-gold" : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Start automatic slideshow" : "Pause automatic slideshow"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
