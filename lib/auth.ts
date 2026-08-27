import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "tt_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function secret(): string {
  return process.env.AUTH_SECRET || "dev-only-insecure-secret-change-me";
}

function sign(value: string): string {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

export function makeToken(email: string): string {
  const payload = Buffer.from(email).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined): string | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return null;
  }
  return Buffer.from(payload, "base64url").toString();
}

export function checkCredentials(email: string, password: string): boolean {
  const envEmail = process.env.ADMIN_EMAIL;
  const envPassword = process.env.ADMIN_PASSWORD;
  if (!envEmail || !envPassword) return false;
  const okEmail =
    email.trim().toLowerCase() === envEmail.trim().toLowerCase();
  const okPass = password === envPassword;
  if (!okEmail || !okPass) return false;
  return crypto.timingSafeEqual(
    Buffer.from(password.padEnd(64).slice(0, 64)),
    Buffer.from(envPassword.padEnd(64).slice(0, 64))
  );
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value) !== null;
}

export async function setAdminCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, makeToken(process.env.ADMIN_EMAIL || "admin"), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { httpOnly: true, maxAge: 0, path: "/" });
}
