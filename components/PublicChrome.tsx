"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { SiteSettings, ContactSettings } from "@/types";

export default function PublicChrome({
  site,
  contact,
  children,
}: {
  site: SiteSettings;
  contact: ContactSettings;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header phone={contact.phone || site.phone} logo={site.logo} />
      <main className="flex-1">{children}</main>
      <Footer
        footerText={site.footerText}
        copyrightYear={site.copyrightYear}
        contact={{
          name: site.companyName,
          phone: contact.phone,
          email: contact.email,
          addressLine1: contact.addressLine1,
          addressLine2: contact.addressLine2,
          addressState: contact.addressState,
        }}
      />
      <WhatsAppButton />
    </>
  );
}
