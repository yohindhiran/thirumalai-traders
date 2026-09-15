"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { CATEGORY_SEEDS } from "@/data/categories";
import { CUSTOMER_TYPES } from "@/data/site";

export default function EnquiryForm() {
  const params = useSearchParams();
  const presetProduct = params.get("product") || "";
  const presetCategory = params.get("category") || "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [categories, setCategories] = useState<string[]>(
    CATEGORY_SEEDS.map((c) => c.name)
  );

  useEffect(() => {
    let cancelled = false;
    fetch("/api/categories")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (!cancelled && data?.categories?.length) {
          setCategories(
            data.categories.map((c: { name: string }) => c.name)
          );
        }
      })
      .catch(() => {
        // Keep the seed fallback if the API is unreachable.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="card mx-auto max-w-xl p-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-green" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-bold text-brand-ink">Enquiry Received</h2>
        <p className="mt-3 leading-relaxed text-brand-muted">
          Thank you for your interest in Thirumalaai Traders. Your wholesale enquiry
          has been recorded and our sales team will contact you shortly with
          pricing and supply details.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-8"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card mx-auto grid max-w-4xl gap-5 p-6 sm:grid-cols-2 sm:p-10">
      {status === "error" && (
        <div
          role="alert"
          className="sm:col-span-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMsg}
        </div>
      )}

      <div>
        <label htmlFor="name" className="label">
          Full Name <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input id="name" name="name" required className="input" autoComplete="name" />
      </div>

      <div>
        <label htmlFor="company" className="label">
          Company / Institution Name
        </label>
        <input id="company" name="company" className="input" autoComplete="organization" />
      </div>

      <div>
        <label htmlFor="phone" className="label">
          Phone Number <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          pattern="[0-9+ -]{7,15}"
          title="Enter a valid phone number"
          className="input"
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input id="email" name="email" type="email" className="input" autoComplete="email" />
      </div>

      <div>
        <label htmlFor="customerType" className="label">
          Customer Type <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <select id="customerType" name="customerType" required defaultValue="" className="input">
          <option value="" disabled>Select customer type</option>
          {CUSTOMER_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category" className="label">
          Product Category
        </label>
        <select
          id="category"
          name="category"
          key={`cat-${presetCategory}`}
          defaultValue={presetCategory}
          className="input"
        >
          <option value="">Select a category</option>
          {categories.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
          {!categories.includes(presetCategory) && presetCategory && (
            <option value={presetCategory}>{presetCategory}</option>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="productsRequired" className="label">
          Products Required
        </label>
        <input
          id="productsRequired"
          name="productsRequired"
          key={`prod-${presetProduct}`}
          defaultValue={presetProduct}
          placeholder="e.g. Toor Dal, Ponni Rice"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="quantity" className="label">
          Approximate Quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          placeholder="e.g. 500 kg / month"
          className="input"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="deliveryLocation" className="label">
          Delivery Location <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="deliveryLocation"
          name="deliveryLocation"
          required
          placeholder="City / Area"
          className="input"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Share any additional details about your requirement"
          className="input resize-y"
        />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto sm:min-w-[280px]">
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Submit Wholesale Enquiry
        </button>
        <p className="mt-3 text-xs text-brand-muted">
          By submitting this form you agree to be contacted by our sales team regarding your enquiry.
        </p>
      </div>
    </form>
  );
}
