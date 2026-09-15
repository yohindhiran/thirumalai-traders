"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import ImageField from "@/components/admin/ImageField";

type ShowcaseItem = {
  id: string;
  image: string;
  alt: string;
  title?: string;
  status: "active" | "inactive";
  displayOrder: number;
};

export default function HomeShowcaseManager() {
  const router = useRouter();
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<ShowcaseItem | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/home-showcase?t=${Date.now()}`, { cache: "no-store" });
    if (res.ok) setItems((await res.json()).items);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleStatus(s: ShowcaseItem) {
    const next = s.status === "active" ? "inactive" : "active";
    const res = await fetch(`/api/admin/home-showcase/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) {
      setItems((l) => l.map((x) => (x.id === s.id ? { ...x, status: next } : x)));
      router.refresh();
    }
  }

  async function patchOrder(s: ShowcaseItem, displayOrder: number) {
    const res = await fetch(`/api/admin/home-showcase/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayOrder }),
    });
    if (res.ok) {
      setItems((l) => l.map((x) => (x.id === s.id ? { ...x, displayOrder } : x)));
      router.refresh();
    }
  }

  function move(s: ShowcaseItem, dir: -1 | 1) {
    const sorted = items.slice().sort((a, b) => a.displayOrder - b.displayOrder);
    const idx = sorted.findIndex((x) => x.id === s.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    patchOrder(s, swap.displayOrder);
    patchOrder(swap, s.displayOrder);
  }

  async function remove(id: string) {
    if (!confirm("Delete this image from the showcase?")) return;
    const res = await fetch(`/api/admin/home-showcase/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((l) => l.filter((x) => x.id !== id));
      router.refresh();
    }
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button type="button" onClick={() => setShowAdd(true)} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Image
        </button>
      </div>

      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="card p-12 text-center text-sm text-brand-muted">
          No showcase images yet. Click “Add Image” to add products to the homepage section.
        </div>
      ) : (
        <ul className="space-y-3">
          {items
            .slice()
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((s, i, arr) => (
              <li key={s.id} className="card flex items-start gap-4 p-4">
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md border border-brand-line bg-brand-soft">
                  {s.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.image} alt={s.alt || "Showcase"} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-brand-muted">
                      No image
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-brand-ink">{s.title || s.alt || "Untitled"}</p>
                  {s.alt ? <p className="mt-0.5 truncate text-sm text-brand-muted">{s.alt}</p> : null}
                  <span className="mt-1.5 inline-block text-xs text-brand-muted">Order #{s.displayOrder}</span>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => toggleStatus(s)}
                    className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                      s.status === "active"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-gray-200 bg-gray-100 text-gray-500"
                    }`}
                  >
                    {s.status}
                  </button>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => move(s, -1)}
                      disabled={i === 0}
                      aria-label="Move up"
                      className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(s, 1)}
                      disabled={i === arr.length - 1}
                      aria-label="Move down"
                      className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(s)}
                      aria-label="Edit"
                      className="rounded p-1.5 text-brand-muted hover:bg-brand-soft hover:text-brand-green"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(s.id)}
                      aria-label="Delete"
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
        <ShowcaseModal
          onClose={() => setShowAdd(false)}
          onSaved={(s) => {
            setItems((l) => [...l, s]);
            setShowAdd(false);
            router.refresh();
          }}
        />
      )}
      {editing && (
        <ShowcaseModal
          item={editing}
          onClose={() => setEditing(null)}
          onSaved={(s) => {
            setItems((l) => l.map((x) => (x.id === s.id ? s : x)));
            setEditing(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function ShowcaseModal({
  item,
  onClose,
  onSaved,
}: {
  item?: ShowcaseItem;
  onClose: () => void;
  onSaved: (s: ShowcaseItem) => void;
}) {
  const [image, setImage] = useState(item?.image || "");
  const [alt, setAlt] = useState(item?.alt || "");
  const [title, setTitle] = useState(item?.title || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    if (!image) {
      setError("Please upload an image.");
      setSaving(false);
      return;
    }
    const res = await fetch(
      item ? `/api/admin/home-showcase/${item.id}` : "/api/admin/home-showcase",
      {
        method: item ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, alt, title }),
      }
    );
    if (res.ok) onSaved((await res.json()).item as ShowcaseItem);
    else {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Could not save image.");
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
        <h2 className="text-lg font-bold text-brand-ink">{item ? "Edit Image" : "Add Image"}</h2>
        {error && (
          <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-6 space-y-4">
          <ImageField name="image" label="Showcase Image" value={image} onChange={setImage} />
          <div>
            <label htmlFor="sh-alt" className="label">Alt Text (description of image)</label>
            <input id="sh-alt" className="input" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="e.g. Bulk spices supplied wholesale" />
          </div>
          <div>
            <label htmlFor="sh-title" className="label">Caption (optional)</label>
            <input id="sh-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Whole Spices" />
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {item ? "Save Changes" : "Add Image"}
          </button>
          <button type="button" onClick={onClose} className="btn-outline flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
