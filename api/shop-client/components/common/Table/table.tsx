'use client';
import React, { Suspense, use, useEffect, useState } from 'react';
import { formatPrice, isValidDate } from '@/lib/utils';
import { Dictionary } from '@/lib/get-dictionary';
import { useRouter } from 'next/navigation';
import ImageButton from '@/components/ui/ImageButton';
import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { imageUrl } from '@/lib/helpers';
import Image from 'next/image';
import { get } from 'http';
import { getCategory, getCustomer, getOrderItems, getOrders, getProduct, getProducts } from '@/lib/actions';
import { Product as ProductType } from '@/types/types';
import Spinner from '@/components/ui/Spinner';
import Link from 'next/link';

// generate generic typescript props from transactions interface
type Props = {
	headers: string[];
	values: { [key: string]: any }[];
	skip: number;
	isLoading?: boolean;
	dictionary: Dictionary;
	editAction?: (id: number) => void;
	createAction?: () => void;
	deleteAction?: (id: number) => void;
	noEdit?: boolean;
};

export default function Table({ headers, values, skip, isLoading, dictionary, editAction, createAction, deleteAction, noEdit }: Props) {
	const profile_dictionary = dictionary.profile;
	const common_dictionary = dictionary.common;
	const router = useRouter();
	return (
		<table className="min-w-full divide-y divide-gray-300">
			<thead className="bg-gray-50">
				<tr>
					{headers.map((header) => (
						<th
							key={header}
							scope="col"
							className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
						>
							{header}
						</th>
					))}
					{!noEdit && createAction && <th
						scope="col"
						className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
					>
						<ImageButton icon={<PlusIcon className='size-5' />} onClick={() => createAction()} />
					</th>
					}

				</tr>
			</thead>
			{isLoading || values.length === 0 ? (
				<tbody className="divide-y divide-gray-200 bg-white">
					{Array.from({ length: 10 }).map((_, i) => (
						<tr key={i} className="hover:bg-gray-100">
							<td
								className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
								colSpan={6}
							>
								<div className="h-6 w-full animate-pulse rounded bg-gray-300"></div>
							</td>
						</tr>
					))}
				</tbody>
			) : (
				<tbody className="divide-y divide-gray-200 bg-white">
					{values.map((value, i) => (
						<tr
							key={i}
							className="cursor-pointer hover:bg-gray-100"
						>
							<td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
								{skip + i + 1}
							</td>
							{Object.keys(value).map((key) => (
								!(key === "id") &&

								<td key={key} className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
									{/* 
									//@ts-ignore */}
									{formatValue(value[key], key, dictionary)}
									
								</td>
							))}
							{!noEdit && <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 gap-2 flex">
								{editAction && <ImageButton icon={<PencilSquareIcon className='size-5' />} onClick={() => editAction(value.id)} />}
								{deleteAction && <ImageButton icon={<TrashIcon className='size-5' />} onClick={() => deleteAction(value.id)} />}
							</td>}

						</tr>
					))}
				</tbody>
			)}
		</table>
	);
}


const formatValue =  (value: any, key: string, dictionary: Dictionary) => {
	const admin_dictionary = dictionary.admin;

	if(key === "group_id") {	
		if(value === 0) {
			return admin_dictionary.admin;
		}
		if(value === 1) {
			return admin_dictionary.customer;
		}
	}
	if (key === "category_id" || key === "parent_id") {
		
		return <Category category_id={value} />
	}
	if (key.includes("image") || key.includes("avatar_url") && value) {
		return <Image
			src={imageUrl(value)}
			width={40}
			height={40}
			alt="image"
			className="w-10" />
	}
	if (isValidDate(value) && key.includes("date")) {
		return new Date(value).toLocaleDateString();
	}
	if (key.includes("price") || key.includes("amount")) {
		return formatPrice(value, "EUR");
	}
	if (key === "user_id") {
		return <Customer customer_id={value} />

	}
	if (key === "product_id") {
		return <Product product_id={value} />
	}
	if (key === "order_id") {
		return <Orders order_id={value} />
	}


	return value;
}

const Category = ({ category_id }: { category_id: number }) => {
	const [categoryName, setCategoryName] = useState<string | undefined>(undefined);
	useEffect(() => {
		const getCategoryName = async () => {
			const category = await getCategory({ category_id });
			setCategoryName(category?.name);
		}
		getCategoryName();
	}, [category_id]);
	return <span>{categoryName}</span>
}


export const Customer = ({ customer_id }: { customer_id: number }) => {
	const [customerName, setCustomerName] = useState<string | undefined>(undefined);
	useEffect(() => {
		const getCustomerName = async () => {
			const customer = await getCustomer({ customer_id });
			setCustomerName(customer?.full_name);
		}
		getCustomerName();
	}, [customer_id]);

	return <span>{customerName}</span>
}

const Product = ({ product_id }: { product_id: number }) => {
	const [productName, setProductName] = useState<string | undefined>(undefined);
	useEffect(() => {
		const getProductName = async () => {
			const product = await getProduct({ product_id });
			setProductName(product?.name);
		}
		getProductName();
	}, [product_id]);

	return <span>{productName}</span>
}

export const Orders = ({ order_id }: { order_id: number }) => {
	const [productIds, setProductIds] = useState<number[]>([]);
	useEffect(() => {
		const getOrds = async () => {
			const ords = await getOrderItems();
			const orderOrderItems = ords?.filter((order) => (order.order_id === order_id));
			if (!orderOrderItems) return

			setProductIds(orderOrderItems.map((order) => order.product_id!));
		}
		getOrds();
	}, [order_id]);


	return (<ul>
		{productIds.map(productId => (
			<li><OrderProduct productId={productId} /></li>
		))}
	</ul>
	)

}

export const OrderProduct = ({ productId }: { productId: number }) => {
	const [product, setProduct] = useState<ProductType>();
	useEffect(() => {
		const getProds = async () => {
			const orderProduct = await getProduct({ product_id: productId });
			if (!orderProduct) return
			setProduct(orderProduct);
		}
		getProds();
	}, [productId]);

	return <div className='flex items-center'>
		<Image
			src={imageUrl(product?.image_url!)}
			width={40}
			height={40}
			alt="image"
			className="w-8 mr-2" />
		<span className="mr-2">{product?.name}</span>
		<span >{formatPrice(product?.price, "EUR")}</span>
	</div >
}