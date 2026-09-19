import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import { getContactSettings, getSiteSettings } from "@/lib/db";
import PublicChrome from "@/components/PublicChrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteSettings();
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} | Wholesale Grocery Supplier in Erode`,
      template: `%s | ${SITE.name}`,
    },
    description: SITE.description,
    // CMS-managed favicon (Admin → Site Settings); falls back to the default.
    icons: { icon: site.favicon || "/icon.svg" },
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = getSiteSettings();
  const contact = getContactSettings();

  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <PublicChrome site={site} contact={contact}>{children}</PublicChrome>
      </body>
    </html>
  );
}
