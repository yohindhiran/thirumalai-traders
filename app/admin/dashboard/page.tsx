"use client"

"use client"

import { useEffect, useState } from "react";
import { readDb } from "@/lib/db";
import { Product } from "@/types";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const db = readDb();
      const totalProducts = db.products.length;
      const activeProducts = db.products.filter((p) => p.status === "active").length;
      const inactiveProducts = db.products.length - activeProducts;
      const outOfStock = db.products.filter((p) => p.status === "inactive").length;
      const totalCategories = db.categories.length;
      const activeAds = db.heroSlides.filter((s) => s.status === "active").length;
      const inactiveAds = db.heroSlides.length - activeAds;

      setData({
        totalProducts,
        activeProducts,
        inactiveProducts,
        outOfStock: outOfStock,
        totalCategories,
        activeAds,
        inactiveAds,
      });
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Total Products</h2>
          <p className="text-4xl font-bold">{data.totalProducts}</p>
        </div>

        {/* Active Products */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Active Products</h2>
          <p className="text-4xl font-bold">{data.activeProducts}</p>
        </div>

        {/* Inactive Products */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Inactive Products</h2>
          <p className="text-4xl font-bold">{data.inactiveProducts}</p>
        </div>

        {/* Out of Stock */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Out of Stock</h2>
          <p className="text-4xl font-bold">{data.outOfStock}</p>
        </div>

        {/* Total Categories */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Total Categories</h2>
          <p className="text-4xl font-bold">{data.totalCategories}</p>
        </div>

        {/* Active Advertisements */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Active Advertisements</h2>
          <p className="text-4xl font-bold">{data.activeAds}</p>
        </div>

        {/* Inactive Advertisements */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Inactive Advertisements</h2>
          <p className="text-4xl font-bold">{data.inactiveAds}</p>
        </div>

        {/* Total Enquiries (placeholder, assuming enquiries collection exists) */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Total Enquiries</h2>
          <p className="text-4xl font-bold">{data.enquiries?.length ?? 0}</p>
        </div>
      </div>
    </div>
  );
}