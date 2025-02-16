'use client'
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useUI } from '@/lib/context/ui-context';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { Category } from '@/types';
import { createCategory, getCategories, getCategory, updateCategory } from '@/lib/actions';
import FormSelect from '@/components/ui/FormSelect';
import { Options } from '@/components/ui/FormSelect/form-select';
import { uploadFile } from '@/lib/helpers';


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
	const [file, setFile] = useState<File | null>(null); // File type for file state

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files && e.target.files.length > 0) {
			e?.target?.files[0] && setFile(e?.target?.files[0]);
		}
	};



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
				const category = await getCategory({ category_id: id });
				if (!category) return;
				reset({
					name: category.name,
					description: category.description,
					ordering: category.ordering,
					parent_id: category.parent_id,
				});
			}
		}
		getCat();
	}, [id, reset]);

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
			let status;
			setLoading(true);
			const uploadedMediaId = file ? await uploadFile(file) : null;

			if (id) {
				status = await updateCategory({
					category_id: id,
					name: data?.name,
					description: data?.description,
					ordering: data?.ordering,
					parent_id: 0,
					media_id: uploadedMediaId
				});

			}
			else {
				status = await createCategory({
					name: data?.name,
					description: data?.description,
					ordering: data?.ordering,
					parent_id: 0,
					media_id: uploadedMediaId
				});

			}

			if (status !== 201) {
				throw new Error('Error updating category');
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

				
				<FormInput
					name="image"
					label={common_dictionary.image}
					type="file"
					onChange={handleFileChange}

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
