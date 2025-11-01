// pages/cart.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../src/context/cart';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);

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
      
      alert('Checkout Success');
    //   clearCart();
    //   router.push('/thank-you');
    } catch {
      alert('Checkout failed');
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h1>Your cart is empty</h1>
        <Link href="/products">
          <button style={{ background: '#c00', color: '#fff', padding: '1rem 2rem', border: 'none', marginTop: '1rem' }}>
            SHOP NOW
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '120px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>YOUR CART</h1>
      {cart.map(item => (
        <div key={item.id} style={{ display: 'flex', gap: '1rem', margin: '1rem 0', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
          <img src={item.imageUrl} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 0.5rem' }}>{item.name}</h3>
            <p style={{ margin: 0, color: '#666' }}>${item.price.toFixed(2)} each</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '32px', height: '32px', border: '1px solid #ccc', background: '#fff' }}>−</button>
            <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '32px', height: '32px', border: '1px solid #ccc', background: '#fff' }}>+</button>
          </div>
          <button onClick={() => removeFromCart(item.id)} style={{ color: '#c00', background: 'none', border: 'none' }}>Remove</button>
          <strong style={{ minWidth: '80px', textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</strong>
        </div>
      ))}
      <div style={{ textAlign: 'right', marginTop: '2rem', fontSize: '1.25rem' }}>
        <strong>Total: ${total}</strong>
        <button onClick={handleCheckout} style={{ marginLeft: '1rem', background: '#c00', color: '#fff', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          CHECKOUT
        </button>
      </div>
      <Link href="/products">
        <button style={{ marginTop: '1rem', background: '#333', color: '#fff', padding: '0.5rem 1rem', border: 'none' }}>
          ← Continue Shopping
        </button>
      </Link>
    </div>
  );
}