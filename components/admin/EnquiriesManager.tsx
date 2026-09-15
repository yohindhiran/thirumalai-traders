"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, Trash2 } from "lucide-react";
import type { Enquiry } from "@/types";
import { ENQUIRY_STATUSES } from "@/data/site";
import { cn, formatDate, telHref } from "@/lib/utils";

const STATUS_STYLE: Record<string, string> = {
  New: "bg-blue-50 text-blue-700 border-blue-200",
  Contacted: "bg-amber-50 text-amber-700 border-amber-200",
  "In Progress": "bg-purple-50 text-purple-700 border-purple-200",
  Converted: "bg-green-50 text-green-700 border-green-200",
  Closed: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function EnquiriesManager() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (query) params.set("q", query);
    params.set("t", String(Date.now()));
    const res = await fetch(`/api/admin/enquiries?${params}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setEnquiries(data.enquiries);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function updateEnquiry(id: string, patch: Partial<Enquiry>) {
    const res = await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      setEnquiries((list) =>
        list.map((e) => (e.id === id ? { ...e, ...patch } as Enquiry : e))
      );
      setSelected((s) => (s && s.id === id ? ({ ...s, ...patch } as Enquiry) : s));
      router.refresh();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this enquiry permanently?")) return;
    const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
    if (res.ok) {
      setEnquiries((l) => l.filter((e) => e.id !== id));
      setSelected(null);
      router.refresh();
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()}
            placeholder="Search name, company, phone…"
            aria-label="Search enquiries"
            className="input !pl-10"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
          className="input sm:w-44"
        >
          <option value="">All Statuses</option>
          {ENQUIRY_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button type="button" onClick={load} className="btn-primary !py-2.5">
          Search
        </button>
      </div>

      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading enquiries…
        </div>
      ) : enquiries.length === 0 ? (
        <div className="card p-16 text-center text-sm text-brand-muted">
          No enquiries match your filters yet.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-brand-line bg-brand-soft text-xs uppercase tracking-wide text-brand-muted">
                <th className="px-5 py-3.5 font-semibold">Customer</th>
                <th className="px-5 py-3.5 font-semibold">Company</th>
                <th className="px-5 py-3.5 font-semibold">Requirement</th>
                <th className="px-5 py-3.5 font-semibold">Date</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id} className="cursor-pointer border-b border-brand-line last:border-0 hover:bg-brand-soft/60" onClick={() => setSelected(e)}>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-brand-ink">{e.name}</p>
                    <p className="text-xs text-brand-muted">{e.phone}</p>
                  </td>
                  <td className="px-5 py-3.5 text-brand-muted">{e.company || "—"}</td>
                  <td className="max-w-[220px] truncate px-5 py-3.5 text-brand-muted">
                    {e.productsRequired || e.category || e.message || "—"}
                  </td>
                  <td className="px-5 py-3.5 text-brand-muted">{formatDate(e.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn("rounded-full border px-2.5 py-1 text-xs font-medium", STATUS_STYLE[e.status])}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={(ev) => { ev.stopPropagation(); remove(e.id); }}
                      aria-label={`Delete enquiry from ${e.name}`}
                      className="rounded p-1.5 text-brand-muted hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close details"
            onClick={() => setSelected(null)}
            className="absolute inset-0 bg-black/40"
          />
          <aside className="relative flex w-full max-w-md flex-col overflow-y-auto bg-white p-6 shadow-lift sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-brand-ink">Enquiry Details</h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-md border border-brand-line px-3 py-1 text-sm text-brand-muted hover:text-brand-ink"
              >
                Close
              </button>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              {[
                ["Name", selected.name],
                ["Company / Institution", selected.company],
                ["Phone", selected.phone],
                ["Email", selected.email],
                ["Customer Type", selected.customerType],
                ["Product Category", selected.category],
                ["Products Required", selected.productsRequired],
                ["Approximate Quantity", selected.quantity],
                ["Delivery Location", selected.deliveryLocation],
                ["Message", selected.message],
                ["Received", formatDate(selected.createdAt)],
              ].map(([k, v]) => (
                <div key={k as string} className="grid grid-cols-[140px_1fr] gap-2">
                  <dt className="font-medium text-brand-muted">{k}</dt>
                  <dd className="break-words text-brand-ink">{v || "—"}</dd>
                </div>
              ))}
            </dl>

            <a href={telHref(selected.phone)} className="btn-outline mt-6 !py-2.5 !text-sm">
              Call {selected.phone}
            </a>

            <div className="mt-6">
              <label htmlFor="enq-status" className="label">Status</label>
              <select
                id="enq-status"
                value={selected.status}
                onChange={(e) => updateEnquiry(selected.id, { status: e.target.value as Enquiry["status"] })}
                className="input"
              >
                {ENQUIRY_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex-1">
              <label htmlFor="enq-notes" className="label">Internal Notes</label>
              <textarea
                id="enq-notes"
                rows={5}
                defaultValue={selected.adminNotes}
                onBlur={(e) => updateEnquiry(selected.id, { adminNotes: e.target.value })}
                placeholder="Notes visible only to the admin team — saved when you click outside."
                className="input resize-y"
              />
            </div>

            <button
              type="button"
              onClick={() => remove(selected.id)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete Enquiry
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
