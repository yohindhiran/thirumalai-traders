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

export interface FooterContact {
  name?: string;
  phone?: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressState?: string;
}

export default function Footer({
  contact,
  footerText,
  copyrightYear,
}: {
  contact?: FooterContact;
  footerText?: string;
  copyrightYear?: string;
}) {
  const name = contact?.name || SITE.name;
  const phone = contact?.phone || SITE.officePhone;
  const email = contact?.email || SITE.email;
  const addressLine1 = contact?.addressLine1 || SITE.address.line1;
  const addressLine2 = contact?.addressLine2 || SITE.address.line2;
  const addressState = contact?.addressState || SITE.address.state;
  return (
    <footer className="relative bg-gradient-to-b from-[#24432F] to-brand-green-deep text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-brand-gold to-amber-500" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="container-site relative grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <p className="text-sm leading-relaxed text-white/70">
            {footerText ||
              "Trusted wholesale grocery supplier with 25+ years of experience serving institutions, industries, mills, grocery shops and bulk customers across Erode, Tamil Nadu."}
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
          <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-full bg-brand-gold/50" />
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
          <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-full bg-brand-gold/50" />
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
          <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-full bg-brand-gold/50" />
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <MapPin className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
              </span>
              <span>
                {name},<br />
                {addressLine1}
                <br />
                {addressLine2}
                <br />
                {addressState}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <Phone className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
              </span>
              <span>
                <a href={telHref(phone)} className="hover:text-brand-gold">
                  Office: {phone}
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
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <Mail className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
              </span>
              <a href={`mailto:${email}`} className="break-all hover:text-brand-gold">
                {email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {copyrightYear || "2026"} Thirumalaai Traders. All Rights Reserved.</p>
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
