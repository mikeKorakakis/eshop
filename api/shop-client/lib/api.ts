import useSWR, { SWRConfiguration } from 'swr';
import { paths } from '../types/api-types';

type APIPaths = keyof paths;

const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export const useAPI = <T extends APIPaths>(
  path: T,
  config?: SWRConfiguration
) => {
  const url = `/api${path}`;
  return useSWR<paths[T]['responses']['200']>(url, fetcher, config);
};
