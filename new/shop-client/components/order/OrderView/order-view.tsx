import { Dictionary } from '@/lib/get-dictionary';
import { LINKS } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { Order, OrderWithItemsAndUser } from '@/types';
import ProductView from './product-view';
import { getOrderItemsByOrder, me } from '@/lib/actions';
import { formatPrice } from '@/lib/helpers';

type Props = {
	dictionary: Dictionary;
	order: OrderWithItemsAndUser;
	lng: string;
	redirect_status?: string
};

const dateOptions = {
	weekday: 'long' as 'long' | 'short' | 'narrow' | undefined,
	year: 'numeric' as 'numeric' | '2-digit' | undefined,
	month: 'long' as 'long' | 'short' | 'narrow' | undefined,
	day: 'numeric' as 'numeric' | '2-digit' | undefined
};



export default async function OrderView({ dictionary, order, lng, redirect_status }: Props) {
	if (!order.order_id) return;
	const common_dictionary = dictionary.common;
	const order_dictionary = dictionary.order;

	const orderItems = await getOrderItemsByOrder({ order_id: order.order_id })
	const customer = await me()
	if (!order) return redirect(LINKS.link_home)
	return (
		<>
			<div className="bg-white">
				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
					{redirect_status === 'succeeded' && <div className='py-8'>
						<h1 className="text-sm font-medium text-red-600">{order_dictionary.payment_successful}</h1>
						<p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							{order_dictionary.thanks_order}
						</p>
						<p className="mt-2 text-base text-gray-500">
							{order_dictionary.appreciate_order}
						</p>
					</div>}
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						{order_dictionary.order_details}
					</h1>

					<div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
						<dl className="flex">
							<dt>
								<span className="sr-only">{common_dictionary.date}</span>
								<span className="mx-2 text-gray-400" aria-hidden="true">
									&middot;
								</span>
							</dt>
							<dd className="font-medium text-gray-900">
								<time dateTime="2021-03-22">
									{new Date(order?.order_date!).toLocaleDateString(lng, dateOptions)}
								</time>
							</dd>
						</dl>
						<div className="mt-4 sm:mt-0">
						</div>
					</div>

					<div className="mt-8">
						<h2 className="sr-only">{order_dictionary.products_purchased}</h2>

						<div className="space-y-24">
							{orderItems?.map((orderItem) => (
								<div
									key={orderItem.order_item_id}
									className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
								>
									<ProductView id={orderItem.product_id!} />
									<div className="sm:col-span-12 md:col-span-7">
										<dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
											<div>
												<dt className="font-medium text-gray-900">
													{common_dictionary.shipping_address}
												</dt>
												<dd className="mt-3 text-gray-500">
													<span className="block">{order?.shipping?.address}</span>
													<span className="block">
														{order?.shipping?.postal_code}
													</span>
													<span className="block">
														{order?.shipping?.city}
													</span>
												</dd>
											</div>
											{customer && (
												<div>
													<dt className="font-medium text-gray-900">{common_dictionary.customer}</dt>
													<dd className="mt-3 space-y-3 text-gray-500">
														<p>{customer?.full_name}</p>
														<p>{customer?.email}</p>

													</dd>
												</div>
											)}
										</dl>
						
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Billing */}
					<div className="mt-24">
						<h2 className="sr-only">{order_dictionary.billing_summary}</h2>

						<div className="rounded-lg bg-gray-50 px-6 py-6 lg:grid lg:grid-cols-12 lg:gap-x-8  lg:py-8">
			

							<dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">

								<div className="flex items-center justify-between py-4">
									<dt className="text-gray-600">{common_dictionary.shipping}</dt>
									<dd className="font-medium text-gray-900">
										{formatPrice(order?.shipping?.method?.cost, "EUR")}
									</dd>
								</div>

								<div className="flex items-center justify-between pt-4">
									<dt className="font-medium text-gray-900">{common_dictionary.total}</dt>
									<dd className="font-medium text-red-600">
										{formatPrice(order?.total_amount, "EUR")}
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
