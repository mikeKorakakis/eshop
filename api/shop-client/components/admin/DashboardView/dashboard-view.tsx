'use client';
import { FC, useEffect, useState } from 'react';
import { clsx } from 'clsx';

import { Dictionary } from '@/lib/get-dictionary';
import Table from '@/components/common/Table/table';
import Pagination from '@/components/common/Table/pagination';
import { Category, Order, Product, User } from '@/types/types';
import { getCategories } from '@/lib/actions';
import { useUI } from '@/components/ui/ui-context';
import Stat from '@/components/ui/Stat';
import { ShoppingBagIcon, TagIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import DashboardTable from './table';
import CustomerForm from '../CustomersView/customer-form';
import ProductForm from '../ProductsView/product-form';
import DashboardOrdersTable from './orders-table';
interface Props {
	dictionary: Dictionary;
	customers: User[];
	products: Product[];
	orders: Order[];
	lng: string;
}

const DashboardView: FC<Props> = ({ dictionary, customers, products, orders, lng }) => {
	const admin_dictionary = dictionary.admin;
	const customersCount = customers?.length;
	const productsCount = products?.length;
	const ordersCount = orders?.length;
	const { openModal, setModalComponent } = useUI();
	const [refresh, setRefresh] = useState(false);

	const handleRefresh = () => {
		setRefresh(refresh => !refresh);
	}

	let filteredCustomers = customers?.filter((customer) => customer.group_id === 0);
	let mappedCustomers = filteredCustomers?.map((customer) => {
		return {
			id: customer.user_id!,
			name: customer.full_name!
		};
	});
	let mappedProducts = products?.map((product) => {
		return {
			id: product.product_id!,
			name: product.name!
		};
	});
	let mappedOrders = orders?.map((order) => {
		return {
			id: order.order_id!,
			customer_id: order.user_id!,
			total_amount: order.total_amount!,

		};
	});

	mappedCustomers = mappedCustomers?.slice(-6);
	mappedProducts = mappedProducts?.slice(-6);
	mappedOrders = mappedOrders?.slice(-6);
	return (
		<form className="divide-y divide-gray-200 lg:col-span-9" method="POST">
			<div className="px-4 py-6 sm:p-6 lg:pb-8">
				<div>
					<h2 className="text-lg font-medium leading-6 text-gray-900">
						{admin_dictionary.dashboard}
					</h2>
					<p className="mt-1 text-sm text-gray-500">{admin_dictionary.dashboard_description}</p>
				</div>

				<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols- lg:grid-cols-3">
					<Stat name={admin_dictionary.customers} stat={customersCount} dictionary={dictionary} link={`/${lng}/admin/customers`}>
						<UserGroupIcon aria-hidden="true" className="size-6 text-white" />
					</Stat>
					<Stat name={admin_dictionary.products} stat={productsCount} dictionary={dictionary} link={`/${lng}/admin/products`}>
						<TagIcon aria-hidden="true" className="size-6 text-white" />
					</Stat>
					<Stat name={admin_dictionary.orders} stat={ordersCount} dictionary={dictionary} link={`/${lng}/admin/orders`}>
						<ShoppingBagIcon aria-hidden="true" className="size-6 text-white" />
					</Stat>

				</dl>
				<div className="mt-6 ">
					<div
						className="grid grid-cols-1 gap-4 sm:grid-cols-2"
					// onSubmit={handleSubmit}
					>
						<DashboardTable
							dictionary={dictionary}
							editAction={(id) => {
								setModalComponent(<CustomerForm id={id} dictionary={dictionary} onSuccess={handleRefresh} />)
								openModal()
							}}
							header={admin_dictionary.customers}
							values={mappedCustomers} />
						<DashboardTable
							dictionary={dictionary}
							editAction={(id) => {
								setModalComponent(<ProductForm id={id} dictionary={dictionary} onSuccess={handleRefresh} />)
								openModal()
							}}
							header={admin_dictionary.products}
							values={mappedProducts} />
						<DashboardOrdersTable
							dictionary={dictionary}
							
							header={admin_dictionary.orders}
							values={mappedOrders} />
					</div>
				</div>
			</div>
		</form>
	);
};

export default DashboardView;
