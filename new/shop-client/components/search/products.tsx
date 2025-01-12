'use client';
import ProductCard from '@/components/product/ProductCard';
import { Dictionary } from '@/lib/get-dictionary';
import {
  Collection,
  Customer,
  Facet,
  FavoriteList,
  ListedProductFragment,
  SearchResponse,
  SearchResultSortParameter,
  SortOrder
} from '@/lib/vendure/generated/graphql-shop';
import { search } from '@/lib/vendure/shop/products/products';
import { Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react';

type Props = {
  dictionary: Dictionary;
  categories: Collection[];
  facets: Facet[];
  q: string | undefined;
  f: string[];
  c: string | undefined;
  minPriceTax: number | undefined;
  maxPriceTax: number | undefined;
  allFacetMap: Map<string, string>;
  sort: string | undefined;
  takeQuery: number;
  skipQuery: number;
  setTotalItems: Dispatch<SetStateAction<number>>;
  facetMapHierachical: Map<string, Map<string, string>>;
  wishlist: FavoriteList | null
  customer: Customer | null;
};

export default function Products({
  q,
  f,
  c,
  //   facets,
  sort,
  takeQuery,
  skipQuery,
  minPriceTax,
  maxPriceTax,
  facetMapHierachical,
  dictionary,
  setTotalItems,
  customer,
  wishlist
}: Props) {
  const [searchRes, setSearchRes] = useState<SearchResponse>({} as SearchResponse);
  const initialFacetMap = useMemo(() => new Map<string, Set<string>>(), []);



  let sortVal: SearchResultSortParameter | null = null;

  if (sort) {
    try {
      const sortSplit = (sort as string).split('-');
      const sortDir = sortSplit[1] === 'asc' ? SortOrder.Asc : SortOrder.Desc;
      sortVal = sortSplit[0] === 'name' ? { name: sortDir } : { price: sortDir };
    } catch (err) {
      console.error('invalid sort order');
    }
  }

  const facetGroups = useMemo(() => {
    initialFacetMap.clear();
    f.forEach((fValue) => {
      facetMapHierachical.forEach((innerMap, key) => {
        if (innerMap.has(fValue)) {
          const oldValue = initialFacetMap.get(key) ?? new Set<string>();
          initialFacetMap.set(key, oldValue.add(fValue));
        }
      });
    });

    const res: string[][] = [];
    initialFacetMap.forEach((fSet) => {
      res.push(Array.from(fSet));
    });

    return initialFacetMap.size > 0 ? res : undefined;
  }, [initialFacetMap, facetMapHierachical, f]);

  useEffect(() => {
    const fetch = async () => {
      const variables =
        minPriceTax && maxPriceTax
          ? {
              collectionId: c,
              facetValueFilters: facetGroups
                ? facetGroups?.map((facetG) => ({ or: facetG }))
                : undefined,
              term: q,
              take: takeQuery,
              skip: skipQuery,
              sort: sortVal,
              priceRangeWithTax: {
                min: Number(minPriceTax) * 100,
                max: Number(maxPriceTax) * 100
              },
              groupByProduct: true
            }
          : {
              collectionId: c,
              facetValueFilters: facetGroups
                ? facetGroups?.map((facetG) => ({ or: facetG }))
                : undefined,
              term: q,
              take: takeQuery,
              skip: skipQuery,
              sort: sortVal,
              groupByProduct: true
            };
      const searchResult = await search(variables);
      setSearchRes(searchResult);
    };
    fetch();
  }, [q, facetGroups, c, sortVal, takeQuery, skipQuery, minPriceTax, maxPriceTax]);

  const totalItems = searchRes.totalItems;
  const products = searchRes?.items?.map((item) => item as ListedProductFragment);

  useEffect(() => {
    setTotalItems(totalItems ?? 0);
  }, [totalItems, setTotalItems]);

  return (
    products &&
    products.map((product: ListedProductFragment, i) => (
      <ProductCard
        customer={customer}
        wishlist={wishlist}
        dictionary={dictionary}
        priority={i < 3}
        variant="simple"
        key={i}
        product={product}
        imgProps={{
          width: 300,
          height: 300,
          alt: product.productName
        }}
      />
    ))
  );
}
