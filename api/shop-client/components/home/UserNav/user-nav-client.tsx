'use client';
import Avatar from '@/components/common/Avatar';
import Searchbar from '@/components/common/Searchbar';
import {
	HeartIcon,
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	UserCircleIcon
} from '@heroicons/react/24/outline';
import { LINKS, SHOP_ENABLED } from '@/lib/constants';
import React, { Fragment, useState } from 'react';
// import { useTranslation } from 'next-i18next';
// import { useCart } from '@framework/cart';
// import { useCustomer } from '@framework/customer';
import { useUI } from '@/components/ui/ui-context';
// import useLogout from '@framework/auth/use-logout'

// import type { LineItem } from '@commerce/types/cart' must_fix_type
import Link from 'next/link';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';
import { Dictionary } from '@/lib/get-dictionary';
import { i18n } from '@/i18n-config';
import { useCart } from '@/components/ui/cart-context';

const { link_profile } = LINKS;

// const countItem = (
//   count: number,
//   item: any //LineItem must_fix_type
// ) => count + item.quantity;

interface Props {
	dictionary: Dictionary;
	customer: any;
}
export default function UserNavClient({ dictionary, customer }: Props) {
	const router = useRouter();
	const { items } = useCart();
	const pathname = usePathname();
	const locales = i18n.locales.map((locale) => locale) as string[];
	const isRoot = pathname === '/' || locales.some(loc => pathname === "/" + loc);
	//   const { t } = useTranslation('common');
	const common_dictionary = dictionary.common;
	const [openSearch, setOpenSearch] = useState(false);
	const totalItems = items.length || 0;
	//   console.log(items)
	//   const { data } = useCart(); must_fix_framework

	const logout = async () => {
		// await logoutMutation();
		router.refresh();
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
				await logout();
				router.push(pathname);
			}
		}
	];

	const openLoginModal = () => {
		if (customer) return;
		setModalView('LOGIN_VIEW');
		openModal()
	}

	//   const itemsCount = data?.lineItems?.reduce(countItem, 0) ?? 0;
	//   const DropdownTrigger = customer
	//     ? DropdownTriggerInst
	//     : React.Fragment

	return (
		<div className="flex flex-1 items-center justify-end">
		
				<>
					{process.env.NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED && (
						<div className="pb-4 lg:px-6 ">
							<Searchbar
								openSearch={openSearch}
								setOpenSearch={setOpenSearch}
								dictionary={dictionary}
							/>
						</div>
					)}
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
						{/* WishList */}
						{process.env.NEXT_PUBLIC_WISHLIST_ENABLED && (
							<div className="ml-4 flow-root">
								<div className="pointer group -m-2 flex items-center p-2">
									<Link href="/wishlist" legacyBehavior>
										<a onClick={closeSidebarIfPresent} aria-label="Wishlist">
											<HeartIcon
												className={clsx(
													'h-6 w-6 flex-shrink-0 hover:scale-105 ',
													isRoot ? 'text-white' : 'text-black'
												)}
											/>
										</a>
									</Link>
									<span className="sr-only">wishlist, view items</span>
								</div>
							</div>
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
								{customer?.emailAddress ? (
									<Menu as="div" className="relative flex-shrink-0">
										<div>
											<Menu.Button
												className={clsx(
													'flex rounded-full text-sm',
													isRoot ? 'text-white' : 'text-black'
												)}
											>
												<span className="sr-only">Open user menu</span>
												{/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
												<Avatar />
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
