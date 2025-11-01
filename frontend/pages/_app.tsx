// pages/_app.tsx
import type { AppProps } from 'next/app';
import { CartProvider } from '../src/context/cart';
import Navbar from '../src/components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Navbar/>
      <Component {...pageProps} />
    </CartProvider>
  );
}