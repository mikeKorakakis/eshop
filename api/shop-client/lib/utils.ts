import { ReadonlyURLSearchParams } from 'next/navigation';
import { ENV_VARIABLES_SCHEMA } from './env';
import {
  SetHttpCookieType,
  ShippingAddress
} from './types';
import { setCookieServer } from './actions';


export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  return ENV_VARIABLES_SCHEMA.safeParse(process.env);
};

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function formatPrice(value = 0, currency: string = 'EUR') {
  return new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency
  }).format(value);
}

export function isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}


export const changeUrlParamsWithoutRefresh = (term: string, facetValueIds: string[]) => {
  const f = facetValueIds.join('-');
  return window.history.pushState(
    '',
    '',
    `${window.location.origin}${window.location.pathname}?q=${term}${f ? `&f=${f}` : ''}`
  );
};

export const setCookie = (name: string, value: string, days: number) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }

  const secureCookie = true // isEnvVariableEnabled('SECURE_COOKIE')
    ? ' Secure; SameSite=Strict;'
    : '';
  // const httpOnly = true ? ' HttpOnly;' : ''; // isEnvVariableEnabled('HTTPONLY_COOKIE')
  document.cookie = name + '=' + (value || '') + expires + `;${secureCookie} path=/; HttpOnly`;
};

export const setHttpCookie = async (data: SetHttpCookieType) => {
  await setCookieServer(data);
};

export const getCookie = (name: string) => {
  const keyValues = document.cookie.split(';');
  let result = '';
  keyValues.forEach((item) => {
    const [key, value] = item.split('=');
    if (key && value && key.trim() === name) {
      result = value;
    }
  });
  return result;
};

export const cleanUpParams = (params: Record<string, string>) => {
  if ('slug' in params && params.slug[params.slug.length - 1] === '/') {
    params.slug = params.slug.slice(0, params.slug.length - 1);
  }
  return params;
};

export const isEnvVariableEnabled = (envVariable: keyof typeof ENV_VARIABLES_SCHEMA) =>
  ENV_VARIABLES_SCHEMA[envVariable] === 'true';

export const isShippingAddressValid = (orderAddress: ShippingAddress): boolean =>
  !!(
    !!orderAddress &&
    orderAddress.fullName &&
    orderAddress.streetLine1 &&
    orderAddress.city &&
    orderAddress.province &&
    orderAddress.postalCode &&
    orderAddress.countryCode &&
    orderAddress.phoneNumber
  );

export const formatDateTime = (dateToConvert: Date) => {
  const result = new Date(dateToConvert).toISOString();
  const [date, time] = result.split('T');
  if (!date || !time) {
    return '';
  }
  const [hour, minutes] = time.split(':');
  const orderedDate = date.split('-').reverse().join('-');
  return `${orderedDate} ${hour}:${minutes}`;
};

export const ischeckout = (url: string) => url.indexOf('/checkout/') >= 0;

export const getCountryCode = (country: string) => {
  const countryObj = countries.find((c) => c.label === country);
  return countryObj?.value;
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const countries = [
  {
    value: 'GR',
    label: 'greece'
  },
  {
    value: 'IT',
    label: 'italy'
  }
];
