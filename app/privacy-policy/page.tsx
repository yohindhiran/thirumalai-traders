import { SITE } from "@/data/site";
import { getContactSettings, getPageContent } from "@/lib/db";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${SITE.name} handles information submitted through this website.`,
  path: "/privacy-policy",
});

const SECTIONS = [
  {
    h: "Information We Collect",
    p: "When you submit an enquiry through this website, we collect the details you provide — such as your name, company or institution name, phone number, email, customer type, product requirements and delivery location. We collect only what is needed to respond to your enquiry.",
  },
  {
    h: "How We Use Your Information",
    p: "We use the information you provide solely to respond to your wholesale enquiry, share pricing and supply details, and contact you regarding your requirement. Enquiry details may be stored in our business records to serve you better over time.",
  },
  {
    h: "Sharing of Information",
    p: "We do not sell, rent or trade your personal information. Enquiry details are accessible only to authorised members of our team who handle customer enquiries.",
  },
  {
    h: "Cookies",
    p: "This website does not use advertising or tracking cookies. Basic technical measures may be used for website security and administration.",
  },
  {
    h: "Data Retention",
    p: "Enquiry records are retained as part of our regular business records. If you would like us to remove your details from our records, please contact us.",
  },
  {
    h: "Your Choices",
    p: "You may choose not to submit an enquiry form and instead contact us directly by phone or email. You may also request correction or removal of the information you have shared with us.",
  },
  {
    h: "Changes to This Policy",
    p: "We may update this policy from time to time. Any changes will be published on this page.",
  },
];

export default function PrivacyPolicyPage() {
  // Admin-managed sections (Admin → Company Pages → Privacy Policy).
  const page = getPageContent("privacy-policy");
  const contact = getContactSettings();
  const email = contact.email || SITE.email;
  const officePhone = contact.phone || SITE.officePhone;
  const sections = page?.sections?.length
    ? page.sections
        .filter((s: any) => s.status !== "inactive" && (s.heading || s.body))
        .slice()
        .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
        .map((s: any) => ({ h: s.heading, p: s.body }))
    : SECTIONS;
  return (
    <>
      <PageHero
        title={page?.heroTitle || "Privacy Policy"}
        backgroundImage={page?.heroImage || "/images/about-warehouse.jpg"}
      />
      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl">
          {sections.map((s) => (
            <div key={s.h} className="mb-8">
              <h2 className="text-lg font-semibold text-brand-ink">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-brand-muted">{s.p}</p>
            </div>
          ))}
          <div className="rounded-md border border-brand-line bg-brand-soft p-5 text-sm text-brand-muted">
            Questions about this policy? Email us at{" "}
            <a href={`mailto:${email}`} className="font-medium text-brand-green hover:underline">
              {email}
            </a>{" "}
            or call our office at {officePhone}.
          </div>
        </div>
      </section>
    </>
  );
}
