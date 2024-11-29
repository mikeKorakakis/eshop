import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n-config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { AUTH_TOKEN } from './lib/constants';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const defaultLocale = i18n.defaultLocale;
  const pathname = request.nextUrl.pathname;
  //   const cookies = request.cookies;
  const headers = request.headers;
  const token = headers.get('Vendure-Auth-Token');

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  // if (
  //   [
  //     '/manifest.json',
  //     '/favicon.ico',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return

  // Check if there is any supported locale in the pathname

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const searchParams = new URLSearchParams(request.nextUrl.search);
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    const response = NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}?${searchParams}`,
        request.url
      )
    );
    // response.headers.set('x-url', request.url);
    // response.headers.set('X-Language-Preference', locale || defaultLocale);

    response.cookies.set('X-Language-Preference', locale || defaultLocale);

    return response;
  }
  //   cookie.set('X-Language-Preference', locale || defaultLocale);
  //   const localeQuery = request.nextUrl.searchParams.get('languageCode')
  //   const localeArray = i18n.locales as unknown as string[]
  //   if ( localeQuery && localeArray.includes(localeQuery)) {
  //     return NextResponse.rewrite(new URL('/about-2', request.url,
  //         headers: {
  //             'X-Language-Preference':  pathname.split('/')[1] || defaultLocale,
  //             'x-url': request.url

  //     }))
  //   }
  const res = NextResponse.next({
    headers: {
      'X-Language-Preference': pathname.split('/')[1] || defaultLocale,
      'x-url': request.nextUrl.pathname.replace(defaultLocale, '')
    }
  });
  if (token)
    res.cookies.set(AUTH_TOKEN, token || '', {
      path: '/',
      secure: false,
      sameSite: 'strict',
      httpOnly: true
    });
  return res;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|test|favicon.ico|.*\\..*|opengraph-image|robots.ts|sitemap.ts).*)'
  ]
};
