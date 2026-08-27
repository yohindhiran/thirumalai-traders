import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin/dashboard");
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-brand-soft px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-brand-green font-bold text-brand-gold">
            TT
          </span>
          <h1 className="mt-4 text-2xl font-bold text-brand-ink">Admin Login</h1>
          <p className="mt-1.5 text-sm text-brand-muted">
            Thirumalaai Traders — Business Management Panel
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </section>
  );
}
