'use client'
import { FC, useEffect, useState } from 'react';
import { useUI } from '@/components/ui/ui-context';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { Product, User } from '@/types/types';
import { createCustomer, createProduct, getCustomer, getProduct, updateCustomer, updateProduct } from '@/lib/actions';
import { test_user_id } from '@/lib/constants';
import { emailPattern, passwordPattern } from '@/components/auth';
import { client } from '@/lib/client';


interface Props {
	dictionary: Dictionary;
	id?: number;
	onSuccess?: () => void;
}


const CustomerForm: FC<Props> = ({ dictionary, id, onSuccess }: Props) => {

	const common_dictionary = dictionary.common;
	const admin_dictionary = dictionary.admin;
	const [loading, setLoading] = useState(false);
	//   const [message, setMessage] = useState('')
	const [disabled, setDisabled] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<User>({
		defaultValues: {
			avatar_url: "",
			username: "",
			email: "",
			full_name: "",
			group_id: 0,

		},
		mode: 'onBlur'
	});

	useEffect(() => {
		const getProd = async () => {
			if (id) {
				// get category by id
				const product = await getCustomer({ customer_id: id });
				if (!product) return;
				reset({
					avatar_url: product.avatar_url,
					username: product.username,
					email: product.email,
					full_name: product.full_name,
					group_id: product.group_id
				});
			}
		}
		getProd();
	}, [id]);


	const { closeModal } = useUI();

	const submit = async (data: User) => {
		try {
			setLoading(true);
			if (id) {
				if (data.password) {

					await updateCustomer({
						user_id: id,
						username: data?.username,
						avatar_url: data?.avatar_url,
						full_name: data?.full_name,
						email: data?.email,
						group_id: data?.group_id,
						password: data?.password
					});
				} else {
					await updateCustomer({
						user_id: id,
						username: data?.username,
						avatar_url: data?.avatar_url,
						full_name: data?.full_name,
						email: data?.email,
						group_id: data?.group_id
					});
				}
			}
			else {
				if (data.password) {
					
					await createCustomer({
						user_id: id,
						username: data?.username,
						avatar_url: data?.avatar_url,
						full_name: data?.full_name,
						email: data?.email,
						group_id: data?.group_id,
						password: data?.password
					});
				} else {
					await createCustomer({
						user_id: id,
						username: data?.username,
						avatar_url: data?.avatar_url,
						full_name: data?.full_name,
						email: data?.email,
						group_id: data?.group_id
					});
				}
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

					label={admin_dictionary.full_name!}
					{...register('full_name', {
						required: common_dictionary.not_empty!
					})}
					error={errors.full_name && errors.full_name?.message}
				/>
				<FormInput
					type="text"
					label={admin_dictionary.username!}
					{...register('username', {
						required: common_dictionary.not_empty!
					})}
					error={errors.username && errors.username?.message}
				/>
				<FormInput
					type="email"
					label="Email"
					{...register('email', {
						required: common_dictionary.not_empty!,
						pattern: {
							value: emailPattern,
							message: common_dictionary.email_invalid
						}
					})}
					error={errors.email && errors.email?.message}
				/>
				<FormInput
					type="password"
					label={common_dictionary.password!}
					{...register('password', {
						required:!id && common_dictionary.not_empty!,
						minLength: { value: 7, message: common_dictionary.longer_7! },
						pattern: {
							value: passwordPattern,
							message: common_dictionary.one_letter_one_number!
						}
					})}
					error={errors.password && errors.password?.message}
				/>
				<FormInput
					type="number"
					label={admin_dictionary.group!}
					{...register('group_id', {
						required: common_dictionary.not_empty!
					})}
					error={errors.group_id && errors.group_id?.message}
				/>

				
				<FormInput
					type="text"
					label={admin_dictionary.avatar!}
					{...register('avatar_url', {
						required: common_dictionary.not_empty!
					})}
					error={errors.avatar_url && errors.avatar_url?.message}
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

export default CustomerForm;
