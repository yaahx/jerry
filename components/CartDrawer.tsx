'use client';

import React from 'react';
import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '@/lib/types';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  currency: string;
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart,
  currency,
  onClose,
  onUpdateQty,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer - Sharp */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#14100c] border-l border-white/10 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#f36c21]" />
              <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                Your Cart
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-24 text-center text-stone-400 text-base font-medium">
                Your cart is currently empty.
                <div className="text-sm text-[#ff9f43] mt-2 font-bold uppercase tracking-wider">
                  Browse the merchandise catalog to add items!
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-16 h-16 object-cover border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-white truncate">
                      {item.title}
                    </h4>
                    <div className="text-sm text-[#f36c21] font-extrabold mt-1">
                      {currency}
                      {(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity controls - Sharp */}
                  <div className="flex items-center gap-2 bg-black/50 px-2.5 py-1.5 border border-white/10">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="p-1 text-stone-400 hover:text-white transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold text-white min-w-[18px] text-center font-mono">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="p-1 text-stone-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer - Sharp */}
          {cart.length > 0 && (
            <div className="p-7 border-t border-white/10 bg-black/40">
              <div className="flex items-center justify-between text-lg font-black text-white mb-5 uppercase tracking-wide">
                <span>Subtotal:</span>
                <span className="text-2xl text-[#f36c21]">
                  {currency}
                  {subtotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#f36c21] hover:bg-[#ff7b34] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(243,108,33,0.45)]"
              >
                <span>Submit Order Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
