// src/components/FullCartOverlay.tsx
'use client';

import { useCart } from '../context/cart';
import { useRouter } from 'next/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullCartOverlay({ isOpen, onClose }: Props) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2);

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          items: cart.map(i => ({ furnitureId: i.id, quantity: i.quantity })),
        }),
      });
      if (!res.ok) throw new Error();
      clearCart();
      onClose();
      router.push('/thank-you');
    } catch {
      alert('Checkout failed');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* FULL OVERLAY */}
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded">
              <img src={item.imageUrl} alt="" className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">${item.price} each</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 bg-gray-300 rounded">−</button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 bg-gray-300 rounded">+</button>
                  <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-600">Remove</button>
                </div>
              </div>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t p-4">
          <div className="flex justify-between text-lg font-bold mb-3">
            <span>Total:</span>
            <span className="text-red-600">${total}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-red-600 text-white py-3 rounded font-bold"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </>
  );
}