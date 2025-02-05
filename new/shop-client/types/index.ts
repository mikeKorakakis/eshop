// import {components} from './api-types'
import { Locale } from '@/i18n-config';

// export type Category = components["schemas"]["Category"]
// export type Comment = components["schemas"]["Comment"]
// export type CreditCard = components["schemas"]["CreditCard"]
// export type Product = components["schemas"]["Product"]
// export type Order = components["schemas"]["Order"]
// export type OrderItem = components["schemas"]["OrderItem"]
// export type User = components["schemas"]["User"]

export interface SignupRes {
  access_token: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface SignupInput {
  username: string;
  password: string;
  email: string;
  full_name: string;
  media_id: number | null;
  group_id: number;
}

export interface UpdateCustomerInput {
  user_id: number;
  username: string;
  full_name: string;
  media_id?: number | null;
  email?: string;
  password?: string;
  group_id?: number;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface Shipping {
  shipping_method_id: number;
  address: string;
  city: string;
  postal_code: string;
  cost: number;
  method?: ShippingMethod;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

// Define the state structure
export interface CartState {
  items: CartItem[];
  totalAmount: number;
  shipping: Shipping;
}

export interface OrderWithItemsAndUser {
  order_id: number;
  total_amount: number;
  order_date: string;
//   order_status: string;
  shipping: Shipping; 
  items: OrderItem[]; // Include items
  user: User; // Include user
}

export interface MappedOrderWithItemsAndUser {
  id: number;
  total_amount: number;
  order_date: string;
//   order_status: string;
  shipping: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    media: Media | null;
  }[]; // Include items
  user: User; // Include user
}

export interface OrderItem {
  order_item_id: number;
  product_id: number;
  price_at_purchase: number;
  quantity: number;
  product: Product; // Include product
}

// export interface Product {
//   product_id: number;
//   name: string;
//   price: number;
//   description: string;
//   stock: number;
//   media_id: number;
// }

export interface User {
  user_id: number;
  username: string;
  email: string;
  full_name: string;
  group_id: number;
  media: Media | null;
}

export type LanguageProps = {
  params: { lng: Locale };
};

export type SetHttpCookieType = {
  name: string;
  value: string;
  days: number;
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
};

export interface Media {
  media_id: number;
  name: string | null;
  path: string;
  size: number | null;
}

export interface User {
  user_id: number;
  username: string;
  password: string;
  email: string;
  full_name: string;
  group_id: number;
  registration_date: string;
  media_id: number | null;
  media: Media | null;
}

export interface Category {
  category_id: number;
  name: string;
  description: string;
  parent_id?: number;
  ordering: number | null;
  media_id: number | null;
  media: Media | null;
}

export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  added_date: string;
  country_of_origin: string;
  category_id: number;
  owner_id: number;
  media_id: number | null;
  media: Media | null;
  category: Category;
}

export interface MappedProduct {
  name: string;
  description: string;
  price: number;
  added_date: string;
  country_of_origin: string;
  media: Media | null;
  category: string;
}

export interface Comment {
  comment_id: number;
  content: string;
  created_date: string;
  product_id: number;
  user_id: number;
}

export interface CreditCard {
  credit_card_id: number;
  user_id: number;
  card_number: string;
  cardholder_name: string;
  expiration_date: string;
  cvv: string;
  balance: number;
}

export interface ShippingMethod {
  shipping_method_id: number;
  method_name: string;
  cost: number;
}

export interface Order {
  order_id: number;
  user_id: number;
  order_date: string;
  total_amount: number;
  order_status: string;
}

export interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
}

export interface ProductGallery {
  gallery_id: number;
  media_id: number;
  name: string | null;
  product_id: number;
  size: number | null;
}

export interface Cache {
  key: string;
  value: string;
  expiration: number;
}

export interface CacheLock {
  key: string;
  owner: string;
  expiration: number;
}

export interface PersonalAccessToken {
  id: number;
  tokenable_type: string;
  tokenable_id: number;
  name: string;
  token: string;
  abilities: string | null;
  last_used_at: string | null;
  expires_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}
