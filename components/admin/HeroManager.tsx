"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import ImageField from "@/components/admin/ImageField";

type HeroSlide = {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  status: "active" | "inactive";
  displayOrder: number;
};

export default function HeroManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<HeroSlide | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/hero");
    if (res.ok) {
      const data = await res.json();
      setSlides(data.slides as HeroSlide[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleStatus(s: HeroSlide) {
    const next = s.status === "active" ? "inactive" : "active";
    const res = await fetch(`/api/admin/hero/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok)
      setSlides((l) => l.map((x) => (x.id === s.id ? { ...x, status: next } : x)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this slide permanently?")) return;
    const res = await fetch(`/api/admin/hero/${id}`, { method: "DELETE" });
    if (res.ok) setSlides((l) => l.filter((s) => s.id !== id));
  }

  async function patchOrder(s: HeroSlide, displayOrder: number) {
    const res = await fetch(`/api/admin/hero/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayOrder }),
    });
    if (res.ok) setSlides((l) => l.map((x) => (x.id === s.id ? { ...x, displayOrder } : x)));
  }

  function move(s: HeroSlide, dir: -1 | 1) {
    const sorted = slides.slice().sort((a, b) => a.displayOrder - b.displayOrder);
    const idx = sorted.findIndex((x) => x.id === s.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    patchOrder(s, swap.displayOrder);
    patchOrder(swap, s.displayOrder);
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button type="button" onClick={() => setShowAdd(true)} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Slide
        </button>
      </div>

      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading slides…
        </div>
      ) : slides.length === 0 ? (
        <div className="card p-12 text-center text-brand-muted">
          No hero slides yet. Click “Add Slide” to create one.
        </div>
      ) : (
        <ul className="space-y-3">
          {slides.map((s) => (
            <li key={s.id} className="card flex items-start gap-4 p-4">
              <div className="h-16 w-28 shrink-0 overflow-hidden rounded-md border border-brand-line bg-brand-soft">
                {s.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.image} alt={s.title || "Hero slide"} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-brand-muted">
                    No image
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-brand-ink">{s.title || "Untitled slide"}</p>
                {s.subtitle ? (
                  <p className="mt-0.5 truncate text-sm text-brand-muted">{s.subtitle}</p>
                ) : null}
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-brand-muted">
                  <span>Order #{s.displayOrder}</span>
                  {s.buttonText ? <span>Button: {s.buttonText}</span> : null}
                </div>
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
                    disabled={s.displayOrder <= 1}
                    aria-label="Move up"
                    className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(s, 1)}
                    disabled={s.displayOrder >= slides.length}
                    aria-label="Move down"
                    className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(s)}
                    aria-label="Edit slide"
                    className="rounded p-1.5 text-brand-muted hover:bg-brand-soft hover:text-brand-green"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(s.id)}
                    aria-label="Delete slide"
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
        <HeroModal
          onClose={() => setShowAdd(false)}
          onSaved={(s) => {
            setSlides((l) => [...l, s]);
            setShowAdd(false);
          }}
        />
      )}
      {editing && (
        <HeroModal
          slide={editing}
          onClose={() => setEditing(null)}
          onSaved={(s) => {
            setSlides((l) => l.map((x) => (x.id === s.id ? s : x)));
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function HeroModal({
  slide,
  onClose,
  onSaved,
}: {
  slide?: HeroSlide;
  onClose: () => void;
  onSaved: (s: HeroSlide) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(
      slide ? `/api/admin/hero/${slide.id}` : "/api/admin/hero",
      {
        method: slide ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    if (res.ok) onSaved((await res.json()).slide as HeroSlide);
    else {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Could not save slide.");
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
          {slide ? "Edit Slide" : "Add Slide"}
        </h2>
        {error && (
          <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-6 space-y-4">
          <ImageField name="image" label="Slide Image" value={slide?.image || ""} />
          <div>
            <label htmlFor="hm-title" className="label">Title</label>
            <input id="hm-title" name="title" defaultValue={slide?.title} className="input" />
          </div>
          <div>
            <label htmlFor="hm-subtitle" className="label">Subtitle</label>
            <input id="hm-subtitle" name="subtitle" defaultValue={slide?.subtitle} className="input" />
          </div>
          <div>
            <label htmlFor="hm-buttonText" className="label">Button Text</label>
            <input id="hm-buttonText" name="buttonText" defaultValue={slide?.buttonText} className="input" />
          </div>
          <div>
            <label htmlFor="hm-buttonLink" className="label">Button Link</label>
            <input id="hm-buttonLink" name="buttonLink" defaultValue={slide?.buttonLink} placeholder="/products" className="input" />
          </div>
          <div>
            <label htmlFor="hm-status" className="label">Status</label>
            <select id="hm-status" name="status" defaultValue={slide?.status ?? "active"} className="input">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {slide ? "Save Changes" : "Add Slide"}
          </button>
          <button type="button" onClick={onClose} className="btn-outline flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
