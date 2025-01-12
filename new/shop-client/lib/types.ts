import { Locale } from '@/i18n-config';

export interface OrderWithItemsAndUser {
	order_id: number;
	total_amount: number;
	order_date: string;
	order_status: string;
	items: OrderItem[]; // Include items
	user: User; // Include user
  }


export interface OrderItem {
	order_item_id: number;
	product_id: number;
	price_at_purchase: number;
	quantity: number;
	product: Product; // Include product
  }
  
  export interface Product {
	product_id: number;
	name: string;
	price: number;
	description: string;
	stock: number;
	media_id: number;
  }

  export interface User {
	user_id: number;
	username: string;
	email: string;
	full_name: string;
	group_id: number;
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
type Breadcrumb = {
  id: string;
  name: string;
  slug: string;
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  breadcrumbs?: Breadcrumb[];
  parent?: { name: '__root_collection__' };
  featuredAsset?: { id: string; preview: string };
  children: any[];
};

export type ShippingAddress = {
  id?: string;
  fullName?: string;
  streetLine1?: string;
  streetLine2?: string;
  company?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  countryCode?: string;
  phoneNumber?: string;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
  country?: string;
};
