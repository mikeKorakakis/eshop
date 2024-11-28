import React, { Suspense } from 'react';
import { Dictionary } from '@/lib/get-dictionary';
import { client } from '@/lib/client';
import { ProductList } from '../product/ProductList';
import { Item } from '@/types/types';

interface Props {
	dictionary: Dictionary;
	category_id: number
}

export default async function CategoryProductsSection({ dictionary, category_id }: Props) {

	const res = await client.GET(`/items`);
	let products = res.data?.data as Item[];

	return (
			<Suspense fallback={<div>Loading...</div>}>
				<ProductList
					dictionary={dictionary}
					products={products}
				/>
			</Suspense>
	);
}
