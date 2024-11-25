import { TAGS } from '@/lib/constants';
import { shopSdk } from '@/lib/graphql-wrapper';
import {
  ActiveCustomerAddressesQuery,
  ActiveCustomerOrdersQuery,
  ActiveCustomerOrdersQueryVariables,
  ActiveCustomerQuery,
  CreateAddressInput,
  Customer,
  UpdateAddressInput,
  UpdateCustomerPasswordMutationMutation
} from '@/lib/vendure/generated/graphql-shop';
import gql from 'graphql-tag';

export const getActiveCustomerQuery = async () => {
  return shopSdk
    .activeCustomer(undefined, { next: { tags: [TAGS.customer] } })
    .then((res: ActiveCustomerQuery) => res.activeCustomer as Customer);
};

export const getActiveCustomerAddressesQuery = async () => {
  const customer = await shopSdk
    .activeCustomerAddresses(undefined, { next: { tags: [TAGS.addresses] } })
    .then((res: ActiveCustomerAddressesQuery) => res.activeCustomer as Customer);
  return customer?.addresses?.sort((address1, address2) => {
    return new Date(address1.createdAt).getTime() - new Date(address2.createdAt).getTime();
  });
};

export const updateCustomerPasswordMutation = async (
  currentPassword: string,
  newPassword: string
) => {
  return shopSdk
    .updateCustomerPasswordMutation({ currentPassword, newPassword })
    .then((res: UpdateCustomerPasswordMutationMutation) => res.updateCustomerPassword);
};

export const deleteCustomerAddressMutation = async (id: string) => {
  return shopSdk.deleteCustomerAddress({ id });
};

export const getActiveCustomerOrdersQuery = async (take: number, skip: number) => {
  const variables: ActiveCustomerOrdersQueryVariables = {
    options: {
      take,
      skip,
      filter: {
        active: {
          eq: false
        }
      },
      sort: {
        createdAt: 'DESC'
      }
    }
  };
  return shopSdk
    .activeCustomerOrders(variables)
    .then((res: ActiveCustomerOrdersQuery) => res.activeCustomer as Customer);
};

export const updateCustomerAddressMutation = async (
  input: UpdateAddressInput,
  token: string | undefined
) => {
  return shopSdk.updateCustomerAddressMutation({ input }, { token });
};

export const setCustomerAddressAsDefault = async (id: string, type: string) => {
  const inputVariables =
    type === 'shipping' ? { defaultShippingAddress: true } : { defaultBillingAddress: true };
  return updateCustomerAddressMutation(
    {
      id,
      ...inputVariables
    },
    undefined
  );
};

export const createCustomerAddressMutation = (
  input: CreateAddressInput,
  token: string | undefined
) => {
  return shopSdk.createCustomerAddressMutation({ input }, { token });
};

gql`
  query activeCustomerAddresses {
    activeCustomer {
      id
      addresses {
        id
        fullName
        company
        city
        streetLine1
        streetLine2
        phoneNumber
        country {
          code
          languageCode
          name
        }
        postalCode
        province
        defaultShippingAddress
        defaultBillingAddress
        createdAt
      }
    }
  }
`;

gql`
  query activeCustomer {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
    }
  }
`;

gql`
  mutation createCustomerAddress($input: CreateAddressInput!) {
    createCustomerAddress(input: $input) {
      ...Address
      __typename
    }
  }

  fragment Address on Address {
    id
    fullName
    company
    streetLine1
    streetLine2
    city
    province
    postalCode
    country {
      id
      code
      name
      __typename
    }
    phoneNumber
    defaultShippingAddress
    defaultBillingAddress
    __typename
  }
`;

gql`
  mutation updateCustomerAddress($input: UpdateAddressInput!) {
    updateCustomerAddress(input: $input) {
      ...Address
      __typename
    }
  }
`;

gql`
  query activeCustomerOrders($options: OrderListOptions) {
    activeCustomer {
      id
      orders(options: $options) {
        items {
          id
          code
          state
          total
          totalWithTax
          currencyCode
          orderPlacedAt
          lines {
            featuredAsset {
              preview
            }
            productVariant {
              id
              name
              product {
                slug
              }
            }
          }
        }
        totalItems
      }
    }
  }
`;

gql`
  mutation updateCustomerPasswordMutation($currentPassword: String!, $newPassword: String!) {
    updateCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      ... on Success {
        success
        __typename
      }
      ...ErrorResult
      __typename
    }
  }

  fragment ErrorResult on ErrorResult {
    errorCode
    message
    __typename
  }
`;

gql`
  mutation deleteCustomerAddress($id: ID!) {
    deleteCustomerAddress(id: $id) {
      success
    }
  }
`;

gql`
  mutation updateCustomerAddressMutation($input: UpdateAddressInput!) {
    updateCustomerAddress(input: $input) {
      ...Address
      __typename
    }
  }

  fragment Address on Address {
    id
    fullName
    company
    streetLine1
    streetLine2
    city
    province
    postalCode
    country {
      id
      code
      name
      __typename
    }
    phoneNumber
    defaultShippingAddress
    defaultBillingAddress
    __typename
  }
`;

gql`
  mutation createCustomerAddressMutation($input: CreateAddressInput!) {
    createCustomerAddress(input: $input) {
      ...Address
      __typename
    }
  }

  fragment Address on Address {
    id
    fullName
    company
    streetLine1
    streetLine2
    city
    province
    postalCode
    country {
      id
      code
      name
      __typename
    }
    phoneNumber
    defaultShippingAddress
    defaultBillingAddress
    __typename
  }
`;
