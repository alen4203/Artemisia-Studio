import Link from 'next/link';
import { FC, ReactComponentElement, useContext } from 'react';
import CartContext from '@/context/CartContext';

export default function Navbar(): ReactComponentElement<FC, null> {
  const { cartState } = useContext(CartContext);
  const itemCount = cartState.totalItems;

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col bg-white/95 backdrop-blur-sm shadow-md transition-all">
      {/* Title Bar */}
      <div className="w-full px-8 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="">
          <Link href="/" className="text-3xl font-extrabold tracking-tight text-gray-900 hover:text-gray-700 transition-colors">
            Artemisia&apos;s Studio
          </Link>
        </div>
        <div className="">
          <div className="flex items-center gap-8">
            {/* Cart Icon with Badge */}
            <Link
              href="/cart"
              className="relative group hover:text-blue-600 transition-colors"
            >
              <div className="flex items-center gap-1">
                <span className="text-2xl group-hover:scale-110 transition-transform">🛒</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
            </Link>

            <Link href={'/signIn'} className="text-sm font-semibold uppercase tracking-wide hover:text-blue-600 transition-colors">
              Sign In
            </Link>
            <Link href={'/signUp'} className="text-sm font-semibold uppercase tracking-wide px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all hover:shadow-lg">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full px-8 py-3 flex items-center gap-10 justify-center bg-white">
        <Link href="/" className="text-base font-medium text-gray-600 hover:text-black hover:underline underline-offset-4 transition-all uppercase tracking-wider">
          Home
        </Link>
        <Link
          href="/service"
          className="text-base font-medium text-gray-600 hover:text-black hover:underline underline-offset-4 transition-all uppercase tracking-wider"
        >
          Service
        </Link>
        <Link
          href="/products"
          className="text-base font-medium text-gray-600 hover:text-black hover:underline underline-offset-4 transition-all uppercase tracking-wider"
        >
          Products
        </Link>
      </div>
    </div>
  );
}
