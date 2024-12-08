'use client'
import { FC, useState } from 'react';
import { useUI } from '@/components/ui/ui-context';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { deleteProduct } from '@/lib/actions';


interface Props {
	dictionary: Dictionary;
	id?: number;
	onSuccess?: () => void;
}

const CustomerDelete: FC<Props> = ({ dictionary, id, onSuccess }: Props) => {

	const common_dictionary = dictionary.common;
	const admin_dictionary = dictionary.admin;
	const [loading, setLoading] = useState(false);
	//   const [message, setMessage] = useState('')
	const [disabled, setDisabled] = useState(false);

	const { closeModal } = useUI();

	const handleDeleteProduct = async () => {
		try {
			setLoading(true);
			if (id) {
				await deleteProduct({
					product_id: id
				});
			}

			onSuccess && onSuccess();
			toast.success(common_dictionary.success);
			setLoading(false);
			closeModal();

		} catch (err) {
			console.error(err);
			toast.error(common_dictionary.error);
			setLoading(false);
			setDisabled(false);
		}
	};

	return (
		<form className="flex  flex-col justify-between w-full">
			<div className="flex justify-center pb-8 ">
				<Logo width="64px" height="64px" />
			</div>
			<div className="flex flex-col space-y-4">
				<span className="text-center text-lg font-semibold">
					{admin_dictionary.delete_customer_message}
				</span>
				<div className="flex w-full gap-2 pt-2">
					<Button
						className="h-10"
						variant="slim"
						type="submit"
						loading={loading}
						disabled={disabled}
						onClick={handleDeleteProduct}
					>
						{common_dictionary.delete}
					</Button>
					<Button
						className="h-10"
						variant="ghost"
						type="button"
						onClick={closeModal}
					>
						{common_dictionary.cancel}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default CustomerDelete;
