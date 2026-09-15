"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { ContactSettings } from "@/types";

const EMPTY: ContactSettings = {
  phone: "",
  whatsapp: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  addressState: "",
  businessHours: "",
  mapsLink: "",
};

const INPUT_FIELDS: Array<{ name: keyof ContactSettings; label: string; type?: string }> = [
  { name: "phone", label: "Phone" },
  { name: "whatsapp", label: "WhatsApp" },
  { name: "email", label: "Email", type: "email" },
  { name: "businessHours", label: "Business Hours" },
  { name: "mapsLink", label: "Google Maps Link", type: "url" },
];

const TEXTAREA_FIELDS: Array<{ name: keyof ContactSettings; label: string; rows: number }> = [
  { name: "addressLine1", label: "Address Line 1", rows: 2 },
  { name: "addressLine2", label: "Address Line 2", rows: 2 },
  { name: "addressState", label: "Address State", rows: 2 },
];

export default function ContactSettingsManager() {
  const router = useRouter();
  const [settings, setSettings] = useState<ContactSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/contact-settings?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { settings: ContactSettings }) => setSettings({ ...EMPTY, ...(d.settings || {}) }))
      .catch(() => setError("Could not load contact settings."))
      .finally(() => setLoading(false));
  }, []);

  function setField(name: keyof ContactSettings, value: string) {
    setSettings((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    const payload: Record<string, string> = {};
    (Object.keys(settings) as Array<keyof ContactSettings>).forEach((k) => {
      const v = settings[k];
      if (typeof v === "string" && v !== "") payload[k] = v;
    });
    const res = await fetch("/api/admin/contact-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else setError("Could not save settings. Please try again.");
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
          Contact settings saved successfully.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {INPUT_FIELDS.map((f) => (
          <div key={f.name}>
            <label htmlFor={`cs-${f.name}`} className="label">{f.label}</label>
            <input
              id={`cs-${f.name}`}
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
            <label htmlFor={`cs-${f.name}`} className="label">{f.label}</label>
            <textarea
              id={`cs-${f.name}`}
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
        Save Contact Settings
      </button>
    </form>
  );
}
