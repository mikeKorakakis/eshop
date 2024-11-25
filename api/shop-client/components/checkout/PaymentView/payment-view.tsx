'use client';
import React, { useState } from 'react';
// import { StripePayments } from './../StripePayments/index'
// import BraintreePayments from '../BraintreePayments'
// const BraintreePayments = dynamic(() => import('../BraintreePayments'));
// const StripePayments = dynamic(() => import('../StripePayments'));
import Button from '@/components/ui/Button';
// import dynamic from 'next/dynamic';
import { Dictionary } from '@/lib/get-dictionary';
import { Order, PaymentMethodQuote } from '@/lib/vendure/generated/graphql-shop';
import StripePayments from '../StripePayments';
import { usePathname, useRouter } from 'next/navigation';
import {
  addPaymentToOrderMutation,
  transitionOrderToStateMutation
} from '@/lib/vendure/shop/checkout/checkout';
import toast from 'react-hot-toast';
import { refreshCart } from '../actions';
import { LINKS } from '@/lib/constants';
import PaymentRadioGroup from './payment-radio-group';

const { link_order_confirmation, link_checkout_shipping } = LINKS;

interface Props {
  order: Order;
  selectedPayment?: string;
  dictionary: Dictionary;
  eligiblePaymentMethods: PaymentMethodQuote[];
}

export default function PaymentView({ order, dictionary, eligiblePaymentMethods }: Props) {
  const common_dictionary = dictionary.common;
  const checkout_dictionary = dictionary.checkout;
  const paymentMethods = eligiblePaymentMethods;
  const initialPaymentMethod = eligiblePaymentMethods[1]?.code
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const [selectedPayment, setSelectedPayment] = React.useState<string | undefined>(initialPaymentMethod);
  const [loading, setLoading] = useState(false);
  //   const router = useRouter();
    // const locale = (router.locale as 'en' | 'el') || 'en';

  const handlePayInStore = async () => {
    setLoading(true);
    try {
      if (
        selectedPayment === 'pay-in-store' &&
        eligiblePaymentMethods?.some((paymentMethod) => paymentMethod.code)
      ) {
        const res1 = await transitionOrderToStateMutation('ArrangingPayment');
        if (res1?.transitionOrderToState?.__typename === 'Order') {
          const res2 = await addPaymentToOrderMutation({ method: selectedPayment, metadata: {} });
          if (res2.__typename === 'Order') {
            await refreshCart();
            router.push(`${link_order_confirmation}/${res2.code}?redirect_status=succeeded`);
          } else {
            toast.error(common_dictionary.error);
          }
        } else {
          toast.error(common_dictionary.error);
        }
      }
    } catch (e) {
      toast.error(common_dictionary.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900">{common_dictionary.payment}</h2>
      {
        <>
          <fieldset className="mt-8">
            <legend className="sr-only">{common_dictionary.payment_type}</legend>
         
              <PaymentRadioGroup
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                paymentMethods={paymentMethods}
              />
          </fieldset>
        </>
      }

      <div>
        {/* {selectedPayment === 'stripe' && ( */}
          <>
            {
              <div className="mt-4">
                <StripePayments
                  locale={(locale as 'el') || 'en'}
                  orderCode={order?.code}
                  dictionary={dictionary}
                />
              </div>
            }
          </>
        {/* )} */}

        {/* {selectedPayment === 'braintree' && (
          <>
            {pay && (
              <div className="mt-4">
                <BraintreePayments dictionary={dictionary} order={order} onCheckout={onCheckout} />{' '}
              </div>
            )}
          </>
        )} */}
      </div>

      {selectedPayment === 'pay-in-store' && (
        <div className="mt-10 grid grid-cols-1 gap-2">
          <Button
            //   className="mt-4"
            className="h-10"
            variant="slim"
            type="button"
            loading={loading}
            onClick={handlePayInStore}
            // disabled={!customer && !orderCustomer}
            //   onClick={() => {
            // setSelectedPayment(undefined);
            // setStep(2);
            //   }}
          >
            {checkout_dictionary.confirm_order}
          </Button>
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-2">
        <Button
          //   className="mt-4"
          className="h-10"
          variant="slim"
          type="button"
          onClick={() => router.push(link_checkout_shipping)}
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
    </div>
  );
}
