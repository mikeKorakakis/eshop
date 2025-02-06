"use client";
import React, {
	createContext,
	useReducer,
	useContext,
	FC,
	ReactNode,
	useEffect,
	useMemo,
	useCallback,
} from "react";
import { LoginInput, SignupInput, User } from "@/types"; // Update the import path based on your project structure
import { me, logout, signup } from "../actions"; // Import login, logout, and register actions
import { login } from "../actions"; // Import login action

// Initial state
const initialState = {
	user: null as User | null,
	isLoading: true,
	isAdmin: false,
	isUser: false,
	isLoggedIn: false,
};

// Define action types
type AuthAction =
	| { type: "SET_USER"; user: User | null }
	| { type: "CLEAR_USER" }
	| { type: "SET_LOADING"; isLoading: boolean };

// Reducer function
function authReducer(state: typeof initialState, action: AuthAction) {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.user,
				isAdmin: action.user?.group_id === 1 || false,
				isUser: !!action.user,
				isLoggedIn: !!action.user,
				isLoading: false,
			};
		case "CLEAR_USER":
			return {
				...state,
				user: null,
				isAdmin: false,
				isUser: false,
				isLoggedIn: false,
				isLoading: false,
			};
		case "SET_LOADING":
			return {
				...state,
				isLoading: action.isLoading,
			};
		default:
			return state;
	}
}

// Create context
const AuthContext = createContext<
	typeof initialState & {
		setUser: (user: User | null) => void;
		clearUser: () => void;
		setLoading: (isLoading: boolean) => void;
		login: (input: LoginInput) => Promise<boolean>;
		logout: () => Promise<void>;
		signup: (input: SignupInput) => Promise<void>;
	} | null
>(null);

AuthContext.displayName = "AuthContext";

// Provider component
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	// Fetch the user on mount
	useEffect(() => {
		const fetchUser = async () => {
			try {
				dispatch({ type: "SET_LOADING", isLoading: true });
				const user = await me();
				if (user) {
					dispatch({ type: "SET_USER", user });
				} else {
					dispatch({ type: "SET_LOADING", isLoading: false });
				}
			} catch (error) {
				console.error("Failed to fetch user:", error);
				dispatch({ type: "SET_LOADING", isLoading: false });
			}
		};
		fetchUser();
	}, []);

	const setUser = useCallback(
		(user: User | null) => {
			dispatch({ type: "SET_USER", user });
		},
		[dispatch]
	);

	const clearUser = useCallback(() => {
		dispatch({ type: "CLEAR_USER" });
	}, [dispatch]);

	const setLoading = useCallback(
		(isLoading: boolean) => {
			dispatch({ type: "SET_LOADING", isLoading });
		},
		[dispatch]
	);

	const loginHandler = useCallback(
		async ({ username, password }: LoginInput) => {
			try {
				const res = await login({ username, password });
				
				if(!res) {
					return false;
				}
				const user = await me();
				dispatch({ type: "SET_USER", user });
				return true;
			} catch (error) {
				console.error("Login failed:", error);
				return false;
			}
		},
		[dispatch]
	);

	const signupHandler = useCallback(
		async ({ username, password, email, full_name, group_id, media_id }: SignupInput) => {
			try {
				await signup({ username, password, email, full_name, group_id, media_id });
				await loginHandler({ username, password });
			} catch (error) {
				console.error("Registration failed:", error);
			}
		},
		[loginHandler]
	);

	

	const logoutHandler = useCallback(async () => {
		try {
			dispatch({ type: "SET_LOADING", isLoading: true });
			await logout();
			dispatch({ type: "CLEAR_USER" });
		} catch (error) {
			console.error("Logout failed:", error);
		} finally {
			dispatch({ type: "SET_LOADING", isLoading: false });
		}
	}, [dispatch]);

	

	const value = useMemo(
		() => ({
			...state,
			setUser,
			clearUser,
			setLoading,
			login: loginHandler,
			logout: logoutHandler,
			signup: signupHandler,
		}),
		[state, setUser, clearUser, setLoading, loginHandler, logoutHandler, signupHandler]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook for consuming the auth context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

// Managed Auth Context for wrapping the app
export const ManagedAuthContext: FC<{ children: ReactNode }> = ({ children }) => {
	return <AuthProvider>{children}</AuthProvider>;
};
