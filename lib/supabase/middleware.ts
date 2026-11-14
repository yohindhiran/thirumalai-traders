import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_SUPABASE_URL = "https://qeoagpvhltudoaetsbdu.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_j8O_Etitm2ShX0kj0x8Bgg_nP2ZDpvm";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    DEFAULT_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return supabaseResponse;
  }

  // Fast path: Only perform remote session verification if a Supabase auth cookie exists.
  // This keeps public page requests blazing fast (< 1ms) without blocking network calls.
  const allCookies = request.cookies.getAll();
  const hasAuthToken = allCookies.some(
    (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token")
  );

  if (!hasAuthToken) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // Refreshing the auth token safely
    await supabase.auth.getUser();
  } catch (err) {
    // Fail silently: never let a Supabase auth hiccup crash the site with 500
    console.warn("Supabase session refresh skipped:", err);
  }

  return supabaseResponse;
}
