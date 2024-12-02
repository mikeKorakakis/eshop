'use client';
import React, { useState } from 'react';
// import { StripePayments } from './../StripePayments/index'
// import BraintreePayments from '../BraintreePayments'
// const BraintreePayments = dynamic(() => import('../BraintreePayments'));
// const StripePayments = dynamic(() => import('../StripePayments'));
import Button from '@/components/ui/Button';
// import dynamic from 'next/dynamic';
import { Dictionary } from '@/lib/get-dictionary';
import StripePayments from '../StripePayments';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { refreshCart } from '../actions';
import { LINKS } from '@/lib/constants';
import PaymentRadioGroup from './payment-radio-group';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/ui/FormInput';
import { client } from '@/lib/client';
import { useCart } from '@/components/ui/cart-context';
import { Order } from '@/types/types';

const { link_order_confirmation, link_checkout_shipping, link_checkout_general } = LINKS;

interface Props {
	dictionary: Dictionary;
}

type PaymentType = {
	cardNumber: string;
	nameOnCard: string;
	exprirationDate: string;
	cvc: string;
};

export default function PaymentView({ dictionary }: Props) {
	const common_dictionary = dictionary.common;
	const checkout_dictionary = dictionary.checkout;
	const { items, totalAmount } = useCart();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<PaymentType>({
		defaultValues: { cardNumber: '', nameOnCard: '', exprirationDate: '', cvc: '' },
		mode: 'onBlur'
	});

	const router = useRouter();
	const pathname = usePathname();
	const locale = pathname.split('/')[1];
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: PaymentType) => {
		try {
			setLoading(true);
			client.POST('/orders', {
				body: {
					user_id: 2,
					total_amount: totalAmount,
					order_date: new Date().toISOString(),
					order_status: "pending"
				}
			})

			const res = await client.GET(`/orders`);
		
			let orders = res.data?.data as Order[];

			const order = orders[orders.length-1]
			for (const item of items ){
				client.POST('/order-items', {
					body: {
						item_id: item.id,
						price_at_purchase: item.price,
						quantity: item.quantity,
						order_id: order?.order_id
					}
				})
			}
			
			
		} catch (err: any) {
			toast.error(common_dictionary.error);
		} finally {
			setLoading(false);
		}
	}
	//   const router = useRouter();
	// const locale = (router.locale as 'en' | 'el') || 'en';

	//   const handlePayInStore = async () => {
	//     setLoading(true);
	//     try {
	//       if (
	//         selectedPayment === 'pay-in-store' &&
	//         eligiblePaymentMethods?.some((paymentMethod) => paymentMethod.code)
	//       ) {
	//         const res1 = await transitionOrderToStateMutation('ArrangingPayment');
	//         if (res1?.transitionOrderToState?.__typename === 'Order') {
	//           const res2 = await addPaymentToOrderMutation({ method: selectedPayment, metadata: {} });
	//           if (res2.__typename === 'Order') {
	//             await refreshCart();
	//             router.push(`${link_order_confirmation}/${res2.code}?redirect_status=succeeded`);
	//           } else {
	//             toast.error(common_dictionary.error);
	//           }
	//         } else {
	//           toast.error(common_dictionary.error);
	//         }
	//       }
	//     } catch (e) {
	//       toast.error(common_dictionary.error);
	//     } finally {
	//       setLoading(false);
	//     }
	//   };
	return (
		<div>
			<h2 className="text-lg font-medium text-gray-900">{common_dictionary.payment}</h2>




			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
					<div className="col-span-4">
						<div className="mt-2">

							<FormInput
								{...register('cardNumber', {
									required: common_dictionary.not_empty!,
								})}
								type="text"
								label={checkout_dictionary.card_number}
								placeholder={checkout_dictionary.card_number}
								error={errors.cardNumber && errors.cardNumber?.message}
							/>
						</div>
					</div>

					<div className="col-span-4">
						<div className="mt-2">
							<FormInput
								{...register('nameOnCard', {
									required: common_dictionary.not_empty!,
								})}
								type="text"
								label={checkout_dictionary.name_on_card}
								placeholder={checkout_dictionary.name_on_card}
								error={errors.nameOnCard && errors.cardNumber?.message}
							/>
						</div>
					</div>

					<div className="col-span-3">
						<div className="mt-2">
							<FormInput
								{...register('exprirationDate', {
									required: common_dictionary.not_empty!,
								})}
								type="text"
								label={checkout_dictionary.expiration_date}
								placeholder={checkout_dictionary.expiration_date}
								error={errors.nameOnCard && errors.cardNumber?.message}
							/>
						</div>
					</div>

					<div>
						<div className="mt-2">
							<FormInput
								{...register('cvc', {
									required: common_dictionary.not_empty!,
								})}
								type="text"
								placeholder="CVC"
								label='CVC'
								error={errors.cvc && errors.cvc?.message}
							/>
						</div>
					</div>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-2">
					<Button
						//   className="mt-4"
						className="h-10"
						variant="ghost"
						type="submit"
						disabled={!isValid}
					>
						{checkout_dictionary.confirm_order_pay}
					</Button>
					<Button
						//   className="mt-4"
						className="h-10"
						variant="slim"
						type="button"
						onClick={() => router.push(link_checkout_general)}
					// loading={loading}D
					// disabled={!customer && !orderCustomer}
					//   onClick={() => {
					// setSelectedPayment(undefined);
					// setStep(2);
					//   }}
					>
						{common_dictionary.back}
					</Button>
				</div>
			</form>
		</div >
	);
}
