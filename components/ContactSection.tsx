import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { MANAGEMENT, OFFICE, SALES_TEAM, SITE } from "@/data/site";
import { getContactSettings, getSiteSettings } from "@/lib/db";
import { telHref } from "@/lib/utils";
import ContactInlineForm from "@/components/ContactInlineForm";

function PersonCard({
  name,
  role,
  phone,
}: {
  name: string;
  role: string;
  phone: string;
}) {
  return (
    <div className="card flex flex-wrap items-center justify-between gap-3 p-5">
      <div>
        <p className="font-semibold text-brand-ink">{name}</p>
        {role && <p className="text-sm text-brand-muted">{role}</p>}
      </div>
      <a
        href={telHref(phone)}
        className="btn-primary shrink-0 !px-3.5 !py-2 !text-xs sm:!text-sm"
      >
        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
        {phone}
      </a>
    </div>
  );
}

const DEFAULT_MAP_QUERY = "Karungalpalayam,+Erode,+Tamil+Nadu+638003";

function mapSrc(mapsLink?: string): string {
  const value = (mapsLink || "").trim();
  if (!value) return `https://www.google.com/maps?q=${DEFAULT_MAP_QUERY}&output=embed`;
  if (/^https?:\/\//i.test(value)) return value;
  return `https://www.google.com/maps?q=${encodeURIComponent(value)}&output=embed`;
}

export default function ContactSection({ withForm = true }: { withForm?: boolean }) {
  // Admin-managed contact details (Admin → Contact Settings); every field
  // falls back to the long-standing hardcoded values when unsaved.
  const contact = getContactSettings();
  const site = getSiteSettings();

  const companyName = site.companyName || SITE.name;
  const line1 = contact.addressLine1 || SITE.address.line1;
  const line2 = contact.addressLine2 || SITE.address.line2;
  const state = contact.addressState || SITE.address.state;
  const email = contact.email || SITE.email;
  const officePhone = contact.phone || SITE.officePhone;
  const whatsappDigits = (contact.whatsapp || "919384482007").replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    "Hello Thirumalaai Traders, I would like to enquire about wholesale grocery products."
  )}`;

  // Admin-managed team (Admin → Contact Settings → Team). When empty, the
  // default Management + Sales Team blocks render exactly as before.
  const team = (contact.team || []).filter((m: any) => m && m.name && m.phone);

  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-brand-ink">Reach Us</h2>
              <ul className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-green/10 text-brand-green">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <address className="not-italic leading-relaxed text-brand-muted">
                    <strong className="block text-brand-ink">{companyName}</strong>
                    {line1}
                    <br />
                    {line2}
                    <br />
                    {state}
                  </address>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-green/10 text-brand-green">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="break-all leading-relaxed text-brand-muted hover:text-brand-green"
                  >
                    {email}
                  </a>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#25D366]/15 text-[#1da851]">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-green hover:underline"
                  >
                    WhatsApp Us — Office {officePhone}
                  </a>
                </li>
              </ul>
            </div>

            {team.length ? (
              <div>
                <h2 className="text-lg font-bold text-brand-ink">Our Team</h2>
                <div className="mt-4 space-y-3">
                  {team.map((m: any) => (
                    <PersonCard key={m.phone} name={m.name} role={m.role || ""} phone={m.phone} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-bold text-brand-ink">Management</h2>
                  <div className="mt-4 space-y-3">
                    {[...MANAGEMENT, ...OFFICE].map((m) => (
                      <PersonCard key={m.phone} {...m} />
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-brand-ink">Sales Team</h2>
                  <div className="mt-4 space-y-3">
                    {SALES_TEAM.map((m) => (
                      <PersonCard key={m.phone} {...m} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {withForm && (
            <div>
              <h2 className="text-2xl font-bold text-brand-ink">Send an Enquiry</h2>
              <p className="mb-8 mt-2 text-brand-muted">
                Fill in your requirement and our team will respond with wholesale pricing details.
              </p>
              <ContactInlineForm />
            </div>
          )}
        </div>

        <div className="mt-14 overflow-hidden rounded-lg border border-brand-line">
          <iframe
            title={`Map showing location of ${companyName} in Karungalpalayam, Erode`}
            src={mapSrc(contact.mapsLink)}
            width="100%"
            height="380"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="border-0"
          />
        </div>
      </div>
    </section>
  );
}
