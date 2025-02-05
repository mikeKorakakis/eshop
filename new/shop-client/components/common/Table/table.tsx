'use client';
import React, { useEffect, useState } from 'react';
import { Dictionary } from '@/lib/get-dictionary';
import { useRouter } from 'next/navigation';
import ImageButton from '@/components/ui/ImageButton';
import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatImage, formatPrice, isValidDate } from '@/lib/helpers';
import Image from 'next/image';
import { getCustomer } from '@/lib/actions';
import placeholderImg from '@/assets/images/product-img-placeholder.svg';
import { Product } from '@/types';

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
					{headers.map((header,i) => (
						<th
							key={i}
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

	if(key === 'shipping'){
		return  <div className="w-32 break-words whitespace-normal">{value}</div>
	}
	
	if (key.includes("media") || key.includes("avatar_url") && value) {
		return <Image
			src={value?.path ? formatImage(value?.path) : placeholderImg}
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
	if (key === "items") {
		return value.map((product: Product, i: number) => <div className='flex items-center' key={i}>
		<Image
			src={product?.media?.path ? formatImage(product?.media?.path!) : placeholderImg}
			width={40}
			height={40}
			alt="image"
			className="w-8 mr-2" />
		<span className="mr-2">{product?.name}</span>
		<span >{formatPrice(product?.price, "EUR")}</span>
	</div >)
	}
	if (key === "user"){
		return <>{value.full_name}</>
	}

	return value;
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

