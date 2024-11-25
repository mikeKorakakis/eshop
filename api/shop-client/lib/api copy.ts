// import { server$ } from '@builder.io/qwik-city';
// import { isBrowser } from '@builder.io/qwik/build';
import type { DocumentNode } from 'graphql/index';
import { print } from 'graphql/index';
import { AUTH_TOKEN, HEADER_AUTH_TOKEN_KEY } from './constants';
import type { Options as RequesterOptions } from './graphql-wrapper';
import { getCookie, setHttpCookie } from './utils';
import cookies from 'js-cookie';

const isBrowser = typeof window !== 'undefined';

type ResponseProps<T> = { token: string; data: T };
type ExecuteProps<V> = { query: string; variables?: V };
type Options = {
  method: string;
  headers: Record<string, string>;
  body: string;
  next?: NextFetchRequestConfig;
};

// const baseUrl = import.meta.env.DEV ? DEV_API : PROD_API;
const shopApi = process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL;

const getLanguageCode = async ({languageCode}: {languageCode?: string}) => {
  let locale;
  if(languageCode) return languageCode
  if (isBrowser) {
    locale = cookies.get('X-Language-Preference');
  } else {
    const { cookies: serverCookies } = await import('next/headers');
    locale = serverCookies().get('X-Language-Preference')?.value;
  }

  return locale;
};

const getAuthToken = async ({ buildTime }: { buildTime?: boolean }) => {
  let token;
  if (!buildTime) {
    if (isBrowser) {
      token = getCookie(AUTH_TOKEN);
    } else {
      const { cookies: serverCookies } = await import('next/headers');
      token = serverCookies().get(AUTH_TOKEN)?.value;
    }
  } else {
    token = '';
  }
  return token;
};

// const getSession = async () => {
//   let session;
//   if (isBrowser) {
//     session = getCookie('session');
//   } else {
//     const { cookies: serverCookies } = await import('next/headers');
//     session = serverCookies().get('session')?.value;
//   }
//   return session;
// };

// const getSessionSignature = async () => {
//   let sessionSignature;
//   if (isBrowser) {
//     sessionSignature = getCookie('session.sig');
//   } else {
//     const { cookies: serverCookies } = await import('next/headers');
//     sessionSignature = serverCookies().get('session_signature')?.value;
//   }
//   return sessionSignature;
// };

export const requester = async <R, V>(
  doc: DocumentNode,
  vars?: V,
  options: RequesterOptions = { token: '', apiUrl: shopApi, channelToken: '' }
): Promise<R> => {
  const url = options?.apiUrl ?? shopApi;
  options.apiUrl = url + `?languageCode=${await getLanguageCode({languageCode: options.languageCode})}`;
  return execute<R, V>({ query: print(doc), variables: vars }, options);
};

const execute = async <R, V = Record<string, any>>(
  body: ExecuteProps<V>,
  options: RequesterOptions
): Promise<R> => {
  const requestOptions = {
    method: 'POST',
    headers: await createHeaders({ buildTime: options.buildTime }),
    body: JSON.stringify(body),
    credentials: 'include'
  };
  if (options.token) {
    requestOptions.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${options.token ?? ''}`
    };
  }
  if (options.channelToken) {
    requestOptions.headers['vendure-token'] = options.channelToken;
  }

  const response: ResponseProps<R> = isBrowser
    ? await executeOnTheServer(requestOptions, options.apiUrl!)
    : await executeRequest(requestOptions, options.apiUrl!);

  // DELETE THIS
  // const response: ResponseProps<R> = await executeRequest(requestOptions, options.apiUrl!);

  if (isBrowser && response.token) {
    await setHttpCookie({
      name: AUTH_TOKEN,
      value: response.token,
      days: 7,
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    });
    // setCookie(AUTH_TOKEN, response.token, 365);
    // setCookie(ADMIN_AUTH_TOKEN, response.token, 365);
  }

  return response.data;
};

const createHeaders = async ({ buildTime }: { buildTime?: boolean }) => {
  let headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = await getAuthToken({ buildTime });
  //   const session = await getSession();
  //   const sessionSignature = await getSessionSignature();
  headers = {
    ...headers,
    Authorization: `Bearer ${token}`
    // Cookie: `session=${session}; session.sig=${sessionSignature}`
  };

  return headers;
};

// const executeOnTheServer = server$(async (options: Options, apiUrl: string) =>
// 	executeRequest(options, apiUrl)
// );

const executeOnTheServer = async (options: Options, apiUrl: string) =>
  executeRequest(options, apiUrl);

const executeRequest = async (options: Options, apiUrl: string) => {
  let httpResponse: Response = new Response();
  try {
    httpResponse = await fetch(apiUrl, options);
  } catch (error) {
    console.error(`Could not fetch from ${apiUrl}. Reason: ${error}`);
  }
  return await extractTokenAndData(httpResponse, apiUrl);
};

const extractTokenAndData = async (response: Response, apiUrl: string) => {
  if (response.body === null) {
    console.error(`Emtpy request body for a call to ${apiUrl}`);
    return { token: '', data: {} };
  }
  const token = response.headers.get(HEADER_AUTH_TOKEN_KEY) || '';
  const { data, errors } = await response.json();
  if (errors && !data) {
    // e.g. API access related errors, like auth issues.
    throw new Error(errors[0].message);
  }
  return { token, data };
};
