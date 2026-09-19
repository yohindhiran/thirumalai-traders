"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
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

type TeamMember = { name: string; role: string; phone: string };

export default function ContactSettingsManager() {
  const router = useRouter();
  const [settings, setSettings] = useState<ContactSettings>(EMPTY);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/contact-settings?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { settings: ContactSettings }) => {
        setSettings({ ...EMPTY, ...(d.settings || {}) });
        setTeam(
          ((d.settings || {}).team || [])
            .filter((m: any) => m && m.name)
            .map((m: any) => ({ name: m.name || "", role: m.role || "", phone: m.phone || "" }))
        );
      })
      .catch(() => setError("Could not load contact settings."))
      .finally(() => setLoading(false));
  }, []);

  function setField(name: keyof ContactSettings, value: string) {
    setSettings((s) => ({ ...s, [name]: value }));
  }

  function setTeamMember(idx: number, key: keyof TeamMember, value: string) {
    setTeam((l) => l.map((m, i) => (i === idx ? { ...m, [key]: value } : m)));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    const payload: Record<string, unknown> = {};
    (Object.keys(settings) as Array<keyof ContactSettings>).forEach((k) => {
      if (k === "team") return;
      const v = settings[k];
      if (typeof v === "string" && v !== "") payload[k] = v;
    });
    payload.team = team
      .map((m) => ({ name: m.name.trim(), role: m.role.trim(), phone: m.phone.trim() }))
      .filter((m) => m.name && m.phone);
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
              value={(settings[f.name] as string) ?? ""}
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
              value={(settings[f.name] as string) ?? ""}
              onChange={(e) => setField(f.name, e.target.value)}
              className="input resize-y"
            />
          </div>
        ))}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="label mb-0">
            Team (replaces the default Management + Sales Team blocks when set)
          </span>
          <button
            type="button"
            onClick={() => setTeam((l) => [...l, { name: "", role: "", phone: "" }])}
            className="btn-outline !py-1.5 text-xs"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add Member
          </button>
        </div>
        <div className="space-y-3">
          {team.map((m, idx) => (
            <div key={idx} className="grid gap-2 rounded-md border border-brand-line p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <input
                aria-label="Member name"
                placeholder="Name"
                value={m.name}
                onChange={(e) => setTeamMember(idx, "name", e.target.value)}
                className="input"
              />
              <input
                aria-label="Member role"
                placeholder="Role (e.g. Sales Manager)"
                value={m.role}
                onChange={(e) => setTeamMember(idx, "role", e.target.value)}
                className="input"
              />
              <input
                aria-label="Member phone"
                placeholder="Phone"
                value={m.phone}
                onChange={(e) => setTeamMember(idx, "phone", e.target.value)}
                className="input"
              />
              <button
                type="button"
                onClick={() => setTeam((l) => l.filter((_, i) => i !== idx))}
                aria-label="Remove member"
                className="rounded p-2 text-brand-muted hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {team.length === 0 && (
            <p className="text-sm text-brand-muted">
              No custom team set — the Contact page shows the default Management and Sales Team.
            </p>
          )}
        </div>
      </div>

      <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto sm:min-w-[200px]">
        {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Save Contact Settings
      </button>
    </form>
  );
}
