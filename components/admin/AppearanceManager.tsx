"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Trash2 } from "lucide-react";
import {
  APPEARANCE_THEMES,
  customThemeVars,
  normalizeHex,
} from "@/lib/appearance";
import type { AppearanceThemeId, CustomTheme } from "@/types";
import { cn } from "@/lib/utils";

interface PreviewVars {
  bg: string;
  soft: string;
  card: string;
  line: string;
  tintA: string;
  ink: string;
  muted: string;
}

function ThemePreview({ vars, accent }: { vars: PreviewVars; accent: string }) {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ backgroundColor: vars.bg, borderColor: vars.line }}
    >
      <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: vars.line, backgroundColor: vars.card }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#356747" }} />
        <span className="h-2 w-16 rounded-full" style={{ backgroundColor: vars.soft }} />
        <span className="ml-auto h-6 w-20 rounded-md" style={{ backgroundColor: "#356747" }} />
      </div>
      <div className="space-y-2.5 p-4" style={{ backgroundColor: vars.soft }}>
        <div className="h-3 w-2/5 rounded-full" style={{ backgroundColor: vars.ink, opacity: 0.9 }} />
        <div className="h-2.5 w-3/5 rounded-full" style={{ backgroundColor: vars.muted, opacity: 0.7 }} />
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg border p-2"
              style={{ backgroundColor: vars.card, borderColor: "#E5E7EB" }}
            >
              <div className="h-8 rounded-md" style={{ backgroundColor: vars.tintA }} />
              <div className="mt-1.5 h-2 rounded-full" style={{ backgroundColor: "#1F2933", opacity: 0.6 }} />
              <div className="mt-1 h-1.5 w-2/3 rounded-full" style={{ backgroundColor: "#667085", opacity: 0.35 }} />
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <span className="h-7 w-24 rounded-md" style={{ backgroundColor: "#356747" }} />
          <span className="h-7 w-24 rounded-md" style={{ backgroundColor: accent }} />
        </div>
      </div>
      <p className="px-4 py-2 text-[11px]" style={{ color: vars.muted }}>
        Preview uses the theme background, section tint, card and border colours. Header, hero images and Forest Green / Gold brand buttons keep the existing style.
      </p>
    </div>
  );
}

function PresetPreview({ themeId }: { themeId: AppearanceThemeId }) {
  const theme = APPEARANCE_THEMES.find((t) => t.id === themeId) ?? APPEARANCE_THEMES[0];
  return <ThemePreview vars={{ ...theme.vars }} accent="#F1E564" />;
}

function CustomPreview({ bg, soft, accent }: { bg: string; soft: string; accent: string }) {
  const vars = customThemeVars({ bg, soft, accent });
  return <ThemePreview vars={vars} accent={vars.accent} />;
}

const COLOR_FIELDS = [
  { key: "bg", label: "Main background colour" },
  { key: "soft", label: "Section / background colour" },
  { key: "accent", label: "Accent colour for highlights" },
] as const;

type ColorKey = (typeof COLOR_FIELDS)[number]["key"];

export default function AppearanceManager() {
  const router = useRouter();
  const [savedId, setSavedId] = useState<string>("dark-forest-green");
  const [selectedId, setSelectedId] = useState<AppearanceThemeId>("dark-forest-green");
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  // Create-custom-theme form.
  const [customName, setCustomName] = useState("");
  const [customColors, setCustomColors] = useState<Record<ColorKey, string>>({
    bg: "#2E4038",
    soft: "#3D5447",
    accent: "#F1E564",
  });
  const [creating, setCreating] = useState(false);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/appearance?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { appearance?: { themeId?: string; customThemes?: CustomTheme[] } }) => {
        const id = d.appearance?.themeId ?? "dark-forest-green";
        setSavedId(id);
        const preset = APPEARANCE_THEMES.find((t) => t.id === id);
        if (preset) setSelectedId(preset.id);
        setCustomThemes(Array.isArray(d.appearance?.customThemes) ? d.appearance.customThemes : []);
      })
      .catch(() => setError("Could not load the saved theme."))
      .finally(() => setLoading(false));
  }, []);

  function readError(res: Response, fallback: string, d: any): string {
    void res;
    return typeof d?.error === "string" && d.error ? d.error : fallback;
  }

  async function save(id: AppearanceThemeId) {
    setSaving(true);
    setSaved(false);
    setError("");
    const res = await fetch("/api/admin/appearance", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ themeId: id }),
    });
    setSaving(false);
    if (res.ok) {
      const d = await res.json().catch(() => null);
      const next = (d?.appearance?.themeId ?? id) as string;
      setSavedId(next);
      setSelectedId(id);
      setSaved(true);
      router.refresh();
    } else {
      const d = await res.json().catch(() => null);
      setError(readError(res, "Could not save the theme. Please try again.", d));
    }
  }

  async function saveCustomTheme() {
    const name = customName.trim();
    if (!name) {
      setError("Please give the custom theme a name.");
      return;
    }
    for (const f of COLOR_FIELDS) {
      if (!normalizeHex(customColors[f.key])) {
        setError(`Please choose a valid ${f.label.toLowerCase()} (#rrggbb).`);
        return;
      }
    }
    setCreating(true);
    setSaved(false);
    setError("");
    const res = await fetch("/api/admin/appearance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        bg: customColors.bg,
        soft: customColors.soft,
        accent: customColors.accent,
      }),
    });
    setCreating(false);
    const d = await res.json().catch(() => null);
    if (res.ok && d?.customTheme) {
      setCustomThemes((list) => [...list, d.customTheme as CustomTheme]);
      setCustomName("");
      setSaved(true);
      router.refresh();
    } else {
      setError(readError(res, "Could not save the custom theme. Please try again.", d));
    }
  }

  async function applyCustomTheme(id: string) {
    setApplyingId(id);
    setSaved(false);
    setError("");
    const res = await fetch("/api/admin/appearance", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applyCustomThemeId: id }),
    });
    setApplyingId(null);
    if (res.ok) {
      const d = await res.json().catch(() => null);
      setSavedId((d?.appearance?.themeId ?? id) as string);
      setSaved(true);
      router.refresh();
    } else {
      const d = await res.json().catch(() => null);
      setError(readError(res, "Could not apply the custom theme. Please try again.", d));
    }
  }

  async function deleteCustomTheme(theme: CustomTheme) {
    if (!confirm(`Delete custom theme "${theme.name}" permanently?`)) return;
    setDeletingId(theme.id);
    setSaved(false);
    setError("");
    const res = await fetch(`/api/admin/appearance?id=${encodeURIComponent(theme.id)}`, {
      method: "DELETE",
    });
    setDeletingId(null);
    if (res.ok) {
      const d = await res.json().catch(() => null);
      const appearance = d?.appearance as { themeId?: string; customThemes?: CustomTheme[] } | undefined;
      setCustomThemes(Array.isArray(appearance?.customThemes) ? appearance.customThemes : []);
      if (typeof appearance?.themeId === "string") {
        setSavedId(appearance.themeId);
        const preset = APPEARANCE_THEMES.find((t) => t.id === appearance.themeId);
        if (preset) setSelectedId(preset.id);
      }
      router.refresh();
    } else {
      const d = await res.json().catch(() => null);
      setError(readError(res, "Could not delete the custom theme. Please try again.", d));
    }
  }

  function setColor(key: ColorKey, value: string) {
    setCustomColors((c) => ({ ...c, [key]: value.toUpperCase() }));
    setSaved(false);
    setError("");
  }

  if (loading) {
    return (
      <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
      </div>
    );
  }

  const selected = APPEARANCE_THEMES.find((t) => t.id === selectedId) ?? APPEARANCE_THEMES[0];
  const activeCustom = customThemes.find((t) => t.id === savedId);

  return (
    <div className="space-y-6">
      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {saved && (
        <p role="status" className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Theme saved. The public website now uses this theme for all visitors.
        </p>
      )}

      <div>
        <h2 className="text-sm font-semibold text-brand-ink">Preset themes</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {APPEARANCE_THEMES.map((theme) => {
            const active = theme.id === selectedId && !activeCustom;
            const isSaved = theme.id === savedId;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  setSelectedId(theme.id);
                  setSaved(false);
                  setError("");
                }}
                aria-pressed={active}
                className={cn(
                  "card relative overflow-hidden p-4 text-left transition-all",
                  active ? "ring-2 ring-brand-green" : "hover:shadow-lift"
                )}
              >
                {active && (
                  <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
                <span className="flex gap-1.5">
                  {theme.swatches.map((c) => (
                    <span
                      key={c}
                      className="h-9 w-9 rounded-lg border border-brand-line"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </span>
                <span className="mt-3 block text-sm font-semibold text-brand-ink">
                  {theme.name}
                  {isSaved && (
                    <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                      Active
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block text-xs text-brand-muted">{theme.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-brand-ink">
          Preview: {activeCustom ? activeCustom.name : selected.name}
        </h2>
        <div className="mt-2 max-w-2xl">
          {activeCustom ? (
            <CustomPreview bg={activeCustom.bg} soft={activeCustom.soft} accent={activeCustom.accent} />
          ) : (
            <PresetPreview themeId={selectedId} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={saving}
          onClick={() => save(selectedId)}
          className="btn-primary w-full sm:w-auto sm:min-w-[200px]"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Save Changes
        </button>
      </div>

      <div className="card space-y-5 p-6 sm:p-8">
        <div>
          <h2 className="text-base font-bold text-brand-ink">Create Custom Theme</h2>
          <p className="mt-1 text-xs text-brand-muted">
            Pick three colours, preview the result, then save it with a name.
          </p>
        </div>
        <div>
          <label htmlFor="custom-theme-name" className="label">Theme name</label>
          <input
            id="custom-theme-name"
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="e.g. Festival Dark Green"
            maxLength={40}
            className="input max-w-sm"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {COLOR_FIELDS.map((f) => (
            <div key={f.key}>
              <label htmlFor={`custom-${f.key}`} className="label">{f.label}</label>
              <div className="flex items-center gap-2">
                <input
                  id={`custom-${f.key}`}
                  type="color"
                  value={normalizeHex(customColors[f.key]) ?? "#000000"}
                  onChange={(e) => setColor(f.key, e.target.value)}
                  className="h-10 w-14 shrink-0 cursor-pointer rounded-md border border-brand-line bg-white p-1"
                  aria-label={f.label}
                />
                <input
                  type="text"
                  value={customColors[f.key]}
                  onChange={(e) => setColor(f.key, e.target.value)}
                  maxLength={7}
                  spellCheck={false}
                  className="input font-mono uppercase"
                  aria-label={`${f.label} hex value`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-2xl">
          <CustomPreview bg={customColors.bg} soft={customColors.soft} accent={customColors.accent} />
        </div>
        <button
          type="button"
          disabled={creating}
          onClick={saveCustomTheme}
          className="btn-primary w-full sm:w-auto sm:min-w-[200px]"
        >
          {creating && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Save Custom Theme
        </button>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-brand-ink">Saved Custom Themes</h2>
        {customThemes.length === 0 ? (
          <p className="mt-2 text-sm text-brand-muted">
            No custom themes yet. Create one above — it will appear here.
          </p>
        ) : (
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {customThemes.map((theme) => {
              const isActive = theme.id === savedId;
              const applying = applyingId === theme.id;
              const deleting = deletingId === theme.id;
              return (
                <li
                  key={theme.id}
                  className={cn(
                    "card relative overflow-hidden p-4",
                    isActive && "ring-2 ring-brand-green"
                  )}
                >
                  {isActive && (
                    <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                  <span className="flex gap-1.5">
                    {[theme.bg, theme.soft, theme.accent].map((c) => (
                      <span
                        key={c}
                        className="h-9 w-9 rounded-lg border border-brand-line"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </span>
                  <span className="mt-3 block text-sm font-semibold text-brand-ink">
                    {theme.name}
                    {isActive && (
                      <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                        Active
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] uppercase text-brand-muted">
                    {theme.bg} · {theme.soft} · {theme.accent}
                  </span>
                  <span className="mt-3 flex gap-2">
                    <button
                      type="button"
                      disabled={applying || deleting || isActive}
                      onClick={() => applyCustomTheme(theme.id)}
                      className="btn-primary !px-4 !py-2 text-xs"
                    >
                      {applying && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
                      {isActive ? "Applied" : "Apply Theme"}
                    </button>
                    <button
                      type="button"
                      disabled={applying || deleting}
                      onClick={() => deleteCustomTheme(theme)}
                      className="btn-outline !px-4 !py-2 text-xs"
                      aria-label={`Delete custom theme ${theme.name}`}
                    >
                      {deleting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      Delete
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="text-xs text-brand-muted">
        Saving applies the theme to the public website for all visitors and keeps it after refresh or restart (on hosting with writable storage). Brand buttons keep the existing Forest Green and Gold colours.
      </p>
    </div>
  );
}
