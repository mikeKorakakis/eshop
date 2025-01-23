'use client';
import { FC, useEffect, useState } from 'react';
import { clsx } from 'clsx';

import { Dictionary } from '@/lib/get-dictionary';
import Table from '@/components/common/Table/table';
import Pagination from '@/components/common/Table/pagination';
import { User } from '@/types';
import { getCustomers } from '@/lib/actions';
import { useUI } from '@/lib/context/ui-context';
import CustomerFormForm from './customer-form';
import CustomerDelete from './customer-delete';

interface Props {
	dictionary: Dictionary;
}

const CustomersView: FC<Props> = ({ dictionary }) => {
	const admin_dictionary = dictionary.admin;

	const [take, setTake] = useState(10);
	const [skip, setSkip] = useState(0);
	const [products, setProducts] = useState<Omit<User, 'owner_id' | 'user_id'| 'media'| 'password'| 'registration_date'| 'media_id'>[]>([]);
	const [totalItems, setTotalItems] = useState(0);
	const { openModal, setModalComponent } = useUI();
	const [refresh, setRefresh] = useState(false);

	const handleRefresh = () => {
		setRefresh(refresh => !refresh);
	}


	useEffect(() => {
		// setIsLoading(true);
		const getCusts = async ({ take, skip }: { take: number; skip: number }) => {
			const custs = await getCustomers();
			const mappedCusts = custs?.map((customer, index) => ({
				id: customer.user_id,
				avatar_url: customer?.media?.path,
				username: customer.username,
				email: customer.email,
				full_name: customer.full_name,
				group_id: customer.group_id,

			}));
			if (!mappedCusts) return
			setProducts(mappedCusts);
			setTotalItems(mappedCusts.length ?? 0);
			// setIsLoading(false);
		};
		getCusts({ take, skip });
		// setOrders(res.);
	}, [refresh, skip, take]);
	//   const orders = data?.activeCustomer?.orders?.items

	const headers = [
		'#',
		"",
		admin_dictionary.username,
		admin_dictionary.email,
		admin_dictionary.full_name,
		admin_dictionary.group,
	];


	return (
		<form className="divide-y divide-gray-200 lg:col-span-9" method="POST">
			<div className="px-4 py-6 sm:p-6 lg:pb-8">
				<div>
					<h2 className="text-lg font-medium leading-6 text-gray-900">
						{admin_dictionary.customers}
					</h2>
					<p className="mt-1 text-sm text-gray-500">{admin_dictionary.customers_description}</p>
				</div>

				{totalItems === 0 ? (
					<div className="py-6  lg:pb-96">{admin_dictionary.no_customers}</div>
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
															setModalComponent(<CustomerFormForm id={id} dictionary={dictionary} onSuccess={handleRefresh} />)
															openModal()
														}}
														deleteAction={(id) => {
															setModalComponent(<CustomerDelete id={id} dictionary={dictionary} onSuccess={handleRefresh} />)
															openModal()
														}}
														createAction={() => {
															setModalComponent(<CustomerFormForm dictionary={dictionary} onSuccess={handleRefresh} />)
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

export default CustomersView;
