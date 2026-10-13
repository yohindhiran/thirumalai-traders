import type { AppearanceSettings, AppearanceThemeId, CustomTheme } from "@/types";

export type AppearanceScheme = "dark" | "light";

export interface AppearanceTheme {
  id: AppearanceThemeId;
  name: string;
  description: string;
  scheme: AppearanceScheme;
  /** Three swatches shown on the admin card. */
  swatches: [string, string, string];
  vars: {
    bg: string;
    soft: string;
    card: string;
    line: string;
    tintA: string;
    tintB: string;
    ink: string;
    muted: string;
  };
}

export const APPEARANCE_THEMES: AppearanceTheme[] = [
  {
    id: "dark-forest-green",
    name: "Dark Forest Green",
    description: "Deep premium green section backgrounds.",
    scheme: "dark",
    swatches: ["#24382D", "#2E4A38", "#F1E564"],
    vars: {
      bg: "#24382D",
      soft: "#2E4A38",
      card: "#FFFFFF",
      line: "rgba(255, 255, 255, 0.16)",
      tintA: "#2E4A38",
      tintB: "#24382D",
      ink: "#F2F7F1",
      muted: "#C2D2C3",
    },
  },
  {
    id: "deep-sage",
    name: "Deep Sage",
    description: "Calm dark sage section backgrounds.",
    scheme: "dark",
    swatches: ["#344638", "#41594A", "#F1E564"],
    vars: {
      bg: "#344638",
      soft: "#41594A",
      card: "#FFFFFF",
      line: "rgba(255, 255, 255, 0.16)",
      tintA: "#41594A",
      tintB: "#344638",
      ink: "#F1F6F0",
      muted: "#C4D3C5",
    },
  },
  {
    id: "dark-earth-brown",
    name: "Dark Earth Brown",
    description: "Warm dark earth section backgrounds.",
    scheme: "dark",
    swatches: ["#49352B", "#5A4437", "#F1E564"],
    vars: {
      bg: "#49352B",
      soft: "#5A4437",
      card: "#FFFFFF",
      line: "rgba(255, 255, 255, 0.16)",
      tintA: "#5A4437",
      tintB: "#49352B",
      ink: "#F8F3EC",
      muted: "#D6C8B8",
    },
  },
  {
    id: "charcoal-plum",
    name: "Charcoal Plum",
    description: "Sophisticated dark plum section backgrounds.",
    scheme: "dark",
    swatches: ["#34313D", "#43404E", "#F1E564"],
    vars: {
      bg: "#34313D",
      soft: "#43404E",
      card: "#FFFFFF",
      line: "rgba(255, 255, 255, 0.16)",
      tintA: "#43404E",
      tintB: "#34313D",
      ink: "#F2F1F5",
      muted: "#C6C3D0",
    },
  },
  {
    id: "deep-blue-grey",
    name: "Deep Blue Grey",
    description: "Clean dark blue-grey section backgrounds.",
    scheme: "dark",
    swatches: ["#35434A", "#43555D", "#F1E564"],
    vars: {
      bg: "#35434A",
      soft: "#43555D",
      card: "#FFFFFF",
      line: "rgba(255, 255, 255, 0.16)",
      tintA: "#43555D",
      tintB: "#35434A",
      ink: "#F0F5F7",
      muted: "#C2CFD6",
    },
  },
  {
    id: "classic-white",
    name: "Classic White",
    description: "The original light website background.",
    scheme: "light",
    swatches: ["#FFFFFF", "#EDF5EE", "#FDF9EF"],
    vars: {
      bg: "#FFFFFF",
      soft: "#F7F8F5",
      card: "#FFFFFF",
      line: "#E5E7EB",
      tintA: "#EDF5EE",
      tintB: "#FDF9EF",
      ink: "#1F2933",
      muted: "#667085",
    },
  },
];

export const APPEARANCE_THEME_IDS: AppearanceThemeId[] = APPEARANCE_THEMES.map(
  (t) => t.id
);

export function isAppearanceThemeId(v: unknown): v is AppearanceThemeId {
  return (
    typeof v === "string" &&
    (APPEARANCE_THEME_IDS as string[]).includes(v)
  );
}

export function getThemeById(id: AppearanceThemeId): AppearanceTheme {
  return (
    APPEARANCE_THEMES.find((t) => t.id === id) ?? APPEARANCE_THEMES[0]
  );
}

/* -------------------------------------------------------------------------- */
/*  Custom themes                                                              */
/* -------------------------------------------------------------------------- */

export const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;
export const MAX_CUSTOM_THEMES = 20;
export const MAX_CUSTOM_THEME_NAME = 40;

export function normalizeHex(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return HEX_COLOR_RE.test(t) ? `#${t.slice(1).toUpperCase()}` : null;
}

/** Relative luminance → true when white/light text reads better on it. */
export function isDarkColor(hex: string): boolean {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const r = lin(parseInt(hex.slice(1, 3), 16));
  const g = lin(parseInt(hex.slice(3, 5), 16));
  const b = lin(parseInt(hex.slice(5, 7), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.4;
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Full CSS variable set for a saved custom theme. Product cards stay
 * white so imagery and forms stay clear; section text follows the
 * background luminance for contrast. Buttons keep brand styling.
 */
export function customThemeVars(c: Pick<CustomTheme, "bg" | "soft" | "accent">): AppearanceTheme["vars"] & {
  accent: string;
  accentSoft: string;
} {
  const dark = isDarkColor(c.bg);
  return {
    bg: c.bg,
    soft: c.soft,
    card: "#FFFFFF",
    line: dark ? "rgba(255, 255, 255, 0.16)" : "#E5E7EB",
    tintA: c.soft,
    tintB: c.bg,
    ink: dark ? "#F3F7F3" : "#1F2933",
    muted: dark ? "#C4D2C6" : "#667085",
    accent: c.accent,
    accentSoft: hexToRgba(c.accent, 0.35),
  };
}

export function customThemeScheme(c: Pick<CustomTheme, "bg">): AppearanceScheme {
  return isDarkColor(c.bg) ? "dark" : "light";
}

export function findCustomTheme(
  appearance: Pick<AppearanceSettings, "customThemes"> | undefined,
  id: string
): CustomTheme | undefined {
  return appearance?.customThemes?.find((t) => t.id === id);
}

export interface ResolvedAppearance {
  /** Value for the <html> data-theme attribute. */
  attr: string;
  scheme: AppearanceScheme;
  /** Inline CSS variables — only set for saved custom themes. */
  inlineVars?: Record<string, string>;
}

/**
 * Single place that decides what the public website renders.
 * Presets use their CSS var block; custom themes use inline vars.
 */
export function resolveAppearance(
  appearance: AppearanceSettings | undefined
): ResolvedAppearance {
  const custom = appearance && findCustomTheme(appearance, appearance.themeId);
  if (custom) {
    const vars = customThemeVars(custom);
    return {
      attr: "custom",
      scheme: customThemeScheme(custom),
      inlineVars: {
        "--site-bg": vars.bg,
        "--site-soft": vars.soft,
        "--site-card": vars.card,
        "--site-line": vars.line,
        "--site-tint-a": vars.tintA,
        "--site-tint-b": vars.tintB,
        "--site-ink": vars.ink,
        "--site-muted": vars.muted,
        "--site-accent": vars.accent,
        "--site-accent-soft": vars.accentSoft,
      },
    };
  }
  const preset = APPEARANCE_THEMES.find((t) => t.id === appearance?.themeId) ?? APPEARANCE_THEMES[0];
  return { attr: preset.id, scheme: preset.scheme };
}
