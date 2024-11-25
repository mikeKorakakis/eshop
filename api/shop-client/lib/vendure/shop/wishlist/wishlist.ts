import { shopSdk } from '@/lib/graphql-wrapper';
import gql from 'graphql-tag';
import { FavoriteList, ToggleFavoriteMutation, WishlistQuery } from '../../generated/graphql-shop';

gql`
  fragment Wishlist on FavoriteList {
    totalItems
    items {
      product {
        ...WishlistItem
      }
    }
  }
  fragment WishlistItem on Product {
    id
    name
    slug
    description
    featuredAsset {
      id
      preview
    }
    variants {
      id
      priceWithTax
      currencyCode
    }
  }
`;

// gql`
//   fragment WishlistItem on Product {
//     id
//     name
//     slug
//     description
//     assets {
//       id
//       preview
//       name
//     }
//     variants {
//       id
//       price
//       priceWithTax
//       currencyCode
//       options {
//         id
//         name
//         code
//         groupId
//         group {
//           id
//           options {
//             name
//           }
//         }
//       }
//     }
//     customFields {
//       car_url
//       sku
//     }
//     facetValues {
//       facet {
//         id
//         name
//         code
//       }
//       id
//       name
//       code
//     }
//     optionGroups {
//       id
//       code
//       name
//       options {
//         id
//         name
//       }
//     }
//     customFields {
//       relatedProducts {
//         ...Product
//       }
//     }
//   }
// `;

gql`
  query wishlist {
    activeCustomer {
      favorites(options: { take: 100 }) {
        ...Wishlist
      }
    }
  }
`;

gql`
  mutation toggleFavorite($productId: ID!) {
    toggleFavorite(options: { take: 100 }, productId: $productId) {
      __typename
      ...Wishlist
    }
  }
`;

// export const setCustomerForOrderMutation = async (input: CreateCustomerInput) => {
// 	return shopSdk
// 		.setCustomerForOrder({ input })
// 		.then((res: SetCustomerForOrderMutation) => res.setCustomerForOrder);
// };

export const getWishlistQuery = async () => {
  return shopSdk
    .wishlist(undefined, { next: { tags: ['wishlist'] } })
    .then((res: WishlistQuery) => res?.activeCustomer?.favorites as FavoriteList);
};

export const toggleWishlistItemMutation = async (productId: string) => {
  return shopSdk
    .toggleFavorite({ productId }, undefined)
    .then((res: ToggleFavoriteMutation) => res?.toggleFavorite as FavoriteList);
};
