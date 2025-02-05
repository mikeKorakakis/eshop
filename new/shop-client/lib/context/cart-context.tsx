"use client"
import React, {
	createContext,
	useReducer,
	useContext,
	FC,
	ReactNode,
	useCallback,
	useMemo,
	useEffect,
} from 'react';
import { CartItem, CartState, Shipping } from '@/types';

// Initial state
const initialState: CartState = {
	items: [],
	totalAmount: 0,
	shipping: {
		shipping_method_id: 0,
		address: '',
		city: '',
		postal_code: '',
		cost: 0,
	}

};

// Define action types
type CartAction =
	 { type: 'ADD_SHIPPING'; shipping: Shipping }
	| { type: 'ADD_TO_CART'; item: Omit<CartItem, 'quantity'> }
	| { type: 'UPDATE_QUANTITY'; id: number; quantity: number }
	| { type: 'REMOVE_FROM_CART'; id: number }
	| { type: 'CLEAR_CART' }
	| { type: 'LOAD_CART'; state: CartState };

// Reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case 'ADD_SHIPPING': {
			const previousTotal = state.items.reduce(
				(total, cartItem) => total + cartItem.price * cartItem.quantity,
				0
			);
			const newTotal = previousTotal + action.shipping.cost;
			return {
				...state,
				shipping: action.shipping,
				totalAmount: newTotal
			};
		}
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
				shipping: state.shipping,
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
				shipping: state.shipping,
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
				shipping: state.shipping,
			};
		}
		case 'CLEAR_CART': {
			return {
				items: [],
				totalAmount: 0,
				shipping: {address: '', city: '', cost: 0, postal_code: '', shipping_method_id: 0},
			};
		}
		case 'LOAD_CART': {
			return action.state;
		}
		default:
			return state;
	}
}

// Create context
export const CartContext = createContext<
	CartState & {
		addShipping: (shipping: Shipping) => void;
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

	// Load cart from localStorage on mount
	useEffect(() => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			dispatch({ type: 'LOAD_CART', state: JSON.parse(storedCart) });
		}
	}, []);

	// Save cart to localStorage whenever state changes
	useEffect(() => {
		if (state !== initialState) {
			localStorage.setItem('cart', JSON.stringify(state));
		}
	}, [state]);
	const addShipping = useCallback(
		(shipping: Shipping) => {
			dispatch({ type: 'ADD_SHIPPING', shipping });
		},
		[dispatch]
	);

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
			addShipping,
			addToCart,
			updateQuantity,
			removeFromCart,
			clearCart,
		}),
		[state, addShipping, addToCart, updateQuantity, removeFromCart, clearCart]
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
