'use client';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import Button from '@/components/ui/Button';

import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { useRouter } from 'next/navigation';
import { LINKS } from '@/lib/constants';
import { ShippingMethod } from '@/types';

import FormInput from '@/components/ui/FormInput';
import { useForm } from 'react-hook-form';
import { useCart } from '@/lib/context/cart-context';

const { link_checkout_payment, link_checkout_general } = LINKS;

interface ShippingAddress {
	city: string;
	address: string;
	postal_code: string;
}

interface Props {
	dictionary: Dictionary;
	shippingMethods: ShippingMethod[];
}

export default function ShippingView({ dictionary, shippingMethods }: Props) {
	const common_dictionary = dictionary.common;
	const router = useRouter();

	const { shipping, addShipping } = useCart()

	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid }
	} = useForm<ShippingAddress>({
		defaultValues: { city: '', address: '', postal_code: '' },
		mode: 'onBlur'
	});

	useEffect(() => {
		reset(
			{
				city: shipping?.city,
				address: shipping?.address,
				postal_code: shipping?.postal_code
			},
		);
	}, [reset, shipping]);


	const [selectedShipping, setSelectedShipping] = useState<number | undefined>(shippingMethods[0]?.shipping_method_id);


	const onSubmit = async (data: ShippingAddress) => {
		if (selectedShipping) {
			const { city, address, postal_code } = data;
			try {
				setLoading(true);
				addShipping({
					shipping_method_id: selectedShipping,
					city: city,
					address: address,
					postal_code: postal_code,
					cost: shippingMethods.find((method) => method.shipping_method_id === selectedShipping)?.cost ?? 0
				});

			} catch (error: unknown) {
				toast.error(common_dictionary.UNKNOWN_ERROR);

				setLoading(false);
			} finally {
				setLoading(false);
			}
		} else {
			toast.error(common_dictionary.UNKNOWN_ERROR);
		}
	}


	return (
		<div >
			<RadioGroup value={selectedShipping}>
				<RadioGroup.Label className="text-lg font-medium text-gray-900">
					{common_dictionary.shipping_method}
				</RadioGroup.Label>

				<div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
					{shippingMethods &&
						shippingMethods.map((shippingMethod) => (
							<RadioGroup.Option
								key={shippingMethod.shipping_method_id}
								value={shippingMethod}
								onClick={() => setSelectedShipping && setSelectedShipping(shippingMethod.shipping_method_id)}
								className={({ checked, active }) =>
									clsx(
										checked ? 'border-transparent' : 'border-gray-300',
										active ? 'ring-2 ring-red-500' : '',
										'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
									)
								}
							>
								{({ active }) => {
									const checked = selectedShipping === shippingMethod.shipping_method_id;
									return (
										<>
											<span className="flex flex-1">
												<span className="flex flex-col">
													<RadioGroup.Label
														as="span"
														className="block text-sm font-medium text-gray-900"
													>
														{shippingMethod.method_name}
													</RadioGroup.Label>

													<RadioGroup.Description
														as="span"
														className="mt-6 text-sm font-medium text-gray-900 "
													>
														{(shippingMethod?.cost ?? 0)} €
													</RadioGroup.Description>
												</span>
											</span>

											<CheckCircleIcon
												className={clsx(
													'h-5 w-5 text-red-600',
													checked ? 'opacity-1' : 'opacity-0'
												)}
												aria-hidden="true"
											/>

											<span
												className={clsx(
													active ? 'border' : 'border-2',
													checked ? 'border-red-500' : 'border-transparent',
													'pointer-events-none absolute -inset-px rounded-lg'
												)}
												aria-hidden="true"
											/>
										</>
									);
								}}
							</RadioGroup.Option>
						))}
				</div>
			</RadioGroup>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={clsx('h-full')}>
					<div className="mt-8">
						<h2 className="text-lg font-medium text-gray-900">{common_dictionary.shipping_address}</h2>

						<div>
							<hr className="my-6 border-accent-2" />
							<div className="flex flex-col space-y-4">

								<FormInput
									{...register('address', {
										required: common_dictionary.not_empty!
									})}
									error={errors?.address?.message}
									label={common_dictionary.street_number!}
								/>
									<FormInput
										{...register('postal_code', {
											required: common_dictionary.not_empty!
										})}
										error={errors?.postal_code?.message}
										label={common_dictionary.postal_code!}
									/>
									<FormInput
										{...register('city', {
											required: common_dictionary.not_empty!
										})}
										error={errors?.city?.message}
										label={common_dictionary.city!}
									/>
								</div>
						</div>
					</div>
					{/* <div className="sticky z-20 bottom-0 w-full right-0 left-0 py-12 bg-accent-0 border-t border-accent-2 px-6">
        <Button type="submit" width="100%">
          Continue
        </Button>
      </div> */}
				</div>
				<div className="grid grid-cols-1">
					{/* <div className="mt-10">
          <Button loading={loading} disabled={loading} type="submit" onClick={handleSave}>
            {t('common:save')}
          </Button>
        </div> */}
					<div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
						<Button
							//   className="mt-4"
							className="h-10"
							variant="slim"
							type="button"
							// disabled={loading}
							// loading={loading}D
							// disabled={!customer && !orderCustomer}
							// onClick={() => setStep(1)}
							onClick={() => router.push(link_checkout_general)}
						>
							{common_dictionary.back}
						</Button>
						<Button
							className="h-10 w-full"
							variant="slim"
							type="submit"
							loading={loading}

							// disabled={!customer && !orderCustomer}
							disabled={!selectedShipping || !isValid}
							onClick={() => router.push(link_checkout_payment)}
						// onClick={() => setStep(3)}
						>
							{common_dictionary.next}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
