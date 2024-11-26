// import { getSdk, type LogicalOperator } from '~/generated/graphql';
import { requester } from '@/lib/client';
import { getSdk as getAdminSdk } from '@/lib/vendure/generated/graphql-admin';
import { getSdk as getShopSdk, type LogicalOperator } from '@/lib/vendure/generated/graphql-shop';

export type SortDirection = 'DESC' | 'ASC';

export interface Options {
	// Vendure Channel code or token.
	channelToken?: string;
	// Auth bearer token
	token?: string;
	// The API URL to call. This can be the local shop API, dev shop API,
	// dev admin API, production shop API..etc.
	apiUrl?: string;
	take?: number;
	sort?: {
		updatedAt?: SortDirection;
		createdAt?: SortDirection;
		totalWithTax?: SortDirection;
		totalQuantity?: SortDirection;
	};
	skip?: number;
	filter?: { [name: string]: { [operator: string]: number | string } };
	filterOperator?: LogicalOperator;
    next?: NextFetchRequestConfig;
    buildTime?: boolean;
    languageCode?: string;
}

// @ts-ignore
export const shopSdk = getShopSdk<Options>(requester);
// @ts-ignore
export const adminSdk = getAdminSdk<Options>(requester);
