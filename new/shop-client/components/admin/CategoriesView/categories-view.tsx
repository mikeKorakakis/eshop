'use client';
import { FC, useEffect, useState } from 'react';
import { clsx } from 'clsx';

import { Dictionary } from '@/lib/get-dictionary';
import Table from '@/components/common/Table/table';
import Pagination from '@/components/common/Table/pagination';
import { Category } from '@/types';
import { getCategories } from '@/lib/actions';
import { useUI } from '@/lib/context/ui-context';
import CategoryForm from './category-form';
import CategoryDelete from './category-delete';

interface Props {
	dictionary: Dictionary;
}

const CategoriesView: FC<Props> = ({ dictionary }) => {
	const admin_dictionary = dictionary.admin;

	const [take, setTake] = useState(10);
	const [skip, setSkip] = useState(0);
	const [categories, setCategories] = useState<Omit<Category, "category_id" | "media_id" | "media">[]>([]);
	const [totalItems, setTotalItems] = useState(0);
	const {openModal, setModalComponent} = useUI();
	const [refresh, setRefresh] = useState(false);

	const handleRefresh = () => {
		setRefresh(refresh => !refresh);
	}


	useEffect(() => {
		// setIsLoading(true);
		const getCats = async ({ take, skip }: { take: number; skip: number }) => {
			const cats = await getCategories();
			const mappedCats = cats?.map((category, index) => ({
				id: category.category_id,
				name: category.name,
				description: category.description,
				ordering: category.ordering,
				// parent_id: category.parent_id,
			}));
			if (!mappedCats) return
			setCategories(mappedCats);
			setTotalItems(mappedCats.length ?? 0);
			// setIsLoading(false);
		};
		getCats({ take, skip });
		// setOrders(res.);
	}, [refresh, skip, take]);
	//   const orders = data?.activeCustomer?.orders?.items

	const headers = [
		'#',
		admin_dictionary.name,
		admin_dictionary.description,
		admin_dictionary.ordering,
	];


	return (
		<form className="divide-y divide-gray-200 lg:col-span-9" method="POST">
			<div className="px-4 py-6 sm:p-6 lg:pb-8">
				<div>
					<h2 className="text-lg font-medium leading-6 text-gray-900">
						{admin_dictionary.categories}
					</h2>
					<p className="mt-1 text-sm text-gray-500">{admin_dictionary.categories_description}</p>
				</div>

				{totalItems === 0 ? (
					<div className="py-6  lg:pb-96">{admin_dictionary.no_categories}</div>
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
														values={categories ?? []}
														skip={skip}
														editAction={(id) => {
															setModalComponent(<CategoryForm id={id} dictionary={dictionary} onSuccess={handleRefresh}/>)
															openModal()
														}}
														deleteAction={(id) => {
															setModalComponent(<CategoryDelete id={id} dictionary={dictionary} onSuccess={handleRefresh}/>)
															openModal()
														}}
														createAction={() => {
															setModalComponent(<CategoryForm dictionary={dictionary} onSuccess={handleRefresh}/>)
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

export default CategoriesView;
