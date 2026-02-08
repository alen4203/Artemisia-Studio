import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </CurrencyProvider>
  );
}
