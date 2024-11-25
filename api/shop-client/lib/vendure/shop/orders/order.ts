import { TAGS } from '@/lib/constants';
import { shopSdk } from '@/lib/graphql-wrapper';
import {
  ActiveOrderQuery,
  AddItemToOrderMutation,
  AdjustOrderLineMutation,
  CreateAddressInput,
  CreateCustomerInput,
  Order,
  OrderByCodeQuery,
  RemoveOrderLineMutation,
  SetCustomerForOrderMutation,
  SetOrderBillingAddressMutation,
  SetOrderShippingAddressMutation,
  SetOrderShippingMethodMutation
} from '@/lib/vendure/generated/graphql-shop';
import gql from 'graphql-tag';

export const getActiveOrderQuery = async () => {
  return shopSdk
    .activeOrder(undefined, { next: { tags: [TAGS.order] } })
    .then((res: ActiveOrderQuery) => res.activeOrder as Order);
};

export const getOrderByCodeQuery = async (code: string) => {
  return shopSdk.orderByCode({ code }).then((res: OrderByCodeQuery) => res.orderByCode as Order);
};

export const addItemToOrderMutation = async (productVariantId: string, quantity: number) => {
  return shopSdk
    .addItemToOrder({ productVariantId, quantity })
    .then((res: AddItemToOrderMutation) => res.addItemToOrder);
};

export const removeOrderLineMutation = async (lineId: string) => {
  return shopSdk
    .removeOrderLine({ orderLineId: lineId })
    .then((res: RemoveOrderLineMutation) => res.removeOrderLine as Order);
};

export const adjustOrderLineMutation = async (lineId: string, quantity: number) => {
  return shopSdk
    .adjustOrderLine({ orderLineId: lineId, quantity })
    .then((res: AdjustOrderLineMutation) => res.adjustOrderLine as Order);
};

export const setOrderShippingAddressMutation = async (input: CreateAddressInput) => {
  return shopSdk
    .setOrderShippingAddress({ input })
    .then((res: SetOrderShippingAddressMutation) => res.setOrderShippingAddress);
};

export const setOrderBillingAddressMutation = async (input: CreateAddressInput) => {
  return shopSdk
    .setOrderBillingAddress({ input })
    .then((res: SetOrderBillingAddressMutation) => res.setOrderBillingAddress);
};

export const setOrderShippingMethodMutation = async (shippingMethodId: string[]) => {
  return shopSdk
    .setOrderShippingMethod({ shippingMethodId })
    .then((res: SetOrderShippingMethodMutation) => res.setOrderShippingMethod as Order);
};

export const setCustomerForOrderMutation = async (input: CreateCustomerInput) => {
  return shopSdk
    .setCustomerForOrder({ input })
    .then((res: SetCustomerForOrderMutation) => res.setCustomerForOrder);
};

gql`
  mutation setOrderShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation setOrderBillingAddress($input: CreateAddressInput!) {
    setOrderBillingAddress(input: $input) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation setCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation addItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation setOrderShippingMethod($shippingMethodId: [ID!]!) {
    setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  fragment OrderDetail on Order {
    __typename
    id
    code
    active
    createdAt
    state
    currencyCode
    totalQuantity
    subTotal
    subTotalWithTax
    customer {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
    }
    taxSummary {
      description
      taxRate
      taxTotal
    }
    shipping
    shippingWithTax
    totalWithTax
    customer {
      id
      firstName
      lastName
      emailAddress
    }
    shippingAddress {
      fullName
      streetLine1
      streetLine2
      company
      city
      province
      postalCode
      countryCode
      phoneNumber
    }
    billingAddress {
      fullName
      streetLine1
      streetLine2
      company
      city
      province
      postalCode
      countryCode
      phoneNumber
    }
    shippingLines {
      shippingMethod {
        id
        name
      }
      priceWithTax
    }
    lines {
      id
      unitPriceWithTax
      linePriceWithTax
      linePrice
      unitPrice
      quantity
      featuredAsset {
        id
        preview
      }
      productVariant {
        id
        name
        price
        product {
          id
          slug
        }
      }
    }
  }
`;

gql`
  fragment SingleOrderDetail on Order {
    __typename
    id
    code
    active
    createdAt
    state
    currencyCode
    totalQuantity
    subTotal
    subTotalWithTax
    customer {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
    }
    taxSummary {
      description
      taxRate
      taxTotal
    }
    shipping
    shippingWithTax
    totalWithTax
    customer {
      id
      firstName
      lastName
      emailAddress
    }
    shippingAddress {
      fullName
      streetLine1
      streetLine2
      company
      city
      province
      postalCode
      countryCode
      phoneNumber
    }
    billingAddress {
      fullName
      streetLine1
      streetLine2
      company
      city
      province
      postalCode
      countryCode
      phoneNumber
    }
    shippingLines {
      shippingMethod {
        id
        name
      }
      priceWithTax
    }
    lines {
      id
      unitPriceWithTax
      linePriceWithTax
      linePrice
      unitPrice
      quantity
      featuredAsset {
        id
        preview
      }
      productVariant {
        id
        name
        price
        priceWithTax
        product {
          id
          slug
          description
        }
      }
    }
    payments {
      method
      transactionId
    }
    fulfillments {
      trackingCode
      state
      createdAt
      updatedAt
    }
  }
`;

gql`
  mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  mutation removeOrderLine($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

gql`
  query activeOrder {
    activeOrder {
      ...OrderDetail
    }
  }
`;

gql`
  query orderByCode($code: String!) {
    orderByCode(code: $code) {
      ...SingleOrderDetail
    }
  }
`;
