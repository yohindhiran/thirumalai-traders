import { NextResponse } from "next/server";

export const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
} as const;

export function noCacheJson(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: { ...NO_CACHE_HEADERS, ...init?.headers },
  });
}

export function noCacheResponse(data: string, init?: ResponseInit) {
  return new Response(data, {
    ...init,
    headers: { "Content-Type": "text/plain", ...NO_CACHE_HEADERS, ...init?.headers },
  });
}
