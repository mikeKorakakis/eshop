import OrderView from '@/components/order/OrderView';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import Spinner from '@/components/ui/Spinner';
import { getOrder } from '@/lib/actions';
import { client } from '@/lib/client';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { Order } from '@/types/types';
import React, { Suspense } from 'react';

type Props = {
	params: {
		id: number;
	};
	searchParams?: { [key: string]: string | string[] | undefined };
} & LanguageProps;

export default async function OrderPage({ params: { id, lng } }: Props) {
	const dictionary = await getDictionary(lng);

	const order = await getOrder({order_id: id});
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
				<Suspense fallback={<Spinner centered />}>
					<OrderView dictionary={dictionary} order={order} lng={lng} />
				</Suspense>
			</div>
		</>
	);
}
