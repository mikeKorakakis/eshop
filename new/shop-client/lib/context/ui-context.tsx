'use client';
// import { Address } from '@/lib/vendure/generated/graphql-shop';
import React, { FC, ReactNode, useCallback, useMemo } from 'react';
type PayloadType = (() => Promise<void>) | null;
export interface State {
	displaySidebar: boolean;
	displayDropdown: boolean;
	displayModal: boolean;
	sidebarView: string;
	modalView: string;
	displayMobileMenu: boolean;
	payload: PayloadType;
	modalComponent: ReactNode;
}

const initialState = {
	displaySidebar: false,
	displayDropdown: false,
	displayModal: false,
	displayMobileMenu: false,
	modalView: 'LOGIN_VIEW',
	sidebarView: 'CART_VIEW',
	payload: null,
	modalComponent: null
};

type Action =
	| {
		type: 'OPEN_SIDEBAR';
	}
	| {
		type: 'CLOSE_SIDEBAR';
	}
	| {
		type: 'OPEN_DROPDOWN';
	}
	| {
		type: 'CLOSE_DROPDOWN';
	}
	| {
		type: 'OPEN_MODAL';
	}
	| {
		type: 'CLOSE_MODAL';
	}
	| {
		type: 'SET_MODAL_VIEW';
		view: MODAL_VIEWS;
	}
	| {
		type: 'SET_MODAL_COMPONENT';
		view: ReactNode;
	}
	| {
		type: 'SET_SIDEBAR_VIEW';
		view: SIDEBAR_VIEWS;
	}
	
	| {
		type: 'OPEN_MOBILE_MENU';
	}
	| {
		type: 'CLOSE_MOBILE_MENU';
	}
	| {
		type: 'SET_PAYLOAD';
		payload: PayloadType;
	};

export type MODAL_VIEWS =
	""
	| 'SIGNUP_VIEW'
	| 'LOGIN_VIEW'

type SIDEBAR_VIEWS = 'CART_VIEW' ;

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
	switch (action.type) {
		case 'OPEN_SIDEBAR': {
			return {
				...state,
				displaySidebar: true
			};
		}
		case 'CLOSE_SIDEBAR': {
			return {
				...state,
				displaySidebar: false
			};
		}
		case 'OPEN_DROPDOWN': {
			return {
				...state,
				displayDropdown: true
			};
		}
		case 'CLOSE_DROPDOWN': {
			return {
				...state,
				displayDropdown: false
			};
		}
		case 'OPEN_MODAL': {
			return {
				...state,
				displayModal: true,
				displaySidebar: false,
			};
		}
		case 'CLOSE_MODAL': {
			return {
				...state,
				displayModal: false
			};
		}
		case 'SET_MODAL_VIEW': {
			return {
				...state,
				modalView: action.view
			};
		}
		case 'SET_MODAL_COMPONENT': {
			return {
				...state,
				modalComponent: action.view
			};
		}
		case 'SET_SIDEBAR_VIEW': {
			return {
				...state,
				sidebarView: action.view
			};
		}
		
		case 'OPEN_MOBILE_MENU': {
			return {
				...state,
				displayMobileMenu: true
			};
		}
		case 'CLOSE_MOBILE_MENU': {
			return {
				...state,
				displayMobileMenu: false
			};
		}
		case 'SET_PAYLOAD': {
			return {
				...state,
				payload: action.payload
			};
		}
	}
}

export const UIProvider: FC<{ children?: ReactNode }> = (props) => {
	const [state, dispatch] = React.useReducer(uiReducer, initialState);

	const openSidebar = useCallback(() => dispatch({ type: 'OPEN_SIDEBAR' }), [dispatch]);
	const closeSidebar = useCallback(() => dispatch({ type: 'CLOSE_SIDEBAR' }), [dispatch]);
	const toggleSidebar = useCallback(
		() =>
			state.displaySidebar
				? dispatch({ type: 'CLOSE_SIDEBAR' })
				: dispatch({ type: 'OPEN_SIDEBAR' }),
		[dispatch, state.displaySidebar]
	);
	const closeSidebarIfPresent = useCallback(
		() => state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' }),
		[dispatch, state.displaySidebar]
	);

	const openDropdown = useCallback(() => dispatch({ type: 'OPEN_DROPDOWN' }), [dispatch]);
	const closeDropdown = useCallback(() => dispatch({ type: 'CLOSE_DROPDOWN' }), [dispatch]);

	const openModal = useCallback(
		() => dispatch({ type: 'OPEN_MODAL' }),
		[dispatch]
	);
	const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), [dispatch]);


	const setModalView = useCallback(
		(view: MODAL_VIEWS) => {
			dispatch({ type: 'SET_MODAL_COMPONENT', view: null });
			dispatch({ type: 'SET_MODAL_VIEW', view });
		},
		[dispatch]
	);

	const setModalComponent = useCallback(
		(view: ReactNode) => {
			dispatch({ type: 'SET_MODAL_VIEW', view: "" });
			dispatch({ type: 'SET_MODAL_COMPONENT', view });
		},
		[dispatch]
	);

	const setSidebarView = useCallback(
		(view: SIDEBAR_VIEWS) => dispatch({ type: 'SET_SIDEBAR_VIEW', view }),
		[dispatch]
	);

	const openMobileMenu = useCallback(() => dispatch({ type: 'OPEN_MOBILE_MENU' }), [dispatch]);
	const closeMobileMenu = useCallback(() => dispatch({ type: 'CLOSE_MOBILE_MENU' }), [dispatch]);

	const setPayload = useCallback(
		(payload: PayloadType) => dispatch({ type: 'SET_PAYLOAD', payload }),
		[dispatch]
	);

	const value = useMemo(
		() => ({
			...state,
			openSidebar,
			closeSidebar,
			toggleSidebar,
			closeSidebarIfPresent,
			openDropdown,
			closeDropdown,
			openModal,
			closeModal,
			setModalView,
			setModalComponent,
			setSidebarView,
			openMobileMenu,
			closeMobileMenu,
			setPayload
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state]
	);

	return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
	const context = React.useContext(UIContext);
	if (context === undefined) {
		throw new Error(`useUI must be used within a UIProvider`);
	}
	return context;
};

export const ManagedUIContext: FC<{ children?: ReactNode }> = ({ children }) => (
	<UIProvider>
		{/* <ThemeProvider> */}
		{children}
		{/* </ThemeProvider> */}
	</UIProvider>
);
