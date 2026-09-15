"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { SiteContent } from "@/types";

export default function ContentManager() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/content?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setContent(d.content))
      .catch(() => setError("Could not load content."));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    const form = new FormData(e.currentTarget);
    const highlightsRaw = String(form.get("highlights") || "");
    const payload = {
      heroHeadline: form.get("heroHeadline"),
      heroSubtext: form.get("heroSubtext"),
      aboutPreview: form.get("aboutPreview"),
      officePhone: form.get("officePhone"),
      highlights: highlightsRaw
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else setError("Could not save content. Please try again.");
  }

  if (!content && !error) {
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
          Content saved successfully. Changes are live on the homepage.
        </p>
      )}
      <div>
        <label htmlFor="ct-headline" className="label">Homepage Hero Headline</label>
        <input
          id="ct-headline"
          name="heroHeadline"
          defaultValue={content?.heroHeadline}
          required
          className="input"
        />
      </div>
      <div>
        <label htmlFor="ct-subtext" className="label">Homepage Hero Supporting Text</label>
        <textarea
          id="ct-subtext"
          name="heroSubtext"
          rows={2}
          defaultValue={content?.heroSubtext}
          className="input resize-y"
        />
      </div>
      <div>
        <label htmlFor="ct-highlights" className="label">
          Hero Highlights (one per line)
        </label>
        <textarea
          id="ct-highlights"
          name="highlights"
          rows={4}
          defaultValue={content?.highlights.join("\n")}
          className="input resize-y"
        />
      </div>
      <div>
        <label htmlFor="ct-about" className="label">About Preview Paragraph</label>
        <textarea
          id="ct-about"
          name="aboutPreview"
          rows={6}
          defaultValue={content?.aboutPreview}
          className="input resize-y"
        />
      </div>
      <div>
        <label htmlFor="ct-phone" className="label">Office Phone (displayed in header)</label>
        <input
          id="ct-phone"
          name="officePhone"
          defaultValue={content?.officePhone}
          className="input sm:max-w-xs"
        />
      </div>
      <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto sm:min-w-[200px]">
        {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Save Content
      </button>
    </form>
  );
}
