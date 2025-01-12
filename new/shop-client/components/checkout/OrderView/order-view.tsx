'use client';
import { FC, useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Dictionary } from '@/lib/get-dictionary';
import { formatPrice } from '@/lib/utils';
import CartItem from '@/components/cart/CartItem';
import { LINKS } from '@/lib/constants';
import Link from 'next/link';
import { useCart } from '@/components/ui/cart-context';


interface Props {
	dictionary: Dictionary;
}
const OrderView: FC<Props> = ({ dictionary }) => {
	const common_dictionary = dictionary.common;
	const checkout_dictionary = dictionary.checkout;
	const { items, totalAmount} = useCart()
	const total = totalAmount;
	const currencyCode = "EUR";

	const [calculating, setCalculating] = useState(false);
	const isEmpty = items?.length === 0;
	const disabled = false;
	const isLoading = false;
	const error = null;
	const success = null;

	return (
		<>
			{isLoading || isEmpty ? (
				<div className="flex flex-1 flex-col items-center justify-center px-4">
					{/* <span className="border border-dashed border-black rounded-full flex items-center justify-center w-16 h-16 p-12"> */}
					<div className="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-100">
						<ShoppingBagIcon className="h-6 w-6 text-zinc-600" aria-hidden="true" />
					</div>
					<div className="mt-3 text-center sm:mt-5">
						<h3 className="text-lg font-medium leading-6 text-gray-900">
							{common_dictionary.empty_cart}
						</h3>
					</div>
				</div>
			) : error ? (
				<div className="flex flex-1 flex-col items-center justify-center px-4">
					<h2 className="pt-6 text-center text-xl font-light">{common_dictionary.order_error}</h2>
				</div>
			) : success ? (
				<div className="flex flex-1 flex-col items-center justify-center px-4">
					<h2 className="pt-6 text-center text-xl font-light">{common_dictionary.order_thanks}</h2>
				</div>
			) : (
				<div className="mt-10 lg:mt-0">
					<h2 className="text-lg font-medium text-gray-900"> {common_dictionary.order_summary}</h2>

					<div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
						<h3 className="sr-only">{common_dictionary.items_in_cart}</h3>
						<ul role="list" className="divide-y divide-gray-200 p-4">
							{items!.map((item) => (
								<CartItem
									//   setActiveOrder={() => {}}
									dictionary={dictionary}
									disabled={disabled}
									key={item.id}
									item={item}
									currencyCode={currencyCode}
									setCalculating={setCalculating}
								/>
							))}
						</ul>
						<div>
							<div className="bg-accent-0 sticky bottom-0 left-0 right-0 w-full flex-shrink-0 border-t px-6 py-6 text-sm sm:px-6">
								<ul className="pb-2">
									<li className="flex justify-between py-1">
										<span>{common_dictionary.subtotal}</span>
										<span>
											{calculating
												? common_dictionary.calculating
												: totalAmount && formatPrice(totalAmount, currencyCode)}
										</span>
									</li>
									{/* <li className="flex justify-between py-1">
										<span>{common_dictionary.taxes}</span>
										<span>
											{calculating
												? common_dictionary.calculating
												: taxPrice && formatPrice(taxPrice, currencyCode)}
										</span>
									</li> */}
									{/* <li className="flex justify-between py-1">
										<span>{common_dictionary.shipping}</span>
										<span className="font-bold tracking-wide">{shipping}</span>
									</li> */}
								</ul>
								<div className="border-accent-2 flex justify-between border-t pt-3 font-bold">
									<span>{common_dictionary.total}</span>
									<span>
										{calculating
											? common_dictionary.calculating
											: total && formatPrice(total, currencyCode)}
									</span>
								</div>
							</div>

							<div>
								{/*<div className="bg-accent-0 sticky bottom-0 left-0 right-0 z-20 w-full flex-shrink-0 border-t px-6 py-6 text-sm sm:px-6">
									<ul className="pb-2">
										 {order?.customer?.firstName && (
											<li className="flex flex-col py-1">
												<span className="font-bold">{checkout_dictionary.customer_info}</span>
												<div className="flex justify-between pt-1">
													<span>
														{order?.customer?.firstName} {order?.customer?.lastName},{' '}
														{order?.customer?.emailAddress}
													</span>
													<Link className="underline" href={link_checkout_general}>
														{common_dictionary.change}
													</Link>
												</div>
											</li>
										)}
										{order?.shippingAddress?.streetLine1 && (
											<li className="flex flex-col py-1">
												<span className="font-bold">{common_dictionary.shipping_address}</span>
												<div className="flex justify-between pt-1">
													<span>
														{order?.shippingAddress?.streetLine1}, {order?.shippingAddress?.city},{' '}
														{order?.shippingAddress?.postalCode}, {order?.shippingAddress?.countryCode}
													</span>
													<Link className="underline" href={link_checkout_addresses}>
														{common_dictionary.change}
													</Link>
												</div>
											</li>
										)}
										{order?.billingAddress?.streetLine1 && (
											<li className="flex flex-col py-1">
												<span className="font-bold">{common_dictionary.billing_address}</span>
												<div className="flex justify-between pt-1">
													<span>
														{order?.billingAddress?.streetLine1}, {order?.billingAddress?.city},{' '}
														{order?.billingAddress?.postalCode}, {order?.billingAddress?.countryCode}
													</span>
													<Link className="underline" href={link_checkout_addresses}>
														{common_dictionary.change}
													</Link>
												</div>
											</li>
										)}
										{order?.shippingLines[0] && (
											<li className="flex flex-col py-1">
												<span className="font-bold">{checkout_dictionary.shipping_method}</span>
												<div className="flex justify-between pt-1">
													<span>
														{order?.shippingLines[0]?.shippingMethod?.name}
													</span>
													<Link className="underline" href={link_checkout_shipping}>
														{common_dictionary.change}
													</Link>
												</div>
											</li>
										)}
									</ul>
								</div> */}
							</div>

							{/* <div className="border-t border-gray-200 px-4 py-6 sm:px-6"></div> */}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default OrderView;
