'use client';
import { useEffect, useState } from 'react';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button/button';
import s from './UserInfoView.module.css';
import { emailPattern } from '@/components/auth/helpers';
import { useForm } from 'react-hook-form';
import { LINKS } from '@/lib/constants';
import Link from 'next/link';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/actions';
import { User } from '@/types';
import LoginView from './login-view';
import { useUI } from '@/lib/context/ui-context';

const { link_profile_addresses, link_checkout_payment } = LINKS;

type Props = {
	dictionary: Dictionary;
	customer: User | null;
};

interface CustomerBaseInfo {
	firstName: string;
	lastName: string;
	email: string;
}

const UserInfoView = ({ dictionary, customer }: Props) => {
	const common_dictionary = dictionary.common;
	const checkout_dictionary = dictionary.checkout;

	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { openModal, setModalView } = useUI();



	const handleLogout = async () => {
		await logout();
		window.location.reload();
	}











	return (
		<>
			<div>
				<div>
					<h2 className="text-lg font-medium text-gray-900">{checkout_dictionary.customer_info}</h2>
					{/* {message && <ErrorMessage error={{ message }} className=" mt-4" />} */}
					{customer?.email && (
						<>
							<div className="mt-8">
								<div className="">
									<h2 className="text-lg font-medium text-gray-900">
										{/* {checkout_dictionary.welcome_back} */}
									</h2>
									<p className="mt-1 text-sm text-gray-600">
										{checkout_dictionary.logged_in_as} {customer.username} (
										{customer.email})
										<button
											className=" text-sm ml-2 text-red-500 underline"
											type="button"
										onClick={handleLogout}
										>
											{common_dictionary.logout}
										</button>
									</p>
									<p className="mt-1 text-sm text-red-600">
										{/* {checkout_dictionary.set_address}{' '}
										<Link href={link_profile_addresses} className="text-red-500 underline">
											{checkout_dictionary.here}
										</Link> */}


									</p>
								</div>
							</div>
						</>
					)}
				</div>
				<div>
					{!customer && (
						<>
							<div className="pt-8 text-sm">
								<span className="text-accent-7">{common_dictionary.login_to_continue}</span>
								{` `}
								<a
									className="text-accent-9 cursor-pointer text-red-500 font-bold hover:underline"
									onClick={() => {
										setModalView('LOGIN_VIEW');
										openModal();
									}}
								>
									{common_dictionary.login}
								</a>
							</div>
						</>
					)}

					<>

						<Button
							className="mt-10 h-10 w-full"
							variant="slim"
							type="submit"
							loading={loading}
							disabled={!customer}
							onClick={() => router.push(link_checkout_payment)}
						//   onClick={() => setStep(1)}
						>
							{common_dictionary.next}
						</Button>
					</>
				</div>
				{/* {isGuest && !customer && (
          <Button
            className="mt-10"
            variant="slim"
            type="submit"
            disabled={!isDirty || !isValid}
            // onClick={handleLogin}
          >
            {common_dictionary.save}
          </Button>
        )} */}
			</div>
		</>
	);
};

export default UserInfoView;
