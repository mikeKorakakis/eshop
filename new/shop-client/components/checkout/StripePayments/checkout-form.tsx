import Button from '@/components/ui/Button';
import { Dictionary } from '@/lib/get-dictionary';
import { transitionOrderToStateMutation } from '@/lib/vendure/shop/checkout/checkout';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import {LINKS} from "@/lib/constants"

const { link_order_confirmation } = LINKS;

type Props = {
  orderCode: string;
  dictionary: Dictionary;
};
export const CheckoutForm = ({ orderCode, dictionary }: Props) => {
  const common_dictionary = dictionary.common;
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    const res = await transitionOrderToStateMutation('ArrangingPayment');
    if (res?.transitionOrderToState?.__typename === 'OrderStateTransitionError') {
      toast.error(res?.transitionOrderToState?.message.toString());
      return null;
    }
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    if (res.transitionOrderToState?.__typename === 'Order') {
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: location.origin + `${link_order_confirmation}/${orderCode}`
        }
      });

      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        toast.error(result.error.message as string);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    }
  };

  return (
    <div>
      {/* <div onSubmit={handleSubmit}> */}
      <PaymentElement />
      <Button className="mt-8" disabled={!stripe} onClick={handleSubmit}>
        {common_dictionary.submit}
      </Button>
    </div>
  );
};
