// pages/orders.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  id: number;
  userId: number;
  total: number;
  createdAt: string;
  orderItems: OrderItem[];
}

interface OrderItem {
  id: number;
  orderId: number;
  furnitureId: number;
  quantity: number;
  furniture: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
        if (!res.ok) throw new Error('Failed to load orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center', color: '#fff', background: '#111' }}>
        <div style={{
          border: '4px solid #333',
          borderTop: '4px solid #e00',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
        <p style={{ marginTop: '1rem' }}>Loading all orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center', color: '#fff', background: '#111' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No Orders Yet</h1>
        <p>The fire hasn’t started.</p>
        <Link href="/products">
          <button style={{ background: '#e00', color: '#fff', padding: '1rem 2rem', border: 'none', marginTop: '1rem' }}>
            START BURNING
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '120px 20px 40px', maxWidth: '1200px', margin: '0 auto', color: '#fff', background: '#111' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#e00' }}>ALL ORDERS</h1>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {orders.map(order => (
          <div
            key={order.id}
            style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #333',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Order #{order.id}</h2>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.2rem', color: '#e00', fontWeight: 'bold' }}>
                  ${order.total.toFixed(2)}
                </span>
                <p style={{ margin: '0.25rem 0 0', color: '#aaa', fontSize: '0.9rem' }}>
                  User ID: {order.userId}
                </p>
              </div>
            </div>

            <p style={{ margin: '0 0 1rem', color: '#aaa' }}>
              Placed: {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              {order.orderItems.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img
                    src={item.furniture.imageUrl}
                    alt={item.furniture.name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.25rem', color: '#fff' }}>{item.furniture.name}</h4>
                    <p style={{ margin: '0 0 0.25rem', color: '#aaa' }}>
                      Qty: {item.quantity} × ${item.furniture.price.toFixed(2)}
                    </p>
                    <p style={{ margin: 0, color: '#e00', fontWeight: 'bold' }}>
                      ${(item.furniture.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link href="/products">
          <button style={{ background: '#e00', color: '#fff', padding: '1rem 2rem', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
            BACK TO SHOP
          </button>
        </Link>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}