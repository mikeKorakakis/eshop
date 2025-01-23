import placeholderImg from '@/assets/images/product-img-placeholder.svg';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { formatImage, formatPrice } from '@/lib/helpers';
import { getProduct } from '@/lib/actions';

type Props = {
	id: number
}

export default async function ProductView({ id }: Props) {

	const product = await getProduct({product_id: id})

	return (
		<>
			<div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
				<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50">
					<Image
						src={product?.media?.path ? formatImage(product?.media?.path) : placeholderImg}
						alt={product?.name || 'product image'}
						className="object-contain object-center"
						width={500}
						height={500}
					/>
				</div>
			</div>
			<div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
				<h3 className="text-lg font-medium text-gray-900">
					<Link href={`/product/${product?.product_id}`}>
						{product?.name}
					</Link>
				</h3>
				<p className="mt-1 font-medium text-gray-900">
					{formatPrice(product.price, "EUR")}{' '}
				</p>
				<p className="mt-3 line-clamp-3 text-gray-500">
					{product?.description}
				</p>
			</div>
		</>
	)
}
