import { shopSdk } from '@/lib/graphql-wrapper';
import {
  ListedProductFragment,
  Product,
  ProductQuery,
  RelatedProductFragment,
  SearchInput,
  SearchResponse,
  SearchResultAsset
} from '@/lib/vendure/generated/graphql-shop';
import gql from 'graphql-tag';

export const search = async (searchInput: SearchInput) => {
  return await shopSdk
    .search({ input: { groupByProduct: true, ...searchInput } })
    .then((res) => res.search as SearchResponse);
};

export const searchQueryWithCollectionSlug = async (collectionSlug: string) =>
  search({ collectionSlug });

export const searchQueryWithTerm = async (
  collectionSlug: string,
  term: string,
  facetValueIds: string[]
) => search({ collectionSlug, term, facetValueFilters: [{ or: facetValueIds }] });

export const getProductBySlug = async (slug: string) => {
  return shopSdk.product({ slug }).then((res: ProductQuery) => res.product as Product);
};

export const getProducts = async (take: number) => {
  return shopSdk.getAllProducts({ first: take }).then((res) => res.products.items as Product[]);
};

type GetAllProductsType = {
  take: number;
  buildTime?: boolean;
  languageCode?: string;
};
export const getAllProducts = async ({ take, buildTime, languageCode }: GetAllProductsType) => {
  return shopSdk
    .getAllProducts({ first: take }, { buildTime, languageCode })
    .then((res) => res.products);
};

export const mapRelatedProductsToSearchResult = (
  relatedProducts: RelatedProductFragment[]
): ListedProductFragment[] => {
  return relatedProducts.map((product) => ({
    productId: product.id,
    productName: product.name,
    slug: product.slug,
    productAsset: product.assets[0] as SearchResultAsset,
    currencyCode: product?.variantList?.items[0]?.currencyCode ?? 'EUR',
    priceWithTax: {
      min: product?.variantList?.items[0]?.priceWithTax ?? 0,
      max: product?.variantList?.items[0]?.priceWithTax ?? 0
    },
    productVariantId: product?.variantList.items[0]?.id ?? '',
    inStock: true
  }));
};

export const detailedProductFragment = gql`
  fragment DetailedProduct on Product {
    id
    name
    slug
    updatedAt
    description
    collections {
      id
      slug
      name
      breadcrumbs {
        id
        name
        slug
      }
    }
    facetValues {
      facet {
        id
        code
        name
        # values {
        #   id
        #   name
        #   code
        # }
      }
      id
      code
      name
    }
    featuredAsset {
      id
      preview
      width
      height
    }
    assets {
      id
      preview
    }
    variants {
      id
      name
      priceWithTax
      price
      currencyCode
      sku
      stockLevel
      featuredAsset {
        id
        preview
      }
      options {
        id
        name
        code
        groupId
        group {
          id
          #   options {
          #     name
          #   }
        }
      }
    }
    optionGroups {
      id
      code
      name
      options {
        id
        name
      }
    }
  }
`;

export const relatedProductFragment = gql`
  fragment RelatedProduct on Product {
    id
    name
    slug
    assets {
      id
      preview
    }
    variantList {
      items {
        id
        currencyCode
        priceWithTax
      }
    }
  }
`;

gql`
  query product($slug: String, $id: ID) {
    product(slug: $slug, id: $id) {
      ...DetailedProduct
      customFields {
        relatedProducts {
          ...RelatedProduct
        }
      }
    }
  }
`;

export const listedProductFragment = gql`
  fragment ListedProduct on SearchResult {
    productVariantId
    inStock
    productId
    productName
    slug
    productAsset {
      id
      preview
    }
    currencyCode
    priceWithTax {
      ... on PriceRange {
        min
        max
      }
      ... on SinglePrice {
        value
      }
    }
  }
`;

gql`
  query search($input: SearchInput!) {
    search(input: $input) {
      totalItems
      items {
        ...ListedProduct
      }
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
          }
        }
      }
    }
  }
  ${listedProductFragment}
`;

gql`
  query getAllProducts($first: Int = 100) {
    products(options: { take: $first }) {
      totalItems
      items {
        ...DetailedProduct
      }
    }
  }
`;
