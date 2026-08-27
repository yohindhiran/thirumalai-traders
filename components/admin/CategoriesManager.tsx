"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { Category } from "@/types";

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/categories");
    if (res.ok) setCategories((await res.json()).categories);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleStatus(c: Category) {
    const next = c.status === "active" ? "inactive" : "active";
    if (
      next === "inactive" &&
      !confirm(`Deactivate "${c.name}"? Its products will also be hidden from the website catalog.`)
    ) {
      return;
    }
    const res = await fetch(`/api/admin/categories/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) setCategories((l) => l.map((x) => (x.id === c.id ? { ...x, status: next } : x)));
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Delete category "${name}" permanently?`)) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories((l) => l.filter((c) => c.id !== id));
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.error || "Could not delete category.");
    }
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button type="button" onClick={() => setShowAdd(true)} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading categories…
        </div>
      ) : (
        <ul className="space-y-3">
          {categories.map((c) => (
            <li key={c.id} className="card flex items-start justify-between gap-4 p-5">
              <div>
                <p className="font-semibold text-brand-ink">{c.name}</p>
                <p className="mt-0.5 text-xs uppercase tracking-wide text-brand-muted">/{c.slug}</p>
                <p className="mt-1.5 max-w-xl text-sm text-brand-muted">{c.description}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <button
                  type="button"
                  onClick={() => toggleStatus(c)}
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                    c.status === "active"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-gray-200 bg-gray-100 text-gray-500"
                  }`}
                >
                  {c.status}
                </button>
                <button
                  type="button"
                  onClick={() => remove(c.id, c.name)}
                  aria-label={`Delete ${c.name}`}
                  className="rounded p-1.5 text-brand-muted hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showAdd && (
        <CategoryModal
          onClose={() => setShowAdd(false)}
          onSaved={(c) => {
            setCategories((l) => [...l, c]);
            setShowAdd(false);
          }}
        />
      )}
    </div>
  );
}

function CategoryModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: (c: Category) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) onSaved((await res.json()).category);
    else {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Could not save category.");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Close dialog" onClick={onClose} className="absolute inset-0 bg-black/40" />
      <form onSubmit={handleSubmit} className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lift sm:p-8">
        <h2 className="text-lg font-bold text-brand-ink">Add Category</h2>
        {error && (
          <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="cm-name" className="label">Category Name *</label>
            <input id="cm-name" name="name" required placeholder="e.g. Pickles & Papads" className="input" />
          </div>
          <div>
            <label htmlFor="cm-desc" className="label">Description</label>
            <textarea id="cm-desc" name="description" rows={3} className="input resize-y" />
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            Save Category
          </button>
          <button type="button" onClick={onClose} className="btn-outline flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
