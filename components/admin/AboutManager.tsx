"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { AboutContent } from "@/types";
import ImageField from "@/components/admin/ImageField";

type CoreValue = { title: string; desc: string; status?: "active" | "inactive"; displayOrder?: number };

const EMPTY: AboutContent = {
  content: "",
  vision: "",
  mission: [],
  coreValues: [],
  images: [],
};

export default function AboutManager() {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [vision, setVision] = useState<string>("");
  const [mission, setMission] = useState<string>("");
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [images, setImages] = useState<string>("");
  const [heroImage, setHeroImage] = useState<string>("");
  const [visionImage, setVisionImage] = useState<string>("");
  const [missionImage, setMissionImage] = useState<string>("");
  const [whoWeAre, setWhoWeAre] = useState<string>("");
  const [approaches, setApproaches] = useState<{ title: string; desc: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/about?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { about: AboutContent }) => {
        const a = d.about || EMPTY;
        setContent(a.content || "");
        setVision(a.vision || "");
        setMission((a.mission || []).join("\n"));
        setCoreValues(
          (a.coreValues || []).map((c, i) => ({
            title: c.title,
            desc: c.desc,
            status: c.status || "active",
            displayOrder: c.displayOrder ?? i + 1,
          }))
        );
        setImages((a.images || []).join("\n"));
        setHeroImage(a.heroImage || "");
        setVisionImage(a.visionImage || "");
        setMissionImage(a.missionImage || "");
        setWhoWeAre((a.whoWeAre || []).join("\n\n"));
        setApproaches(
          (a.approaches || []).map((x: any) => ({ title: x.title || "", desc: x.desc || "" }))
        );
      })
      .catch(() => setError("Could not load About content."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    const ordered = coreValues
      .map((c, i) => ({ ...c, displayOrder: c.displayOrder ?? i + 1 }))
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((c, i) => ({ title: c.title.trim(), desc: c.desc.trim(), status: c.status || "active", displayOrder: i + 1 }))
      .filter((c) => c.title);
    const payload = {
      content,
      vision,
      mission: mission.split("\n").map((s) => s.trim()).filter(Boolean),
      coreValues: ordered,
      images: images.split("\n").map((s) => s.trim()).filter(Boolean),
      heroImage,
      visionImage,
      missionImage,
      whoWeAre: whoWeAre
        .split(/\n\s*\n/)
        .map((s) => s.trim())
        .filter(Boolean),
      approaches: approaches
        .map((a) => ({ title: a.title.trim(), desc: a.desc.trim() }))
        .filter((a) => a.title),
    };
    const res = await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else setError("Could not save About content. Please try again.");
  }

  if (loading) {
    return (
      <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-6 p-6 sm:p-8">
      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {saved && (
        <p role="status" className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          About content saved successfully.
        </p>
      )}

      <section className="space-y-4">
        <h2 className="text-base font-bold text-brand-ink">About Hero</h2>
        <ImageField name="heroImage" label="About Page Hero Image" value={heroImage} onChange={setHeroImage} />
      </section>

      <section className="space-y-4 border-t border-brand-line pt-6">
        <h2 className="text-base font-bold text-brand-ink">Vision</h2>
        <ImageField name="visionImage" label="Vision Image" value={visionImage} onChange={setVisionImage} />
        <div>
          <label htmlFor="ab-vision" className="label">Vision Text</label>
          <textarea id="ab-vision" rows={4} value={vision} onChange={(e) => setVision(e.target.value)} className="input resize-y" />
        </div>
      </section>

      <section className="space-y-4 border-t border-brand-line pt-6">
        <h2 className="text-base font-bold text-brand-ink">Mission</h2>
        <ImageField name="missionImage" label="Mission Image" value={missionImage} onChange={setMissionImage} />
        <div>
          <label htmlFor="ab-mission" className="label">Mission (one point per line)</label>
          <textarea id="ab-mission" rows={5} value={mission} onChange={(e) => setMission(e.target.value)} className="input resize-y" />
        </div>
      </section>

      <section className="space-y-4 border-t border-brand-line pt-6">
        <h2 className="text-base font-bold text-brand-ink">Who We Are</h2>
        <div>
          <label htmlFor="ab-whoweare" className="label">Paragraphs (separate with a blank line)</label>
          <textarea id="ab-whoweare" rows={6} value={whoWeAre} onChange={(e) => setWhoWeAre(e.target.value)} className="input resize-y" />
        </div>
      </section>

      <section className="space-y-4 border-t border-brand-line pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-brand-ink">Our Approach Cards</h2>
          <button
            type="button"
            onClick={() => setApproaches((l) => [...l, { title: "", desc: "" }])}
            className="btn-outline !py-1.5 text-xs"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add Card
          </button>
        </div>
        <div className="space-y-3">
          {approaches.map((a, idx) => (
            <div key={idx} className="space-y-2 rounded-md border border-brand-line p-3">
              <div className="flex items-start gap-2">
                <input
                  aria-label="Approach title"
                  placeholder="Title"
                  value={a.title}
                  onChange={(e) =>
                    setApproaches((l) => l.map((x, i) => (i === idx ? { ...x, title: e.target.value } : x)))
                  }
                  className="input flex-1"
                />
                <button
                  type="button"
                  onClick={() => setApproaches((l) => l.filter((_, i) => i !== idx))}
                  aria-label="Remove card"
                  className="rounded p-2 text-brand-muted hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                aria-label="Approach description"
                placeholder="Description"
                rows={2}
                value={a.desc}
                onChange={(e) =>
                  setApproaches((l) => l.map((x, i) => (i === idx ? { ...x, desc: e.target.value } : x)))
                }
                className="input resize-y"
              />
            </div>
          ))}
          {approaches.length === 0 && (
            <p className="text-sm text-brand-muted">No cards yet — the page default cards will show.</p>
          )}
        </div>
      </section>

      <section className="space-y-4 border-t border-brand-line pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-brand-ink">Core Values</h2>
          <button
            type="button"
            onClick={() =>
              setCoreValues((l) => [...l, { title: "", desc: "", status: "active" as const, displayOrder: l.length + 1 }])
            }
            className="btn-outline !py-1.5 text-xs"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add Value
          </button>
        </div>
        <div className="space-y-3">
          {coreValues.map((c, idx) => (
            <div key={idx} className="space-y-2 rounded-md border border-brand-line p-3">
              <div className="flex items-start gap-2">
                <input
                  aria-label="Core value title"
                  placeholder="Title"
                  value={c.title}
                  onChange={(e) =>
                    setCoreValues((l) => l.map((x, i) => (i === idx ? { ...x, title: e.target.value } : x)))
                  }
                  className="input flex-1"
                />
                <button
                  type="button"
                  onClick={() =>
                    setCoreValues((l) =>
                      l.map((x, i) =>
                        i === idx ? { ...x, status: x.status === "inactive" ? "active" : "inactive" } : x
                      )
                    )
                  }
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                    c.status === "inactive"
                      ? "border-gray-200 bg-gray-100 text-gray-500"
                      : "border-green-200 bg-green-50 text-green-700"
                  }`}
                >
                  {c.status === "inactive" ? "inactive" : "active"}
                </button>
                <button
                  type="button"
                  onClick={() => setCoreValues((l) => l.filter((_, i) => i !== idx))}
                  aria-label="Remove value"
                  className="rounded p-2 text-brand-muted hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                aria-label="Core value description"
                placeholder="Description"
                rows={2}
                value={c.desc}
                onChange={(e) =>
                  setCoreValues((l) => l.map((x, i) => (i === idx ? { ...x, desc: e.target.value } : x)))
                }
                className="input resize-y"
              />
            </div>
          ))}
          {coreValues.length === 0 && (
            <p className="text-sm text-brand-muted">No values yet.</p>
          )}
        </div>
      </section>

      <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto sm:min-w-[200px]">
        {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Save About Content
      </button>
    </form>
  );
}
