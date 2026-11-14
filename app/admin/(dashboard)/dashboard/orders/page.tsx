import OrdersManager from "@/components/admin/OrdersManager";

export const dynamic = "force-dynamic";

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Orders Management</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Review customer orders, update delivery status, and track wholesale fulfillment.
      </p>
      <div className="mt-6">
        <OrdersManager />
      </div>
    </div>
  );
}
