"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { SiteSettings } from "@/types";

const EMPTY: SiteSettings = {
  companyName: "",
  logo: "",
  favicon: "",
  phone: "",
  whatsapp: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  addressState: "",
  footerText: "",
  copyrightYear: "",
  facebook: "",
  instagram: "",
  youtube: "",
  linkedin: "",
};

const STRING_FIELDS: Array<{ name: keyof SiteSettings; label: string; type?: string }> = [
  { name: "companyName", label: "Company Name" },
  { name: "logo", label: "Logo URL", type: "url" },
  { name: "favicon", label: "Favicon URL", type: "url" },
  { name: "phone", label: "Phone" },
  { name: "whatsapp", label: "WhatsApp" },
  { name: "email", label: "Email" },
  { name: "copyrightYear", label: "Copyright Year" },
  { name: "facebook", label: "Facebook URL", type: "url" },
  { name: "instagram", label: "Instagram URL", type: "url" },
  { name: "youtube", label: "YouTube URL", type: "url" },
  { name: "linkedin", label: "LinkedIn URL", type: "url" },
];

const TEXTAREA_FIELDS: Array<{ name: keyof SiteSettings; label: string; rows: number }> = [
  { name: "addressLine1", label: "Address Line 1", rows: 2 },
  { name: "addressLine2", label: "Address Line 2", rows: 2 },
  { name: "addressState", label: "Address State", rows: 2 },
  { name: "footerText", label: "Footer Text", rows: 3 },
];

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<SiteSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { settings: SiteSettings }) => setSettings({ ...EMPTY, ...(d.settings || {}) }))
      .catch(() => setError("Could not load site settings."))
      .finally(() => setLoading(false));
  }, []);

  function setField(name: keyof SiteSettings, value: string) {
    setSettings((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    const payload: Record<string, string> = {};
    (Object.keys(settings) as Array<keyof SiteSettings>).forEach((k) => {
      const v = settings[k];
      if (typeof v === "string" && v !== "") payload[k] = v;
    });
    const res = await fetch("/api/admin/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
    else setError("Could not save settings. Please try again.");
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
          Site settings saved successfully.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {STRING_FIELDS.map((f) => (
          <div key={f.name}>
            <label htmlFor={`ss-${f.name}`} className="label">{f.label}</label>
            <input
              id={`ss-${f.name}`}
              type={f.type || "text"}
              value={settings[f.name] ?? ""}
              onChange={(e) => setField(f.name, e.target.value)}
              className="input"
            />
          </div>
        ))}
      </div>

      <div className="space-y-5">
        {TEXTAREA_FIELDS.map((f) => (
          <div key={f.name}>
            <label htmlFor={`ss-${f.name}`} className="label">{f.label}</label>
            <textarea
              id={`ss-${f.name}`}
              rows={f.rows}
              value={settings[f.name] ?? ""}
              onChange={(e) => setField(f.name, e.target.value)}
              className="input resize-y"
            />
          </div>
        ))}
      </div>

      <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto sm:min-w-[200px]">
        {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Save Settings
      </button>
    </form>
  );
}
