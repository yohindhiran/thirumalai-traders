"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ImageField from "@/components/admin/ImageField";

export default function HomeAboutManager() {
  const [image, setImage] = useState("");
  const [heading, setHeading] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: any) => {
        const c = d.content || {};
        setImage(c.homeAboutImage || "");
        setHeading(c.homeAboutHeading || "");
        setButtonText(c.homeAboutButtonText || "");
        setButtonLink(c.homeAboutButtonLink || "");
        setDescription(c.aboutPreview || "");
      })
      .catch(() => setError("Could not load content."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        homeAboutImage: image,
        homeAboutHeading: heading,
        homeAboutButtonText: buttonText,
        homeAboutButtonLink: buttonLink,
        aboutPreview: description,
      }),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
    else setError("Could not save. Please try again.");
  }

  if (loading) {
    return (
      <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {saved && (
        <p role="status" className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Home About section saved. Changes are live on the homepage.
        </p>
      )}

      <ImageField name="homeAboutImage" label="About Section Image" value={image} onChange={setImage} />

      <div>
        <label htmlFor="ha-heading" className="label">Heading</label>
        <input
          id="ha-heading"
          className="input"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="A Trusted Name in Wholesale Grocery…"
        />
      </div>

      <div>
        <label htmlFor="ha-desc" className="label">Description</label>
        <textarea
          id="ha-desc"
          rows={5}
          className="input resize-y"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ha-btn-text" className="label">Button Text</label>
          <input
            id="ha-btn-text"
            className="input"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            placeholder="Know More About Us"
          />
        </div>
        <div>
          <label htmlFor="ha-btn-link" className="label">Button Link</label>
          <input
            id="ha-btn-link"
            className="input"
            value={buttonLink}
            onChange={(e) => setButtonLink(e.target.value)}
            placeholder="/about"
          />
        </div>
      </div>

      <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto sm:min-w-[200px]">
        {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Save Home About Section
      </button>
    </form>
  );
}
