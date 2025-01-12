'use client';
import { Suspense, useMemo, useState } from 'react';
import SearchFilters from './SearchFilters';
import { Dictionary } from '@/lib/get-dictionary';
import { Collection, Customer, Facet, FavoriteList } from '@/lib/vendure/generated/graphql-shop';
import Badges from './badges';
import Products from './products';
import clsx from 'clsx';
import SearchPagination from './pagination';
import { PAGESIZE } from '@/lib/constants';

export const defaultMinPrice = 0;
export const defaultMaxPrice = 7000;

type Props = {
  categories: Collection[];
  facets: Facet[];
  collection: string | undefined;
  q: string | undefined;
  f: string[];
  maxPrice: number | undefined;
  totalItems: number | null;
  found: boolean;
  sort: string | undefined;
  takeQuery: number;
  skipQuery: number;
  minPriceTax: number | undefined;
  maxPriceTax: number | undefined;
  dictionary: Dictionary;
  pathname: string;
  customer: Customer | null;
  wishlist: FavoriteList | null;
};

export default function SearchMain({
  categories,
  facets,
  //   pages,
  collection,
  q,
  f,
  //   products,
  maxPrice,
  sort,
  takeQuery,
  skipQuery,
  minPriceTax,
  maxPriceTax,
  dictionary,
  customer,
  wishlist
}: Props) {
  const search_dictionary = dictionary.search;
  const collectionMap = useMemo(() => {
    const dummy = new Map<string, string>();
    categories.forEach((cat) => {
      dummy.set(cat.id, cat.name);
    });
    return dummy;
  }, [categories]);

  const facetMapAll = useMemo(() => {
    const flatMap = new Map<string, string>();
    const facetMapHierachical = new Map<string, Map<string, string>>();
    facets.forEach((facet) => {
      const intermediateMap = new Map<string, string>();
      facet.values.forEach((value) => {
        flatMap.set(value.id, value.name);
        intermediateMap.set(value.id, value.name);
      });
      facetMapHierachical.set(facet.id, intermediateMap);
    });
    return [flatMap, facetMapHierachical];
  }, [facets]);

  const [facetMap, facetMapHierachical] = facetMapAll;

  const [selectedFilters, setSelectedFilters] = useState<string[]>(f);
  const [selectedCollection, setSelectedCollection] = useState<string>(collection ?? '');
  const [totalItems, setTotalItems] = useState<number>(0);

  const [take, setTake] = useState(Number(takeQuery ?? PAGESIZE));
  const [skip, setSkip] = useState(Number(skipQuery ?? 0));

  const searchResMaxPrice = maxPrice || defaultMaxPrice;
  const found = totalItems > 0;
  //   const productsLength = products.length ?? 0;
  return (
    <>
      <SearchFilters
        collection={collection}
        categories={categories}
        facets={facets}
        f={f}
        q={q}
        sort={sort}
        minPT={minPriceTax ? Number(minPriceTax) : defaultMinPrice}
        maxPT={maxPriceTax ? Number(maxPriceTax) : searchResMaxPrice}
        searchResMaxPrice={searchResMaxPrice}
        dictionary={dictionary}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
        setSkip={setSkip}
      >
        <div className="order-3 col-span-8 lg:order-none">
          <div className="transition duration-75 ease-in">
            <Suspense fallback={<div>Loading...</div>}>
              <Badges
                c={collection}
                q={q}
                f={f}
                facetMap={facetMap as Map<string, string>}
                collectionMap={collectionMap}
                setSelectedFilters={setSelectedFilters}
                setSelectedCollection={setSelectedCollection}
              />
            </Suspense>
            {!found && (
              <div className="mt-6">
                <span
                  className={clsx('animated', {
                    fadeIn: !found,
                    hidden: found
                  })}
                >
                  {q ? (
                    <>
                      {search_dictionary.no_products_term} &quot;<strong>{q}</strong>&quot;.
                    </>
                  ) : (
                    <>{search_dictionary.no_products_category}</>
                  )}
                </span>
              </div>
            )}
          </div>
          <>
            <div>
              {found && (
                <SearchPagination
                  take={take}
                  setTake={setTake}
                  skip={skip}
                  setSkip={setSkip}
                  totalItems={totalItems}
                  dictionary={dictionary}
                />
              )}

              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Suspense fallback={<div>Loading...</div>}>
                  <Products
                    wishlist={wishlist}
                    customer={customer}
                    c={collection}
                    q={q}
                    f={f}
                    categories={categories}
                    facets={facets}
                    dictionary={dictionary}
                    allFacetMap={facetMap as Map<string, string>}
                    sort={sort}
                    takeQuery={takeQuery}
                    skipQuery={skipQuery}
                    minPriceTax={minPriceTax}
                    maxPriceTax={maxPriceTax}
                    setTotalItems={setTotalItems}
                    facetMapHierachical={facetMapHierachical as Map<string, Map<string, string>>}
                  />
                </Suspense>
              </div>
              {found && (
                <div className="mt-4">
                  <SearchPagination
                    take={take}
                    setTake={setTake}
                    skip={skip}
                    setSkip={setSkip}
                    totalItems={totalItems}
                    dictionary={dictionary}
                    showBorder={true}
                  />
                </div>
              )}
            </div>
          </>
        </div>
      </SearchFilters>
    </>
  );
}
