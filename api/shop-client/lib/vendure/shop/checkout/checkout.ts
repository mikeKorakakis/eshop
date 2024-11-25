import { shopSdk } from '@/lib/graphql-wrapper';
import {
    AddPaymentToOrderMutation,
    AvailableCountriesQuery,
    Country,
    CreateStripePaymentIntentMutation,
    EligiblePaymentMethodsQuery,
    EligibleShippingMethodsQuery,
    GenerateBraintreeClientTokenQuery,
    Order,
    PaymentInput,
    PaymentMethodQuote,
    ShippingMethodQuote,
} from '@/lib/vendure/generated/graphql-shop';
import gql from 'graphql-tag';

export const getAvailableCountriesQuery = async () => {
	return shopSdk
		.availableCountries({})
		.then((res: AvailableCountriesQuery) => res?.availableCountries as Country[]);
};

export const addPaymentToOrderMutation = async (
	input: PaymentInput = { method: 'standard-payment', metadata: {} }
) => {
	return shopSdk
		.addPaymentToOrder({ input })
		.then((res: AddPaymentToOrderMutation) => res.addPaymentToOrder as Order);
};

export const transitionOrderToStateMutation = async (state = 'ArrangingPayment') => {
	return shopSdk.transitionOrderToState({ state });
};

export const getEligibleShippingMethodsQuery = async () => {
	return shopSdk
		.eligibleShippingMethods()
		.then(
			(res: EligibleShippingMethodsQuery) => res.eligibleShippingMethods as ShippingMethodQuote[]
		);
};

export const getEligiblePaymentMethodsQuery = async () => {
	return shopSdk
		.eligiblePaymentMethods({})
		.then((res: EligiblePaymentMethodsQuery) => res.eligiblePaymentMethods as PaymentMethodQuote[]);
};

export const createStripePaymentIntentMutation = async () => {
	return shopSdk
		.createStripePaymentIntent()
		.then((res: CreateStripePaymentIntentMutation) => res.createStripePaymentIntent as string);
};

export const generateBraintreeClientTokenQuery = async (
	orderId: string,
	includeCustomerId: boolean
) => {
	return shopSdk
		.generateBraintreeClientToken({ orderId, includeCustomerId })
		.then((res: GenerateBraintreeClientTokenQuery) => res.generateBraintreeClientToken);
};

gql`
	query availableCountries {
		availableCountries {
			id
			name
			code
		}
	}
`;

gql`
	query eligibleShippingMethods {
		eligibleShippingMethods {
			id
			name
			description
			metadata
			price
			priceWithTax
		}
	}
`;

gql`
	mutation addPaymentToOrder($input: PaymentInput!) {
		addPaymentToOrder(input: $input) {
			...OrderDetail
			... on ErrorResult {
				errorCode
				message
			}
		}
	}
`;

gql`
	mutation transitionOrderToState($state: String!) {
		transitionOrderToState(state: $state) {
			...OrderDetail
			... on ErrorResult {
				errorCode
				message
			}
		}
	}
`;

gql`
	query eligiblePaymentMethods {
		eligiblePaymentMethods {
			id
			code
			name
			description
			eligibilityMessage
			isEligible
		}
	}
`;

gql`
	mutation createStripePaymentIntent {
		createStripePaymentIntent
	}
`;

gql`
	query generateBraintreeClientToken($orderId: ID!, $includeCustomerId: Boolean!) {
		generateBraintreeClientToken(orderId: $orderId, includeCustomerId: $includeCustomerId)
	}
`;
