import { CartItem } from '@/types/cart';
import { Coupon, CouponType, CouponValidationResult } from '@/types/coupon';

const SHIPPING_FEE = 30;
const FREE_SHIPPING_THRESHOLD = 500;

export const calculateSubtotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const calculateShippingFee = (
  subtotal: number,
  hasFreeShippingCoupon: boolean
): number => {
  if (hasFreeShippingCoupon) return 0;
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FEE;
};

export const validateCoupon = (
  coupon: Coupon,
  subtotal: number
): CouponValidationResult => {
  // Check if coupon is active
  if (!coupon.isActive) {
    return {
      isValid: false,
      message: 'This coupon is not active',
    };
  }

  // Check if coupon is expired
  if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
    return {
      isValid: false,
      message: 'This coupon has expired',
    };
  }

  // Check minimum purchase requirement
  if (coupon.minPurchase && subtotal < coupon.minPurchase) {
    return {
      isValid: false,
      message: `Minimum purchase of $${coupon.minPurchase} required`,
    };
  }

  return {
    isValid: true,
    message: 'Coupon applied successfully!',
  };
};

export const calculateDiscount = (
  coupon: Coupon | null,
  subtotal: number
): number => {
  if (!coupon) return 0;

  switch (coupon.type) {
    case CouponType.PERCENTAGE:
      const percentageDiscount = (subtotal * coupon.value) / 100;
      // Apply max discount cap if specified
      if (coupon.maxDiscount) {
        return Math.min(percentageDiscount, coupon.maxDiscount);
      }
      return percentageDiscount;

    case CouponType.FIXED_AMOUNT:
      // Don't let discount exceed subtotal
      return Math.min(coupon.value, subtotal);

    case CouponType.FREE_SHIPPING:
      // Free shipping doesn't affect product discount
      return 0;

    default:
      return 0;
  }
};

export const calculateTotal = (
  subtotal: number,
  discount: number,
  shippingFee: number
): number => {
  return Math.max(0, subtotal - discount + shippingFee);
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};
