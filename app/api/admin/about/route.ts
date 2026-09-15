import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { invalidateProductCache, readDb, writeDb } from "@/lib/db";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ about: readDb().about });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const db = readDb();
  const about = db.about;

  if (typeof body?.content === "string") about.content = body.content;
  if (typeof body?.vision === "string") about.vision = body.vision;
  if (Array.isArray(body?.mission)) {
    const m = body.mission.map((x: unknown) => String(x)).filter((x: string) => x.trim());
    if (m.length) about.mission = m;
  }
  if (Array.isArray(body?.coreValues)) {
    about.coreValues = body.coreValues
      .map((c: any, i: number) => ({
        title: String(c?.title ?? ""),
        desc: String(c?.desc ?? ""),
        status: c?.status === "inactive" ? "inactive" : "active",
        displayOrder: typeof c?.displayOrder === "number" ? c.displayOrder : i + 1,
      }))
      .filter((c: { title: string; desc: string }) => c.title);
  }
  if (Array.isArray(body?.images)) {
    about.images = body.images.map((x: unknown) => String(x)).filter((x: string) => x.trim());
  }
  if (typeof body?.heroImage === "string") about.heroImage = body.heroImage.trim() || undefined;
  if (typeof body?.visionImage === "string") about.visionImage = body.visionImage.trim() || undefined;
  if (typeof body?.missionImage === "string") about.missionImage = body.missionImage.trim() || undefined;
  writeDb(db);
  invalidateProductCache();
  return NextResponse.json({ about });
}
