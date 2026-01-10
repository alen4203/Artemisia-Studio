import React, { FC, createContext, useReducer, useEffect } from 'react';
import {
  CartItem,
  CartReducerActionType,
  CartReducerState,
  CartReducerAction,
} from '@/types/cart';
import { Coupon, CouponType } from '@/types/coupon';
import { findCouponByCode } from '@/mock/coupons';
import {
  calculateSubtotal,
  calculateDiscount,
  calculateShippingFee,
  validateCoupon,
} from '@/utils/priceCalculator';

const CART_STORAGE_KEY = 'candle-store-cart';

const CartContext = createContext<{
  cartState: CartReducerState;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  updateQuantity: (item: CartItem) => void;
  getItemInfoFromCart: (itemId: string) => CartItem | undefined;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}>({} as any);

export const CartProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: CartReducerState = {
    cart: [],
    totalItems: 0,
    totalPrice: 0,
    appliedCoupon: null,
    discountAmount: 0,
    shippingFee: 30,
  };

  const cartReducer = (
    state: CartReducerState,
    action: CartReducerAction
  ): CartReducerState => {
    let newState: CartReducerState;

    switch (action.type) {
      case CartReducerActionType.ADD_TO_CART:
        const existingItem = state.cart.find(
          (item) => item.id === action.payload.id
        );
        let newCart: CartItem[];

        if (existingItem) {
          newCart = state.cart.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + action.payload.quantity,
                }
              : item
          );
        } else {
          newCart = [...state.cart, action.payload];
        }

        const addSubtotal = calculateSubtotal(newCart);
        const addDiscount = calculateDiscount(state.appliedCoupon, addSubtotal);
        const addShipping = calculateShippingFee(
          addSubtotal,
          state.appliedCoupon?.type === CouponType.FREE_SHIPPING
        );

        newState = {
          ...state,
          cart: newCart,
          totalItems: newCart.reduce((acc, item) => acc + item.quantity, 0),
          totalPrice: addSubtotal,
          discountAmount: addDiscount,
          shippingFee: addShipping,
        };
        break;

      case CartReducerActionType.REMOVE_FROM_CART:
        const filteredCart = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        const removeSubtotal = calculateSubtotal(filteredCart);
        const removeDiscount = calculateDiscount(
          state.appliedCoupon,
          removeSubtotal
        );
        const removeShipping = calculateShippingFee(
          removeSubtotal,
          state.appliedCoupon?.type === CouponType.FREE_SHIPPING
        );

        newState = {
          ...state,
          cart: filteredCart,
          totalItems: filteredCart.reduce((acc, item) => acc + item.quantity, 0),
          totalPrice: removeSubtotal,
          discountAmount: removeDiscount,
          shippingFee: removeShipping,
        };
        break;

      case CartReducerActionType.UPDATE_QUANTITY:
        const updatedCart = state.cart.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        const updateSubtotal = calculateSubtotal(updatedCart);
        const updateDiscount = calculateDiscount(
          state.appliedCoupon,
          updateSubtotal
        );
        const updateShipping = calculateShippingFee(
          updateSubtotal,
          state.appliedCoupon?.type === CouponType.FREE_SHIPPING
        );

        newState = {
          ...state,
          cart: updatedCart,
          totalItems: updatedCart.reduce((acc, item) => acc + item.quantity, 0),
          totalPrice: updateSubtotal,
          discountAmount: updateDiscount,
          shippingFee: updateShipping,
        };
        break;

      case CartReducerActionType.APPLY_COUPON:
        const coupon = action.payload as Coupon;
        const couponSubtotal = calculateSubtotal(state.cart);
        const couponDiscount = calculateDiscount(coupon, couponSubtotal);
        const couponShipping = calculateShippingFee(
          couponSubtotal,
          coupon.type === CouponType.FREE_SHIPPING
        );

        newState = {
          ...state,
          appliedCoupon: coupon,
          discountAmount: couponDiscount,
          shippingFee: couponShipping,
        };
        break;

      case CartReducerActionType.REMOVE_COUPON:
        const noCouponSubtotal = calculateSubtotal(state.cart);
        const noCouponShipping = calculateShippingFee(noCouponSubtotal, false);

        newState = {
          ...state,
          appliedCoupon: null,
          discountAmount: 0,
          shippingFee: noCouponShipping,
        };
        break;

      case CartReducerActionType.LOAD_CART:
        newState = action.payload as CartReducerState;
        break;

      default:
        newState = state;
    }

    return newState;
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CartReducerActionType.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (state.cart.length > 0 || state.appliedCoupon) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [state]);

  const getItemInfoFromCart = (itemId: string) =>
    state.cart.find((cartItem) => cartItem.id === itemId);

  const applyCouponHandler = (
    code: string
  ): { success: boolean; message: string } => {
    const coupon = findCouponByCode(code);

    if (!coupon) {
      return {
        success: false,
        message: 'Invalid coupon code',
      };
    }

    const subtotal = calculateSubtotal(state.cart);
    const validation = validateCoupon(coupon, subtotal);

    if (!validation.isValid) {
      return {
        success: false,
        message: validation.message,
      };
    }

    dispatch({ type: CartReducerActionType.APPLY_COUPON, payload: coupon });

    return {
      success: true,
      message: `${coupon.description}`,
    };
  };

  const removeCouponHandler = () => {
    dispatch({ type: CartReducerActionType.REMOVE_COUPON });
  };

  return (
    <CartContext.Provider
      value={{
        cartState: state,
        addItem: (item: CartItem) =>
          dispatch({ type: CartReducerActionType.ADD_TO_CART, payload: item }),
        removeItem: (item: CartItem) =>
          dispatch({
            type: CartReducerActionType.REMOVE_FROM_CART,
            payload: item,
          }),
        updateQuantity: (item: CartItem) =>
          dispatch({
            type: CartReducerActionType.UPDATE_QUANTITY,
            payload: item,
          }),
        getItemInfoFromCart,
        applyCoupon: applyCouponHandler,
        removeCoupon: removeCouponHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
