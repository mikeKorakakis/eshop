'use client';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import React, { Fragment, useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useUI } from '@/lib/context/ui-context';
import { i18n } from '@/i18n-config';
import { ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { } from '@headlessui/react';
import { useDebounce } from '@/lib/use-debounce';
import Spinner from '@/components/ui/Spinner';
import Image from 'next/image';
import { Dictionary } from '@/lib/get-dictionary';
import { Product } from '@/types';
import { getProducts } from '@/lib/actions';
import placeholderImg from '@/assets/images/product-img-placeholder.svg';
import {
	Transition,
	Combobox,
	Dialog,
} from '@headlessui/react'
import { formatImage } from '@/lib/helpers';



type Props = {
	dictionary: Dictionary;
};

export default function Search({ dictionary }: Props) {
	const pathname = usePathname();
	const [products, setProducts] = useState<Product[] | undefined>([]);
	const [open, setOpen] = useState(true)


	const { openMobileMenu } = useUI()
	const router = useRouter();
	//   const { locale } = router.query;

	const [query, setQuery] = useState('');
	//   const { t } = useTranslation('common');
	const common_dictionary = dictionary.common;
	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event?.target?.value);
	};

	const searchQuery = useDebounce(query, 1000);




	useEffect(() => {
		const fetchProducts = async () => {
			if (products?.length === 0) {
				const products = await getProducts();
				if (products && products.length > 0) {
					setProducts(products);
				}
			}
		}
		fetchProducts();
	}, [products]);

	const searchProducts = useCallback(
		async (text: string) => {
			if (!products) return;

			// Make a shallow copy so as not to mutate state directly
			const temp = [...products];

			if (text) {
				const newData = temp.filter((item) => {
					const itemData = item.name ? item.name.toUpperCase() : '';
					const textData = text.toUpperCase();
					return itemData.indexOf(textData) > -1;
				});
				setProducts(newData);
				console.log(newData);
			} else {
				setProducts([]);
			}
		},
		[products] // Dependencies: re-create this function if "products" changes
	);

	useEffect(() => {
		if (searchQuery) {
			searchProducts(searchQuery);
		}
	}, [searchProducts, searchQuery]);

	useEffect(() => {
		if (searchQuery !== '') {
			setOpen(true)
		}
	}, [searchQuery]);

	const isLoading = false;

	const locales = i18n.locales.map((locale) => locale) as string[];
	const isRoot = pathname === '/' || locales.some(loc => pathname === "/" + loc);
	const [openSearch, setOpenSearch] = useState(false);

	return (
		<>
			<div className="flex flex-1 items-center ">
				<div className="pb-4 lg:px-6 ">
					<Transition.Root show={openSearch} as={Fragment} afterLeave={() => setQuery('')} appear>
						<Dialog as="div" className="relative z-20 " onClose={setOpenSearch}>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
							</Transition.Child>

							<div className="fixed inset-0 top-20 z-20 overflow-y-auto p-4 sm:p-6 md:p-20">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									<Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
										<Combobox>
											{/* </Combobox> onChange={(person) => (window.location = person.url)}> */}
											<div className="relative">
												<MagnifyingGlassIcon
													className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
													aria-hidden="true"
												// onClick={handleClick}
												/>
												<Combobox.Input
													className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
													placeholder={`${common_dictionary.search}...`}
													onChange={changeHandler}
												// onKeyUp={handleKeyUp}
												/>
												{isLoading && (
													<div className="absolute right-4 top-3">
														{' '}
														<Spinner />
													</div>
												)}
											</div>

											{searchQuery !== '' && products && products?.length > 0 && (
												<Combobox.Options
													static
													className=" scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
												>
													{searchQuery !== '' && products &&
														products?.map((product: any) => ( // Product must_fix_type
															<Transition
																key={product.id}
																appear={true}
																enter="transition duration-1000 ease-out"
																enterFrom="transform opacity-0"
																enterTo="transform scale-100 opacity-100"
																leave="transition duration-1000 ease-out"
																leaveFrom="transform opacity-100"
																leaveTo="transform  opacity-0"
															>
																<Combobox.Option
																	onClick={() => {
																		router.push(`/product/${product.product_id}`);
																		setOpenSearch(false);
																	}}
																	key={product.id}
																	value={product}
																	className={({ active }) =>
																		clsx(
																			'cursor-pointer select-none px-4 py-2',
																			active && 'bg-red-600 text-white'
																		)
																	}
																>
																	<div className="inline-flex items-center">
																		<Image
																			src={product?.media?.path ? formatImage(product?.media?.path) : placeholderImg}
																			alt="Empty cart"
																			width={64}
																			height={64}
																			className="mr-2 h-16 w-16  "
																		/>
																		{product?.name}
																	</div>
																</Combobox.Option>
															</Transition>
														))}
												</Combobox.Options>
											)}

											{searchQuery !== '' && products?.length === 0 && (
												<p className="p-4 text-sm text-gray-500">{common_dictionary.no_results}</p>
											)}
										</Combobox>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</Dialog>
					</Transition.Root>
				</div>
				<button
					type="button"
					className={clsx('-ml-2 p-2 lg:hidden', isRoot ? 'text-white' : 'text-black')}
					onClick={() => openMobileMenu()}
				>
					<span className="sr-only">Open menu</span>
					<Bars3Icon className="h-6 w-6" aria-hidden="true" />
				</button>
				<button
					className={clsx('ml-2 p-2  lg:hidden', isRoot ? 'text-white' : 'text-black')}
					onClick={() => setOpenSearch(true)}
				>
					<span className="sr-only">Search</span>
					<MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
				</button>
				<button
					className={clsx('ml-2 p-2 hidden lg:block', isRoot ? 'text-white' : 'text-black')}
					onClick={() => setOpenSearch(true)}
				>
					<div className="flex"><span className="sr-only">Search</span>
					<MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />{common_dictionary.search}</div>
				</button>
			</div>
			
		</>
	);
}
