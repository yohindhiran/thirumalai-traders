"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white h-full p-4 space-y-4">
        <Link
          href="/admin/dashboard"
          className="block mb-4 text-lg font-semibold"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/products"
          className="block mb-4 text-lg font-semibold"
        >
          Products
        </Link>
        <Link
          href="/admin/categories"
          className="block mb-4 text-lg font-semibold"
        >
          Categories
        </Link>
        <Link
          href="/admin/advertisements"
          className="block mb-4 text-lg font-semibold"
        >
          Advertisements
        </Link>
        <Link
          href="/admin/inventory"
          className="block mb-4 text-lg font-semibold"
        >
          Inventory
        </Link>
        <Link
          href="/admin/enquiries"
          className="block mb-4 text-lg font-semibold"
        >
          Enquiries
        </Link>
        <Link
          href="/admin/settings"
          className="block mb-4 text-lg font-semibold"
        >
          Settings
        </Link>
        <button
          onClick={() => setOpen(!isOpen)}
          className="block w-full text-center text-sm text-gray-300 hover:text-white"
        >
          {isOpen ? "Close Sidebar" : "Menu"}
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}