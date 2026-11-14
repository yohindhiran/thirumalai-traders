import { createBrowserClient } from "@supabase/ssr";

const DEFAULT_SUPABASE_URL = "https://qeoagpvhltudoaetsbdu.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_j8O_Etitm2ShX0kj0x8Bgg_nP2ZDpvm";

export function createClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    DEFAULT_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_ANON_KEY;

  return createBrowserClient(url, key);
}
