import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export const metadata: Metadata = {
  title: "Admin | Thirumalaai Traders",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-brand-soft">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:pl-72">{children}</main>
      </div>
    </div>
  );
}
