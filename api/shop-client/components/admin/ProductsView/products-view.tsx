'use client';
import { FC, useEffect, useState } from 'react';
import { clsx } from 'clsx';

import { Dictionary } from '@/lib/get-dictionary';
import Table from '@/components/common/Table/table';
import Pagination from '@/components/common/Table/pagination';
import { Product } from '@/types/types';
import { getProducts } from '@/lib/actions';
import { useUI } from '@/components/ui/ui-context';
import ProductForm from './product-form';
import ProductDelete from './product-delete';

interface Props {
	dictionary: Dictionary;
}

const ProductsView: FC<Props> = ({ dictionary }) => {
	const admin_dictionary = dictionary.admin;

	const [take, setTake] = useState(10);
	const [skip, setSkip] = useState(0);
	const [products, setProducts] = useState<Omit<Product, 'owner_id'>[]>([]);
	const [totalItems, setTotalItems] = useState(0);
	const {openModal, setModalComponent} = useUI();
	const [refresh, setRefresh] = useState(false);

	const handleRefresh = () => {
		setRefresh(refresh => !refresh);
	}


	useEffect(() => {
		// setIsLoading(true);
		const getProds = async ({ take, skip }: { take: number; skip: number }) => {
			const prods = await getProducts();
			const mappedProds = prods?.map((product, index) => ({
				image_url: product.image_url,
				id: product.product_id,
				name: product.name,
				description: product.description,
				price: product.price,
				added_date: product.added_date,
				country_of_origin: product.country_of_origin,
				category_id: product.category_id,
				
			}));
			if (!mappedProds) return
			setProducts(mappedProds);
			setTotalItems(mappedProds.length ?? 0);
			// setIsLoading(false);
		};
		getProds({ take, skip });
		// setOrders(res.);
	}, [refresh]);
	//   const orders = data?.activeCustomer?.orders?.items

	const headers = [
		'#',
		"",
		admin_dictionary.name,
		admin_dictionary.description,
		admin_dictionary.price,
		admin_dictionary.added_date,
		admin_dictionary.country_of_origin,
		admin_dictionary.category,
	];


	return (
		<form className="divide-y divide-gray-200 lg:col-span-9" method="POST">
			<div className="px-4 py-6 sm:p-6 lg:pb-8">
				<div>
					<h2 className="text-lg font-medium leading-6 text-gray-900">
						{admin_dictionary.products}
					</h2>
					<p className="mt-1 text-sm text-gray-500">{admin_dictionary.products_description}</p>
				</div>

				{totalItems === 0 ? (
					<div className="py-6  lg:pb-96">{admin_dictionary.no_products}</div>
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
														values={products ?? []}
														skip={skip}
														editAction={(id) => {
															setModalComponent(<ProductForm id={id} dictionary={dictionary} onSuccess={handleRefresh}/>)
															openModal()
														}}
														deleteAction={(id) => {
															setModalComponent(<ProductDelete id={id} dictionary={dictionary} onSuccess={handleRefresh}/>)
															openModal()
														}}
														createAction={() => {
															setModalComponent(<ProductForm dictionary={dictionary} onSuccess={handleRefresh}/>)
															openModal()
														}}
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

export default ProductsView;
