"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  FolderTree,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/dashboard/products", label: "Products", icon: Boxes },
  { href: "/admin/dashboard/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/dashboard/content", label: "Content", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 p-4">
      {LINKS.map((l) => {
        const active =
          l.href === "/admin/dashboard"
            ? pathname === "/admin/dashboard"
            : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
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
      <div className="mt-auto pt-6">
        <LogoutButton />
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile top toggle */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
        className="fixed left-4 bottom-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-white shadow-lift lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col bg-brand-green-deep lg:flex">
        <SidebarBrand />
        {nav}
      </aside>

      {/* Mobile drawer */}
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
    <Link href="/admin/dashboard" className="flex items-center gap-3 px-5 py-5">
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
