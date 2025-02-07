import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n-config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { me } from './lib/actions';

const isPrivateUrl = (pathname: string) => {
  return pathname.includes('admin') || pathname.includes('profile');
};

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

export async function middleware(request: NextRequest) {
  const defaultLocale = i18n.defaultLocale;
  const pathname = request.nextUrl.pathname;
  const user = await me();

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  const locale = getLocale(request);
  if (pathnameIsMissingLocale) {
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

  if (pathname.includes('admin') && (!user || user.group_id !== 1)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  if (user && user.group_id === 1 && (!pathname.includes('admin') && !pathname.includes('profile'))) {
	return NextResponse.redirect(new URL(`/${locale}/admin/dashboard`, request.url));
  }

  if (!user && isPrivateUrl(pathname)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  const res = NextResponse.next({
    headers: {
      'X-Language-Preference': pathname.split('/')[1] || defaultLocale,
      'x-url': request.nextUrl.pathname.replace(defaultLocale, '')
    }
  });

  return res;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|test|favicon.ico|.*\\..*|opengraph-image|robots.ts|sitemap.ts).*)'
  ]
};
