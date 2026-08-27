import type { Category, Product } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function telHref(phone: string): string {
  return `tel:+91${phone.replace(/\s/g, "")}`;
}

export function whatsappHref(message?: string): string {
  return `https://wa.me/919384482007?text=${encodeURIComponent(
    message ||
      "Hello Thirumalaai Traders, I would like to enquire about wholesale grocery products."
  )}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function categoryName(categories: Category[], id: string): string {
  return categories.find((c) => c.id === id)?.name ?? "—";
}
