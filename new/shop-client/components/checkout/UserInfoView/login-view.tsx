import { useState } from 'react';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import { useUI } from '@/lib/context/ui-context';
import { validate } from 'email-validator';
import s from './UserInfoView.module.css';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Dictionary } from '@/lib/get-dictionary';
import { LINKS } from '@/lib/constants';
import { User } from '@/types';
import { login } from '@/lib/actions';

const { link_password_reset_request } = LINKS;

type LoginType = {
	username: string;
	password: string;
};

type Props = {
	customer: User;
	dictionary: Dictionary;
};

const LoginView = ({ customer, dictionary }: Props) => {
	const router = useRouter();
	const common_dictionary = dictionary.common;

	const isGuest = !!customer;
	

	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const { setModalView, openModal } = useUI();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginType>({
		defaultValues: { username: '', password: '' },
		mode: 'onBlur'
	});

	//   const logout = useLogout();

	const onSubmit = async (data: LoginType) => {
		try {
			setLoading(true);
			const res = await login({
				username: data?.username,
				password: data?.password
			});
			toast.success(common_dictionary.login_success);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (err: any) {
			toast.error(common_dictionary.wrong_password);
		} finally {
			setLoading(false);
			setDisabled(false);
		}
	};
	//   const handleLogout = async (e: React.SyntheticEvent<EventTarget>) => {
	//     e.preventDefault();

	//     try {
	//       setLoading(true);

	//       await logout();
	//       setLoading(false);
	//     } catch ({ errors }: any) {
	//       if (errors instanceof Array) {
	//         //     setMessage(errors.map((e: any) => e.message).join('<br/>'))
	//         //   } else {
	//         toast.error(common_dictionary.logout_error!);
	//       }
	//       setLoading(false);
	//       setDisabled(false);
	//     }
	//   };

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				{!isGuest && !!!customer && (
					<div className="mt-4">
						<div className="mt-4 grid grid-cols-1">
							<div className={s.fieldset}>
								<FormInput
									{...register('username', {
										required: common_dictionary.not_empty!,
									})}
									type="text"
									placeholder="Email"
									error={errors.username && errors.username?.message}
								/>
							</div>
							<div className={s.fieldset}>
								<FormInput
									type="password"
									placeholder={common_dictionary.password}
									{...register('password', {
										required: common_dictionary.not_empty
									})}
									error={errors.password && errors.password?.message}
								/>
							</div>
							<Button
								className="mt-4 h-10"
								variant="slim"
								type="submit"
								loading={loading}
								disabled={disabled}
							>
								{common_dictionary.login}
							</Button>
						</div>

						<div className="pt-2 text-sm">
							<span className="text-accent-7">{common_dictionary.no_account}</span>
							{` `}
							<a
								className="text-accent-9 cursor-pointer font-bold hover:underline"
								onClick={() => {
									setModalView('SIGNUP_VIEW');
									openModal();
								}}
							>
								{common_dictionary.signup}
							</a>
						</div>
					</div>
				)}

			
			</form>
		</>
	);
};

export default LoginView;
