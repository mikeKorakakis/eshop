'use client';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { LINKS, SHOP_ENABLED } from '@/lib/constants';

import { usePathname, useRouter } from 'next/navigation';
import { Dictionary } from '@/lib/get-dictionary';
import { getCategories } from '@/lib/actions';
import { Category } from '@/types';
import preparation from '@/assets/images/placeholder.png';
import { useUI } from '@/lib/context/ui-context';


const {
	link_search,
	link_contact
} = LINKS;

interface Props {
	dictionary: Dictionary;
	lng: string;
}

const MobileMenu = ({ dictionary, lng }: Props) => {
	const { displayMobileMenu, openMobileMenu, closeMobileMenu } = useUI();
	const [categories, setCategories] = useState<Category[]>([]); // Initialize as an empty array
	const pathname = usePathname();
	const adminPath = pathname.includes('admin');
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

	const common_dictionary = dictionary.common;
	const router = useRouter();
	const navigation = {
		// categories: [],
		categories: [
			{
				name: common_dictionary.categories,
				tag: "categories",
				featured: categories?.map(cat => (
					{
						name: cat.name,
						href: `/${lng}/categories/${cat.category_id}`,
						imageSrc: preparation,
						imageAlt: common_dictionary.menu_services_race_prep
					}
				))
			},
		
		],
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
		pages: [
			//   { name: common_dictionary.menu_home, href: '/' },
			//   { name: common_dictionary.menu_about, href: '/' },
			//   { name: common_dictionary.menu_products, href: '/' },
			{ name: common_dictionary.menu_contact, href: link_contact }
		]
	};

	return (
		<Transition.Root show={displayMobileMenu} as={Fragment}>
			<Dialog as="div" className="relative z-40 lg:hidden" onClose={closeMobileMenu}>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 z-40 flex">
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
							<div className="flex px-4 pb-2 pt-5">
								<button
									type="button"
									className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
									onClick={closeMobileMenu}
								>
									<span className="sr-only">Close menu</span>
									<XMarkIcon className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>

							{/* Links */}
							{!adminPath &&<Tab.Group as="div" className="mt-2">
								<div className="overflow-auto border-b border-gray-200">
									<Tab.List className=" flex space-x-8 px-4">
										{navigation.categories &&
											navigation.categories.map((category) => (
												<Tab
													key={category.name}
													className={({ selected }) =>
														clsx(
															selected
																? 'border-red-600 text-red-600'
																: 'border-transparent text-gray-900',
															'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
														)
													}
												>
													{category.name}
												</Tab>
											))}
									</Tab.List>
								</div>
								<Tab.Panels as={Fragment}>
									 {navigation.categories &&
										navigation.categories.map((category) => (
											<Tab.Panel key={category.name} className="space-y-12 px-4 py-4">
												<div className="grid grid-cols-2 gap-x-4 gap-y-10">
													{category?.featured?.map((item) => (
														<div key={item.name} className="group relative cursor-pointer">
															<div className=" aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
																<Image
																	src={item.imageSrc}
																	alt={item.imageAlt}
																	className="object-cover object-center "
																/>
															</div>
															<div
																onClick={() => {
																	openMobileMenu();
																	router.push(item.href);
																}}
																// href={item.href}
																className="mt-6 block text-sm font-medium text-gray-900"
															>
																<span className="absolute inset-0 z-10" aria-hidden="true" />
																{item.name}
															</div>

														</div>
													))}
												</div>
											</Tab.Panel>
										))}
								</Tab.Panels>
							</Tab.Group>}

							{false && (
								<div className="space-y-6 border-t border-gray-200 px-4 py-4">
									<div className="flow-root">
										<div
											onClick={() => {
												openMobileMenu();
												router.push(link_search);
											}}
											//   href={link_search}
											className="-m-2 block cursor-pointer p-2 font-medium text-gray-900"
										>
											{common_dictionary.shop}
										</div>
									</div>
									{/* <div className="flow-root">
                        <Link
                          href="#"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Sign in
                        </Link>
                      </div> */}
								</div>
							)}
							<div className="space-y-6 border-t border-gray-200 px-4 py-4">
								{navigation?.pages?.map((page) => (
									<div key={page.name} className="flow-root">
										<div
											onClick={() => {
												openMobileMenu();
												router.push(page.href);
											}}
											// href={page.href}
											className="-m-2 block cursor-pointer p-2 font-medium text-gray-900"
										>
											{page.name}
										</div>
									</div>
								))}
								{adminPath && navigation.admin.map((page) => (
									<div key={page.name} className="flow-root">
										<div
											onClick={() => {
												openMobileMenu();
												router.push(page.href);
											}}
											// href={page.href}
											className="-m-2 block cursor-pointer p-2 font-medium text-gray-900"
										>
											{page.name}
										</div>
									</div>
								))}
							</div>

							<div className="space-y-6 border-t border-gray-200 px-4 py-6">
								{/* Currency selector */}
								{/* <I18nWidget /> */}
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default MobileMenu;
