// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CartItem, useCart } from '../context/cart';

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/orders', label: 'Orders' },
    { href: '/admin/add-product', label: 'Add Product' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(to bottom, #000, #111)',
      color: '#fff',
      zIndex: 50,
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      borderBottom: '1px solid #333',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
      }}>
        {/* LOGO */}
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#e00',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span>INFURNO</span>
          <span style={{
            width: '8px',
            height: '8px',
            background: '#e00',
            borderRadius: '50%',
            animation: 'pulse 1.5s infinite',
          }}></span>
        </Link>

        {/* DESKTOP LINKS + CART ON RIGHT */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          fontWeight: '600',
          fontSize: '0.9rem',
          alignItems: 'center',
        }} className="hidden md:flex">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                style={{
                  color: isActive ? '#e00' : '#ccc',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '0.5rem 0',
                }}
              >
                {label}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#e00',
                  }}></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* MOBILE CART ON RIGHT */}
        <Link
          href="/cart"
          style={{
            display: 'flex',
            position: 'relative',
            padding: '0.5rem',
            borderRadius: '8px',
            background: totalItems > 0 ? '#e00' : 'transparent',
            color: totalItems > 0 ? '#fff' : '#e00',
          }}
          className="md:hidden"
        >
          <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1 5m1-5h10m-10 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: '#fff',
              color: '#e00',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </nav>
  );
}