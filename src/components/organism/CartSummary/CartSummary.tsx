import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import CartContext from '@/context/CartContext';
import CouponInput from '@/components/molecule/CouponInput/CouponInput';
import { formatPrice, calculateTotal } from '@/utils/priceCalculator';
import { useCurrency } from '@/context/CurrencyContext';
import { CouponType } from '@/types/coupon';

const CartSummary: FC = () => {
  const { cartState, applyCoupon, removeCoupon } = useContext(CartContext);
  const { convertPrice } = useCurrency();
  const router = useRouter();

  const subtotal = cartState.totalPrice;
  const discount = cartState.discountAmount;
  const shipping = cartState.shippingFee;
  const total = calculateTotal(subtotal, discount, shipping);

  const handleCheckout = () => {
    // Navigate to checkout page (to be implemented)
    router.push('/checkout');
  };

  const hasFreeShipping =
    cartState.appliedCoupon?.type === CouponType.FREE_SHIPPING ||
    subtotal >= 500;

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>

      {/* Coupon Input */}
      <CouponInput
        appliedCoupon={cartState.appliedCoupon}
        onApply={applyCoupon}
        onRemove={removeCoupon}
      />

      {/* Price Breakdown */}
      <div className="space-y-3 mb-4 pb-4 border-b border-gray-300">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>{convertPrice(subtotal).formatted}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>-{convertPrice(discount).formatted}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span>
            {hasFreeShipping ? (
              <span className="text-green-600 font-medium">FREE</span>
            ) : (
              convertPrice(shipping).formatted
            )}
          </span>
        </div>

        {subtotal < 500 && !hasFreeShipping && (
          <p className="text-xs text-gray-500">
            Add {convertPrice(500 - subtotal).formatted} more for free shipping
          </p>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between text-xl font-bold mb-6 text-gray-800">
        <span>Total</span>
        <span>{convertPrice(total).formatted}</span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={cartState.cart.length === 0}
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Proceed to Checkout
      </button>

      {/* Security Badge */}
      <div className="mt-4 text-center text-xs text-gray-500">
        <p>🔒 Secure Checkout</p>
      </div>
    </div>
  );
};

export default CartSummary;
