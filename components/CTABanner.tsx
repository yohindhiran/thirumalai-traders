import Link from "next/link";
import { SITE } from "@/data/site";
import { whatsappHref } from "@/lib/utils";

export default function CTABanner({
  title = "Looking for a Reliable Wholesale Grocery Partner?",
  subtitle = "Share your requirement and our sales team will get back to you with wholesale pricing and supply details.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-lg bg-brand-green px-6 py-14 text-center sm:px-12 lg:py-16">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-1.5 bg-brand-gold"
          />
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">{subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/enquiry" className="btn-gold w-full sm:w-auto">
              Send Enquiry
            </Link>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full border border-white/30 text-white hover:bg-white/10 sm:w-auto"
            >
              WhatsApp Us
            </a>
            <a
              href={`tel:+91${SITE.officePhone.replace(/\s/g, "")}`}
              className="btn w-full text-brand-gold hover:underline sm:w-auto"
            >
              Call {SITE.officePhone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
