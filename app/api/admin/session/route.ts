import { NextResponse } from "next/server";
import { checkCredentials, clearAdminCookie, setAdminCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!checkCredentials(email, password)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  await setAdminCookie();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminCookie();
  return NextResponse.json({ ok: true });
}
