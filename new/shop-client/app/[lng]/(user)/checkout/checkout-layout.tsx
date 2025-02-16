
"use client"
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { LINKS } from '@/lib/constants';
import { Dictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
import emptyCart from '@/assets/images/empty-cart.svg';
import Loading from '@/components/ui/Loading';
import CheckoutSteps from './checkout-steps';
import Link from 'next/link';
import OrderView from '@/components/checkout/OrderView';
import { ReactNode, Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'
import { useCart } from '@/lib/context/cart-context';

const { link_search } = LINKS;

type Props = { 
	dictionary: Dictionary;
	children: ReactNode;
 } 



export default function CheckoutLayout({ dictionary, children }: Props) {
	const common_dictionary = dictionary.common;
	const checkout_dictionary = dictionary.checkout;
	
	const { items } = useCart()
	const isEmpty = items.length === 0;
	const isLoadingCart = false;

	if(isEmpty) return <Loading />

	// if (isLoading) return <Loading />;
	// if (!(items.length > 0)) redirect(link_search);


	return (
		<>
			<div className="absolute z-10 mt-6 w-full">
				<div className="relative mx-auto max-w-screen-2xl px-6">
					<BreadCrumbs
						navigation={[
							{ name: common_dictionary.home!, href: '/' },
							{ name: common_dictionary.shop, href: link_search },
							{ name: common_dictionary.checkout, href: '#' }
						]}
					/>
				</div>
			</div>
			<div className="mt-16">
				{/* <checkout
          addresses={addresses || []}
          customer={customer}
          order={order}
          dictionary={dictionary}
          eligiblePaymentMethods={eligiblePaymentMethods}
          eligibleShippingMethods={eligibleShippingMethods}
        /> */}
				<div className=" pt-8">
					<main className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
						{items.length > 0 && !isEmpty && (
							<div className="pb-10">
								<CheckoutSteps dictionary={dictionary} />
							</div>
						)}

						{isLoadingCart && <Loading />}
						{isEmpty && !isLoadingCart && (
							<div className="flex h-96 justify-center">
								<div className="flex flex-col items-center pt-20">
									<Image
										src={emptyCart}
										alt="Empty cart"
										width={120}
										height={120}
										className="w-24 "
									/>

									<div className="mt-3 text-center sm:mt-5">
										<h3 className="text-lg font-medium leading-6 ">
											{common_dictionary.empty_cart}
										</h3>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												{checkout_dictionary.cart_empty_description}
											</p>
										</div>
										<div className="mt-6">
											<Link
												href={link_search}
												className="text-sm font-medium text-zinc-600 hover:text-zinc-500"
											>
												{common_dictionary.go_back_shopping}
												<span aria-hidden="true"> &rarr;</span>
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}

						{items.length > 0 && !isEmpty && (
							<div className="mx-auto max-w-2xl lg:max-w-none">
								<h1 className="sr-only">{checkout_dictionary.checkout}</h1>
								<div
									className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
								//   onSubmit={handleSubmit(onSubmit)}
								>
									<div><Suspense fallback={<Spinner centered />}>{children}</Suspense></div>

									{/* Order summary */}
									<OrderView
										dictionary={dictionary}
									/>
								</div>
							</div>
						)}
					</main>
				</div>
			</div>
		</>
	);
}
