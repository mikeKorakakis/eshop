'use client';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import cn from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import s from './cart-item.module.css';
import { useUI } from '@/lib/context/ui-context';
import Quantity from '@/components/ui/Quantity';
// import { useTranslation } from 'next-i18next'
import { Dictionary } from '@/lib/get-dictionary';
import { formatPrice } from '@/lib/utils';
import { CartItem as CartContextItem } from '@/types';
import { useCart } from '@/lib/context/cart-context';
import { formatImage } from '@/lib/helpers';

type ItemOption = {
	name: string;
	nameId: number;
	value: string;
	valueId: number;
	disabled?: boolean;
	removing: boolean;
	increasing: boolean;
	decreasing: boolean;
	setRemoving: Dispatch<SetStateAction<boolean>>;
	setIncreasing: Dispatch<SetStateAction<boolean>>;
	setDecreasing: Dispatch<SetStateAction<boolean>>;
};

const placeholderImg = '/product-img-placeholder.svg';

const CartItem = ({
	disabled,
	item,
	variant = 'default',
	currencyCode,
	dictionary,
	setCalculating,
	...rest
}: {
	variant?: 'default' | 'display';
	item: CartContextItem;
	currencyCode: string;
	disabled?: boolean;
	dictionary: Dictionary;
	setCalculating: Dispatch<SetStateAction<boolean>>;
	//   setActiveOrder: Dispatch<SetStateAction<Order | null>>;
}) => {

	const { items, addToCart, updateQuantity, removeFromCart } = useCart()
	const common_dictionary = dictionary.common;
	const { closeSidebarIfPresent } = useUI();

	const [removing, setRemoving] = useState<boolean>(false);
	const [increasing, setIncreasing] = useState<boolean>(false);
	const [decreasing, setDecreasing] = useState<boolean>(false);
	const [quantity, setQuantity] = useState<number>(items.length);
	useEffect(() => {
		setCalculating(increasing || decreasing || removing);
	}, [increasing, decreasing, removing, setCalculating])




	const price = item?.price;

	const handleChange = async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		setQuantity(Number(value));
		await updateQuantity(item.id!, Number(value));
	};

	const increaseQuantity = async (n = 1) => {
		setIncreasing(true);
		try {
			const val = Number(quantity) + n;
			setQuantity(val);
			await updateQuantity(item.id!, Number(val));
		} catch (err) {
			console.error(err);
		} finally {
			setIncreasing(false);
		}
	};

	const decreaseQuantity = async (n = 1) => {
		setDecreasing(true);
		try {
			const val = Number(quantity) - n;
			setQuantity(val);
			await updateQuantity(item.id!, Number(val));
		} catch (err) {
			console.error(err);
		} finally {
			setDecreasing(false);
		}
	};

	const handleRemove = async () => {
		setRemoving(true);
		try {
			await removeFromCart(item.id!)
		} catch (error) {
			console.error(error);
		} finally {
			setRemoving(false);
		}
	};

	console.log('item', item);	



	return (
		<>
			<li
				className={cn(s.root, {
					'pointer-events-none opacity-50': removing
				})}
				{...rest}
			>
				<div className="flex flex-row space-x-4 py-4">
					<div className="relative h-16 w-16 cursor-pointer overflow-hidden bg-white rounded-md p-1">
						<Link href={`/product/${item?.name}`}>
						
							<Image
								onClick={() => closeSidebarIfPresent()}
								className={s.productImage}
								width={500}
								height={500}

								//   src={placeholderImg}
								src={item?.imageUrl ? formatImage(item?.imageUrl) : placeholderImg}
								
								alt={'Product Image'}
							/>
						</Link>
					</div>
					<div className="flex flex-1 flex-col text-base">
						<Link href={`/product${item?.id}`}>
							<span className={s.productName} onClick={() => closeSidebarIfPresent()}>
								{item.name}
							</span>
						</Link>
						
						{variant === 'display' && <div className="text-sm tracking-wider">{quantity}x</div>}
					</div>
					<div className="flex flex-col justify-between space-y-2 text-sm">
						<span>{price && formatPrice(price, currencyCode)}</span>
						
					</div>
					{/* <div className="flex flex-col justify-between space-y-2 text-sm"> */}
					{/* </div> */}
				</div>
				{variant === 'default' && (
					<Quantity
						removing={removing}
						disabled={disabled}
						value={quantity}
						handleRemove={handleRemove}
						handleChange={handleChange}
						increase={() => increaseQuantity(1)}
						decrease={() => decreaseQuantity(1)}
						increasing={increasing}
						decreasing={decreasing}
					/>
				)}
			</li>
		</>
	);
};

export default CartItem;
