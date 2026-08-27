import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { QUICK_LINKS, SITE } from "@/data/site";
import { telHref, whatsappHref } from "@/lib/utils";

const CATEGORY_LINKS = [
  { href: "/products/spices", label: "Spices" },
  { href: "/products/grains-pulses", label: "Grains & Pulses" },
  { href: "/products/rice-lentils", label: "Rice & Lentils" },
  { href: "/products/masala", label: "Masala" },
  { href: "/products/dry-fruits-nuts", label: "Dry Fruits" },
  { href: "/products/oils", label: "Oils" },
  { href: "/products/atta-flour-grocery", label: "Atta & Flour" },
  { href: "/products", label: "All Products" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-green-deep text-white">
      <div className="container-site grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <p className="text-sm leading-relaxed text-white/70">
            Trusted wholesale grocery supplier with 25+ years of experience serving
            institutions, industries, mills, grocery shops and bulk customers across
            Erode, Tamil Nadu.
          </p>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-5 !py-2.5"
          >
            WhatsApp Us
          </a>
        </div>

        <nav aria-label="Quick links">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Quick Links
          </h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 transition-colors hover:text-brand-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product categories">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Product Categories
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {CATEGORY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 transition-colors hover:text-brand-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
              <span>
                {SITE.name},<br />
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
                <br />
                {SITE.address.state}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
              <span>
                <a href={telHref(SITE.officePhone)} className="hover:text-brand-gold">
                  Office: {SITE.officePhone}
                </a>
                <br />
                <a href={telHref("9842698877")} className="hover:text-brand-gold">
                  MD: 98426 98877
                </a>
                <br />
                <a href={telHref("9842692007")} className="hover:text-brand-gold">
                  Director: 98426 92007
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-brand-gold">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>© 2026 Thirumalaai Traders. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            <Link href="/privacy-policy" className="hover:text-brand-gold">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms" className="hover:text-brand-gold">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
