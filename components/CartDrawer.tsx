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
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#14100c] border-l border-white/10 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#f36c21]" />
              <h3 className="font-display font-bold text-lg text-white">Your Cart</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center text-stone-400 text-sm">
                Your cart is currently empty.
                <div className="text-xs text-[#ff9f43] mt-2">
                  Browse the merchandise catalog to add items!
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {item.title}
                    </h4>
                    <div className="text-xs text-[#f36c21] font-bold mt-0.5">
                      {currency}
                      {(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-md border border-white/5">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="p-1 text-stone-400 hover:text-white transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white min-w-[16px] text-center font-mono">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="p-1 text-stone-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/20">
              <div className="flex items-center justify-between text-base font-bold text-white mb-4">
                <span>Subtotal:</span>
                <span className="text-xl text-[#f36c21]">
                  {currency}
                  {subtotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#f36c21] to-[#d9531e] text-white font-bold text-sm hover:brightness-110 transition-all shadow-[0_4px_25px_rgba(243,108,33,0.4)]"
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
