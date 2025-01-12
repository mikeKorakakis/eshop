import React from 'react'
import { Dictionary } from '@/lib/get-dictionary';
import { getOrderItemsByOrder } from '@/lib/actions';
import ProductView from './product-view';

type Props = {
	orderId: number;
	dictionary: Dictionary
}

export default async function OrderItemView({ orderId, dictionary }: Props) {

	const orderItems = await getOrderItemsByOrder({order_id: orderId});
	return (
		<>
			{orderItems?.map(orderItem => {
				return <ProductView key={orderItem.order_item_id} dictionary={dictionary} productId={orderItem.product_id} />
			})}

		
		</>
	)
}
