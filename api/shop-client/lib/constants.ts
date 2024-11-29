export const BASE_PATH = 'http://localhost:8000';


export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  customer: 'customer',
  order: 'order',
  wishlist: 'wishlist',
  collections: 'collections',
  products: 'products',
  cart: 'cart',
  addresses: 'addresses'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';

export const DEFAULT_LOCALE = 'en';
export const LOCALES = ['el-GR', 'en'];

export const DEV_API = 'https://readonlydemo.vendure.io';
export const PROD_API = 'https://readonlydemo.vendure.io';
export const LOCAL_API = 'http://localhost:3000';
export const IS_LOCAL = true;
export const IS_DEV = false;

export const AUTH_TOKEN = 'authToken';
export const HEADER_AUTH_TOKEN_KEY = 'vendure-auth-token';
export const DEFAULT_METADATA_URL = 'https://qwik-storefront.vendure.io/';
export const DEFAULT_METADATA_TITLE = 'Vendure Qwik Storefront';
export const DEFAULT_METADATA_DESCRIPTION =
  'A headless commerce storefront starter kit built with Vendure & Qwik';
export const DEFAULT_METADATA_IMAGE = 'https://qwik-storefront.vendure.io/social-image.png';

export const SHOP_ENABLED = process.env.NEXT_PUBLIC_SHOP_ENABLED === 'true';
export const RATINGS_ENABLED = false;
export const LINKS = {
  link_home: '/',
  link_services_dyno: '/services#dynometer',
  link_services_racing_preparation: '/services#racing_preparation',
  link_services_racing_support: '/services#racing_support',
  link_services_storage: '/services#storage',
  link_services_trackdays: '/services#trackdays',
  link_services_transportation: '/services#transportation',
  link_tuning_electronics: '/tuning#electronics',
  link_tuning_engine: '/tuning#engine',
  link_tuning_suspension: '/tuning#suspension',
  link_contact: '/contact',
  link_cart: '/cart',
  link_checkout: '/checkout',
  link_checkout_general: '/checkout/general',
  link_checkout_addresses: '/checkout/addresses',
  link_checkout_shipping: '/checkout/shipping',
  link_checkout_payment: '/checkout/payment',
  link_checkout_review: '/checkout/review',
  link_search: '/search',
  link_profile: '/profile',
  link_profile_profile: '/profile/profile',
  link_profile_addresses: '/profile/addresses',
  link_profile_orders: '/profile/orders',
  link_profile_password: '/profile/password',
  link_verify: '/verify',
  link_password_reset_request: '/password-reset-request',
  link_password_reset: '/password-reset',
  link_order_confirmation: '/order-confirmation',
  link_stripe_confirmation: '/stripe-confirmation',
  link_privacy_policy: '/privacy-policy'
};
export const PAGESIZE = 20;
export const DEFAULT_MAX_PRICE = 7000;
export const DEFAULT_MIN_PRICE = 0;
