"use client"
import { useEffect, useState } from 'react';
import Comment from './comment'
import { getComments, getProductComments } from '@/lib/actions';
import { Comment as CommentType } from '@/types';
import UserAvatar from './user-avatar';
import UserInfo from './user-info';
import { Dictionary } from '@/lib/get-dictionary';
import { useAuth } from '@/lib/context/auth-context';


interface Props {
	product_id: number;
	dictionary: Dictionary;
}

export default function CommentList({ product_id, dictionary }: Props) {
	const [comments, setComments] = useState<CommentType[]>();
	const [refresh, setRefresh] = useState(false);	
	const { isLoggedIn, user } = useAuth();

	const handleRefresh = () => {
		setRefresh(refresh => !refresh);
	}

	useEffect(() => {
		// setIsLoading(true);
		const getCommnts = async () => {
			const commnts = await getProductComments({ product_id });
			if(!commnts) return
			setComments(commnts);
		};
		getCommnts();
	}, [product_id, refresh]);

	
	const filteredComments = comments?.filter((comment) => comment.product_id === product_id);


	return (
		<div className='py-16  lg:pt-16 sm:pt-12 lg:pb-24 sm:pb-32 '>
			{isLoggedIn && user && <Comment user_id={user.user_id} dictionary={dictionary} product_id={product_id} onSuccess={handleRefresh}/>}
			<div className="mx-auto max-w-2xl px-4  sm:px-6  lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8">

				<div className="mt-16 col-span-12 lg:mt-0 max-w-xl m-auto">
					<h3 className="sr-only">Recent reviews</h3>

					<div className="flow-root">
						<div className="-my-12 divide-y divide-gray-200">
							{filteredComments?.map((comment) => (
								<div key={comment.comment_id} className="py-12">
									<div className="flex items-center">
										<UserAvatar user_id={comment.user_id!} />
										<div className="ml-4">
											<UserInfo user_id={comment.user_id!} />
											<div className="mt-1 flex items-center">
												{new Date(comment.created_date!).toLocaleDateString()} &nbsp;
												{new Date(comment.created_date!).toLocaleTimeString()}
											</div>
											<p className="sr-only">{comment.content}</p>
										</div>
									</div>

									<div
										dangerouslySetInnerHTML={{ __html: comment.content! }}
										className="mt-4 space-y-6 text-base italic text-gray-600"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
