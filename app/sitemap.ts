import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { readDb } from "@/lib/db";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const categories = readDb().categories.filter((c) => c.status === "active");
  const pages = [
    "",
    "/about",
    "/history",
    "/products",
    "/industries-we-serve",
    "/wholesale-supply",
    "/why-choose-us",
    "/quality",
    "/clients",
    "/contact",
    "/enquiry",
    "/faq",
    "/careers",
    "/privacy-policy",
    "/terms",
    ...categories.map((c) => `/products/${c.slug}`),
  ];
  return pages.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path.startsWith("/products/") ? 0.8 : 0.7,
  }));
}
