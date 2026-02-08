import { FC, useContext, useState } from 'react';
import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import CartList from '@/components/organism/CartList/CartList';
import CartSummary from '@/components/organism/CartSummary/CartSummary';
import Toast from '@/components/atom/Toast/Toast';
import { useToast } from '@/hooks/useToast';
import CartContext from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { calculateTotal } from '@/utils/priceCalculator';
import type { ProductInfo } from '@/model/productModel';

type CartPageProps = {
  featuredProducts: ProductInfo[];
};

const CartPage: FC<CartPageProps> = ({ featuredProducts }) => {
  const { cartState } = useContext(CartContext);
  const { convertPrice } = useCurrency();
  const { toasts, showToast, removeToast } = useToast();
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  const total = calculateTotal(
    cartState.totalPrice,
    cartState.discountAmount,
    cartState.shippingFee
  );

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 tablet:px-8 py-8">
          {/* Desktop Layout */}
          <div className="hidden desktop:grid desktop:grid-cols-3 desktop:gap-8">
            {/* Cart Items - 2/3 width */}
            <div className="desktop:col-span-2">
              <CartList
                featuredProducts={featuredProducts}
                onShowToast={showToast}
              />
            </div>

            {/* Cart Summary - 1/3 width */}
            <div className="desktop:col-span-1">
              <CartSummary />
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden tablet:block desktop:hidden">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <CartList
                  featuredProducts={featuredProducts}
                  onShowToast={showToast}
                />
              </div>
              <div className="col-span-1">
                <CartSummary />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="tablet:hidden pb-24">
            <CartList
              featuredProducts={featuredProducts}
              onShowToast={showToast}
            />

            {/* Sticky Bottom Summary on Mobile - Collapsible */}
            {cartState.cart.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
                {/* Collapsed View - Always visible */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {isSummaryExpanded ? '▼' : '▲'} Order Summary
                      </span>
                      {cartState.appliedCoupon && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                          Coupon Applied
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {convertPrice(total).formatted}
                    </div>
                  </div>
                </div>

                {/* Expanded View */}
                {isSummaryExpanded && (
                  <div className="max-h-[60vh] overflow-y-auto border-t border-gray-100">
                    <CartSummary />
                  </div>
                )}

                {/* Checkout Button - Always visible when collapsed */}
                {!isSummaryExpanded && (
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => window.location.href = '/checkout'}
                      className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 font-semibold text-lg transition-colors"
                    >
                      Checkout • {convertPrice(total).formatted}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Toast Notifications */}
        <div className="fixed top-20 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

import { products } from '@/mock/products';

export const getStaticProps: GetStaticProps<{
  featuredProducts: ProductInfo[];
}> = async () => {
  return {
    props: {
      featuredProducts: products,
    },
  };
};
