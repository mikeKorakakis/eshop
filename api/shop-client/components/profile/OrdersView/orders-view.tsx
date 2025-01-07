'use client';
import { FC, useEffect, useState } from 'react';
import { clsx } from 'clsx';

import { Dictionary } from '@/lib/get-dictionary';
import Table from '@/components/common/Table/table';
import Pagination from '@/components/common/Table/pagination';
import { Order, User } from '@/types/types';
import { getCurrentUserOrders, getOrders, getProducts } from '@/lib/actions';
import { useUI } from '@/components/ui/ui-context';

interface Props {
	dictionary: Dictionary;
	customer: User;
}

const OrdersView: FC<Props> = ({ dictionary, customer }) => {
	const admin_dictionary = dictionary.admin;

	const [take, setTake] = useState(10);
	const [skip, setSkip] = useState(0);
	const [orders, setOrders] = useState<Omit<Order, 'owner_id'>&{items: any}[]>([]);
	const [totalItems, setTotalItems] = useState(0);
	// const { openModal, setModalComponent } = useUI();
	const [refresh, setRefresh] = useState(false);

	const handleRefresh = () => {
		setRefresh(refresh => !refresh);
	}


	useEffect(() => {
		// setIsLoading(true);
		const getOrds = async ({ take, skip }: { take: number; skip: number }) => {
			const ords = await getCurrentUserOrders();
			let orders = ords?.map((order, index) => ({
				id: order.order_id,
				user_id: order.user_id,
				order_date: order.order_date,
				total_amount: order.total_amount,
				order_status: order.order_status,
				order_id: order.order_id,
				items: order.items.map((item) => ({
					id: item.product_id,
					name: item.product.name,
					quantity: item.quantity,
					price: item.price_at_purchase,
					media_id: item.product.media_id
				})


				)
			}));

			if (!orders) return
			setOrders(orders);
			setTotalItems(orders.length ?? 0);
			// setIsLoading(false);
		};
		getOrds({ take, skip });
		// setOrders(res.);
	}, [refresh]);
	//   const orders = data?.activeCustomer?.orders?.items

	const headers = [
		'#',
		admin_dictionary.customer,
		admin_dictionary.order_date,
		admin_dictionary.total_amount,
		admin_dictionary.status,
		admin_dictionary.products
	];


	return (
		<form className="divide-y divide-gray-200 lg:col-span-9" method="POST">
			<div className="px-4 py-6 sm:p-6 lg:pb-8">
				<div>
					<h2 className="text-lg font-medium leading-6 text-gray-900">
						{admin_dictionary.orders}
					</h2>
					<p className="mt-1 text-sm text-gray-500">{admin_dictionary.orders_description}</p>
				</div>

				{totalItems === 0 ? (
					<div className="py-6  lg:pb-96">{admin_dictionary.no_orders}</div>
				) : (
					<div className="mt-6 ">
						<div
							className={clsx('h-full')}
						// onSubmit={handleSubmit}
						>
							<div className="mt-8">
								<div className="flex-1">
									<div>
										<hr className="my-6 border-accent-2" />
										<div className="scrollbar-hide w-full overflow-x-scroll">
											{/* {JSON.stringify(data, null, 2)} */}
											{
												<>
													<Table
														dictionary={dictionary}
														headers={headers}
														values={orders ?? []}
														skip={skip}
														editAction={(id) => {

														}}
														deleteAction={(id) => {

														}}
														createAction={() => {

														}}
														noEdit={true}
													/>
													{totalItems && (
														<Pagination
															dictionary={dictionary}
															skip={skip}
															setSkip={setSkip}
															take={take}
															setTake={setTake}
															totalItems={totalItems}
														/>
													)}

												</>
											}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</form>
	);
};

export default OrdersView;
