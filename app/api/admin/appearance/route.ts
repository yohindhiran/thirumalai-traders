import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, newId, readDb, writeDb } from "@/lib/db";
import {
  MAX_CUSTOM_THEMES,
  MAX_CUSTOM_THEME_NAME,
  isAppearanceThemeId,
  normalizeHex,
} from "@/lib/appearance";
import { noCacheJson } from "@/lib/http";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function persistError() {
  // writeDb throws on read-only filesystems (e.g. Vercel production).
  // Report honestly instead of false success.
  return NextResponse.json(
    { error: "Could not persist theme on this hosting plan (read-only filesystem). Theme was not saved for all visitors." },
    { status: 500 }
  );
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const appearance = readDb().appearance ?? { themeId: "dark-forest-green", customThemes: [] };
  return noCacheJson({ appearance });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const db = readDb();
  if (typeof body?.applyCustomThemeId === "string") {
    const custom = (db.appearance?.customThemes ?? []).find(
      (t) => t.id === body.applyCustomThemeId
    );
    if (!custom) {
      return NextResponse.json({ error: "Custom theme not found." }, { status: 404 });
    }
    db.appearance = { ...(db.appearance ?? { customThemes: [] }), themeId: custom.id };
  } else if (isAppearanceThemeId(body?.themeId)) {
    db.appearance = { ...(db.appearance ?? { customThemes: [] }), themeId: body.themeId };
  } else {
    return NextResponse.json({ error: "Invalid theme." }, { status: 400 });
  }
  try {
    writeDb(db);
  } catch {
    return persistError();
  }
  invalidateProductCache();
  return NextResponse.json({ appearance: db.appearance });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, MAX_CUSTOM_THEME_NAME) : "";
  const bg = normalizeHex(body?.bg);
  const soft = normalizeHex(body?.soft);
  const accent = normalizeHex(body?.accent);
  if (!name) {
    return NextResponse.json({ error: "Please give the custom theme a name." }, { status: 400 });
  }
  if (!bg || !soft || !accent) {
    return NextResponse.json({ error: "Please choose valid colours (#rrggbb)." }, { status: 400 });
  }
  const db = readDb();
  const customThemes = db.appearance?.customThemes ?? [];
  if (customThemes.length >= MAX_CUSTOM_THEMES) {
    return NextResponse.json(
      { error: `You can save up to ${MAX_CUSTOM_THEMES} custom themes. Delete one first.` },
      { status: 400 }
    );
  }
  const now = new Date().toISOString();
  const customTheme = { id: newId("custom"), name, bg, soft, accent, createdAt: now, updatedAt: now };
  db.appearance = {
    themeId: db.appearance?.themeId ?? "dark-forest-green",
    customThemes: [...customThemes, customTheme],
  };
  try {
    writeDb(db);
  } catch {
    return persistError();
  }
  invalidateProductCache();
  return NextResponse.json({ customTheme, appearance: db.appearance }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const db = readDb();
  const customThemes = db.appearance?.customThemes ?? [];
  if (!customThemes.some((t) => t.id === id)) {
    return NextResponse.json({ error: "Custom theme not found." }, { status: 404 });
  }
  const remaining = customThemes.filter((t) => t.id !== id);
  db.appearance = {
    themeId: db.appearance?.themeId === id ? "dark-forest-green" : (db.appearance?.themeId ?? "dark-forest-green"),
    customThemes: remaining,
  };
  try {
    writeDb(db);
  } catch {
    return persistError();
  }
  invalidateProductCache();
  return NextResponse.json({ appearance: db.appearance });
}
