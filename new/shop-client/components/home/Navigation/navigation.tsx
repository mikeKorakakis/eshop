"use client"
import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
import { Dictionary } from '@/lib/get-dictionary';
import I18nWidget from '@/components/common/I18nWidget';
import { PhoneIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import UserNav from '../UserNav';
import { i18n } from '@/i18n-config'
import { usePathname, useRouter } from 'next/navigation';
import { LINKS, SHOP_ENABLED } from '@/lib/constants';
import { getCategories } from '@/lib/actions';
import { Category } from '@/types';
import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';
import placeholder from '@/assets/images/placeholder.png';
import { formatImage } from '@/lib/helpers';
import { useAuth } from '@/lib/context/auth-context';
import Loading from '@/components/ui/Loading';
const {
	link_contact,
	link_search
} = LINKS;


interface Props {
	//   setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	dictionary: Dictionary;
	search: ReactNode;
	lng: string
	//   order: Order
}

export default function Navigation({ dictionary, search, lng }: Props) {
	const pathname = usePathname();
	const router = useRouter();
	const locales = i18n.locales.map((locale) => locale) as string[];
	const isRoot = pathname === '/' || locales.some(loc => pathname === "/" + loc);
	const { isAdmin, isLoading } = useAuth();
	
	const common_dictionary = dictionary.common;
	const testPath = pathname?.split("#")[0] || "";
	const [categories, setCategories] = useState<Category[]>([]); // Initialize as an empty array

	useEffect(() => {
		const getCats = async () => {
			try {
				const categories = await getCategories();
				setCategories(categories!);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		getCats();
	}, []);
	const navigation = {
		categories: {
			name: common_dictionary.categories,
			tag: "categories",
			featured: categories?.map(cat => (
				{
					name: cat.name,
					href: `/${lng}/categories/${cat.category_id}`,
					imageSrc: cat?.media?.path ? formatImage(cat?.media?.path) : placeholder,
					imageAlt: common_dictionary.menu_services_race_prep
				}
			))
		},

		admin: [
			{
				name: common_dictionary.dashboard,
				tag: "dashboard",
				href: `/${lng}/admin/dashboard`
			},
			{
				name: common_dictionary.categories,
				tag: "categories",
				href: `/${lng}/admin/categories`
			},

			{
				name: common_dictionary.products,
				tag: "products",
				href: `/${lng}/admin/products`
			},
			{
				name: common_dictionary.orders,
				tag: "orders",
				href: `/${lng}/admin/orders`
			},
			{
				name: common_dictionary.customers,
				tag: "customers",
				href: `/${lng}/admin/customers`
			},
			{
				name: common_dictionary.comments,
				tag: "comments",
				href: `/${lng}/admin/comments`
			},

		],

		pages: SHOP_ENABLED
			? [
				{ name: common_dictionary.menu_shop, href: `/${lng}/link_search`, tag: 'search' },
				{ name: common_dictionary.menu_contact, href: `/${lng}link_contact`, tag: 'contact' }
			]
			: [

				{ name: common_dictionary.menu_contact, href: `/${lng}link_contact`, tag: 'contact' }
			]
	};

	return (
		<header className="absolute z-20 w-full">
			<nav aria-label="Top">
				{/* Top navigation */}
				<div className="bg-gray-900">
					<div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
						{/* Currency selector */}
						<div></div>

						<div className="flex items-center space-x-2">
							<div className=" flex h-min space-x-1">
								<span className="mr-4 flex text-sm font-medium text-white hover:text-gray-100">
									<PhoneIcon className="my-auto inline h-5 pr-2 text-sm font-medium text-white" />
									<span className="w-fit">210-1234567, 210-1234567</span>
								</span>
							</div>

							<label htmlFor="desktop-currency" className="sr-only">
								Language
							</label>
							<I18nWidget />
		
						</div>
					</div>
				</div>

				{/* Secondary navigation */}
				<div className="bg-black bg-opacity-20 backdrop-blur-md backdrop-filter">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div>
							<div className="flex h-16 items-center justify-between">
								{/* Logo (lg+) */}
								<div className="hidden lg:flex lg:flex-1 lg:items-center">
									<Logo className={isRoot ? "text-white" : "text-black"} />
								</div>
								{!isLoading && <div className="hidden h-full space-x-4 lg:flex">
									{/* Home menu link */}
									{!isAdmin && <Link
										href="/"
										className={clsx(
											'flex items-center text-sm font-medium hover:border-b border-red-500',
											isRoot ? 'text-white border-b-2 border-red-500' : 'text-black'

										)}
									>
										{common_dictionary.menu_home}
									</Link>}
									<Popover.Group className="inset-x-0 bottom-0 px-4">
										<div className="flex h-full justify-center space-x-8">
											{/* {navigation.categories && navigation.categories.featured && */}
											{/* navigation.categories.featured.map((category) => ( */}
											{isAdmin ?
												navigation?.admin?.map((page) => (
													<Link
														key={page.name}
														href={page.href}
														className={clsx(
															'flex items-center text-sm font-medium hover:border-b border-red-500 ',
															isRoot ? 'text-white' : 'text-black',
															testPath.includes(page.tag) && "border-b-2 border-red-500"
														)}
													>
														{page.name}
													</Link>
												))
												: <Popover key={navigation?.categories?.name} className="flex">
													{({ open }) => (
														<>
															<div className="relative flex">
																<Popover.Button
																	className={clsx(
																		'relative z-10 flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out hover:border-b border-red-500',
																		isRoot ? 'text-white' : 'text-black',
																		testPath.includes(navigation.categories?.tag) && "border-b-2 border-red-500"
																		// isRoot ? 'text-white' : 'text-black'
																	)}
																>
																	{navigation.categories?.name}
																	<span
																		className={clsx(
																			open ? '' : '',
																			'absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out'
																		)}
																		aria-hidden="true"
																	/>
																</Popover.Button>
															</div>

															<Transition
																as={Fragment}
																enter="transition ease-out duration-200"
																enterFrom="opacity-0"
																enterTo="opacity-100"
																leave="transition ease-in duration-150"
																leaveFrom="opacity-100"
																leaveTo="opacity-0"
															>
																<Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
																	{({ close }) => (
																		<>
																			<div
																				className="absolute inset-0 top-1/2 bg-white shadow"
																				aria-hidden="true"
																			/>

																			<div className="relative bg-white">
																				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
																					<div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
																						{navigation?.categories?.featured?.map((item) => (
																							<div key={item.name} className="group relative">
																								<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
																									<Image
																										src={item.imageSrc}
																										alt={item.imageAlt}
																										width={500}
																										height={500}
																										className="object-cover object-center"
																										priority
																									/>
																								</div>
																								<div
																									onClick={() => {
																										close();
																										router.push(item.href);
																									}}
																									className="mt-4 block font-medium text-gray-900"
																								>
																									<span className="absolute inset-0 z-10" aria-hidden="true" />
																									{item.name}
																								</div>
																							</div>
																						))}
																					</div>
																				</div>
																			</div>
																		</>
																	)}
																</Popover.Panel>
															</Transition>
														</>
													)}
												</Popover>}
											{/* ))} */}

											{!isAdmin && navigation.pages.map((page) => (
												<Link
													key={page.name}
													href={page.href}
													className={clsx(
														'flex items-center text-sm font-medium hover:border-b border-red-500 ',
														isRoot ? 'text-white' : 'text-black',
														testPath.includes(page.tag) && "border-b-2 border-red-500"
													)}
												>
													{page.name}
												</Link>
											))}
										</div>
									</Popover.Group>
								</div>}

								{/* Mobile menu and search (lg-) SearchBar*/}
								{search}

								{/* Logo (lg-) */}
								<Logo className={clsx("lg:hidden", isRoot ? "text-white" : "text-black")} />
								<UserNav dictionary={dictionary} />
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
