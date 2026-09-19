"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const phoneNumber = phone || SITE.officePhone;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line bg-white/95 shadow-sm backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* LEFT: logo + brand */}
        <Logo src={logo} />

        {/* CENTER: primary navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {MAIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-green",
                isActive(link.href) ? "text-brand-green" : "text-brand-ink"
              )}
            >
              {link.label}
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

        {/* MOBILE actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telHref(phoneNumber)}
            className="btn-primary !px-3 !py-2"
            aria-label="Call now"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center border border-brand-line p-2 text-brand-ink hover:border-brand-green hover:text-brand-green"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto bg-white transition-transform duration-200 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: "4rem" }}
        hidden={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
          {MAIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "border-b border-brand-line py-4 text-base font-medium hover:text-brand-green",
                isActive(link.href) ? "text-brand-green" : "text-brand-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-3 px-6 pb-8">
          <Link href="/enquiry" className="btn-primary w-full">
            Request Wholesale Enquiry
          </Link>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">
            WhatsApp Us
          </a>
        </div>
      </div>
    </header>
  );
}
