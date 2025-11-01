// pages/index.tsx
import Navbar from '../src/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* HERO */}
      <section
        style={{
          padding: '160px 20px',
          textAlign: 'center',
          background: 'radial-gradient(circle at center, #330000, #000)',
        }}
      >
        <h1
          style={{
            fontSize: '5rem',
            fontWeight: 'bold',
            margin: '0 0 1rem',
            letterSpacing: '2px',
          }}
        >
          INFURNO
        </h1>
        <p
          style={{
            fontSize: '1.6rem',
            maxWidth: '800px',
            margin: '0 auto 2.5rem',
            opacity: 0.9,
            lineHeight: '1.7',
          }}
        >
          Furniture forged in fire. Designed to dominate. Built to last.
        </p>
        <Link href="/products">
          <button
            style={{
              background: '#c00',
              color: '#fff',
              border: 'none',
              padding: '1rem 3rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: '0.3s',
              boxShadow: '0 4px 15px rgba(200, 0, 0, 0.3)',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#a00')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#c00')}
          >
            ENTER THE FLAMES
          </button>
        </Link>
      </section>

      {/* SUBTEXT */}
      <section
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: '#111',
          fontSize: '1.1rem',
        }}
      >
        <p style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
          We don’t follow trends. We <span style={{ color: '#c00' }}>ignite</span> them.
        </p>
      </section>
    </div>
  );
}