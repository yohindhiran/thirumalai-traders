"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  Loader2,
  Package,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import type { KgPackageRef, KgPackageSize, Product } from "@/types";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/catalog";

const ENDPOINT = "/api/admin/kg-packages";

function masterImage(p: Product | undefined): string {
  return p?.images?.[0] || p?.mainImage || DEFAULT_PRODUCT_IMAGE;
}

export default function KgPackagesManager() {
  const router = useRouter();
  const [sizes, setSizes] = useState<KgPackageSize[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selected, setSelected] = useState("");
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [newSizeName, setNewSizeName] = useState("");
  const [sizeSaving, setSizeSaving] = useState(false);
  const [sizeError, setSizeError] = useState("");
  const [editingSizeId, setEditingSizeId] = useState<string | null>(null);
  const [editSizeName, setEditSizeName] = useState("");
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDesc, setSectionDesc] = useState("");
  const [sectionSaving, setSectionSaving] = useState(false);
  const [sectionSaved, setSectionSaved] = useState(false);
  const [sectionError, setSectionError] = useState("");
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const newFileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const [refsRes, sectionRes] = await Promise.all([
      fetch(`${ENDPOINT}?t=${Date.now()}`, { cache: "no-store" }),
      fetch(`${ENDPOINT}/section?t=${Date.now()}`, { cache: "no-store" }),
    ]);
    if (refsRes.ok) {
      const data = await refsRes.json();
      const nextSizes = (data.sizes ?? []) as KgPackageSize[];
      setSizes(nextSizes);
      setProducts(data.products as Product[]);
      setSelectedSizeId((prev) => {
        if (prev && nextSizes.some((s) => s.id === prev)) return prev;
        const sorted = nextSizes.slice().sort((a, b) => a.displayOrder - b.displayOrder);
        return sorted[0]?.id ?? "";
      });
    }
    if (sectionRes.ok) {
      const data = await sectionRes.json();
      setSectionTitle(data.section?.title ?? "");
      setSectionDesc(data.section?.description ?? "");
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const productById = useMemo(
    () => new Map(products.map((p) => [p.id, p])),
    [products]
  );

  const sortedSizes = useMemo(
    () => sizes.slice().sort((a, b) => a.displayOrder - b.displayOrder),
    [sizes]
  );

  const activeSize = useMemo(
    () => sizes.find((s) => s.id === selectedSizeId) ?? sortedSizes[0],
    [sizes, selectedSizeId, sortedSizes]
  );

  const sorted = useMemo(
    () => (activeSize?.items ?? []).slice().sort((a, b) => a.displayOrder - b.displayOrder),
    [activeSize]
  );

  const usedIds = useMemo(() => new Set(sorted.map((r) => r.productId)), [sorted]);
  const available = useMemo(
    () => products.filter((p) => !usedIds.has(p.id)),
    [products, usedIds]
  );

  const imageSuggestions = useMemo(() => {
    const set = new Set<string>([DEFAULT_PRODUCT_IMAGE]);
    for (const p of products) {
      if (p.mainImage) set.add(p.mainImage);
      for (const img of p.images ?? []) set.add(img);
    }
    return [...set].slice(0, 40);
  }, [products]);

  /* ------------------------- size mutations ------------------------- */

  async function addSize() {
    const name = newSizeName.trim();
    if (!name) return;
    setSizeSaving(true);
    setSizeError("");
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      const data = await res.json();
      const size = data.size as KgPackageSize;
      setSizes((l) => [...l, size]);
      setNewSizeName("");
      setSelectedSizeId(size.id);
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setSizeError(data?.error || "Could not add package size.");
    }
    setSizeSaving(false);
  }

  async function patchSize(size: KgPackageSize, body: Record<string, unknown>): Promise<boolean> {
    const res = await fetch(`${ENDPOINT}/${size.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) router.refresh();
    return res.ok;
  }

  async function toggleSizeStatus(size: KgPackageSize) {
    const next = size.status === "active" ? "inactive" : "active";
    if (await patchSize(size, { status: next })) {
      setSizes((l) => l.map((x) => (x.id === size.id ? { ...x, status: next } : x)));
    }
  }

  async function patchSizeOrder(size: KgPackageSize, displayOrder: number) {
    if (await patchSize(size, { displayOrder })) {
      setSizes((l) => l.map((x) => (x.id === size.id ? { ...x, displayOrder } : x)));
    }
  }

  function moveSize(size: KgPackageSize, dir: -1 | 1) {
    const idx = sortedSizes.findIndex((x) => x.id === size.id);
    const swapWith = sortedSizes[idx + dir];
    if (!swapWith) return;
    const a = sortedSizes[idx].displayOrder;
    const b = swapWith.displayOrder;
    patchSizeOrder(sortedSizes[idx], b);
    patchSizeOrder(swapWith, a);
  }

  async function removeSize(size: KgPackageSize) {
    if (!confirm(`Delete package size "${size.name}"? Its products stay in the Products catalogue.`)) return;
    const res = await fetch(`${ENDPOINT}/${size.id}`, { method: "DELETE" });
    if (res.ok) {
      setSizes((l) => l.filter((x) => x.id !== size.id));
      if (selectedSizeId === size.id) {
        const rest = sortedSizes.filter((x) => x.id !== size.id);
        setSelectedSizeId(rest[0]?.id ?? "");
      }
      router.refresh();
    }
  }

  function startEditSize(size: KgPackageSize) {
    setEditingSizeId(size.id);
    setEditSizeName(size.name);
    setSizeError("");
  }

  async function saveEditSize(size: KgPackageSize) {
    const name = editSizeName.trim();
    if (!name) {
      setSizeError("Package size name is required.");
      return;
    }
    setSizeSaving(true);
    setSizeError("");
    const ok = await patchSize(size, { name });
    if (ok) {
      setSizes((l) => l.map((x) => (x.id === size.id ? { ...x, name } : x)));
      setEditingSizeId(null);
    } else {
      setSizeError("Could not save package size.");
    }
    setSizeSaving(false);
  }

  /* ------------------------ product mutations ------------------------ */

  function productEndpoint(productId?: string): string {
    const base = `${ENDPOINT}/${activeSize?.id}/products`;
    return productId ? `${base}/${productId}` : base;
  }

  async function mutateProduct(
    productId: string,
    method: string,
    body?: Record<string, unknown>
  ): Promise<boolean> {
    const res = await fetch(productEndpoint(productId), {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.ok) router.refresh();
    return res.ok;
  }

  async function toggleStatus(ref: KgPackageRef) {
    const next = ref.status === "active" ? "inactive" : "active";
    if (await mutateProduct(ref.productId, "PATCH", { status: next })) {
      setSizes((ls) =>
        ls.map((s) =>
          s.id === activeSize?.id
            ? {
                ...s,
                items: (s.items ?? []).map((x) =>
                  x.productId === ref.productId ? { ...x, status: next } : x
                ),
              }
            : s
        )
      );
    }
  }

  async function patchOrder(ref: KgPackageRef, displayOrder: number) {
    if (await mutateProduct(ref.productId, "PATCH", { displayOrder })) {
      setSizes((ls) =>
        ls.map((s) =>
          s.id === activeSize?.id
            ? {
                ...s,
                items: (s.items ?? []).map((x) =>
                  x.productId === ref.productId ? { ...x, displayOrder } : x
                ),
              }
            : s
        )
      );
    }
  }

  function move(ref: KgPackageRef, dir: -1 | 1) {
    const idx = sorted.findIndex((x) => x.productId === ref.productId);
    const swapWith = sorted[idx + dir];
    if (!swapWith) return;
    const a = sorted[idx].displayOrder;
    const b = swapWith.displayOrder;
    patchOrder(sorted[idx], b);
    patchOrder(swapWith, a);
  }

  async function remove(ref: KgPackageRef) {
    const name = ref.customName || productById.get(ref.productId)?.name || ref.productId;
    if (!confirm(`Remove "${name}" from ${activeSize?.name ?? "this package"}? The master product stays in the Products catalogue.`)) return;
    if (await mutateProduct(ref.productId, "DELETE")) {
      setSizes((ls) =>
        ls.map((s) =>
          s.id === activeSize?.id
            ? { ...s, items: (s.items ?? []).filter((x) => x.productId !== ref.productId) }
            : s
        )
      );
    }
  }

  async function add() {
    if (!selected || !activeSize) return;
    setSaving(true);
    setError("");
    const res = await fetch(productEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: selected,
        customName: newName.trim() || undefined,
        customImage: newImage.trim() || undefined,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      const item = data.item as KgPackageRef;
      setSizes((ls) =>
        ls.map((s) => (s.id === activeSize.id ? { ...s, items: [...(s.items ?? []), item] } : s))
      );
      setSelected("");
      setNewName("");
      setNewImage("");
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Could not add product.");
    }
    setSaving(false);
  }

  function startEdit(ref: KgPackageRef) {
    const master = productById.get(ref.productId);
    setEditingId(ref.productId);
    setEditName(ref.customName ?? "");
    setEditImage(ref.customImage ?? "");
    setError("");
    void master;
  }

  async function saveEdit(ref: KgPackageRef) {
    setSaving(true);
    setError("");
    const ok = await mutateProduct(ref.productId, "PATCH", {
      customName: editName.trim(),
      customImage: editImage.trim(),
    });
    if (ok) {
      const customName = editName.trim() || undefined;
      const customImage = editImage.trim() || undefined;
      setSizes((ls) =>
        ls.map((s) =>
          s.id === activeSize?.id
            ? {
                ...s,
                items: (s.items ?? []).map((x) =>
                  x.productId === ref.productId ? { ...x, customName, customImage } : x
                ),
              }
            : s
        )
      );
      setEditingId(null);
    } else {
      setError("Could not save changes.");
    }
    setSaving(false);
  }

  const displayNameOf = (ref: KgPackageRef) =>
    ref.customName?.trim() ||
    productById.get(ref.productId)?.name ||
    ref.productId;

  // Image upload reuses the project's existing pattern: FormData file upload
  // to POST /api/admin/upload, returning { url } saved into the KG Package
  // ref's customImage field (same storage as every other admin image).
  async function uploadImageFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.error || "Upload failed.");
    }
    const data = await res.json();
    return data.url as string;
  }

  async function handleNewImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFor("new");
    setUploadError("");
    try {
      setNewImage(await uploadImageFile(file));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingFor(null);
      if (newFileRef.current) newFileRef.current.value = "";
    }
  }

  async function handleEditImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editingId) return;
    setUploadingFor(editingId);
    setUploadError("");
    try {
      setEditImage(await uploadImageFile(file));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingFor(null);
      if (editFileRef.current) editFileRef.current.value = "";
    }
  }

  async function saveSection() {
    setSectionSaving(true);
    setSectionError("");
    setSectionSaved(false);
    const res = await fetch(`${ENDPOINT}/section`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: sectionTitle, description: sectionDesc }),
    });
    if (res.ok) {
      const data = await res.json();
      setSectionTitle(data.section?.title ?? sectionTitle);
      setSectionDesc(data.section?.description ?? sectionDesc);
      setSectionSaved(true);
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setSectionError(data?.error || "Could not save section settings.");
    }
    setSectionSaving(false);
  }

  return (
    <div>
      <div className="card mb-5 p-4 sm:p-5">
        <p className="label">Section heading</p>
        <p className="mt-1 text-xs text-brand-muted">
          Title and description shown on the Home page KG Packages section
          only. Nothing else on the website is affected.
        </p>
        <div className="mt-3 grid gap-3">
          <div>
            <label htmlFor="kg-section-title" className="label">Section title</label>
            <input
              id="kg-section-title"
              value={sectionTitle}
              onChange={(e) => {
                setSectionTitle(e.target.value);
                setSectionSaved(false);
              }}
              maxLength={80}
              placeholder="Our Products"
              className="input mt-1"
            />
          </div>
          <div>
            <label htmlFor="kg-section-desc" className="label">Section description</label>
            <textarea
              id="kg-section-desc"
              value={sectionDesc}
              onChange={(e) => {
                setSectionDesc(e.target.value);
                setSectionSaved(false);
              }}
              maxLength={500}
              rows={3}
              className="input mt-1"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={saveSection}
              disabled={sectionSaving}
              className="btn-primary"
            >
              {sectionSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : null}
              Save changes
            </button>
            {sectionSaved && (
              <p role="status" className="text-xs font-medium text-green-700">
                Saved — the Home page section updates immediately.
              </p>
            )}
          </div>
        </div>
        {sectionError && (
          <p role="alert" className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {sectionError}
          </p>
        )}
      </div>

      <div className="card mb-5 p-4 sm:p-5">
        <p className="label">KG package sizes</p>
        <p className="mt-1 text-xs text-brand-muted">
          Add any package size (1 KG, 1.5 KG, 5 KG, 25 KG…). Only enabled
          sizes appear on the Home page, in the order below. Select a size to
          manage its products.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={newSizeName}
            onChange={(e) => setNewSizeName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSize();
              }
            }}
            placeholder="e.g. 5 KG"
            maxLength={20}
            aria-label="New package size name"
            className="input flex-1"
          />
          <button
            type="button"
            onClick={addSize}
            disabled={!newSizeName.trim() || sizeSaving}
            className="btn-primary whitespace-nowrap"
          >
            {sizeSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="h-4 w-4" aria-hidden="true" />
            )}
            Add KG Package
          </button>
        </div>
        {sizeError && (
          <p role="alert" className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {sizeError}
          </p>
        )}

        {loading ? (
          <p className="mt-4 flex items-center gap-2 text-sm text-brand-muted">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
          </p>
        ) : sortedSizes.length === 0 ? (
          <p className="mt-4 text-sm text-brand-muted">
            No package sizes yet. Add one above to get started.
          </p>
        ) : (
          <ul className="mt-4 grid gap-2">
            {sortedSizes.map((size, i) => {
              const isActive = size.id === activeSize?.id;
              const isEditingSize = editingSizeId === size.id;
              const count = (size.items ?? []).length;
              return (
                <li
                  key={size.id}
                  className={`flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center ${
                    isActive ? "border-brand-green bg-brand-green/5" : "border-brand-line"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedSizeId(size.id)}
                    aria-pressed={isActive}
                    className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                  >
                    <Package
                      className={`h-4 w-4 shrink-0 ${isActive ? "text-brand-green" : "text-brand-muted"}`}
                      aria-hidden="true"
                    />
                    {isEditingSize ? (
                      <input
                        value={editSizeName}
                        onChange={(e) => setEditSizeName(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            saveEditSize(size);
                          }
                          e.stopPropagation();
                        }}
                        maxLength={20}
                        aria-label={`Edit name for ${size.name}`}
                        className="input !py-1.5"
                      />
                    ) : (
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-brand-ink">
                          {size.name}
                          <span className="ml-2 text-xs font-normal text-brand-muted">
                            {count} product{count === 1 ? "" : "s"}
                          </span>
                        </span>
                        <span className={`text-xs ${size.status === "active" ? "text-green-700" : "text-gray-500"}`}>
                          {size.status === "active" ? "enabled — visible on Home" : "disabled — hidden on Home"}
                        </span>
                      </span>
                    )}
                  </button>
                  <div className="flex flex-wrap items-center gap-1">
                    {isEditingSize ? (
                      <>
                        <button
                          type="button"
                          onClick={() => saveEditSize(size)}
                          disabled={sizeSaving}
                          className="btn-primary !px-3 !py-1.5 text-xs"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingSizeId(null)}
                          className="inline-flex items-center gap-1 rounded border border-brand-line px-2.5 py-1 text-xs font-medium text-brand-muted hover:text-brand-ink"
                        >
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startEditSize(size)}
                        aria-label={`Edit ${size.name}`}
                        className="rounded p-1.5 text-brand-muted hover:bg-brand-soft hover:text-brand-green"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleSizeStatus(size)}
                      aria-label={`${size.status === "active" ? "Disable" : "Enable"} ${size.name}`}
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                        size.status === "active"
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-gray-200 bg-gray-100 text-gray-500"
                      }`}
                    >
                      {size.status === "active" ? "enabled" : "disabled"}
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSize(size, -1)}
                      disabled={i === 0}
                      aria-label={`Move ${size.name} up`}
                      className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                    >
                      <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSize(size, 1)}
                      disabled={i === sortedSizes.length - 1}
                      aria-label={`Move ${size.name} down`}
                      className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                    >
                      <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSize(size)}
                      aria-label={`Delete ${size.name}`}
                      className="rounded p-1.5 text-brand-muted hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {activeSize && (
        <div className="card mb-5 p-4 sm:p-5">
          <p className="label">Add a product to {activeSize.name}</p>
          <p className="mt-1 text-xs text-brand-muted">
            Pick any product from the main catalogue. The same catalogue
            product may appear in several KG sizes, but only once per size.
            Changes save immediately and appear on the Home page straight away.
          </p>
          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <div>
              <label htmlFor="kg-add-product" className="label">Catalogue product</label>
              <select
                id="kg-add-product"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="input mt-1"
              >
                <option value="">Select a product…</option>
                {available.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="kg-add-name" className="label">Display name (optional)</label>
              <input
                id="kg-add-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Defaults to product name"
                className="input mt-1"
              />
            </div>
            <div>
              <label htmlFor="kg-add-image" className="label">Image (optional)</label>
              <input
                id="kg-add-image"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Defaults to product image"
                list="kg-image-suggestions"
                className="input mt-1"
              />
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => newFileRef.current?.click()}
                  disabled={uploadingFor === "new"}
                  className="inline-flex items-center gap-1.5 rounded border border-brand-line px-2.5 py-1.5 text-xs font-medium text-brand-muted hover:text-brand-green"
                >
                  {uploadingFor === "new" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {uploadingFor === "new" ? "Uploading…" : "Upload image"}
                </button>
                <input
                  ref={newFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleNewImageFile}
                  aria-label={`Upload image for new ${activeSize.name} product`}
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={add}
                disabled={!selected || saving}
                className="btn-primary w-full lg:w-auto"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Plus className="h-4 w-4" aria-hidden="true" />
                )}
                Add Product
              </button>
            </div>
          </div>
          <datalist id="kg-image-suggestions">
            {imageSuggestions.map((src) => (
              <option key={src} value={src} />
            ))}
          </datalist>
          {error && (
            <p role="alert" className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          {uploadError && (
            <p role="alert" className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {uploadError}
            </p>
          )}
        </div>
      )}

      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
        </div>
      ) : !activeSize ? (
        <div className="card p-12 text-center text-sm text-brand-muted">
          No KG package sizes yet. Add one using the control above.
        </div>
      ) : sorted.length === 0 ? (
        <div className="card p-12 text-center text-sm text-brand-muted">
          No {activeSize.name} products yet. Add one using the control above.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-brand-line bg-brand-soft text-xs uppercase tracking-wide text-brand-muted">
                <th className="px-5 py-3.5 font-semibold">#</th>
                <th className="px-5 py-3.5 font-semibold">Product</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Order</th>
                <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((ref, i) => {
                const master = productById.get(ref.productId);
                const img = ref.customImage?.trim() || masterImage(master);
                const isEditing = editingId === ref.productId;
                return (
                  <tr key={ref.productId} className="border-b border-brand-line last:border-0 hover:bg-brand-soft/60">
                    <td className="px-5 py-3 align-top text-brand-muted">{i + 1}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-md bg-brand-soft">
                          <Image
                            src={img}
                            alt={displayNameOf(ref)}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-brand-ink">{displayNameOf(ref)}</p>
                          {ref.customName?.trim() && master && (
                            <p className="truncate text-xs text-brand-muted">
                              Catalogue: {master.name}
                            </p>
                          )}
                          {!ref.customName?.trim() && master?.status === "inactive" && (
                            <p className="text-xs text-amber-600">
                              Master product is inactive — hidden on Home.
                            </p>
                          )}
                        </div>
                      </div>
                      {isEditing && (
                        <div className="mt-3 grid max-w-md gap-2 rounded-md border border-brand-line bg-brand-soft/60 p-3">
                          <div>
                            <label htmlFor={`kg-name-${ref.productId}`} className="label">
                              Display name
                            </label>
                            <input
                              id={`kg-name-${ref.productId}`}
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              placeholder={master?.name ?? "Product name"}
                              className="input mt-1"
                            />
                          </div>
                          <div>
                            <label htmlFor={`kg-image-${ref.productId}`} className="label">
                              Image
                            </label>
                            <input
                              id={`kg-image-${ref.productId}`}
                              value={editImage}
                              onChange={(e) => setEditImage(e.target.value)}
                              placeholder={masterImage(master)}
                              list="kg-image-suggestions"
                              className="input mt-1"
                            />
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => editFileRef.current?.click()}
                                disabled={uploadingFor === ref.productId}
                                className="inline-flex items-center gap-1.5 rounded border border-brand-line px-2.5 py-1 text-xs font-medium text-brand-muted hover:text-brand-green"
                              >
                                {uploadingFor === ref.productId ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                                ) : (
                                  <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                                )}
                                {uploadingFor === ref.productId ? "Uploading…" : "Upload image"}
                              </button>
                              <input
                                ref={editFileRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleEditImageFile}
                                aria-label={`Upload image for ${displayNameOf(ref)}`}
                              />
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => setEditImage("")}
                                className="rounded border border-brand-line px-2.5 py-1 text-xs font-medium text-brand-muted hover:text-brand-green"
                              >
                                Reset to product image
                              </button>
                              <button
                                type="button"
                                onClick={() => saveEdit(ref)}
                                disabled={saving}
                                className="btn-primary !px-3 !py-1.5 text-xs"
                              >
                                {saving ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                                ) : null}
                                Save changes
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="inline-flex items-center gap-1 rounded border border-brand-line px-2.5 py-1 text-xs font-medium text-brand-muted hover:text-brand-ink"
                              >
                                <X className="h-3.5 w-3.5" aria-hidden="true" />
                                Cancel
                              </button>
                            </div>
                            {uploadError && editingId === ref.productId && (
                              <p role="alert" className="mt-2 text-xs text-red-600">
                                {uploadError}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3 align-top">
                      <button
                        type="button"
                        onClick={() => toggleStatus(ref)}
                        aria-label={`${ref.status === "active" ? "Disable" : "Enable"} ${displayNameOf(ref)}`}
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                          ref.status === "active"
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-gray-200 bg-gray-100 text-gray-500"
                        }`}
                      >
                        {ref.status === "active" ? "enabled" : "disabled"}
                      </button>
                    </td>
                    <td className="px-5 py-3 align-top">
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={1}
                          value={ref.displayOrder}
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            if (Number.isFinite(v) && v > 0) patchOrder(ref, v);
                          }}
                          aria-label={`Display order for ${displayNameOf(ref)}`}
                          className="input w-20 !py-1.5"
                        />
                        <button
                          type="button"
                          onClick={() => move(ref, -1)}
                          disabled={i === 0}
                          aria-label="Move up"
                          className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                        >
                          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(ref, 1)}
                          disabled={i === sorted.length - 1}
                          aria-label="Move down"
                          className="rounded border border-brand-line p-1.5 text-brand-muted hover:text-brand-green disabled:opacity-30"
                        >
                          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3 align-top">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => (isEditing ? setEditingId(null) : startEdit(ref))}
                          aria-label={`Edit ${displayNameOf(ref)}`}
                          className="rounded p-1.5 text-brand-muted hover:bg-brand-soft hover:text-brand-green"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(ref)}
                          aria-label={`Remove ${displayNameOf(ref)}`}
                          className="rounded p-1.5 text-brand-muted hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
