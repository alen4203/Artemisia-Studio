export enum CouponType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
  FREE_SHIPPING = 'FREE_SHIPPING',
}

export type Coupon = {
  code: string;
  type: CouponType;
  value: number; // percentage (20) or fixed amount (50)
  minPurchase?: number; // minimum cart value to apply
  maxDiscount?: number; // max discount for percentage type
  expiryDate?: Date;
  description: string;
  usageLimit?: number; // how many times can be used (for advanced feature)
  isActive: boolean;
};

export type CouponValidationResult = {
  isValid: boolean;
  message: string;
  discountAmount?: number;
};
