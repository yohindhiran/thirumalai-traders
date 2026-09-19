"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2 } from "lucide-react";
import type { CompanyPageContent } from "@/types";
import ImageField from "@/components/admin/ImageField";

const SLUGS: { slug: string; label: string }[] = [
  { slug: "history", label: "Our History" },
  { slug: "industries-we-serve", label: "Industries We Serve" },
  { slug: "clients", label: "Our Clients" },
  { slug: "quality", label: "Quality" },
  { slug: "products", label: "Products Page" },
  { slug: "contact", label: "Contact Page" },
  { slug: "faq", label: "FAQ" },
  { slug: "careers", label: "Careers" },
  { slug: "terms", label: "Terms & Conditions" },
  { slug: "privacy-policy", label: "Privacy Policy" },
];

type Section = {
  heading: string;
  subtitle?: string;
  body: string;
  image?: string;
  status?: "active" | "inactive";
  displayOrder?: number;
};
type Item = { title: string; body: string };

const EMPTY_SECTION: Section = { heading: "", body: "", image: "", status: "active" };

export default function CompanyPagesManager({
  initialSlug,
  hideSelector,
}: {
  initialSlug?: string;
  // Hides the "Choose Company Page" dropdown so a dedicated page shows
  // only its own editing content. The generic /pages route keeps it.
  hideSelector?: boolean;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(
    initialSlug && SLUGS.some((s) => s.slug === initialSlug) ? initialSlug : SLUGS[0].slug
  );
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [sectionHeading, setSectionHeading] = useState("");
  const [sectionSubheading, setSectionSubheading] = useState("");
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
        setHeroTitle(p.heroTitle || "");
        setHeroImage(p.heroImage || "");
        setSectionHeading(p.sectionHeading || "");
        setSectionSubheading(p.sectionSubheading || "");
        setSections(
          (p.sections || []).map((s: any) => ({
            heading: s.heading || "",
            subtitle: s.subtitle || "",
            body: s.body || "",
            image: s.image || "",
            status: s.status === "inactive" ? "inactive" : "active",
            displayOrder: s.displayOrder ?? 0,
          }))
        );
        setItems(p.items || []);
        setImages((p.images || []).join("\n"));
      })
      .catch(() => {
        // New slugs start blank; PUT creates them on first save.
        setTitle("");
        setIntro("");
        setHeroTitle("");
        setHeroImage("");
        setSectionHeading("");
        setSectionSubheading("");
        setSections([]);
        setItems([]);
        setImages("");
        setError("");
      })
      .finally(() => setLoading(false));
  }, [selected]);

  function updateSection(idx: number, key: "heading" | "subtitle" | "body" | "image", value: string) {
    setSections((l) => l.map((s, i) => (i === idx ? { ...s, [key]: value } : s)));
  }

  function toggleSection(idx: number) {
    setSections((l) =>
      l.map((s, i) =>
        i === idx ? { ...s, status: s.status === "inactive" ? "active" : "inactive" } : s
      )
    );
  }

  function moveSection(idx: number, dir: -1 | 1) {
    setSections((l) => {
      const next = l.slice();
      const swap = idx + dir;
      if (swap < 0 || swap >= next.length) return l;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
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
      heroTitle,
      heroImage,
      sectionHeading,
      sectionSubheading,
      sections: sections
        .map((s, i) => ({
          heading: s.heading.trim(),
          subtitle: (s.subtitle || "").trim(),
          body: s.body.trim(),
          image: (s.image || "").trim(),
          status: s.status === "inactive" ? "inactive" : "active",
          displayOrder: i,
        }))
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
      {!hideSelector && (
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
      )}

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

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cp-hero-title" className="label">Hero Title (blank = page default)</label>
              <input
                id="cp-hero-title"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="input"
              />
            </div>
            <ImageField name="heroImage" label="Hero Image (blank = page default)" value={heroImage} onChange={setHeroImage} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cp-section-heading" className="label">Section Heading (blank = page default)</label>
              <input
                id="cp-section-heading"
                value={sectionHeading}
                onChange={(e) => setSectionHeading(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label htmlFor="cp-section-subheading" className="label">Section Subheading (blank = page default)</label>
              <input
                id="cp-section-subheading"
                value={sectionSubheading}
                onChange={(e) => setSectionSubheading(e.target.value)}
                className="input"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="label mb-0">Sections (heading + body + optional image)</span>
              <button
                type="button"
                onClick={() => setSections((l) => [...l, { ...EMPTY_SECTION }])}
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
                      placeholder="Heading (History timeline: year, e.g. 2000)"
                      value={s.heading}
                      onChange={(e) => updateSection(idx, "heading", e.target.value)}
                      className="input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => moveSection(idx, -1)}
                      disabled={idx === 0}
                      aria-label="Move section up"
                      className="rounded p-2 text-brand-muted hover:text-brand-green disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(idx, 1)}
                      disabled={idx === sections.length - 1}
                      aria-label="Move section down"
                      className="rounded p-2 text-brand-muted hover:text-brand-green disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleSection(idx)}
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                        s.status === "inactive"
                          ? "border-gray-200 bg-gray-100 text-gray-500"
                          : "border-green-200 bg-green-50 text-green-700"
                      }`}
                    >
                      {s.status === "inactive" ? "inactive" : "active"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSections((l) => l.filter((_, i) => i !== idx))}
                      aria-label="Remove section"
                      className="rounded p-2 text-brand-muted hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    aria-label="Section subtitle"
                    placeholder="Subtitle / second line (optional — History timeline uses it as the milestone title)"
                    value={s.subtitle || ""}
                    onChange={(e) => updateSection(idx, "subtitle", e.target.value)}
                    className="input"
                  />
                  <textarea
                    aria-label="Section body"
                    placeholder="Body"
                    rows={3}
                    value={s.body}
                    onChange={(e) => updateSection(idx, "body", e.target.value)}
                    className="input resize-y"
                  />
                  <ImageField
                    name={`section-image-${idx}`}
                    label="Section Image (optional)"
                    value={s.image || ""}
                    onChange={(v) => updateSection(idx, "image", v)}
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
