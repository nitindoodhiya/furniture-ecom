// src/components/CartDrawer.tsx
'use client';

import { useCart } from '../context/cart';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const items = cart.map(i => ({ furnitureId: i.id, quantity: i.quantity }));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, items }),
      });

      if (!res.ok) throw new Error('Checkout failed');
      clearCart();
      onClose();
      router.push('/thank-you');
    } catch {
      alert('Checkout failed');
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/30 z-30"
        onClick={onClose}
      />

      {/* DRAWER — SLIDES FROM RIGHT */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md min-w-[320px] bg-white shadow-2xl z-30 flex flex-col"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b bg-white">
          <h2 className="text-lg font-bold text-gray-800">
            Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <button onClick={onClose} className="text-3xl text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-10 text-lg">Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full font-bold text-sm"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full font-bold text-sm"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-600 text-sm font-medium hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="border-t p-5 bg-white">
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Subtotal</span>
              <span className="text-red-600">${total}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-lg text-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}