import { NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Use existing checkCredentials from auth.ts
  const isValid = await import("@/lib/auth").then(m => m.checkCredentials(email, password));

  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Set admin cookie
  await setAdminCookie();

  return NextResponse.json({ success: true });
}

// Handle GET request (optional)
export async function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}