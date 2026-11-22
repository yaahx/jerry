'use client';

import React, { useState } from 'react';
import { ShoppingBag, Plus, Edit2, Trash2 } from 'lucide-react';
import { Product } from '@/lib/types';

interface StoreSectionProps {
  products: Product[];
  currency: string;
  isAdmin: boolean;
  onAddToCart: (product: Product) => void;
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  products,
  currency,
  isAdmin,
  onAddToCart,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = ['all', 'Apparel', 'Vinyl & CD', 'Digital / Beats'];

  const filteredProducts =
    selectedCat === 'all'
      ? products
      : products.filter((p) => p.category.toLowerCase().includes(selectedCat.toLowerCase()));

  return (
    <section id="store" className="py-16 border-b border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Merchandise & Store
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Physical vinyl pressings, exclusive limited apparel, and digital production toolkits.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Category Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCat === c
                    ? 'bg-[#f36c21] text-white shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {c === 'all' ? 'All' : c}
              </button>
            ))}
          </div>

          {/* Admin Add Product */}
          {isAdmin && (
            <button
              onClick={onAddProduct}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f36c21]/20 border border-[#f36c21] text-[#ff9f43] hover:bg-[#f36c21] hover:text-white text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="group glass-panel rounded-xl p-4 flex flex-col relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60"
          >
            {/* Admin Overlay Actions */}
            {isAdmin && (
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                <button
                  onClick={() => onEditProduct(prod)}
                  className="p-1.5 rounded-md bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs shadow-md transition-all"
                  title="Edit Item"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteProduct(prod.id)}
                  className="p-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-xs shadow-md transition-all"
                  title="Delete Item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Product Image */}
            <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-4 bg-stone-900">
              <img
                src={prod.img || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600'}
                alt={prod.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {prod.badge && (
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-[#f36c21]/40 text-[#ff9f43] text-[10px] font-bold uppercase tracking-wider">
                  {prod.badge}
                </span>
              )}
            </div>

            {/* Meta */}
            <div className="flex-1 flex flex-col">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                {prod.category}
              </span>

              <h4 className="font-display font-bold text-base text-white truncate mb-1">
                {prod.title}
              </h4>

              <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-4">
                {prod.desc}
              </p>

              {/* Price & Add to Cart */}
              <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="font-display font-extrabold text-lg text-[#f36c21]">
                  {currency}
                  {Number(prod.price).toFixed(2)}
                </span>
                <button
                  onClick={() => onAddToCart(prod)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-[#f36c21] border border-white/10 hover:border-[#f36c21] text-xs font-semibold text-white transition-all shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
