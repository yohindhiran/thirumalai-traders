"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Building2,
  FileText,
  FolderTree,
  Flame,
  HelpCircle,
  Image,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Menu,
  MessageSquareQuote,
  Phone,
  Settings,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string; icon: React.ComponentType<{ className?: string }> };
type Group = { title: string; items: Item[] };

const GROUPS: Group[] = [
  {
    title: "Dashboard",
    items: [{ href: "/admin", label: "Overview", icon: LayoutDashboard }],
  },
  {
    title: "Home Page",
    items: [
      { href: "/admin/dashboard/hero", label: "Home Hero", icon: Image },
      { href: "/admin/dashboard/home-about", label: "Home About Section", icon: Building2 },
      { href: "/admin/dashboard/home-showcase", label: "What We Supply", icon: LayoutGrid },
      { href: "/admin/dashboard/customers", label: "Valued Customers", icon: Users },
      { href: "/admin/dashboard/content", label: "Home Content", icon: FileText },
    ],
  },
  {
    title: "About Page",
    items: [
      { href: "/admin/dashboard/about", label: "About / Vision / Mission", icon: Building2 },
      { href: "/admin/dashboard/testimonials", label: "Testimonials", icon: MessageSquareQuote },
    ],
  },
  {
    title: "Product Management",
    items: [
      { href: "/admin/dashboard/products", label: "Products", icon: Boxes },
      { href: "/admin/dashboard/categories", label: "Categories", icon: FolderTree },
      { href: "/admin/dashboard/most-selling", label: "Most Selling", icon: Flame },
      { href: "/admin/dashboard/our-products", label: "Our Products", icon: LayoutGrid },
    ],
  },
  {
    title: "Other Pages",
    items: [
      { href: "/admin/dashboard/pages", label: "Company Pages", icon: FileText },
      { href: "/admin/dashboard/faqs", label: "FAQ", icon: HelpCircle },
      { href: "/admin/dashboard/enquiries", label: "Enquiries", icon: Inbox },
      { href: "/admin/dashboard/contact-settings", label: "Contact Settings", icon: Phone },
      { href: "/admin/dashboard/site-settings", label: "Site Settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  }

  const nav = (
    <nav className="scrollbar-hide flex flex-1 flex-col gap-3 overflow-y-auto p-3">
      {GROUPS.map((group) => (
        <div key={group.title}>
          <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
            {group.title}
          </p>
          <div className="flex flex-col gap-0.5">
            {group.items.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-gold/90 text-brand-green-deep"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <l.icon className="h-4 w-4" aria-hidden="true" />
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      <div className="pt-2">
        <LogoutButton />
      </div>
    </nav>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
        className="fixed left-4 bottom-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-white shadow-lift lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-brand-green-deep lg:flex">
        <SidebarBrand />
        {nav}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close admin menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-brand-green-deep shadow-lift">
            <div className="flex items-center justify-between pr-3">
              <SidebarBrand />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 text-white/70 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarBrand() {
  return (
    <Link href="/admin" className="flex items-center gap-3 px-5 py-5">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-gold font-bold text-brand-green-deep">
        TT
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-bold uppercase tracking-wide text-white">
          Thirumalaai Traders
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
          Admin Panel
        </span>
      </span>
    </Link>
  );
}

function LogoutButton() {
  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    window.location.href = "/admin/login";
  }
  return (
    <button
      type="button"
      onClick={logout}
      className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      Sign Out
    </button>
  );
}
