'use client';

import React, { useState, useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductModalProps {
  isOpen: boolean;
  productToEdit: Product | null;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  productToEdit,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Apparel');
  const [price, setPrice] = useState('');
  const [badge, setBadge] = useState('');
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title || '');
      setCategory(productToEdit.category || 'Apparel');
      setPrice(productToEdit.price.toString() || '0');
      setBadge(productToEdit.badge || '');
      setImg(productToEdit.img || '');
      setDesc(productToEdit.desc || '');
    } else {
      setTitle('');
      setCategory('Apparel');
      setPrice('30.00');
      setBadge('');
      setImg('');
      setDesc('');
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onSave({
      id: productToEdit ? productToEdit.id : undefined,
      title,
      category,
      price: parseFloat(price) || 0,
      badge,
      img: img || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600',
      desc,
      inStock: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-[#16120e] border border-white/10 rounded-2xl p-6 shadow-2xl z-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#f36c21]" />
            <h3 className="font-display font-bold text-lg text-white">
              {productToEdit ? 'Edit Merchandise Item' : 'Add Item to Store'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Product Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Burnt Orange Hoodie"
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#14100c] border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
              >
                <option value="Apparel">Apparel</option>
                <option value="Vinyl & CD">Vinyl & CD</option>
                <option value="Digital / Beats">Digital / Beats</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="25.00"
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Badge (e.g. Bestseller, Limited)
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Limited Edition"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Product Photo URL
            </label>
            <input
              type="url"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="https://example.com/item.jpg"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={2}
              placeholder="Materials, sizing, shipping details..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21] resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs font-bold shadow-md"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
