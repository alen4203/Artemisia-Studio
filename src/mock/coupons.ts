import { Coupon, CouponType } from '@/types/coupon';

export const coupons: Coupon[] = [
  {
    code: 'SAVE20',
    type: CouponType.PERCENTAGE,
    value: 20,
    maxDiscount: 100,
    description: '20% off your order (max discount $100)',
    isActive: true,
  },
  {
    code: 'WELCOME50',
    type: CouponType.FIXED_AMOUNT,
    value: 50,
    minPurchase: 200,
    description: '$50 off on orders over $200',
    isActive: true,
  },
  {
    code: 'FREESHIP',
    type: CouponType.FREE_SHIPPING,
    value: 0,
    description: 'Free shipping on your order',
    isActive: true,
  },
  {
    code: 'SUMMER10',
    type: CouponType.PERCENTAGE,
    value: 10,
    description: '10% off your entire order',
    isActive: true,
  },
  {
    code: 'FIRST100',
    type: CouponType.FIXED_AMOUNT,
    value: 100,
    minPurchase: 500,
    description: '$100 off on orders over $500',
    isActive: true,
  },
  {
    code: 'EXPIRED',
    type: CouponType.PERCENTAGE,
    value: 50,
    description: 'Expired coupon',
    expiryDate: new Date('2023-01-01'),
    isActive: true,
  },
];

export const findCouponByCode = (code: string): Coupon | undefined => {
  return coupons.find(
    (coupon) => coupon.code.toUpperCase() === code.toUpperCase()
  );
};
