import { Dictionary } from '@/lib/get-dictionary';
import SearchMain from '@/components/search/search-main';
import { getFacets } from '@/lib/vendure/shop/facets/facets';
import { getCollections } from '@/lib/vendure/shop/collections/collections';
import { headers } from 'next/headers';
import { PAGESIZE } from '@/lib/constants';
import { getActiveCustomerQuery } from '@/lib/vendure/shop/customer/customer';
import { FavoriteList } from '@/lib/vendure/generated/graphql-shop';

type Props = {
  dictionary: Dictionary;
  searchParams: { [key: string]: string | string[] | undefined };
  wishlist: FavoriteList | null;
};

export default async function Search({ dictionary, searchParams, wishlist }: Props) {
  const heads = headers();
  const pathname = heads.get('next-url') as string;
  const allFacets = await getFacets();
  const allCollections = await getCollections();
  const { q, f, c, sort, skip, take, maxPriceTax, minPriceTax } =
    normalizeSearchParams(searchParams);
  const customer = await getActiveCustomerQuery();
  return (
    // <div>hesllo</div>
    <SearchMain
      wishlist={wishlist}
      customer={customer}
      dictionary={dictionary}
      categories={allCollections}
      facets={allFacets}
      collection={c}
      q={q}
      f={f}
      sort={sort}
      skipQuery={skip}
      takeQuery={take}
      maxPriceTax={maxPriceTax}
      minPriceTax={minPriceTax}
      pathname={pathname}
      maxPrice={7000}
      totalItems={100}
      found={true}
    />
  );
}

const normalizeSearchParams = (searchParams: { [key: string]: string | string[] | undefined }) => {
  const { q, f, c, sort, skip, take, maxPriceTax, minPriceTax } = searchParams;

  const query = q ? (Array.isArray(q) ? q[0] : q) : undefined;

  const facets = f ? (Array.isArray(f) ? f : [f]) : [];
  const collection = c ? (Array.isArray(c) ? c[0] : c) : undefined;

  const skipParsed = skip ? (Array.isArray(skip) ? skip[0] : skip) : '0';
  const skipNumber = skipParsed ? parseInt(skipParsed) : 0;

  const takeParsed = take ? (Array.isArray(take) ? take[0] : take) : PAGESIZE.toString();
  const takeNumber = takeParsed ? parseInt(takeParsed) : PAGESIZE;

  const sortParsed = sort ? (Array.isArray(sort) ? sort[0] : sort) : undefined;

  const maxPriceTaxParsed = maxPriceTax
    ? Array.isArray(maxPriceTax)
      ? maxPriceTax[0]
      : maxPriceTax
    : undefined;
  const maxPriceTaxNumber = maxPriceTaxParsed ? parseFloat(maxPriceTaxParsed) : undefined;

  const minPriceTaxParsed = minPriceTax
    ? Array.isArray(minPriceTax)
      ? minPriceTax[0]
      : minPriceTax
    : undefined;
  const minPriceTaxNumber = minPriceTaxParsed ? parseFloat(minPriceTaxParsed) : undefined;

  return {
    q: query,
    f: facets,
    c: collection,
    sort: sortParsed,
    skip: skipNumber,
    take: takeNumber,
    minPriceTax: minPriceTaxNumber,
    maxPriceTax: maxPriceTaxNumber
  };
};
