"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck, Phone } from "lucide-react";
import { telHref } from "@/lib/utils";

interface Announcement {
  text: string;
}

const ANNOUNCEMENTS: Announcement[] = [
  { text: "Bulk & wholesale grocery supply to schools, colleges, mills, factories and canteens across Erode." },
  { text: "GST billing available for all institutional and bulk orders." },
  { text: "Scheduled, recurring deliveries for kitchens that never want to run short." },
  { text: "Competitive wholesale rates — call for today's price list." },
];

const SPEED = 0.035;

export default function AnnouncementBar() {
  const trackRef = useRef<HTMLUListElement>(null);
  const copyWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const [paused, setPaused] = useState(false);

  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (track && first) {
      copyWidthRef.current = first.offsetWidth * ANNOUNCEMENTS.length;
    }
  }, []);

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
        if (!reducedMotionRef.current && !paused) {
          offsetRef.current = (offsetRef.current + SPEED * dt) % copy;
        }
        trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <div
      className="relative z-50 border-b border-brand-gold/40 bg-brand-green-deep text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-site flex items-center">
        <span className="hidden shrink-0 items-center gap-2 border-r border-white/15 pr-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-brand-gold sm:flex">
          <BadgeCheck className="h-4 w-4" aria-hidden="true" />
          Announcements
        </span>

        <div className="relative flex-1 overflow-hidden pl-4 sm:pl-6">
          <ul
            ref={trackRef}
            className="flex w-max will-change-transform"
            style={{ transform: "translateX(0px)" }}
          >
            {items.map((a, i) => (
              <li
                key={`${a.text}-${i}`}
                aria-hidden={i >= ANNOUNCEMENTS.length ? "true" : undefined}
                className="flex shrink-0 items-center gap-3 py-2.5 pr-12 text-xs font-medium text-white/90 sm:text-[13px]"
              >
                <span className="text-brand-gold" aria-hidden="true">
                  •
                </span>
                {a.text}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={telHref("9384482007")}
          className="hidden shrink-0 items-center gap-1.5 pl-4 text-xs font-semibold text-brand-gold hover:text-white lg:flex"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          93844 82007
        </a>
      </div>
    </div>
  );
}