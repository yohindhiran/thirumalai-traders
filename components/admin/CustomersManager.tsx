"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import ImageField from "@/components/admin/ImageField";

type ValuedCustomer = {
  id: string;
  name: string;
  logo?: string;
  photo?: string;
  description?: string;
  status: "active" | "inactive";
  displayOrder: number;
};

export default function CustomersManager() {
  const router = useRouter();
  const [items, setItems] = useState<ValuedCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<ValuedCustomer | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/customers?t=${Date.now()}`, { cache: "no-store" });
    if (res.ok) setItems((await res.json()).items);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleStatus(c: ValuedCustomer) {
    const next = c.status === "active" ? "inactive" : "active";
    const res = await fetch(`/api/admin/customers/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) {
      setItems((l) => l.map((x) => (x.id === c.id ? { ...x, status: next } : x)));
      router.refresh();
    }
  }

  async function patchOrder(c: ValuedCustomer, displayOrder: number) {
    const res = await fetch(`/api/admin/customers/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayOrder }),
    });
    if (res.ok) {
      setItems((l) => l.map((x) => (x.id === c.id ? { ...x, displayOrder } : x)));
      router.refresh();
    }
  }

  function move(c: ValuedCustomer, dir: -1 | 1) {
    const sorted = items.slice().sort((a, b) => a.displayOrder - b.displayOrder);
    const idx = sorted.findIndex((x) => x.id === c.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    patchOrder(c, swap.displayOrder);
    patchOrder(swap, c.displayOrder);
  }

  async function remove(id: string) {
    if (!confirm("Delete this customer permanently?")) return;
    const res = await fetch(`/api/admin/customers/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((l) => l.filter((c) => c.id !== id));
      router.refresh();
    }
  }

  const sorted = items.slice().sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button type="button" onClick={() => setShowAdd(true)} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Customer
        </button>
      </div>

      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading customers…
        </div>
      ) : items.length === 0 ? (
        <div className="card p-12 text-center text-brand-muted">
          No valued customers yet. Click “Add Customer” to create one.
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((c, i) => (
            <li key={c.id} className="card flex flex-col gap-3 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-brand-line bg-brand-soft">
                  {c.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.logo} alt={c.name} className="h-full w-full object-contain" />
                  ) : (
                    <span className="text-sm font-semibold text-brand-muted">
                      {c.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="min-w-0 flex-1 truncate font-semibold text-brand-ink">{c.name}</p>
              </div>
              {c.description ? (
                <p className="line-clamp-2 text-sm text-brand-muted">{c.description}</p>
              ) : null}
              <div className="flex items-center justify-between">
                <span className="text-xs text-brand-muted">Order #{c.displayOrder}</span>
                <div className="flex items-center gap-1">
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
                    onClick={() => setEditing(c)}
                    aria-label="Edit customer"
                    className="rounded p-1.5 text-brand-muted hover:bg-brand-soft hover:text-brand-green"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(c.id)}
                    aria-label="Delete customer"
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
        <CustomerModal
          onClose={() => setShowAdd(false)}
          onSaved={(c) => {
            setItems((l) => [...l, c]);
            setShowAdd(false);
            router.refresh();
          }}
        />
      )}
      {editing && (
        <CustomerModal
          customer={editing}
          onClose={() => setEditing(null)}
          onSaved={(c) => {
            setItems((l) => l.map((x) => (x.id === c.id ? c : x)));
            setEditing(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function CustomerModal({
  customer,
  onClose,
  onSaved,
}: {
  customer?: ValuedCustomer;
  onClose: () => void;
  onSaved: (c: ValuedCustomer) => void;
}) {
  const [logo, setLogo] = useState(customer?.logo || "");
  const [photo, setPhoto] = useState(customer?.photo || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(
      customer ? `/api/admin/customers/${customer.id}` : "/api/admin/customers",
      {
        method: customer ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          logo,
          photo,
          status: form.status,
        }),
      }
    );
    if (res.ok) onSaved((await res.json()).item);
    else {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Could not save customer.");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Close dialog" onClick={onClose} className="absolute inset-0 bg-black/40" />
      <form onSubmit={handleSubmit} className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lift sm:p-8">
        <h2 className="text-lg font-bold text-brand-ink">{customer ? `Edit — ${customer.name}` : "Add Customer"}</h2>
        {error && (
          <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="cm-name" className="label">Customer Name *</label>
            <input id="cm-name" name="name" required defaultValue={customer?.name} className="input" />
          </div>
          <div>
            <label htmlFor="cm-desc" className="label">Short Display Text</label>
            <input id="cm-desc" name="description" defaultValue={customer?.description} placeholder="e.g. Leading college canteen" className="input" />
          </div>
          <ImageField name="logo" label="Customer Logo" value={logo} onChange={setLogo} rounded="rounded-md" />
          <ImageField name="photo" label="Customer Photo (timeline image — blank uses default)" value={photo} onChange={setPhoto} rounded="rounded-md" />
          <div>
            <label htmlFor="cm-status" className="label">Status</label>
            <select id="cm-status" name="status" defaultValue={customer?.status ?? "active"} className="input">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {customer ? "Save Changes" : "Add Customer"}
          </button>
          <button type="button" onClick={onClose} className="btn-outline flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
