'use client'
import { FC, useEffect, useState } from 'react';
import { useUI } from '@/components/ui/ui-context';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { Category } from '@/types/types';
import { createCategory, getCategories, getCategory, updateCategory } from '@/lib/actions';
import FormSelect from '@/components/ui/FormSelect';
import { Options } from '@/components/ui/FormSelect/form-select';


interface Props {
	dictionary: Dictionary;
	id?: number;
	onSuccess?: () => void;
}


const CategoryForm: FC<Props> = ({ dictionary, id, onSuccess }: Props) => {

	const common_dictionary = dictionary.common;
	const admin_dictionary = dictionary.admin;
	const [loading, setLoading] = useState(false);
	const [options, setOptions] = useState<Options[]>([]);
	//   const [message, setMessage] = useState('')
	const [disabled, setDisabled] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<Category>({
		defaultValues: { name: '', description: '', ordering: 0, parent_id: 0 },
		mode: 'onBlur'
	});

	useEffect(() => {
		const getCat = async () => {
			if (id) {
				// get category by id
				const category = await getCategory({ category_id: id });
				if (!category) return;
				reset({
					name: category.name,
					description: category.description,
					ordering: category.ordering,
					parent_id: category.parent_id
				});
			}
		}
		getCat();
	}, [id]);

	useEffect(() => {
		const getCats = async () => {
			// get category by id
			const categories = await getCategories();
			if (!categories) return;
			const values = categories.map((category) => {
				return {
					label: category.name!,
					value: category.category_id!
				};
			});
			setOptions(values);

		}
		getCats();

	}, []);


	const { closeModal } = useUI();

	const submit = async (data: Category) => {
		try {
			setLoading(true);
			if (id) {
				await updateCategory({
					category_id: id,
					name: data?.name,
					description: data?.description,
					ordering: data?.ordering,
					parent_id: data?.parent_id
				});
			}
			else {
				await createCategory({
					category_id: id,
					name: data?.name,
					description: data?.description,
					ordering: data?.ordering,
					parent_id: data?.parent_id
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
		<form onSubmit={handleSubmit(submit)} className="flex  flex-col justify-between w-full">
			<div className="flex justify-center pb-8 ">
				<Logo width="64px" height="64px" />
			</div>
			<div className="flex flex-col space-y-4">

				<FormInput
					type="text"

					label={admin_dictionary.name!}
					{...register('name', {
						required: common_dictionary.not_empty!
					})}
					error={errors.name && errors.name?.message}
				/>
				<FormInput
					type="text"
					label={admin_dictionary.description!}
					{...register('description', {
						required: common_dictionary.not_empty!
					})}
					error={errors.description && errors.description?.message}
				/>

				<FormInput
					type="text"
					label={admin_dictionary.ordering!}
					{...register('ordering', {
						required: common_dictionary.not_empty!
					})}
					error={errors.ordering && errors.ordering?.message}
				/>
				
				<FormSelect
					dictionary={dictionary}
					label={admin_dictionary.parent!}
					{...register('parent_id', {
						required: common_dictionary.not_empty!
					})}
					options={[...options, {value: 0, label: ""}]}

					error={errors.parent_id && errors.parent_id?.message}
				/>

				<div className="flex w-full flex-col pt-2">
					<Button
						className="h-10"
						variant="slim"
						type="submit"
						loading={loading}
						disabled={disabled}
					>
						{id ? common_dictionary.edit : common_dictionary.create}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default CategoryForm;
