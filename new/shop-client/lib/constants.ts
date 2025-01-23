
export const DEFAULT_LOCALE = 'en';
export const LOCALES = ['el-GR', 'en'];



export const SHOP_ENABLED = process.env.NEXT_PUBLIC_SHOP_ENABLED === 'true';
export const RATINGS_ENABLED = false;
export const LINKS = {
  link_home: '/',
  link_contact: '/contact',
  link_cart: '/cart',
  link_checkout: '/checkout/general',
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
  link_order_confirmation: '/order-confirmation',
  link_privacy_policy: '/privacy-policy'
};
export const PAGESIZE = 20;
export const DEFAULT_MAX_PRICE = 7000;
export const DEFAULT_MIN_PRICE = 0;
