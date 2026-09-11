"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import ImageField from "@/components/admin/ImageField";

type Testimonial = {
  id: string;
  name: string;
  company?: string;
  quote: string;
  image?: string;
  status: "active" | "inactive";
  displayOrder: number;
};

export default function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) {
      const data = await res.json();
      setItems(data.items as Testimonial[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleStatus(t: Testimonial) {
    const next = t.status === "active" ? "inactive" : "active";
    const res = await fetch(`/api/admin/testimonials/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok)
      setItems((l) => l.map((x) => (x.id === t.id ? { ...x, status: next } : x)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial permanently?")) return;
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) setItems((l) => l.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button type="button" onClick={() => setShowAdd(true)} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading testimonials…
        </div>
      ) : items.length === 0 ? (
        <div className="card p-12 text-center text-brand-muted">
          No testimonials yet. Click “Add Testimonial” to create one.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((t) => (
            <li key={t.id} className="card flex items-start gap-4 p-5">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-brand-line bg-brand-soft">
                {t.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-brand-muted">
                    {t.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-brand-ink">
                  {t.name}
                  {t.company ? <span className="ml-2 text-sm font-normal text-brand-muted">{t.company}</span> : null}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-brand-muted">{t.quote}</p>
                <span className="mt-1.5 inline-block text-xs text-brand-muted">Order #{t.displayOrder}</span>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <button
                  type="button"
                  onClick={() => toggleStatus(t)}
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                    t.status === "active"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-gray-200 bg-gray-100 text-gray-500"
                  }`}
                >
                  {t.status}
                </button>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setEditing(t)}
                    aria-label="Edit testimonial"
                    className="rounded p-1.5 text-brand-muted hover:bg-brand-soft hover:text-brand-green"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(t.id)}
                    aria-label="Delete testimonial"
                    className="rounded p-1.5 text-brand-muted hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showAdd && (
        <TestimonialModal
          onClose={() => setShowAdd(false)}
          onSaved={(t) => {
            setItems((l) => [...l, t]);
            setShowAdd(false);
          }}
        />
      )}
      {editing && (
        <TestimonialModal
          testimonial={editing}
          onClose={() => setEditing(null)}
          onSaved={(t) => {
            setItems((l) => l.map((x) => (x.id === t.id ? t : x)));
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function TestimonialModal({
  testimonial,
  onClose,
  onSaved,
}: {
  testimonial?: Testimonial;
  onClose: () => void;
  onSaved: (t: Testimonial) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(
      testimonial ? `/api/admin/testimonials/${testimonial.id}` : "/api/admin/testimonials",
      {
        method: testimonial ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    if (res.ok) onSaved((await res.json()).item as Testimonial);
    else {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Could not save testimonial.");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Close dialog" onClick={onClose} className="absolute inset-0 bg-black/40" />
      <form
        onSubmit={handleSubmit}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lift sm:p-8"
      >
        <h2 className="text-lg font-bold text-brand-ink">
          {testimonial ? `Edit Testimonial — ${testimonial.name}` : "Add Testimonial"}
        </h2>
        {error && (
          <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="tm-name" className="label">Customer Name *</label>
            <input id="tm-name" name="name" required defaultValue={testimonial?.name} className="input" />
          </div>
          <div>
            <label htmlFor="tm-quote" className="label">Testimonial Text *</label>
            <textarea id="tm-quote" name="quote" required rows={4} defaultValue={testimonial?.quote} className="input resize-y" />
          </div>
          <div>
            <label htmlFor="tm-company" className="label">Company</label>
            <input id="tm-company" name="company" defaultValue={testimonial?.company} className="input" />
          </div>
          <ImageField name="image" label="Customer Image / Logo" value={testimonial?.image || ""} />
          <div>
            <label htmlFor="tm-status" className="label">Status</label>
            <select id="tm-status" name="status" defaultValue={testimonial?.status ?? "active"} className="input">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {testimonial ? "Save Changes" : "Add Testimonial"}
          </button>
          <button type="button" onClick={onClose} className="btn-outline flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
