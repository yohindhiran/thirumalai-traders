import Link from "next/link";
import { readDb } from "@/lib/db";

export default function Home() {
  const db = readDb();
  const products = db.products || [];
  const categories = db.categories || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white py-12 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Thirumalaai Traders</h1>
          <p className="text-amber-100 text-base md:text-lg max-w-2xl mx-auto mb-6">
            Pure wholesale grains, pulses, spices, and oils. Direct order via phone or WhatsApp.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="tel:9384482007"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition shadow"
            >
              📞 Call Now
            </a>
            <a
              href="https://wa.me/919384482007?text=Hello%20Thirumalaai%20Traders,%20I%20would%20like%20to%20enquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition shadow"
            >
              💬 WhatsApp Enquire
            </a>
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Our Product Catalog</h2>
          <Link
            href="/admin"
            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg font-medium transition"
          >
            Admin Panel ⚙️
          </Link>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          <div className="px-4 py-2 bg-amber-800 text-white rounded-xl text-xs font-medium whitespace-nowrap shadow">
            All Categories
          </div>
          {categories.map((cat: any) => (
            <div
              key={cat.id}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium whitespace-nowrap shadow-sm hover:border-amber-700 transition"
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="h-44 w-full bg-gray-100 rounded-xl mb-3 overflow-hidden">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-medium">
                  {product.categoryName || "Wholesale"}
                </span>
                <h3 className="font-semibold text-gray-800 mt-2 text-base line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-amber-800 font-bold mt-1 text-sm">
                  ₹{product.price ?? "Contact for Price"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <a
                  href="tel:9384482007"
                  className="text-center bg-emerald-700 text-white text-xs py-2 rounded-lg font-medium hover:bg-emerald-800 transition"
                >
                  📞 Call
                </a>
                <a
                  href={`https://wa.me/919384482007?text=Hello,%20I%20want%20to%20enquire%20about%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-green-600 text-white text-xs py-2 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}