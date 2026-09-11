"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";

type Faq = {
  id: string;
  question: string;
  answer: string;
  status: "active" | "inactive";
  displayOrder: number;
};

export default function FaqsManager() {
  const [items, setItems] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/faqs");
    if (res.ok) {
      const data = await res.json();
      setItems(data.items as Faq[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleStatus(f: Faq) {
    const next = f.status === "active" ? "inactive" : "active";
    const res = await fetch(`/api/admin/faqs/${f.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok)
      setItems((l) => l.map((x) => (x.id === f.id ? { ...x, status: next } : x)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this FAQ permanently?")) return;
    const res = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    if (res.ok) setItems((l) => l.filter((f) => f.id !== id));
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button type="button" onClick={() => setShowAdd(true)} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add FAQ
        </button>
      </div>

      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading FAQs…
        </div>
      ) : items.length === 0 ? (
        <div className="card p-12 text-center text-brand-muted">
          No FAQs yet. Click “Add FAQ” to create one.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((f) => (
            <li key={f.id} className="card flex items-start gap-4 p-5">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-brand-ink">{f.question}</p>
                <p className="mt-1 line-clamp-2 text-sm text-brand-muted">{f.answer}</p>
                <span className="mt-1.5 inline-block text-xs text-brand-muted">Order #{f.displayOrder}</span>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <button
                  type="button"
                  onClick={() => toggleStatus(f)}
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                    f.status === "active"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-gray-200 bg-gray-100 text-gray-500"
                  }`}
                >
                  {f.status}
                </button>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setEditing(f)}
                    aria-label="Edit FAQ"
                    className="rounded p-1.5 text-brand-muted hover:bg-brand-soft hover:text-brand-green"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(f.id)}
                    aria-label="Delete FAQ"
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
        <FaqModal
          onClose={() => setShowAdd(false)}
          onSaved={(f) => {
            setItems((l) => [...l, f]);
            setShowAdd(false);
          }}
        />
      )}
      {editing && (
        <FaqModal
          faq={editing}
          onClose={() => setEditing(null)}
          onSaved={(f) => {
            setItems((l) => l.map((x) => (x.id === f.id ? f : x)));
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function FaqModal({
  faq,
  onClose,
  onSaved,
}: {
  faq?: Faq;
  onClose: () => void;
  onSaved: (f: Faq) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(
      faq ? `/api/admin/faqs/${faq.id}` : "/api/admin/faqs",
      {
        method: faq ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    if (res.ok) onSaved((await res.json()).item as Faq);
    else {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Could not save FAQ.");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Close dialog" onClick={onClose} className="absolute inset-0 bg-black/40" />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lift sm:p-8"
      >
        <h2 className="text-lg font-bold text-brand-ink">
          {faq ? "Edit FAQ" : "Add FAQ"}
        </h2>
        {error && (
          <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="fm-question" className="label">Question *</label>
            <input id="fm-question" name="question" required defaultValue={faq?.question} className="input" />
          </div>
          <div>
            <label htmlFor="fm-answer" className="label">Answer *</label>
            <textarea id="fm-answer" name="answer" required rows={5} defaultValue={faq?.answer} className="input resize-y" />
          </div>
          <div>
            <label htmlFor="fm-status" className="label">Status</label>
            <select id="fm-status" name="status" defaultValue={faq?.status ?? "active"} className="input">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {faq ? "Save Changes" : "Add FAQ"}
          </button>
          <button type="button" onClick={onClose} className="btn-outline flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
