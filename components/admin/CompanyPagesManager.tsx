"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { CompanyPageContent } from "@/types";

const SLUGS: { slug: string; label: string }[] = [
  { slug: "wholesale-supply", label: "Wholesale Supply" },
  { slug: "history", label: "Our History" },
  { slug: "industries-we-serve", label: "Industries We Serve" },
  { slug: "why-choose-us", label: "Why Choose Us" },
  { slug: "clients", label: "Our Clients" },
  { slug: "quality", label: "Quality" },
];

type Section = { heading: string; body: string };
type Item = { title: string; body: string };

export default function CompanyPagesManager() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(SLUGS[0].slug);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setSaved(false);
    setError("");
    fetch(`/api/admin/pages/${selected}?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { page: CompanyPageContent }) => {
        const p = d.page;
        setTitle(p.title || "");
        setIntro(p.intro || "");
        setSections(p.sections || []);
        setItems(p.items || []);
        setImages((p.images || []).join("\n"));
      })
      .catch(() => setError("Could not load this page."))
      .finally(() => setLoading(false));
  }, [selected]);

  function updateSection(idx: number, key: keyof Section, value: string) {
    setSections((l) => l.map((s, i) => (i === idx ? { ...s, [key]: value } : s)));
  }

  function updateItem(idx: number, key: keyof Item, value: string) {
    setItems((l) => l.map((s, i) => (i === idx ? { ...s, [key]: value } : s)));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    const payload = {
      title,
      intro,
      sections: sections
        .map((s) => ({ heading: s.heading.trim(), body: s.body.trim() }))
        .filter((s) => s.heading || s.body),
      items: items
        .map((s) => ({ title: s.title.trim(), body: s.body.trim() }))
        .filter((s) => s.title),
      images: images.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    const res = await fetch(`/api/admin/pages/${selected}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else setError("Could not save this page. Please try again.");
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="cp-select" className="label">Choose Company Page</label>
        <select
          id="cp-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="input sm:max-w-xs"
        >
          {SLUGS.map((s) => (
            <option key={s.slug} value={s.slug}>{s.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
          {error && (
            <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          {saved && (
            <p role="status" className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              Page saved successfully.
            </p>
          )}

          <div>
            <label htmlFor="cp-title" className="label">Title</label>
            <input
              id="cp-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input"
            />
          </div>

          <div>
            <label htmlFor="cp-intro" className="label">Intro</label>
            <textarea
              id="cp-intro"
              rows={3}
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              className="input resize-y"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="label mb-0">Sections (heading + body)</span>
              <button
                type="button"
                onClick={() => setSections((l) => [...l, { heading: "", body: "" }])}
                className="btn-outline !py-1.5 text-xs"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add Section
              </button>
            </div>
            <div className="space-y-3">
              {sections.map((s, idx) => (
                <div key={idx} className="space-y-2 rounded-md border border-brand-line p-3">
                  <div className="flex items-start gap-2">
                    <input
                      aria-label="Section heading"
                      placeholder="Heading"
                      value={s.heading}
                      onChange={(e) => updateSection(idx, "heading", e.target.value)}
                      className="input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => setSections((l) => l.filter((_, i) => i !== idx))}
                      aria-label="Remove section"
                      className="rounded p-2 text-brand-muted hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <textarea
                    aria-label="Section body"
                    placeholder="Body"
                    rows={3}
                    value={s.body}
                    onChange={(e) => updateSection(idx, "body", e.target.value)}
                    className="input resize-y"
                  />
                </div>
              ))}
              {sections.length === 0 && (
                <p className="text-sm text-brand-muted">No sections yet.</p>
              )}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="label mb-0">Items (title + body)</span>
              <button
                type="button"
                onClick={() => setItems((l) => [...l, { title: "", body: "" }])}
                className="btn-outline !py-1.5 text-xs"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add Item
              </button>
            </div>
            <div className="space-y-3">
              {items.map((s, idx) => (
                <div key={idx} className="space-y-2 rounded-md border border-brand-line p-3">
                  <div className="flex items-start gap-2">
                    <input
                      aria-label="Item title"
                      placeholder="Title"
                      value={s.title}
                      onChange={(e) => updateItem(idx, "title", e.target.value)}
                      className="input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => setItems((l) => l.filter((_, i) => i !== idx))}
                      aria-label="Remove item"
                      className="rounded p-2 text-brand-muted hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <textarea
                    aria-label="Item body"
                    placeholder="Body"
                    rows={3}
                    value={s.body}
                    onChange={(e) => updateItem(idx, "body", e.target.value)}
                    className="input resize-y"
                  />
                </div>
              ))}
              {items.length === 0 && (
                <p className="text-sm text-brand-muted">No items yet.</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="cp-images" className="label">Images (one URL per line)</label>
            <textarea
              id="cp-images"
              rows={4}
              value={images}
              onChange={(e) => setImages(e.target.value)}
              className="input resize-y"
            />
          </div>

          <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto sm:min-w-[200px]">
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            Save Page
          </button>
        </form>
      )}
    </div>
  );
}
