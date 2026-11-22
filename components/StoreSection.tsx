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
    <section id="store" className="py-20 border-b border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            Merchandise & Store
          </h2>
          <p className="text-stone-300 text-base sm:text-lg mt-2 font-normal">
            Physical vinyl pressings, exclusive limited apparel, and digital production toolkits.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Category Filters - Sharp */}
          <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#f36c21]/20 border border-[#f36c21] text-[#ff9f43] hover:bg-[#f36c21] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          )}
        </div>
      </div>

      {/* Products Grid - Sharp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="group glass-panel p-5 flex flex-col relative transition-all duration-300 hover:-translate-y-1 hover:border-[#f36c21]/50 hover:shadow-2xl hover:shadow-black/70"
          >
            {/* Admin Overlay Actions */}
            {isAdmin && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => onEditProduct(prod)}
                  className="p-2 bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs shadow-md transition-all"
                  title="Edit Item"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteProduct(prod.id)}
                  className="p-2 bg-red-600 hover:bg-red-500 text-white text-xs shadow-md transition-all"
                  title="Delete Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Product Image - Sharp */}
            <div className="relative aspect-square w-full overflow-hidden mb-5 bg-stone-900 border border-white/5">
              <img
                src={prod.img || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600'}
                alt={prod.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {prod.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-black/85 backdrop-blur-md border border-[#f36c21]/50 text-[#ff9f43] text-xs font-black uppercase tracking-widest">
                  {prod.badge}
                </span>
              )}
            </div>

            {/* Meta */}
            <div className="flex-1 flex flex-col">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                {prod.category}
              </span>

              <h4 className="font-display font-black text-xl text-white truncate mb-2">
                {prod.title}
              </h4>

              <p className="text-sm text-stone-300 line-clamp-2 leading-relaxed mb-5 font-normal">
                {prod.desc}
              </p>

              {/* Price & Add to Cart - Sharp button */}
              <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-display font-black text-2xl text-[#f36c21]">
                  {currency}
                  {Number(prod.price).toFixed(2)}
                </span>
                <button
                  onClick={() => onAddToCart(prod)}
                  className="flex items-center gap-2 px-5 py-3 bg-[#f36c21] hover:bg-[#ff7b34] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
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
