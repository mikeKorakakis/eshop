import type { CodegenConfig } from '@graphql-codegen/cli';
import { DEV_API, IS_DEV, IS_LOCAL, LOCAL_API, PROD_API } from './lib/constants';

let GRAPHQL_API = IS_DEV
	? DEV_API
	: IS_LOCAL
	? LOCAL_API
	: PROD_API;

GRAPHQL_API = `${GRAPHQL_API}/admin-api`;

const config: CodegenConfig = {
	schema: [GRAPHQL_API, 'type Mutation { createStripePaymentIntent: String }'],
	documents: ['"lib/vendure/admin/**/*.{ts,tsx}"', '!lib/vendure/generated/*'],
	generates: {
		'lib/vendure/generated/graphql-admin.ts': {
			config: {
				enumsAsConst: true,
			},
			plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
		},
		'lib/vendure/generated/schema-admin.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;
