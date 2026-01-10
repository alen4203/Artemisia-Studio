import { Coupon } from './coupon';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    category: string;
    featuredImage: string;
    quantity: number;
}

export type CartReducerState = {
    cart: CartItem[];
    totalItems: number;
    totalPrice: number;
    appliedCoupon: Coupon | null;
    discountAmount: number;
    shippingFee: number;
}

export enum CartReducerActionType {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    UPDATE_QUANTITY = 'UPDATE_QUANTITY',
    APPLY_COUPON = 'APPLY_COUPON',
    REMOVE_COUPON = 'REMOVE_COUPON',
    LOAD_CART = 'LOAD_CART',
}

export type CartReducerAction = {
    type: CartReducerActionType;
    payload?: any;
}