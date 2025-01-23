import { Dictionary } from '@/lib/get-dictionary';
import Link from 'next/link';
import { LINKS } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { OrderWithItemsAndUser } from '@/types';
import OrderItemView from './order-item-view';
import { Suspense } from 'react';

type Props = {
	dictionary: Dictionary;
	order: OrderWithItemsAndUser;
	lng: string;
	redirect_status?: string
};




export default async function OrderView({ dictionary, order, lng, redirect_status }: Props) {
	const common_dictionary = dictionary.common;
	const order_dictionary = dictionary.order;

	const messageArray = [
		order_dictionary.created_order,
		order_dictionary.payed_order,
		order_dictionary.shipped_order,
		order_dictionary.delivered_order,
		order_dictionary.delivered_order
	];
	if (!order) return redirect(LINKS.link_home)
	return (
		<>


			<div className="mt-12 space-y-16 sm:mt-16">

				<section key={order.order_id} aria-labelledby={`${order.order_id}-heading`}>
					<div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
						<h2 id={`${order.order_id}-heading`} className="text-lg font-medium text-gray-900 md:shrink-0">
							{order_dictionary.order} #{order.order_id}
						</h2>
						<div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
							<p className="text-sm font-medium text-gray-500">{order_dictionary[order.order_status.toLowerCase() as "completed" | "pending"]}</p>
							<div className="flex text-sm font-medium">
								<Link href={`/orders/${order.order_id}`} className="text-red-600 hover:text-red-700">
								{order_dictionary.view_order}
								</Link>
								{/* <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
											<a href={order.invoiceHref} className="text-indigo-600 hover:text-indigo-500">
												View Invoice
											</a>
										</div> */}
							</div>
						</div>
					</div>

					<div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">

						<Suspense>
							{order.order_id && <OrderItemView orderId={order.order_id} key={order.order_id} dictionary={dictionary} />}
						</Suspense>
					</div>
				</section>
			</div>

		</>
	);
}
