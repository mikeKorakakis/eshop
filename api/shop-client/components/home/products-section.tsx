import React from 'react';
import { Dictionary } from '@/lib/get-dictionary';
import { client } from '@/lib/client';
import { ProductList } from '../product/ProductList';
import CategoryProductsSection from './category-products-section';
import { getCategories } from '@/lib/actions';

interface Props {
	dictionary: Dictionary;
}

export default async function CollectionSection({ dictionary }: Props) {

	const categories = await getCategories();
	console.log(categories);

	return (
		<div>
			{categories?.map((category) => (
				<section
					key={category.category_id}
					aria-labelledby="collection-heading"
					className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
				>
					<h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-gray-900">
						{category.name}
					</h2>
					<p className="mt-4 text-base text-gray-500">{category.description}</p>

					<div className="mt-10 space-y-12 lg:grid lg:gap-x-8 lg:space-y-0">
						<CategoryProductsSection category_id={category.category_id!} dictionary={dictionary} />

					</div>
				</section>))}
		</div>
	);
}
