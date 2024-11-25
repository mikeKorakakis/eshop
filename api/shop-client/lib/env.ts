import z from 'zod';

const envVariables = z.object({
  //   VITE_VENDURE_PUBLIC_URL: z.string(),
  //   VITE_VENDURE_LOCAL_URL: z.string(),
  //   VITE_SHOW_PAYMENT_STEP: z.string(),
  //   VITE_SHOW_REVIEWS: z.string(),
  //   VITE_SECURE_COOKIE: z.string(),
  //   VITE_STRIPE_PUBLISHABLE_KEY: z.string(),
  //   VITE_QWIK_INSIGHTS_KEY: z.string(),
  SITE_NAME: z.string(),
  NEXT_PUBLIC_STRIPE_API_KEY: z.string(),
  NEXT_PUBLIC_VENDURE_SHOP_API_URL: z.string(),
  NEXT_PUBLIC_VENDURE_LOCAL_URL: z.string(),
  NEXT_PUBLIC_DOMAIN: z.string(),
  NEXT_PUBLIC_FRONTEND_URL: z.string(),
  SENDINBLUE_API_KEY: z.string(),
  EMAIL_RECIPIENT: z.string(),
  NEXT_PUBLIC_GOOGLE_REDIRECT_URL: z.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  NEXT_PUBLIC_CLOUDINARY_NAME: z.string(),
  NEXT_PUBLIC_SHOP_ENABLED: z.string(),
  NEXT_PUBLIC_WISHLIST_ENABLED: z.string(),
  NEXT_PUBLIC_GOOGLE_AUTH_ENABLED: z.string(),
  ANALYZE: z.string(),
  COMPANY_NAME: z.string(),
  SHOPIFY_REVALIDATION_SECRET: z.string(),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string(),
  SHOPIFY_STORE_DOMAIN: z.string(),
  VENDURE_REVALIDATE_SECRET: z.string(),
  SECURE_COOKIE: z.string(),
  HTTPONLY_COOKIE: z.string()
});

export const ENV_VARIABLES_SCHEMA = envVariables;