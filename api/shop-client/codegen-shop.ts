import type { CodegenConfig } from '@graphql-codegen/cli';
import { DEV_API, IS_DEV, IS_LOCAL, LOCAL_API, PROD_API } from './lib/constants';

let GRAPHQL_API = IS_DEV
	? DEV_API
	: IS_LOCAL
	? LOCAL_API
	: PROD_API;

GRAPHQL_API = `${GRAPHQL_API}/shop-api`;

const config: CodegenConfig = {
	schema: [
		GRAPHQL_API,
		'type Mutation { createStripePaymentIntent: String }',
		'type Query { generateBraintreeClientToken(orderId: ID, includeCustomerId: Boolean): String }',
	],
	documents: ['"lib/vendure/shop/**/*.{ts,tsx}"', '!lib/vendure/generated/*'],
	generates: {
		'lib/vendure/generated/graphql-shop.ts': {
			config: {
				enumsAsConst: true,
			},
			plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
		},
		'lib/vendure/generated/schema-shop.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;
