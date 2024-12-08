'use client'

import Button from "@/components/ui/Button"
import { createComment } from "@/lib/actions";
import UserAvatar from "./user-avatar";
import { test_user_id } from "@/lib/constants";
import { Dictionary } from "@/lib/get-dictionary";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
	product_id: number;
	dictionary: Dictionary;
	onSuccess?: () => void;
}

export default function Comment({ product_id, dictionary, onSuccess }: Props) {
	const product_dictionary = dictionary.product;
	const [comment, setComment] = useState<string>();

	const handleAddComment = async () => {
		// add comment
		if(!comment) return;
		try {
			await createComment({ product_id, user_id: test_user_id, content: comment, created_date: new Date().toISOString() });
			toast.success(product_dictionary.comment_success);
			setComment('');
			onSuccess && onSuccess();
		}
		catch (error) {
			toast.error(product_dictionary.comment_error);
			console.log(error);
		}
		// clear the comment
	}
	
	return (
		<div className="flex items-start space-x-4 max-w-2xl  m-auto  ">
			<div className="shrink-0">
				<UserAvatar user_id={test_user_id} />
			</div>
			<div className="min-w-0 flex-1">
				<form action="#" className="relative">
					<div className="rounded-lg bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-red-600">
						<label htmlFor="comment" className="sr-only">
							{product_dictionary.add_your_comment}
						</label>

						<div className="mt-2">
							<textarea
								placeholder="Add your comment"
								id="comment"
								name="comment"
								rows={4}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6 focus:ring-red-600"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
						</div>
						<div className="shrink-0">
						</div>

					</div>
					<div className="w-56 float-end mt-4 mb-8">
						<Button
							onClick={handleAddComment}
							variant="slim"
							type="button"
						>
							{product_dictionary.add_comment}
						</Button>

					</div>

				</form>
			</div>
		</div>
	)
}
