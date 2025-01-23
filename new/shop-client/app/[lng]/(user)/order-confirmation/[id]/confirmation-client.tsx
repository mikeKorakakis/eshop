'use client';
import Link from 'next/link';
import { LINKS } from '@/lib/constants';
import Image from 'next/image';
import success from '@/assets/images/payment-successful.png';
import fail from '@/assets/images/payment-fail.png';
import { useSearchParams } from 'next/navigation';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { Dictionary } from '@/lib/get-dictionary';

const { link_search, link_checkout } = LINKS;

type Props = {
	dictionary: Dictionary;
	id: string;
};

export default function ConfirmationClient({ dictionary, id }: Props) {
	const common_dictionary = dictionary.common;
	const checkout_dictionary = dictionary.checkout;
	const searchParams = useSearchParams();
	const redirect_status = searchParams.get('redirect_status');
	



	return (
		<>
			<div className="absolute z-10 mt-6 w-full">
				<div className="relative mx-auto max-w-screen-2xl px-6">
					<BreadCrumbs
						navigation={[
							{ name: common_dictionary.home!, href: '/' },
							{ name: common_dictionary.shop, href: link_search },
							{ name: common_dictionary.checkout, href: link_checkout }
						]}
					/>
				</div>
			</div>
			<div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
				<div className="flex h-96 justify-center">
					<div className="flex flex-col items-center pt-20">
						<Image
							src={redirect_status === 'succeeded' ? success : fail}
							alt="Empty cart"
							width={120}
							height={120}
							className="w-24 "
						/>
						{/* <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zinc-100">
                    <ShoppingBagIcon
                      className="h-6 w-6 text-zinc-600"
                      aria-hidden="true"
                    />
                  </div> */}
						<div className="mt-3 text-center sm:mt-5">
							<h3 className="text-lg font-medium leading-6 ">
								{redirect_status === 'succeeded'
									? checkout_dictionary.congratulations
									: checkout_dictionary.we_are_sorry}
							</h3>
							<div className="mt-2">
								<p className="text-sm text-gray-500">
									{redirect_status === 'succeeded'
										? `${checkout_dictionary.payment_success} ${id} ${checkout_dictionary.successfull}`
										: checkout_dictionary.payment_failed}
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
			</div>
		</>
	);
}
