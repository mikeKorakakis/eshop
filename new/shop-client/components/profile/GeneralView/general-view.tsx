'use client';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import clsx from 'clsx';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { validate } from 'email-validator';
import s from './general-view.module.css';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { User } from '@/types';
import { updateCustomer } from '@/lib/actions';
import Avatar from '@/components/common/Avatar';
import Image from 'next/image';
import { formatImage, uploadFile } from '@/lib/helpers';
import avatarPlaceholder from '@/assets/images/user.png';

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
	const [file, setFile] = useState<File | null>(null); // File type for file state

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files && e.target.files.length > 0) {
			e?.target?.files[0] && setFile(e?.target?.files[0]);
		}
	};

	const [loading, setLoading] = React.useState(false);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<ProfileType>({
		defaultValues: {
			email: customer?.email,
			full_name: customer?.full_name,
			username: customer?.username,
			avatar_url: customer?.media?.path,
		},
		mode: 'onBlur'
	});

	const onSubmit = async (data: ProfileType) => {
		setLoading(true);

		if (!customer) return;
		try {
			const uploadedMediaId = file ? await uploadFile(file) : null;
			const res = await updateCustomer({
				user_id: customer.user_id,
				username: data.username,
				full_name: data.full_name,
				media_id: uploadedMediaId,

			})
			if (res === 201) {
				toast.success(profile_dictionary.profile_success);
			} else {
				throw new Error('Something went wrong')
			}



		} catch (e) {
			console.error(e);
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
								disabled
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
						{customer?.media?.path ?
							<Image width={64} height={64} className="m-auto w-14 h-14 rounded-full" src={file ?  URL.createObjectURL(file) : customer?.media?.path ? formatImage(customer?.media?.path) : avatarPlaceholder} alt="" />
							:
							<Avatar className='m-auto ' />}
						<div className={clsx(s.fieldset, 'col-span-11 sm:col-span-5')}>
							<FormInput label={common_dictionary.image} name="file" type="file" onChange={handleFileChange} />

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
