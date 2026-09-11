"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
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
  const [content, setContent] = useState<string>("");
  const [vision, setVision] = useState<string>("");
  const [mission, setMission] = useState<string>("");
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [images, setImages] = useState<string>("");
  const [heroImage, setHeroImage] = useState<string>("");
  const [visionImage, setVisionImage] = useState<string>("");
  const [missionImage, setMissionImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/about")
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
    };
    const res = await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
    else setError("Could not save About content. Please try again.");
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

      <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto sm:min-w-[200px]">
        {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Save About Content
      </button>
    </form>
  );
}
