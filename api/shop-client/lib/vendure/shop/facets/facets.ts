// import { Collection } from '@/lib/vendure/generated/graphql-shop';
import { shopSdk } from '@/lib/graphql-wrapper';
import { Facet } from '@/lib/vendure/generated/graphql-shop';
import gql from 'graphql-tag';

export const getFacets = async () => {
  return await shopSdk.facets().then((res) => res?.facets.items as Facet[]);
};

gql`
  query facets {
    facets(options: { take: 90 }) {
      items {
        id
        name
        code
        values {
          id
          name
          code
        }
      }
    }
  }
`;
