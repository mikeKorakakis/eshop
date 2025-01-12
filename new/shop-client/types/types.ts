import {components} from './api-types'

export type Category = components["schemas"]["Category"]
export type Comment = components["schemas"]["Comment"]
export type CreditCard = components["schemas"]["CreditCard"]
export type Product = components["schemas"]["Product"]
export type Order = components["schemas"]["Order"]
export type OrderItem = components["schemas"]["OrderItem"]
export type User = components["schemas"]["User"]

export interface CartItem {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	quantity: number;
  }
  
  // Define the state structure
  export interface CartState {
	items:  CartItem[];
	totalAmount: number;
  }
  