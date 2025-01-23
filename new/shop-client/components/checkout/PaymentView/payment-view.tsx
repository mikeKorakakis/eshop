'use client';
import React, { useState } from 'react';
// import { StripePayments } from './../StripePayments/index'
// import BraintreePayments from '../BraintreePayments'
// const BraintreePayments = dynamic(() => import('../BraintreePayments'));
// const StripePayments = dynamic(() => import('../StripePayments'));
import Button from '@/components/ui/Button';
// import dynamic from 'next/dynamic';
import { Dictionary } from '@/lib/get-dictionary';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LINKS, test_user_id } from '@/lib/constants';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import FormInput from '@/components/ui/FormInput';
import { useCart } from '@/lib/context/cart-context';
import { makePurchase } from '@/lib/actions';

const { link_order_confirmation, link_checkout_shipping, link_checkout_general } = LINKS;

interface Props {
	dictionary: Dictionary;
}

type PaymentType = {
	cardNumber: string;
	nameOnCard: string;
	expirationDate: string;
	cvc: string;
};

export default function PaymentView({ dictionary }: Props) {
	const common_dictionary = dictionary.common;
	const checkout_dictionary = dictionary.checkout;
	const { items, totalAmount, clearCart } = useCart();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<PaymentType>({
		defaultValues: { cardNumber: '', nameOnCard: '', expirationDate: '', cvc: '' },
		mode: 'onBlur'
	});

	const router = useRouter();
	const pathname = usePathname();
	const locale = pathname.split('/')[1];
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: PaymentType) => {
		try {
			setLoading(true);


			const order = await makePurchase({
				card_number: data.cardNumber,
				products: items,
				total_amount: totalAmount,
			})

			router.push(`${link_order_confirmation}/${order?.order_id}?redirect_status=succeeded`);



		} catch (err: any) {
			if (err.message === "payment_failed") {
				toast.error(common_dictionary.PAYMENT_FAILED_ERROR)
			} else if (err.message === "payment_declined") {
				toast.error(common_dictionary.PAYMENT_DECLINED_ERROR);
			}else{
				toast.error(common_dictionary.error);
			}
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
							<CardNumberInput
								register={register}
								errors={errors}
								checkout_dictionary={checkout_dictionary}
								common_dictionary={common_dictionary} />

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
								placeholder="John Smith"
								error={errors.nameOnCard && errors.cardNumber?.message}
							/>
						</div>
					</div>

					<div className="col-span-3">
						<div className="mt-2">
							<ExpirationDateInput
								register={register}
								errors={errors}
								checkout_dictionary={checkout_dictionary}
								common_dictionary={common_dictionary} />


						</div>
					</div>

					<div>
						<div className="mt-2">
							<FormInput
								{...register('cvc', {
									required: common_dictionary.not_empty!,
								})}
								type="text"
								maxLength={3}
								placeholder="123"
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
						loading={loading}
						disabled={!isValid}
					>
						{checkout_dictionary.confirm_order_pay}
					</Button>
					{isValid}
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

const CardNumberInput = ({ register, errors, checkout_dictionary, common_dictionary }:
	{ register: UseFormRegister<PaymentType>, errors: FieldErrors<PaymentType>, checkout_dictionary: Dictionary["checkout"], common_dictionary: Dictionary["common"] }) => {
	const handleCardNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		let input = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
		input = input.replace(/(\d{4})/g, '$1 ').trim(); // Add spaces after every 4 digits
		event.target.value = input;
	};

	return (
		<FormInput
			{...register('cardNumber', {
				required: common_dictionary.not_empty!,
				validate: (value: string) => {
					const digitsOnly = value.replace(/\s/g, ''); // Remove spaces
					return digitsOnly.length === 16 || common_dictionary.invalid_card_number!;
				},
			})}
			maxLength={19} // Max length including spaces (16 digits + 3 spaces)
			type="text"
			label={checkout_dictionary.card_number}
			placeholder="4242 4242 4242 4242"
			error={errors.cardNumber && errors.cardNumber?.message}
			onInput={handleCardNumberInput} // Add formatting handler
		/>
	);
};


const ExpirationDateInput = ({ register, errors, checkout_dictionary, common_dictionary }:
	{ register: UseFormRegister<PaymentType>, errors: FieldErrors<PaymentType>, checkout_dictionary: Dictionary["checkout"], common_dictionary: Dictionary["common"] }) => {
	const handleExpirationDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		let input = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
		if (input.length > 2) {
			input = `${input.slice(0, 2)}/${input.slice(2, 4)}`; // Add "/" after the first 2 digits
		}
		event.target.value = input;
	};

	return (
		<FormInput
			{...register('expirationDate', {
				required: common_dictionary.not_empty!,
				validate: (value: string) => {
					const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Format: MM/YY
					return regex.test(value) || common_dictionary.invalid_expiration_date!;
				},
			})}
			type="text"
			maxLength={5} // Max length for "MM/YY"
			label={checkout_dictionary.expiration_date}
			placeholder="MM/YY"
			error={errors.expirationDate && errors.expirationDate?.message}
			onInput={handleExpirationDateInput} // Add formatting handler
		/>
	);
};
