// pages/admin/add-product.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    imageUrl: '',
    description: '',
    dimensions: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/furniture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
        }),
      });

      if (!res.ok) throw new Error('Failed to add product');

      alert('Product added. Burn it.');
      router.push('/products');
    } catch (err) {
      alert('Backend rejected. Check fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '120px 20px 40px', maxWidth: '800px', margin: '0 auto', color: '#fff', background: '#111' }}>
      <Link href="/products">
        <button style={{ background: 'none', border: 'none', color: '#e00', fontWeight: 'bold', marginBottom: '1rem' }}>
          ← Back to Products
        </button>
      </Link>

      <h1 style={{ fontSize: '2.5rem', margin: '0 0 2rem', color: '#e00' }}>ADD NEW PRODUCT</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Price ($)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
            placeholder="https://example.com/image.jpg"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Dimensions (e.g., 180x90x75 cm)</label>
          <input
            type="text"
            name="dimensions"
            value={form.dimensions}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#666' : '#e00',
            color: '#fff',
            padding: '1rem',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '1rem',
          }}
        >
          {loading ? 'ADDING...' : 'ADD PRODUCT'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #444',
  background: '#1a1a1a',
  color: '#fff',
  fontSize: '1rem',
};