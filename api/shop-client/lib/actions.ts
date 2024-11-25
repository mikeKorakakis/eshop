'use server';

import { cookies } from 'next/headers';
import { SetHttpCookieType } from './types';
import { getDictionary } from './get-dictionary';

export async function setCookieServer(data: SetHttpCookieType) {
  const { name, value, path, httpOnly, secure, sameSite } = data;
  const days = data.days || 1;
  const date = new Date();

  const expires = date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  cookies().set({
    name,
    value,
    httpOnly: !!httpOnly,
    path: path || '/',
    sameSite,
    secure,
    expires
  });
}

export async function getDictionaryServer({ lang }: { lang: 'el' | 'en' }) {
  const res = await getDictionary(lang);
  return res;
}
