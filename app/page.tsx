'import client directive if needed'
import React, { useState } from 'react';

export default function ProductsBrowser({ initialProducts, categories }: { initialProducts: any[], categories: string[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = initialProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 rounded-2xl p-6 md:p-10 text-white mb-8 shadow-md">
        <h1 className="text-2xl md:text-4xl font-bold mb-3">What are you looking for today?</h1>
        <p className="text-amber-100 text-sm md:text-base mb-6">Browse pure wholesale grains, pulses, spices, and oils. Call or order direct.</p>
        
        <div className="relative max-w-2xl">
          <input 
            type="text" 
            placeholder="Search products e.g., Coriander Powder, Toor Dal, Groundnut Oil..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3.5 px-4 pl-12 rounded-xl text-gray-800 text-sm focus:outline-none shadow-inner"
          />
          <span className="absolute left-4 top-4 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition ${
            selectedCategory === 'All' ? 'bg-amber-800 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === cat ? 'bg-amber-800 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid Output */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
            {/* Render Product Tile Contents */}
          </div>
        ))}
      </div>
    </div>
  );
}