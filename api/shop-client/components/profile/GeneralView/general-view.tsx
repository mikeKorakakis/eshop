'use client';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { validate } from 'email-validator';
import s from './general-view.module.css';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { User } from '@/types/types';
import { updateCustomer } from '@/lib/actions';
import { test_user_id } from '@/lib/constants';
import { client } from '@/lib/client';

type ProfileType = {
	username: string;
	email: string;
	full_name: string;
	avatar_url: string;
};


type Props = {
	dictionary: Dictionary;
	customer: User;
};

export default function GeneralView({ dictionary, customer }: Props) {
	const common_dictionary = dictionary.common;
	const profile_dictionary = dictionary.profile;
	const admin_dictionary = dictionary.admin;
	const [loading, setLoading] = React.useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ProfileType>({
		defaultValues: {
			email: customer?.email,
			full_name: customer?.full_name,
			username: customer?.username,
			avatar_url: customer?.avatar_url,
		},
		mode: 'onBlur'
	});

	const onSubmit = async (data: ProfileType) => {
		setLoading(true);

		if (!customer) return;
		try {
			await client.PUT('/users/{id}', {
				params: {
				  path: { id: customer.user_id! }
				},
				body: {
				  username: data.username,
				  email: data.email,
				  full_name: data.full_name,
				  group_id : customer.group_id,
				  avatar_url: data.avatar_url
				}
			  })
			

			// await updateCustomer({
			// 	username: data.username,
			// 	full_name: data.full_name,
			// 	email: data.email,
			// 	avatar_url: customer.avatar_url,
			// 	group_id: customer.group_id,
			// 	user_id: customer.user_id
			// });
			toast.success(profile_dictionary.profile_success);
		} catch (e) {
			toast.error(profile_dictionary.profile_error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			className="divide-y divide-gray-200 lg:col-span-9"
			method="POST"
			onSubmit={handleSubmit(onSubmit)}
		>
			{/* Profile section */}
			{/* {JSON.stringify(customer)} */}
			<div className="px-4 py-6 sm:p-6 lg:pb-8">
				<div>
					<h2 className="text-lg font-medium leading-6 text-gray-900">
						{profile_dictionary.profile}
					</h2>
					<p className="mt-1 text-sm text-gray-500">{profile_dictionary.profile_description}</p>
				</div>

				<div className="mt-8">
					<hr className="my-6 border-accent-2" />
					{/* <div className="flex-grow space-y-6"> */}
					<div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
						<div className={clsx(s.fieldset, 'col-span-12 sm:col-span-6')}>
							<FormInput
								type="text"
								label={common_dictionary.username!}
								{...register('username', {
									required: common_dictionary.not_empty!,
								})}
								error={errors?.username?.message}
							/>
						</div>
					</div>
					<div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
						<div className={clsx(s.fieldset, 'col-span-12 sm:col-span-6')}>
							<FormInput
								type="email"
								placeholder="Email"
								label="Email"
								{...register('email', {
									required: common_dictionary.not_empty!,
									validate: validate,
									// message: () => common_dictionary.email_invalid!
									//   }
								})}
								error={errors?.email?.message}
							/>
						</div>
						
					</div>
					<div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
						<div className={clsx(s.fieldset, 'col-span-12 sm:col-span-6')}>
							<FormInput
								type="text"
								label={common_dictionary.full_name!}
								{...register('full_name', {
									required: common_dictionary.not_empty!
								})}
								error={errors?.full_name?.message}
							/>
						</div>
					</div>
					<div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
						<div className={clsx(s.fieldset, 'col-span-12 sm:col-span-6')}>
							<FormInput
								type="text"
								label={admin_dictionary.avatar!}
								{...register('avatar_url', {
									required: common_dictionary.not_empty!
								})}
								error={errors?.avatar_url?.message}
							/>
						</div>
					</div>
			
				</div>
			</div>
			{/* Privacy section */}
			<div className="divide-y divide-gray-200 pt-6">
				<div className="mt-4 flex justify-end px-4 py-4 sm:px-6 ">
					<div>
						<Button type="submit" className="h-10" loading={loading}>
							{common_dictionary.save!}
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}
