import { Dictionary } from '@/lib/get-dictionary';
import { Order } from '@/lib/vendure/generated/graphql-shop';
import { generateBraintreeClientTokenQuery } from '@/lib/vendure/shop/checkout/checkout';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
let dropin: import('braintree-web-drop-in').Dropin;

async function renderDropin(order: Order, clientToken: string) {
  // Lazy load braintree dropin because it has a reference
  // to `window` which breaks SSR
  dropin = await import('braintree-web-drop-in').then((module) =>
    module.default.create({
      authorization: clientToken,
      // This assumes a div in your view with the corresponding ID
      container: '#dropin-container',
      //   card: {
      //     cardholderName: {
      //       required: true,
      //     },
      //     overrides: {},
      //   },
      // Additional config is passed here depending on
      // which payment methods you have enabled in your
      // Braintree account.
      paypal: {
        flow: 'checkout',
        amount: order.total,
        currency: 'EUR'
      },
      paymentOptionPriority: ['paypal']
    })
  );
  return dropin;
}

interface Props {
  order: Order;
  onCheckout: any;
  dictionary: Dictionary;
}

export default function BraintreePayments({ order, onCheckout, dictionary }: Props) {
  const router = useRouter();
  const common_dictionary = dictionary.common;
  //   const { t } = useTranslation('common')
  //   const [submitting, setSubmitting] = useState(false)

  //   const [showSubmitButton, setShowSubmitButton] = useState(false)

  const dropinInstance = useRef(dropin);

  const generateBraintreeToken = useCallback(
    async (order: Order) => await generateBraintreeClientTokenQuery(order.id, false),
    []
  );
  const submitPayment = useCallback(
    () => async () => {
      if (!dropinInstance?.current?.isPaymentMethodRequestable()) {
        return;
      }
      // setSubmitting(true)

      try {
        const paymentResult = await dropinInstance?.current.requestPaymentMethod();

        const res = await onCheckout({
          paymentMethodCode: 'braintree',
          metadata: paymentResult
        });

        if (res?.addressId) {
          router.push(`/checkout/confirmation/${order?.id}?redirect_status=succeeded`);
        } else {
          toast.error(common_dictionary.payment_error);
        }
      } catch (e: unknown) {
        toast.error(common_dictionary.payment_error);
      } finally {
        dropinInstance.current?.clearSelectedPaymentMethod();
        //   setSubmitting(false)
      }

      // const { addPaymentToOrder } = await graphQlClient.query(gql`
      //   mutation AddPayment($input: PaymentInput!) {
      //     addPaymentToOrder(input: $input) {
      //       ... on Order {
      //         id
      //         payments {
      //           id
      //           amount
      //           errorMessage
      //           method
      //           state
      //           transactionId
      //           createdAt
      //         }
      //       }
      //       ... on ErrorResult {
      //         errorCode
      //         message
      //       }
      //     }
      //   }`, {
      //     input: {
      //       method: 'braintree', // The code of you Braintree PaymentMethod
      //       metadata: paymentResult,
      //     },
      //   },
      // );

      // switch (addPaymentToOrder?.__typename) {
      //     case 'Order':
      //         // Adding payment succeeded!
      //         break;
      //     case 'OrderStateTransitionError':
      //     case 'OrderPaymentStateError':
      //     case 'PaymentDeclinedError':
      //     case 'PaymentFailedError':
      //       // Display an error to the customer
      //       dropin.clearSelectedPaymentMethod();
      // }
    },
    [onCheckout, order, router, common_dictionary]
  );
  useEffect(() => {
    if (order) {
      const render = async () => {
        const clientToken = await generateBraintreeToken(order);
        if (clientToken) {
          dropinInstance.current = await renderDropin(order, clientToken);
          dropinInstance?.current?.on('paymentMethodRequestable', async (payload) => {
            // if (payload.type === 'CreditCard') {
            //   setShowSubmitButton(true)
            // }
            // dropinInstance?.on('noPaymentMethodRequestable', () => {
            //   toast.error(common_dictionary.noPaymentMethodRequestable)
            // })
            // if (dropinInstance?.isPaymentMethodRequestable()) {
            //   setShowSubmitButton(true)
            // }
            if (payload.type === 'PayPalAccount') {
              await submitPayment();
            }
          });
        }
        // renderDropin(order, braintreeToken)
      };
      render();
    }
  }, [generateBraintreeToken, order, submitPayment]);

  //   if (isLoading) {
  //     return <LoadingDots />
  //   }
  return (
    <>
      <div id="dropin-container"></div>
      {/* {showSubmitButton && (
        <div className="pt-4">
          <Button type="button" disabled={submitting} onClick={submitPayment}>
            {common_dictionary.submit}
          </Button>
        </div>
      )} */}
    </>
  );
}
