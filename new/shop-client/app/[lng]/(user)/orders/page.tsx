import OrderView from '@/components/order/OrdersView';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { getUserOrders } from '@/lib/actions';
import { test_user_id } from '@/lib/constants';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/types';
import React from 'react';

type Props = {
	params: {
		id: number;
	};
	searchParams?: { [key: string]: string | string[] | undefined };
} & LanguageProps;

export default async function OrderPage({ params: { id, lng } }: Props) {
	const dictionary = await getDictionary(lng);
	const orders = await getUserOrders({ user_id: test_user_id })
	const order_dictionary = dictionary.order;
	const common_dictionary = dictionary.common;

	return (
		<>
			<div className="absolute  z-10 mt-6 w-full">
				<div className="relative mx-auto max-w-screen-2xl px-6">
					<BreadCrumbs
						navigation={[
							{ name: common_dictionary.home!, href: '/' },
							{ name: order_dictionary.order, href: '#' }
						]}
					/>
				</div>
			</div>
			<div>
				<main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8">
					<div className="max-w-xl">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">{order_dictionary.orders_header}</h1>
						<p className="mt-2 text-sm text-gray-500">
							{order_dictionary.orders_subheader}
						</p>
					</div>

					<div className="mt-12 space-y-16 sm:mt-16">
						{orders.map((order) => (
							<OrderView dictionary={dictionary} order={order} lng={lng} key={order.order_id} />
						))}
					</div>
				</main>
			</div>
		</>
	);
}
