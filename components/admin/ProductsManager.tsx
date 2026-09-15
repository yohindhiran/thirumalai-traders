"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Search, Trash2 } from "lucide-react";
import ImageField from "@/components/admin/ImageField";
import type { Category, Product } from "@/types";

export default function ProductsManager() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const PAGE_SIZE = 25;

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/products?t=${Date.now()}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products);
      setCategories(data.categories);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const catName = useMemo(() => {
    const m = new Map(categories.map((c) => [c.id, c.name]));
    return (id: string) => m.get(id) || "—";
  }, [categories]);

  const filtered = useMemo(() => {
    let list = products;
    if (catFilter) list = list.filter((p) => p.categoryId === catFilter);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
    return list;
  }, [products, query, catFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function toggleStatus(p: Product) {
    const next = p.status === "active" ? "inactive" : "active";
    const res = await fetch(`/api/admin/products/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) {
      setProducts((l) => l.map((x) => (x.id === p.id ? { ...x, status: next } : x)));
      router.refresh();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this product permanently?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((l) => l.filter((p) => p.id !== id));
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
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search products…"
            aria-label="Search products"
            className="input !pl-10"
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}
          aria-label="Filter by category"
          className="input sm:w-52"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button type="button" onClick={() => setShowAdd(true)} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading products…
        </div>
      ) : (
        <>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-brand-line bg-brand-soft text-xs uppercase tracking-wide text-brand-muted">
                  <th className="px-5 py-3.5 font-semibold">Product</th>
                  <th className="px-5 py-3.5 font-semibold">Image</th>
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Subcategory</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p) => (
                  <tr key={p.id} className="border-b border-brand-line last:border-0 hover:bg-brand-soft/60">
                    <td className="px-5 py-3 font-medium text-brand-ink">{p.name}</td>
                    <td className="px-5 py-3">
                      {p.images?.[0] || p.mainImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.images?.[0] || p.mainImage}
                          alt={p.name}
                          className="h-10 w-14 rounded-md border border-brand-line object-cover"
                        />
                      ) : (
                        <span className="inline-flex h-10 w-14 items-center justify-center rounded-md bg-brand-soft text-[10px] text-brand-muted">
                          No image
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-brand-muted">{catName(p.categoryId)}</td>
                    <td className="px-5 py-3 text-brand-muted">{p.subcategory || "—"}</td>
                    <td className="px-5 py-3">
                      <button
                        type="button"
                        onClick={() => toggleStatus(p)}
                        aria-label={`${p.status === "active" ? "Deactivate" : "Activate"} ${p.name}`}
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                          p.status === "active"
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-gray-200 bg-gray-100 text-gray-500"
                        }`}
                      >
                        {p.status}
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditing(p)}
                          className="rounded border border-brand-line px-3 py-1 text-xs font-medium text-brand-ink hover:border-brand-green hover:text-brand-green"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(p.id)}
                          aria-label={`Delete ${p.name}`}
                          className="rounded p-1.5 text-brand-muted hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-brand-muted">
                      No products match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-brand-muted">
            <p>
              {filtered.length} products · Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-md border border-brand-line bg-white px-3 py-1.5 font-medium disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-md border border-brand-line bg-white px-3 py-1.5 font-medium disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {showAdd && (
        <ProductModal
          categories={categories}
          onClose={() => setShowAdd(false)}
          onSaved={(p) => {
            setProducts((l) => [p, ...l]);
            setShowAdd(false);
            router.refresh();
          }}
        />
      )}
      {editing && (
        <ProductModal
          categories={categories}
          product={editing}
          onClose={() => setEditing(null)}
          onSaved={(p) => {
            setProducts((l) => l.map((x) => (x.id === p.id ? p : x)));
            setEditing(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function ProductModal({
  categories,
  product,
  onClose,
  onSaved,
}: {
  categories: Category[];
  product?: Product;
  onClose: () => void;
  onSaved: (p: Product) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(
      product ? `/api/admin/products/${product.id}` : "/api/admin/products",
      {
        method: product ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    if (res.ok) {
      const data = await res.json();
      onSaved(data.product);
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Could not save product.");
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
          {product ? `Edit Product — ${product.name}` : "Add Product"}
        </h2>
        {error && (
          <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="pm-name" className="label">Product Name *</label>
            <input id="pm-name" name="name" required defaultValue={product?.name} className="input" />
          </div>
          <div>
            <label htmlFor="pm-cat" className="label">Category *</label>
            <select id="pm-cat" name="categoryId" required defaultValue={product?.categoryId ?? ""} className="input">
              <option value="" disabled>Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pm-sub" className="label">Subcategory</label>
            <input id="pm-sub" name="subcategory" defaultValue={product?.subcategory} placeholder="e.g. Pulses" className="input" />
          </div>
          <div>
            <label htmlFor="pm-desc" className="label">Description</label>
            <textarea id="pm-desc" name="description" rows={4} defaultValue={product?.description} className="input resize-y" />
          </div>
          <div>
            <ImageField
              name="images"
              label="Product Image"
              value={product?.images?.[0] || product?.mainImage}
              rounded="rounded-lg"
            />
            <p className="mt-1.5 text-xs text-brand-muted">
              Choose a file to upload, or the image URL will be saved automatically.
            </p>
          </div>
          <div>
            <label htmlFor="pm-status" className="label">Status</label>
            <select id="pm-status" name="status" defaultValue={product?.status ?? "active"} className="input">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {product ? "Save Changes" : "Add Product"}
          </button>
          <button type="button" onClick={onClose} className="btn-outline flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
