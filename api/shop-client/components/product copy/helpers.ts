export type SelectedOptions = Record<string, string | null>;
import { Product } from '@/lib/vendure/generated/graphql-shop';
import { Dispatch, SetStateAction } from 'react';

const getOptionGroupName = (id: string, product: Product): string => {
  return product.optionGroups.find((og) => og.id === id)!.name;
};

export function getProductVariant(product: Product, opts: SelectedOptions) {
  const variant = product.variants.find((variant) => {
    return Object.entries(opts).every(([key, value]) =>
      variant.options.find((option) => {
        const displayName = getOptionGroupName(option.groupId, product);
        if (displayName.toLowerCase() === key.toLowerCase()) {
          return option.name.toLocaleLowerCase() === value?.toLowerCase();
        }
      })
    );
  });
  return variant;
}

export function selectDefaultOptionFromProduct(
  product: Product,
  updater: Dispatch<SetStateAction<SelectedOptions>>
) {
  // Selects the default option
  if (
    product.variants.length > 1 &&
    product?.variants[0] &&
    product?.variants[0]?.options.length > 0
  ) {
    product.variants[0]?.options?.forEach((v) => {
      const displayName = getOptionGroupName(v.groupId, product);
      updater((choices) => ({
        ...choices,
        [displayName.toLowerCase()]: v.name.toLowerCase()
      }));
    });
  }
}

type FacetValue = {
  id: string;
  code: string;
  name: string;
  values: {
    id: string;
    code: string;
    name: string;
  }[];
};

export const normalizeFacets = (product: Product): FacetValue[] => {
  const facetMap = new Map<string, FacetValue>();
  product.facetValues.forEach((fv) => {
    const facet = facetMap.get(fv.facet.id);
    if (facet) {
      facet.values.push({ id: fv.id, code: fv.code, name: fv.name });
    } else {
      facetMap.set(fv.facet.id, {
        id: fv.facet.id,
        code: fv.facet.code,
        name: fv.facet.name,
        values: [{ id: fv.id, code: fv.code, name: fv.name }]
      });
    }
  });
  const res = Array.from(facetMap.values()).map((f) => ({
    id: f.id,
    code: f.code,
    name: f.name,
    values: f.values
  }));
  return res;
};
