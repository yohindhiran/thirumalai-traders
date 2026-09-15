"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import type { Product } from "@/types";

export interface ProductRef {
  productId: string;
  status: "active" | "inactive";
  displayOrder: number;
}

export default function RefProductsManager({
  title,
  endpoint,
}: {
  title: string;
  endpoint: string;
}) {
  const router = useRouter();
  const [items, setItems] = useState<ProductRef[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch(`${endpoint}?t=${Date.now()}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setItems(data.items as ProductRef[]);
      setProducts(data.products as Product[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [endpoint]);

  const nameOf = useMemo(() => {
    const m = new Map(products.map((p) => [p.id, p.name]));
    return (id: string) => m.get(id) || id;
  }, [products]);

  const sorted = useMemo(
    () => items.slice().sort((a, b) => a.displayOrder - b.displayOrder),
    [items]
  );

  async function toggleStatus(ref: ProductRef) {
    const next: ProductRef["status"] = ref.status === "active" ? "inactive" : "active";
    const res = await fetch(`${endpoint}/${ref.productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) {
      setItems((l) =>
        l.map((x) => (x.productId === ref.productId ? { ...x, status: next } : x))
      );
      router.refresh();
    }
  }

  async function patchOrder(ref: ProductRef, displayOrder: number) {
    const res = await fetch(`${endpoint}/${ref.productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayOrder }),
    });
    if (res.ok) {
      setItems((l) =>
        l.map((x) => (x.productId === ref.productId ? { ...x, displayOrder } : x))
      );
      router.refresh();
    }
  }

  function move(ref: ProductRef, dir: -1 | 1) {
    const idx = sorted.findIndex((x) => x.productId === ref.productId);
    const swapWith = sorted[idx + dir];
    if (!swapWith) return;
    const a = sorted[idx].displayOrder;
    const b = swapWith.displayOrder;
    patchOrder(sorted[idx], b);
    patchOrder(swapWith, a);
  }

  async function remove(ref: ProductRef) {
    if (!confirm(`Remove "${nameOf(ref.productId)}" from ${title}?`)) return;
    const res = await fetch(`${endpoint}/${ref.productId}`, { method: "DELETE" });
    if (res.ok) {
      setItems((l) => l.filter((x) => x.productId !== ref.productId));
      router.refresh();
    }
  }

  async function add() {
    if (!selected) return;
    setSaving(true);
    setError("");
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: selected }),
    });
    if (res.ok) {
      const data = await res.json();
      setItems((l) => [...l, data.item as ProductRef]);
      setSelected("");
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Could not add product.");
    }
    setSaving(false);
  }

  const usedIds = useMemo(
    () => new Set(sorted.map((r) => r.productId)),
    [sorted]
  );
  const available = products.filter((p) => !usedIds.has(p.id));

  return (
    <div>
      <div className="card mb-5 p-4 sm:p-5">
        <label htmlFor="rp-add" className="label">Add a product to {title}</label>
        <div className="mt-2 flex flex-wrap gap-3">
          <select
            id="rp-add"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="input flex-1 sm:max-w-xs"
          >
            <option value="">Select a product…</option>
            {available.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={add}
            disabled={!selected || saving}
            className="btn-primary"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
            Add Product
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>

      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
        </div>
      ) : sorted.length === 0 ? (
        <div className="card p-12 text-center text-sm text-brand-muted">
          No products yet. Add one using the control above.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-brand-line bg-brand-soft text-xs uppercase tracking-wide text-brand-muted">
                <th className="px-5 py-3.5 font-semibold">#</th>
                <th className="px-5 py-3.5 font-semibold">Product</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Order</th>
                <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((ref, i) => (
                <tr key={ref.productId} className="border-b border-brand-line last:border-0 hover:bg-brand-soft/60">
                  <td className="px-5 py-3 text-brand-muted">{i + 1}</td>
                  <td className="px-5 py-3 font-medium text-brand-ink">{nameOf(ref.productId)}</td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => toggleStatus(ref)}
                      aria-label={`${ref.status === "active" ? "Deactivate" : "Activate"} ${nameOf(ref.productId)}`}
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                        ref.status === "active"
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-gray-200 bg-gray-100 text-gray-500"
                      }`}
                    >
                      {ref.status}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={1}
                        value={ref.displayOrder}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (Number.isFinite(v) && v > 0) patchOrder(ref, v);
                        }}
                        aria-label={`Display order for ${nameOf(ref.productId)}`}
                        className="input w-20 !py-1.5"
                      />
                      <button
                        type="button"
                        onClick={() => move(ref, -1)}
                        disabled={i === 0}
                        aria-label="Move up"
                        className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                      >
                        <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(ref, 1)}
                        disabled={i === sorted.length - 1}
                        aria-label="Move down"
                        className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                      >
                        <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => remove(ref)}
                        aria-label={`Remove ${nameOf(ref.productId)}`}
                        className="rounded p-1.5 text-brand-muted hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
