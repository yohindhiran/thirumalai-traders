"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ContactInlineForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries()) as Record<string, string>;
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, customerType: "Other" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-green" aria-hidden="true" />
        <p className="mt-4 font-semibold text-brand-ink">Thank you!</p>
        <p className="mt-1 text-sm text-brand-muted">
          Your enquiry has been received. Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-4 p-6 sm:grid-cols-2">
      {status === "error" && (
        <div role="alert" className="sm:col-span-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not submit right now. Please call us or try again.
        </div>
      )}
      <div>
        <label htmlFor="c-name" className="label">Full Name *</label>
        <input id="c-name" name="name" required className="input" autoComplete="name" />
      </div>
      <div>
        <label htmlFor="c-phone" className="label">Phone Number *</label>
        <input
          id="c-phone"
          name="phone"
          type="tel"
          required
          pattern="[0-9+ -]{7,15}"
          className="input"
          autoComplete="tel"
        />
      </div>
      <div>
        <label htmlFor="c-company" className="label">Company / Institution</label>
        <input id="c-company" name="company" className="input" autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="c-location" className="label">Delivery Location *</label>
        <input id="c-location" name="deliveryLocation" required className="input" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-products" className="label">Products / Requirement</label>
        <textarea id="c-products" name="productsRequired" rows={3} className="input resize-y" />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Send Enquiry
        </button>
      </div>
    </form>
  );
}
