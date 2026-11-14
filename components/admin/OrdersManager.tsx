"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  Clock,
  Eye,
  Loader2,
  Package,
  Phone,
  Search,
  Truck,
  X,
  XCircle,
} from "lucide-react";
import type { Order, OrderStatus } from "@/types";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bg: string; icon: React.ComponentType<{ className?: string }> }
> = {
  pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-50 border-amber-200", icon: Clock },
  confirmed: { label: "Confirmed", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: CheckCircle },
  processing: { label: "Processing", color: "text-purple-700", bg: "bg-purple-50 border-purple-200", icon: Package },
  dispatched: { label: "Dispatched", color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200", icon: Truck },
  delivered: { label: "Delivered", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: XCircle },
};

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadOrders() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
    setUpdatingId(null);
  }

  const filteredOrders = useMemo(() => {
    let list = orders;
    if (statusFilter !== "all") {
      list = list.filter((o) => o.status === statusFilter);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          (o.businessName && o.businessName.toLowerCase().includes(q)) ||
          o.phone.includes(q) ||
          o.city.toLowerCase().includes(q)
      );
    }
    return list;
  }, [orders, search, statusFilter]);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const dispatched = orders.filter((o) => o.status === "dispatched" || o.status === "delivered").length;
    const revenue = orders.reduce((sum, o) => (o.status !== "cancelled" ? sum + o.total : sum), 0);
    return { total, pending, dispatched, revenue };
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card p-4 shadow-sm border border-brand-line">
          <p className="text-xs font-semibold text-brand-muted uppercase">Total Orders</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-ink">{stats.total}</p>
        </div>
        <div className="card p-4 shadow-sm border border-amber-200 bg-amber-50/30">
          <p className="text-xs font-semibold text-amber-800 uppercase">Pending Dispatch</p>
          <p className="mt-1 text-2xl font-extrabold text-amber-900">{stats.pending}</p>
        </div>
        <div className="card p-4 shadow-sm border border-emerald-200 bg-emerald-50/30">
          <p className="text-xs font-semibold text-emerald-800 uppercase">Fulfilled</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-900">{stats.dispatched}</p>
        </div>
        <div className="card p-4 shadow-sm border border-brand-line">
          <p className="text-xs font-semibold text-brand-muted uppercase">Total Order Value</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-green">₹{stats.revenue.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Controls: Search & Status Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
          <input
            type="text"
            placeholder="Search by Order #, Customer, Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input !pl-10 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              statusFilter === "all"
                ? "bg-brand-ink text-white"
                : "bg-white text-brand-muted border border-brand-line hover:text-brand-ink"
            }`}
          >
            All ({orders.length})
          </button>
          {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map((st) => {
            const count = orders.filter((o) => o.status === st).length;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  statusFilter === st
                    ? "bg-brand-green text-white"
                    : "bg-white text-brand-muted border border-brand-line hover:text-brand-ink"
                }`}
              >
                {STATUS_CONFIG[st].label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="card flex items-center justify-center gap-2 p-16 text-sm text-brand-muted">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading wholesale orders…
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="card p-12 text-center text-sm text-brand-muted">
          No orders found matching your filters.
        </div>
      ) : (
        <div className="card overflow-x-auto shadow-card">
          <table className="w-full min-w-[850px] text-left text-xs">
            <thead>
              <tr className="border-b border-brand-line bg-brand-soft uppercase text-brand-muted font-semibold tracking-wider">
                <th className="px-5 py-3.5">Order # / Date</th>
                <th className="px-5 py-3.5">Customer & Shop</th>
                <th className="px-5 py-3.5">Items Summary</th>
                <th className="px-5 py-3.5">Total & Payment</th>
                <th className="px-5 py-3.5">Order Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-line">
              {filteredOrders.map((o) => {
                const cfg = STATUS_CONFIG[o.status] || STATUS_CONFIG.pending;
                return (
                  <tr key={o.id} className="hover:bg-brand-soft/50 transition">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-brand-ink text-sm">#{o.orderNumber}</div>
                      <div className="text-[11px] text-brand-muted mt-0.5">
                        {new Date(o.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="font-bold text-brand-ink">{o.customerName}</div>
                      {o.businessName && (
                        <div className="text-[11px] text-emerald-800 font-medium">{o.businessName}</div>
                      )}
                      <div className="text-brand-muted mt-0.5 flex items-center gap-1 text-[11px]">
                        <Phone className="h-3 w-3" />
                        {o.phone}
                      </div>
                    </td>

                    <td className="px-5 py-3.5 max-w-xs">
                      <div className="font-medium text-brand-ink truncate">
                        {o.items.map((it) => `${it.productName} (${it.size}) × ${it.quantity}`).join(", ")}
                      </div>
                      <div className="text-[11px] text-brand-muted mt-0.5">
                        {o.items.length} item{o.items.length === 1 ? "" : "s"} · {o.city}
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="font-bold text-sm text-brand-green">₹{o.total}</div>
                      <span className="inline-block rounded bg-gray-100 text-[10px] font-semibold text-gray-700 px-1.5 py-0.5 mt-0.5 uppercase">
                        {o.paymentMethod}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <select
                        value={o.status}
                        disabled={updatingId === o.id}
                        onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-green ${cfg.bg} ${cfg.color}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(o)}
                        className="btn-outline !py-1.5 !px-3 text-xs inline-flex items-center gap-1 font-semibold"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between border-b border-brand-line pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-800">Order Details</span>
                <h2 className="text-xl font-bold text-brand-ink">#{selectedOrder.orderNumber}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-full p-2 text-brand-muted hover:bg-brand-soft hover:text-brand-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-brand-line p-3 bg-brand-soft/50 space-y-1">
                <p className="font-bold text-brand-ink">Customer Information</p>
                <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                {selectedOrder.businessName && <p><strong>Shop/Canteen:</strong> {selectedOrder.businessName}</p>}
                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                {selectedOrder.whatsapp && <p><strong>WhatsApp:</strong> {selectedOrder.whatsapp}</p>}
                {selectedOrder.email && <p><strong>Email:</strong> {selectedOrder.email}</p>}
              </div>

              <div className="rounded-xl border border-brand-line p-3 bg-brand-soft/50 space-y-1">
                <p className="font-bold text-brand-ink">Delivery & Status</p>
                <p><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city} - {selectedOrder.pincode}</p>
                <p><strong>Payment:</strong> {selectedOrder.paymentMethod.toUpperCase()}</p>
                <p><strong>Status:</strong> <span className="font-bold uppercase text-emerald-800">{selectedOrder.status}</span></p>
                {selectedOrder.notes && <p><strong>Notes:</strong> {selectedOrder.notes}</p>}
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="font-bold text-xs uppercase text-brand-muted mb-2">Order Items</h3>
              <div className="divide-y divide-brand-line rounded-xl border border-brand-line overflow-hidden">
                {selectedOrder.items.map((it) => (
                  <div key={it.id} className="p-3 flex items-center justify-between text-xs bg-white">
                    <div>
                      <p className="font-bold text-brand-ink">{it.productName}</p>
                      <p className="text-brand-muted text-[11px]">Package: {it.size} · Unit Price: ₹{it.unitPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-brand-muted">Qty: {it.quantity}</p>
                      <p className="font-bold text-brand-green">₹{it.totalPrice}</p>
                    </div>
                  </div>
                ))}
                <div className="p-3 bg-brand-soft flex justify-between font-bold text-sm">
                  <span>Grand Total</span>
                  <span className="text-brand-green">₹{selectedOrder.total}</span>
                </div>
              </div>
            </div>

            {/* Status changer buttons */}
            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-brand-line pt-4">
              <span className="text-xs text-brand-muted mr-auto">Change Status:</span>
              {(["pending", "confirmed", "processing", "dispatched", "delivered", "cancelled"] as OrderStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleStatusChange(selectedOrder.id, st)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition ${
                    selectedOrder.status === st
                      ? "bg-brand-green text-white"
                      : "border border-brand-line bg-white text-brand-ink hover:bg-brand-soft"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
