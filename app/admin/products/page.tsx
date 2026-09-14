import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readDb } from "@/lib/db";
import type { Product } from "@/types";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const load = async () => {
    const db = readDb();
    let filtered = db.products;

    if (search) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (categoryFilter) {
      filtered = filtered.filter((p) => p.categoryId === categoryFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    setProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / 10));
    setPage(1);
    setLoading(false);
  }, [search, categoryFilter, statusFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const goToProduct = (id: string) => {
    router.push(`/admin/products/${id}/edit`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Product Management</h1>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row mb-6">
        <div className="mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleSearchChange(e)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4 sm:mb-0">
          <select
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e)}
            className="w-full p-2 border rounded"
          >
            <option value="">All Categories</option>
            {data?.categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            )}
          </select>
        </div>

        <div className="mb-4 sm:mb-0">
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div>
          Page {page} of {totalPages}
        </div>
      </div>

      {/* Product Table */}
      {loading ? (
        <div className="p-6">Loading products...</div>
      ) : (
        <table className="w-full table-auto shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-10 w-auto object-cover"
                      />
                    )}
                  </td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.categoryName || "Uncategorized"}</td>
                  <td className="p-2">{product.price ?? "-"}</td>
                  <td className="p-2">{product.stock ?? "-"}</td>
                  <td className="p-2">{product.status}</td>
                  <td className="p-2 space-x-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}