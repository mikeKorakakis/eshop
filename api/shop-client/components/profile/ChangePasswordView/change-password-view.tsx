'use client'
import { useState } from 'react';
import cn, { clsx } from 'clsx';

import Button from '@/components/ui/Button';
import { useForm } from 'react-hook-form';

import s from './change-password-view.module.css';
import FormInput from '@/components/ui/FormInput';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { changePassword } from '@/lib/actions';
import { User } from '@/types/types';

// type ChangePasswordType = ChangePassword.ChangePasswordBody;
interface ChangePasswordType {
	/**
	 * The user's email address.
	 */
	currentPassword: string;
	/**
	 * The user's password.
	 */
	newPassword: string;
}

interface Props {
	dictionary: Dictionary;
	customer: User;
}

export default function ChangePasswordView({ dictionary, customer }: Props) {
	const common_dictionary = dictionary.common;
	const profile_dictionary = dictionary.profile;
	const [loading, setLoading] = useState(false);
	

	const {
		register,
		formState: { errors },
		reset,
		handleSubmit
	} = useForm<ChangePasswordType>({
		defaultValues: {
			currentPassword: '',
			newPassword: ''
		},
		mode: 'onBlur'
	});

	const onSubmit = async (data: ChangePasswordType) => {
		try {
			await changePassword({
				currentPassword: data.currentPassword,
				newPassword: data.newPassword
			});

			toast.success(profile_dictionary.password_success);
			reset();
		} catch (err) {
			console.log(err);

			toast.error(profile_dictionary.password_error);
			// TODO - handle error UI here.
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
			<div className="px-4 py-6 sm:p-6 lg:pb-8">
				<div>
					<h2 className="text-lg font-medium leading-6 text-gray-900">
						{profile_dictionary.password}
					</h2>
					<p className="mt-1 text-sm text-gray-500">{profile_dictionary.password_description}</p>
				</div>

				<div className="mt-6 ">
					<div
						className={clsx('h-full')}
					// onSubmit={handleSubmit}
					>
						<div className="mt-8">
							<div className="flex-1">
								<div>
									<hr className="my-6 border-accent-2" />
									<div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
										<div className={cn(s.fieldset, 'col-span-6')}>
											<FormInput
												type="password"
												{...register('currentPassword', {
													required: 'This is required.'
												})}
												error={errors?.currentPassword && errors?.currentPassword?.message}
												label={profile_dictionary.password_current!}
											/>
										</div>
									</div>
									<div className="grid-cols-12 sm:grid sm:grid-flow-row sm:gap-3">
										<div className={cn(s.fieldset, 'col-span-6')}>
											<FormInput
												type="password"
												{...register('newPassword', {
													required: common_dictionary.not_empty!,
													minLength: {
														value: 7,
														message: common_dictionary.longer_7!
													},
													pattern: {
														value: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
														message: common_dictionary.one_letter_one_number!
													}
												})}
												error={errors?.newPassword?.message}
												label={profile_dictionary.password_new!}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className=" pt-6">
				<div className="mt-4 flex justify-end px-4 py-4 sm:px-6 ">
					<div>
						<Button type="submit" className="h-10" loading={loading}>
							{common_dictionary.save}
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}
