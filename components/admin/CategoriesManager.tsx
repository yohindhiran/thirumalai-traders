"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import type { Category } from "@/types";
import ImageField from "@/components/admin/ImageField";

export default function CategoriesManager() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/categories?t=${Date.now()}`, { cache: "no-store" });
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
    if (res.ok) {
      setCategories((l) => l.map((x) => (x.id === c.id ? { ...x, status: next } : x)));
      router.refresh();
    }
  }

  async function patchOrder(c: Category, displayOrder: number) {
    const res = await fetch(`/api/admin/categories/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayOrder }),
    });
    if (res.ok) {
      setCategories((l) => l.map((x) => (x.id === c.id ? { ...x, displayOrder } : x)));
      router.refresh();
    }
  }

  function move(c: Category, dir: -1 | 1) {
    const sorted = categories.slice().sort((a, b) => a.displayOrder - b.displayOrder);
    const idx = sorted.findIndex((x) => x.id === c.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    patchOrder(c, swap.displayOrder);
    patchOrder(swap, c.displayOrder);
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Delete category "${name}" permanently?`)) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories((l) => l.filter((c) => c.id !== id));
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.error || "Could not delete category.");
    }
  }

  const sorted = categories.slice().sort((a, b) => a.displayOrder - b.displayOrder);

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
          {sorted.map((c, i) => (
            <li key={c.id} className="card flex items-start gap-4 p-4">
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md border border-brand-line bg-brand-soft">
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-brand-muted">
                    No image
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
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
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(c, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(c, 1)}
                    disabled={i === sorted.length - 1}
                    aria-label="Move down"
                    className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(c)}
                    aria-label="Edit category"
                    className="rounded p-1.5 text-brand-muted hover:bg-brand-soft hover:text-brand-green"
                  >
                    <Pencil className="h-4 w-4" />
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
            router.refresh();
          }}
        />
      )}
      {editing && (
        <CategoryModal
          category={editing}
          onClose={() => setEditing(null)}
          onSaved={(c) => {
            setCategories((l) => l.map((x) => (x.id === c.id ? c : x)));
            setEditing(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function CategoryModal({
  category,
  onClose,
  onSaved,
}: {
  category?: Category;
  onClose: () => void;
  onSaved: (c: Category) => void;
}) {
  const [image, setImage] = useState(category?.image || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(
      category ? `/api/admin/categories/${category.id}` : "/api/admin/categories",
      {
        method: category ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          slug: form.slug,
          description: form.description,
          image,
          status: form.status,
        }),
      }
    );
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
        <h2 className="text-lg font-bold text-brand-ink">{category ? `Edit — ${category.name}` : "Add Category"}</h2>
        {error && (
          <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="cm-name" className="label">Category Name *</label>
            <input id="cm-name" name="name" required defaultValue={category?.name} placeholder="e.g. Pickles & Papads" className="input" />
          </div>
          <div>
            <label htmlFor="cm-slug" className="label">URL Slug (link)</label>
            <input id="cm-slug" name="slug" defaultValue={category?.slug} placeholder="auto-generated from name" className="input" />
          </div>
          <div>
            <label htmlFor="cm-desc" className="label">Description</label>
            <textarea id="cm-desc" name="description" rows={3} defaultValue={category?.description} className="input resize-y" />
          </div>
          <ImageField name="image" label="Category Image" value={image} onChange={setImage} />
          <div>
            <label htmlFor="cm-status" className="label">Status</label>
            <select id="cm-status" name="status" defaultValue={category?.status ?? "active"} className="input">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {category ? "Save Changes" : "Save Category"}
          </button>
          <button type="button" onClick={onClose} className="btn-outline flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
