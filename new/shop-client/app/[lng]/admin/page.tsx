import DashboardView from '@/components/admin/DashboardView';
import { getCustomers, getProducts, getOrders } from '@/lib/actions';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/types'
import React, { Suspense } from 'react'

export default async function CategoriesAdminPage({ params: { lng } }: LanguageProps) {
	const dictionary = await getDictionary(lng);
	const customers = await getCustomers();
	const products = await getProducts();
	const orders = await getOrders();


	return (
		<Suspense fallback={<div>Loading...</div>}>
			<DashboardView dictionary={dictionary} customers={customers} orders={orders} products={products} lng={lng}/>
		</Suspense>
	)
}
