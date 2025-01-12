'use client'
import { ChangeEvent, FC, useState } from 'react';
// import { validate } from 'email-validator'
import { Info } from '@/components/icons';
import { useUI } from '@/components/ui/ui-context';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';

// import useSignup from '@framework/auth/use-signup'; must_fix_framework
// import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LINKS } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { emailPattern, passwordPattern } from './helpers';
import { Dictionary } from '@/lib/get-dictionary';
import { signup } from '@/lib/actions';
import { client } from '@/lib/client';
import { set } from 'zod';
import { FileUpload } from '../common/FileUpload';

interface Props {
	dictionary: Dictionary;
}
interface SignUpType {
	email: string;
	password: string;
	username: string;
	full_name: string;
	media_id: number;
}

const SignUpView: FC<Props> = ({ dictionary }: Props) => {
	// Form State
	//   const { t } = useTranslation('common');
	const common_dictionary = dictionary.common;
	const [loading, setLoading] = useState(false);
	//   const [message, setMessage] = useState('')
	const [disabled, setDisabled] = useState(false);

	const [file, setFile] = useState<File | null>(null); // File type for file state

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files && e.target.files.length > 0) {
			e?.target?.files[0] && setFile(e?.target?.files[0]);
		}
	};



	const handleUpload = async (): Promise<void> => {
		if (!file) {
			return;
		}

		const formData = new FormData();
		formData.append("name", file.name);
		formData.append("file", file);

		try {
			const response = await fetch("http://localhost:8000/api/media", {
				method: "POST",
				body: formData,
			});


			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const data = await response.json();
			console.log("Upload successful:", data);
			if (data.media_id){
				return data.media_id;
			}
		} catch (error: any) {
			console.error("Error uploading file:", error.message);
			alert("Error uploading file.");
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<SignUpType>({
		defaultValues: { email: '', password: '', full_name: '', username: '' },
		mode: 'onBlur'
	});

	const { setModalView, closeModal } = useUI();

	const handleSignup = async (data: SignUpType) => {
		try {
			setLoading(true);
			const uploadedMediaId = await handleUpload();
			const status = await signup({
				email: data?.email,
				username: data?.username,
				full_name: data?.full_name,
				password: data?.password,
				media_id: uploadedMediaId,
				group_id: 1
			});

			if (!status) {
				throw new Error('Invalid signup');
			}
			setLoading(false);

			toast.success(common_dictionary.signup_success);

			closeModal();

			setTimeout(() => {
				window.location.reload();
			}, 1000);



		} catch (err) {
			console.error(err);
			toast.error(common_dictionary.signup_error);
			setLoading(false);
			setDisabled(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleSignup)} className="flex flex-col justify-between w-full">
			<div className="flex justify-center pb-8 ">
				<Logo width="64px" height="64px" />
			</div>
			<div className="flex flex-col space-y-4">

				<FormInput
					type="text"
					label={common_dictionary.username!}
					{...register('username', {
						required: common_dictionary.not_empty!
					})}
					error={errors.username && errors.username?.message}
				/>
				<FormInput
					type="text"
					label={common_dictionary.full_name!}
					{...register('full_name', {
						required: common_dictionary.not_empty!
					})}
					error={errors.full_name && errors.full_name?.message}
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
						required: common_dictionary.not_empty!,
						minLength: { value: 7, message: common_dictionary.longer_7! },
						pattern: {
							value: passwordPattern,
							message: common_dictionary.one_letter_one_number!
						}
					})}
					error={errors.password && errors.password?.message}
				/>
				<FormInput label={common_dictionary.image} name="file" type="file" onChange={handleFileChange} />

				<span className="text-accent-8">
					<span className="inline-block align-middle ">
						<Info width="15" height="15" />
					</span>{' '}
					<span className="text-sm leading-6">
						<strong>Info</strong>: {common_dictionary.signup_info}{' '}
					</span>
				</span>
				<div className="flex w-full flex-col pt-2">
					<Button
						className="h-10"
						variant="slim"
						type="submit"
						loading={loading}
						disabled={disabled}
					>
						{common_dictionary.signup}
					</Button>
				</div>

				<span className="pt-1 text-center text-sm">
					<span className="text-accent-7">{common_dictionary.have_account}</span>
					{` `}
					<a
						className="cursor-pointer font-bold text-accent-9 hover:underline"
						onClick={() => setModalView('LOGIN_VIEW')}
					>
						{common_dictionary.login}
					</a>


				</span>
			</div>
		</form>
	);
};

export default SignUpView;
