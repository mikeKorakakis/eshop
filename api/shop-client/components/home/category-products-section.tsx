import React, { Suspense } from 'react';
import { Dictionary } from '@/lib/get-dictionary';
import { client } from '@/lib/client';
import { ProductList } from '../product/ProductList';
import { getProducts, getProductsByCategory } from '@/lib/actions';

interface Props {
	dictionary: Dictionary;
	category_id: number
}

export default async function CategoryProductsSection({ dictionary, category_id }: Props) {

	const products = await getProductsByCategory({category_id});

	

	return (
			<Suspense fallback={<div>Loading...</div>}>
				<ProductList
					dictionary={dictionary}
					products={products}
				/>
			</Suspense>
	);
}
