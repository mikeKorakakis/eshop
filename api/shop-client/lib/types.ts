import { Locale } from '@/i18n-config';

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
