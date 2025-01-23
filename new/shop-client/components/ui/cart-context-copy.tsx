'use client';
import { CartItem, CartState } from '@/types';
import React, { createContext, useReducer, useContext, FC, ReactNode, useCallback, useMemo } from 'react';

// Define the structure of an item in the order

// Initial state
const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

// Define action types
type CartAction =
  | { type: 'ADD_TO_CART'; item: Omit<CartItem, 'quantity'> }
  | { type: 'UPDATE_QUANTITY'; id: number; quantity: number }
  | { type: 'REMOVE_FROM_CART'; id: number }
  | { type: 'CLEAR_CART' };

// Reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { item } = action;
      const existingItem = state.items.find((cartItem) => cartItem.id === item.id);
      const updatedItems = existingItem
        ? state.items.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...state.items, { ...item, quantity: 1 }];

      const updatedTotal = updatedItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      );

      return {
        items: updatedItems,
        totalAmount: updatedTotal,
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action;
      const updatedItems = state.items.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      );
      const updatedTotal = updatedItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      );

      return {
        items: updatedItems,
        totalAmount: updatedTotal,
      };
    }
    case 'REMOVE_FROM_CART': {
      const { id } = action;
      const updatedItems = state.items.filter((cartItem) => cartItem.id !== id);
      const updatedTotal = updatedItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      );

      return {
        items: updatedItems,
        totalAmount: updatedTotal,
      };
    }
    case 'CLEAR_CART': {
      return {
        items: [],
        totalAmount: 0,
      };
    }
    default:
      return state;
  }
}

// Create context
export const CartContext = createContext<
  CartState & {
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
  } | undefined
>(undefined);

CartContext.displayName = 'CartContext';

// Provider component
export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Define actions as context methods
  const addToCart = useCallback(
    (item: Omit<CartItem, 'quantity'>) => {
      dispatch({ type: 'ADD_TO_CART', item });
    },
    [dispatch]
  );

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    (id: number) => {
      dispatch({ type: 'REMOVE_FROM_CART', id });
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  const value = useMemo(
    () => ({
      ...state,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [state, addToCart, updateQuantity, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook for consuming the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Managed Cart Context for wrapping the app
export const ManagedCartContext: FC<{ children: ReactNode }> = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};
