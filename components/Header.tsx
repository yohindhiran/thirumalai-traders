"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import Logo from "@/components/Logo";
import { SITE } from "@/data/site";
import { telHref, whatsappHref, cn } from "@/lib/utils";

const MAIN_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Categories" },
  { href: "/clients", label: "Clients" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ phone, logo }: { phone?: string; logo?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close the mobile menu on Escape or tapping outside the header.
  // Listeners run only while the menu is open. Body scroll is untouched
  // so the dropdown behaves like a normal compact menu.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const phoneNumber = phone || SITE.officePhone;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-brand-line bg-white/95 shadow-sm backdrop-blur">
      <div className="container-site relative flex h-16 items-center justify-between gap-2 sm:gap-4 lg:h-20">
        {/* MOBILE ONLY (top-left): hamburger menu button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-brand-line p-2 text-brand-ink hover:border-brand-green hover:text-brand-green lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo: screen-centred on mobile (independent of side-button
            widths), natural left position on desktop. The max-width cap
            plus the image's own max-w-full keep it inside narrow screens
            without cropping or distortion. */}
        <div className="absolute left-1/2 top-1/2 max-w-[52vw] -translate-x-1/2 -translate-y-1/2 [&_img]:max-w-full sm:max-w-none lg:static lg:translate-x-0 lg:translate-y-0">
          <Logo src={logo} />
        </div>

        {/* CENTER (desktop only): primary navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {MAIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-1 text-sm font-medium transition-colors hover:text-brand-green",
                isActive(link.href) ? "text-brand-green" : "text-brand-ink"
              )}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-opacity",
                  isActive(link.href) ? "opacity-100" : "opacity-0"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* RIGHT: phone + CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={telHref(phoneNumber)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark"
            aria-label={`Call our office at ${phoneNumber}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {phoneNumber}
          </a>
          <Link href="/enquiry" className="btn-primary !py-2.5">
            Request Enquiry
          </Link>
        </div>

        {/* MOBILE ONLY (top-right): call button using the office number */}
        <a
          href={telHref(phoneNumber)}
          className="btn-primary shrink-0 !px-3 !py-2 lg:hidden"
          aria-label={`Call our office at ${phoneNumber}`}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {/* Mobile dropdown navigation (below the header bar) */}
      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-brand-line bg-white shadow-lift lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
            {MAIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-brand-line py-4 text-base font-medium transition-colors last:border-b-0 hover:text-brand-green",
                  isActive(link.href) ? "text-brand-green" : "text-brand-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-3 px-6 pb-8">
            <Link href="/enquiry" onClick={() => setOpen(false)} className="btn-primary w-full">
              Request Wholesale Enquiry
            </Link>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
