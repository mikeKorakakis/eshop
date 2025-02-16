'use client'
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useUI } from '@/lib/context/ui-context';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { Product } from '@/types';
import { createProduct, getCategories, getProduct, updateProduct } from '@/lib/actions';
import FormSelect, { Options } from '@/components/ui/FormSelect/form-select';
import { uploadFile } from '@/lib/helpers';
import { format } from 'path';


interface Props {
	dictionary: Dictionary;
	id?: number;
	onSuccess?: () => void;
}


const ProductForm: FC<Props> = ({ dictionary, id, onSuccess }: Props) => {

	const common_dictionary = dictionary.common;
	const admin_dictionary = dictionary.admin;
	const [loading, setLoading] = useState(false);
	const [options, setOptions] = useState<Options[]>([]);
	const [file, setFile] = useState<File | null>(null); // File type for file state

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files && e.target.files.length > 0) {
			e?.target?.files[0] && setFile(e?.target?.files[0]);
		}
	};

	//   const [message, setMessage] = useState('')
	const [disabled, setDisabled] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors }
	} = useForm<Product>({
		defaultValues: {
			name: '',
			description: '',
			price: 0,
			country_of_origin: '',
			category_id: 0,

		},
		mode: 'onBlur'
	});

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

	useEffect(() => {
		const getProd = async () => {
			if (id) {
				// get category by id
				const product = await getProduct({ product_id: id });
				if (!product) return;
				reset({
					name: product.name,
					description: product.description,
					price: product.price,
					country_of_origin: product.country_of_origin,
					category_id: product.category_id,
				});
			}
		}
		getProd();
	}, [id, reset]);
	



	const { closeModal } = useUI();

	const submit = async (data: Product) => {
		try {
			const media_id = file ? await uploadFile(file) : null;
			let status;
			setLoading(true);
			if (id) {
				status = await updateProduct({
					product_id: id,
					name: data?.name,
					description: data?.description,
					price: data?.price,
					country_of_origin: data?.country_of_origin,
					category_id: data?.category_id,
					media_id,
				});
			}
			else {
				status = await createProduct({
					name: data?.name,
					description: data?.description,
					price: data?.price,
					country_of_origin: data?.country_of_origin,
					category_id: data?.category_id,
					media_id,
				});
			}
			if (status !== 201) {
				throw new Error('Error creating product');
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
					type="number"
					step="0.01"
					label={admin_dictionary.price!}
					{...register('price', {
						required: common_dictionary.not_empty!
					})}
					error={errors.price && errors.price?.message}
				/>
				<FormInput
					type="text"
					label={admin_dictionary.country_of_origin!}
					{...register('country_of_origin', {
						required: common_dictionary.not_empty!
					})}
					error={errors.country_of_origin && errors.country_of_origin?.message}
				/>
				<FormSelect
					dictionary={dictionary}
					label={admin_dictionary.category!}
					{...register('category_id', {
						required: common_dictionary.not_empty!
					})}
					options={[...options, { value: 0, label: "" }]}

					error={errors.category_id && errors.category_id?.message}
				/>
				<FormInput label={common_dictionary.image} name="file" type="file" onChange={handleFileChange} />



				<div className="flex w-full flex-col pt-2">
					<Button
						className="h-10"
						variant="slim"
						type="submit"
						loading={loading}
						disabled={disabled}
					>
						{id ? common_dictionary.save : common_dictionary.create}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default ProductForm;
