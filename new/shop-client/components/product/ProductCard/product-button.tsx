'use client'

import Button from '@/components/ui/Button';
import { useUI } from '@/lib/context/ui-context';
import { Dictionary } from '@/lib/get-dictionary';
import { useState } from 'react';
import { wait } from '@/lib/utils';
import { Product } from '@/types';
import { useCart } from '@/lib/context/cart-context';
import toast from 'react-hot-toast';

type Props = {
	dictionary: Dictionary;
	product: Product;
};
export default function ProductButton({ dictionary, product }: Props) {
	const { setSidebarView, openSidebar } = useUI();
	const [loading, setLoading] = useState(false);
	const common_dictionary = dictionary.common;
	const { addToCart } = useCart()

	const handleAddToCart = async () => {
		setLoading(true);
		try {
			addToCart({
				id: product.product_id!,
				imageUrl: product?.media?.path,
				name: product.name,
				price: product.price,
			})
			setSidebarView('CART_VIEW');
			openSidebar();
			setLoading(false);
		} catch (err) {
			setLoading(false);
			if (err instanceof Error) {
				console.error(err);
				toast.error(common_dictionary.product_cart_error)

			}
		}
	};
	return (
		<Button
			onClick={() => handleAddToCart()}
			className="w-full"
			loading={loading}
		>
			{common_dictionary.add_to_cart}
			<span className="sr-only">, {product.name}</span>
		</Button>
	);
}
