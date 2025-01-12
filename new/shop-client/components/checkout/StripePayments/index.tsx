import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect, useRef } from 'react';
import { CheckoutForm } from './checkout-form';
import { createStripePaymentIntentMutation } from '@/lib/vendure/shop/checkout/checkout';
import { Dictionary } from '@/lib/get-dictionary';

type StripePaymentsProps = {
  //   clientSecret: string
  locale: 'en' | 'el';
  orderCode: string;
  dictionary: Dictionary;
};

export default function StripePayments(
  { orderCode, locale, dictionary }: StripePaymentsProps
  ) {
    const createStripe = async () => await createStripePaymentIntentMutation();
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY as string, { locale });

    const [clientSecret, setClientSecret] = useState<string | null>(null);
  const shouldRunFetch = useRef(true);
  useEffect(() => {
    if (shouldRunFetch.current) {
      const getSecret = async () => {
        const secret = await createStripe();
        setClientSecret(secret);
      };
      getSecret();
      shouldRunFetch.current = false;
    }
  }, []);

  if (!clientSecret) return null;
  const options = {
    // passing the client secret obtained from the server
    clientSecret
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm orderCode={orderCode} dictionary={dictionary} />
    </Elements>
  );
}
