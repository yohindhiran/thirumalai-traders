import type { ReactNode } from "react";

// Server pass-through layout. It must stay a Server Component (no
// "use client") so the nested `app/admin/(dashboard)/layout.tsx` server
// guard (isAdmin / redirect / metadata) keeps a valid server boundary.
// Client interactivity lives in AdminSidebar / AdminTopbar instead.
export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
