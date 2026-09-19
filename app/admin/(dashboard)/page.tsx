import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Flame,
  FolderTree,
  Inbox,
  LayoutGrid,
  MessageSquareQuote,
  Users,
} from "lucide-react";
import { readDb } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import type {
  Enquiry,
  EnquiryStatus,
  Testimonial,
  ValuedCustomer,
} from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATUS_STYLE: Record<EnquiryStatus, string> = {
  New: "bg-blue-50 text-blue-700 border-blue-200",
  Contacted: "bg-amber-50 text-amber-700 border-amber-200",
  "In Progress": "bg-purple-50 text-purple-700 border-purple-200",
  Converted: "bg-green-50 text-green-700 border-green-200",
  Closed: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function AdminDashboardPage() {
  const db = readDb();

  const enquiries: Enquiry[] = db.enquiries ?? [];
  const newCount = enquiries.filter((e) => e.status === "New").length;
  const leads = new Set(
    enquiries.map((e) => (e.phone ?? "").toLowerCase())
  ).size;
  const activeTestimonials = (db.testimonials ?? []).filter(
    (t: Testimonial) => t.status === "active"
  ).length;
  const activeCustomers = (db.valuedCustomers ?? []).filter(
    (c: ValuedCustomer) => c.status === "active"
  ).length;

  const stats = [
    { label: "Total Products", value: db.products.length, icon: Boxes, href: "/admin/dashboard/products" },
    { label: "Total Categories", value: db.categories.length, icon: FolderTree, href: "/admin/dashboard/categories" },
    { label: "Most Selling", value: db.mostSelling.length, icon: Flame, href: "/admin/dashboard/most-selling" },
    { label: "Our Products", value: db.ourProducts.length, icon: LayoutGrid, href: "/admin/dashboard/our-products" },
    { label: "Testimonials", value: activeTestimonials, icon: MessageSquareQuote, href: "/admin/dashboard/testimonials" },
    { label: "Valued Customers", value: activeCustomers, icon: Users, href: "/admin/dashboard/customers" },
    { label: "Total Enquiries", value: enquiries.length, icon: Inbox, href: "/admin/dashboard/enquiries" },
    { label: "New Enquiries", value: newCount, icon: Inbox, href: "/admin/dashboard/enquiries?status=New" },
    { label: "Total Leads", value: leads, icon: Users, href: "/admin/dashboard/enquiries" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-brand-muted">Overview of your business activity.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 transition-shadow hover:shadow-lift">
            <s.icon className="h-5 w-5 text-brand-green" aria-hidden="true" />
            <p className="mt-3 text-2xl font-bold text-brand-ink">{s.value}</p>
            <p className="text-xs font-medium text-brand-muted">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-ink">Recent Enquiries</h2>
          <Link
            href="/admin/dashboard/enquiries"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-green hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {enquiries.length === 0 ? (
          <div className="card p-12 text-center text-sm text-brand-muted">
            No enquiries yet. New wholesale enquiries from the website will appear here.
          </div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-brand-line bg-brand-soft text-xs uppercase tracking-wide text-brand-muted">
                  <th className="px-5 py-3.5 font-semibold">Customer</th>
                  <th className="px-5 py-3.5 font-semibold">Company</th>
                  <th className="px-5 py-3.5 font-semibold">Products / Requirement</th>
                  <th className="px-5 py-3.5 font-semibold">Date</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.slice(0, 8).map((e) => (
                  <tr key={e.id} className="border-b border-brand-line last:border-0 hover:bg-brand-soft/60">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-brand-ink">{e.name}</p>
                      <p className="text-xs text-brand-muted">{e.phone}</p>
                    </td>
                    <td className="px-5 py-3.5 text-brand-muted">{e.company || "—"}</td>
                    <td className="max-w-[240px] truncate px-5 py-3.5 text-brand-muted">
                      {e.productsRequired || e.message || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-brand-muted">{formatDate(e.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[e.status] ?? STATUS_STYLE.Closed}`}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
