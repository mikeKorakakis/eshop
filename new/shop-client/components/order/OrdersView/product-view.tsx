import placeholderImg from '@/assets/images/product-img-placeholder.svg';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { formatImage } from '@/lib/helpers';
import { Dictionary } from '@/lib/get-dictionary';
import { getProduct } from '@/lib/actions';
import ProductButton from './product-button';


type Props = {
	productId: number;
	dictionary: Dictionary
}

export default async function ProductView({ productId, dictionary }: Props) {
	const order_dictionary = dictionary.order;
	const product = await getProduct({ product_id: productId });

	if (!product) return


	return (
		<>
			<div key={product.product_id} className="py-6 sm:flex">
				<div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
					<Image
						src={formatImage(product?.image_url) || placeholderImg}
						alt={product?.name || 'product image'}
						className="size-20 flex-none rounded-md object-scale-down sm:size-48"

						// className="object-contain object-center"
						width={500}
						height={500}
					/>

					<div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
						<h3 className="text-sm font-medium text-gray-900">
							<Link href={`/product${product?.product_id}`}>
								{product?.name}
							</Link>
							{/* <a href={product.href}>{product.name}</a> */}
						</h3>
						{/* <p className="truncate text-sm text-gray-500">
							<span>{product.color}</span>{' '}
							<span aria-hidden="true" className="mx-1 text-gray-400">
								&middot;
							</span>{' '}
							<span>{product.size}</span>
						</p> */}
						<p className="mt-1 font-medium text-gray-900">{product.price}</p>
					</div>
				</div>
				<div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
					<ProductButton dictionary={dictionary} productId={product.product_id!}/>
					{/* <button
												type="button"
												className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:grow-0"
											>
												Shop similar
											</button> */}
				</div>
			</div>



		</>
	)
}
