'use client';
import { FC, useEffect, useState } from 'react';
import { clsx } from 'clsx';

import { Dictionary } from '@/lib/get-dictionary';
import Table from '@/components/common/Table/table';
import Pagination from '@/components/common/Table/pagination';
import { Comment } from '@/types/types';
import { getCategories, getComments } from '@/lib/actions';
import { useUI } from '@/components/ui/ui-context';
import CategoryDelete from './comment-delete';

interface Props {
	dictionary: Dictionary;
}

const CommentsView: FC<Props> = ({ dictionary }) => {
	const admin_dictionary = dictionary.admin;

	const [take, setTake] = useState(10);
	const [skip, setSkip] = useState(0);
	const [comments, setComments] = useState<Comment[]>([]);
	const [totalItems, setTotalItems] = useState(0);
	const {openModal, setModalComponent} = useUI();
	const [refresh, setRefresh] = useState(false);

	const handleRefresh = () => {
		setRefresh(refresh => !refresh);
	}


	useEffect(() => {
		// setIsLoading(true);
		const getCommnts = async ({ take, skip }: { take: number; skip: number }) => {
			const commnts = await getComments();
			const mappedCommnts = commnts?.map((comment, index) => ({
				id: comment.comment_id,
				content: comment.content,
				user_id: comment.user_id,
				product_id: comment.product_id,
				created_date: comment.created_date,
			}));
			if (!mappedCommnts) return
			setComments(mappedCommnts);
			setTotalItems(mappedCommnts.length ?? 0);
			// setIsLoading(false);
		};
		getCommnts({ take, skip });
		// setOrders(res.);
	}, [refresh]);
	//   const orders = data?.activeCustomer?.orders?.items

	const headers = [
		'#',
		admin_dictionary.comment,
		admin_dictionary.user,
		admin_dictionary.product,
		admin_dictionary.added_date,
		""
	];


	return (
		<form className="divide-y divide-gray-200 lg:col-span-9" method="POST">
			<div className="px-4 py-6 sm:p-6 lg:pb-8">
				<div>
					<h2 className="text-lg font-medium leading-6 text-gray-900">
						{admin_dictionary.comments}
					</h2>
					<p className="mt-1 text-sm text-gray-500">{admin_dictionary.comments_description}</p>
				</div>

				{totalItems === 0 ? (
					<div className="py-6  lg:pb-96">{admin_dictionary.no_comments}</div>
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
														values={comments ?? []}
														skip={skip}
													
														deleteAction={(id) => {
															setModalComponent(<CategoryDelete id={id} dictionary={dictionary} onSuccess={handleRefresh}/>)
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

export default CommentsView;
