// src/components/BottomCartBar.tsx
'use client';

import { useCart } from '../context/cart';
import { useState } from 'react';
import FullCartOverlay from './FullCartOverlay';

export default function BottomCartBar() {
  const { cart } = useCart();
  const [isFullOpen, setIsFullOpen] = useState(false);

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2);

  if (totalItems === 0) return null;

  return (
    <>
      {/* MINI BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFullOpen(true)}
              className="text-2xl text-gray-700"
            >
              ↑
            </button>
            <span className="font-bold">Cart ({totalItems})</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-red-600">${total}</span>
            <button
              onClick={() => setIsFullOpen(true)}
              className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700"
            >
              ORDER
            </button>
          </div>
        </div>
      </div>

      {/* FULL OVERLAY */}
      <FullCartOverlay isOpen={isFullOpen} onClose={() => setIsFullOpen(false)} />
    </>
  );
}