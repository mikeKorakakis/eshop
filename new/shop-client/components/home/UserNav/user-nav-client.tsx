'use client';
import Avatar from '@/components/common/Avatar';
import {
	HeartIcon,
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	UserCircleIcon
} from '@heroicons/react/24/outline';
import { LINKS, SHOP_ENABLED } from '@/lib/constants';
import React, { Fragment, useState } from 'react';
import { useUI } from '@/lib/context/ui-context';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';
import { Dictionary } from '@/lib/get-dictionary';
import { i18n } from '@/i18n-config';
import { useCart } from '@/lib/context/cart-context';
import { User } from '@/types';
import { formatImage } from '@/lib/helpers';
import Image from 'next/image';
import { useAuth } from '@/lib/context/auth-context';
import avatarPlaceholder from '@/assets/images/user.png';

const { link_profile } = LINKS;


interface Props {
	dictionary: Dictionary;
}
export default function UserNavClient({ dictionary }: Props) {
	const { user } = useAuth();
	const router = useRouter();
	const { items } = useCart();
	const pathname = usePathname();
	const locales = i18n.locales.map((locale) => locale) as string[];
	const isRoot = pathname === '/' || locales.some(loc => pathname === "/" + loc);
	const common_dictionary = dictionary.common;
	const [openSearch, setOpenSearch] = useState(false);
	const totalItems = items.length || 0;
	const { logout } = useAuth();

	const handleLogout = async () => {
		await logout();
		// window.location.reload();
	};
	const {
		// toggleSidebar,
		closeSidebarIfPresent,
		setModalView,
		openModal,
		setSidebarView,
		openSidebar
	} = useUI();

	const userNavigation = [
		{
			name: common_dictionary.profile,
			icon: UserCircleIcon,
			onClick: () => router.push(link_profile)
		},
		{
			name: common_dictionary.logout,
			icon: ArrowLeftOnRectangleIcon,
			onClick: async () => {
				await handleLogout();
				router.push("/");
			}
		}
	];

	const openLoginModal = () => {
		if (user) return;
		setModalView('LOGIN_VIEW');
		openModal()
	}


	return (
		<div className="flex flex-1 items-center justify-end">

			<>
			
				<div className="flex items-center lg:ml-8">
					{/* Help */}
					{process.env.NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED && (
						<>
							{' '}
							<button
								className="xs:block hidden p-2 text-white"
								onClick={() => setOpenSearch(true)}
							>
								<span className="sr-only">Search</span>
								<MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
							</button>
							<button
								onClick={() => setOpenSearch(true)}
								className={clsx(
									'hidden text-sm font-medium hover:scale-105 lg:block',
									isRoot ? 'text-white' : 'text-black'
								)}
							>
								{common_dictionary.search}
							</button>
						</>
					)}

					{/* Cart */}

					<div
						className={clsx(
							'ml-4 flow-root'
							//   itemsCount > 9 ? 'ml-6' : itemsCount > 999 ? 'ml-8' : 'ml-8'
						)}
					>
						<div className="group -m-2 flex cursor-pointer items-center p-2 ">
							<div
								onClick={() => {
									setSidebarView('CART_VIEW');
									openSidebar();
								}}
								className="relative"
							>
								<ShoppingBagIcon
									className={clsx(
										'h-6 w-6 flex-shrink-0 hover:scale-105',
										isRoot ? 'text-white' : 'text-black'
									)}
									aria-hidden="true"
								/>
								{/* <span className="ml-2 text-sm font-medium text-white"> */}
								{totalItems > 0 && (
									<span
										className={clsx(
											' absolute top-3 -right-3  m-1 flex items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white',
											totalItems > 99 ? 'h-6 w-6' : 'h-5 w-5'
										)}
									>
										{totalItems ?? 0}
									</span>
								)}
							</div>
							<span className="sr-only">items in cart, view bag</span>
						</div>
					</div>

					<div className="ml-4 flow-root ">
						{user?.email ? (
							<Menu as="div" className="relative flex-shrink-0">
								<div>
									<Menu.Button
										className={clsx(
											'flex rounded-full text-sm',
											isRoot ? 'text-white' : 'text-black'
										)}
									>
										<span className="sr-only">Open user menu</span>
										{user?.media?.path ? 
										<Image width={8} height={8} className="h-8 w-8 rounded-full" src={user?.media?.path ? formatImage(user?.media?.path) : avatarPlaceholder} alt="" />
										:
										<Avatar />}
									</Menu.Button>
								</div>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										{userNavigation.map((item) => (
											<Menu.Item key={item.name}>
												{({ active }) => (
													<a
														onClick={item.onClick}
														className={clsx(
															'cursor-pointer',
															active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
															'group flex items-center px-4 py-2 text-sm'
														)}
													>
														<item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
														{item.name}
													</a>
												)}
											</Menu.Item>
										))}
									</Menu.Items>
								</Transition>
							</Menu>
						) : (
							<>
								<div
									className={clsx(
										'hidden cursor-pointer text-sm  font-medium hover:scale-105 sm:block',
										isRoot ? 'text-white' : 'text-black'
									)}
									onClick={openLoginModal}
								>
									{common_dictionary.login}
								</div>
								<UserCircleIcon
									onClick={openLoginModal}
									className={clsx(
										'h-7 hover:scale-105 sm:hidden',
										isRoot ? 'text-white' : 'text-black'
									)}
								/>
							</>
						)}
					</div>

				</div>
			</>

		</div>
	);
}
