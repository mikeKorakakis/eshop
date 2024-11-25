'use client';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
// import { useShipping } from '@framework/checkout';
// import { useCart } from '@framework/cart';
import Button from '@/components/ui/Button';
// import Loading from '@/components/ui/Loading';

import toast from 'react-hot-toast';
// import useAddShipping from '@framework/checkout/use-add-shipping';
import { Dictionary } from '@/lib/get-dictionary';
import { Order, ShippingMethodQuote } from '@/lib/vendure/generated/graphql-shop';
import { setOrderShippingMethodMutation } from '@/lib/vendure/shop/orders/order';
import { useRouter } from 'next/navigation';
import { LINKS } from '@/lib/constants';
import { refreshCart } from '../actions';

const { link_checkout_addresses, link_checkout_payment } = LINKS;

interface Props {
  dictionary: Dictionary;
  order: Order;
  eligibleShippingMethods: ShippingMethodQuote[];
}

export default function ShippingView({ dictionary, order, eligibleShippingMethods }: Props) {
  const common_dictionary = dictionary.common;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  //   const addShipping = useAddShipping()

  //   const { data: eligibleShippingMethods, isLoading: isLoadingShipping } = useShipping();

  //   const {
  //     data: cartData,
  //     mutate: refreshCart,
  //     isLoading: isLoadingCart,
  //     isEmpty,
  //   } = useCart()

  const [selectedShipping, setSelectedShipping] = useState<string | undefined>(order?.shipping);

  const addShipping = async ({ shippingMethodId }: { shippingMethodId: string }) => {
    return await setOrderShippingMethodMutation([shippingMethodId]);
  };

  const shippingMethodId = order?.shippingLines?.[0]?.shippingMethod?.id;

  useEffect(() => {
    if (shippingMethodId) {
      setSelectedShipping(shippingMethodId);
    }
  }, [shippingMethodId]);

  const handleSave = async () => {
    if (selectedShipping) {
      const addShippingFunc = async () => {
        try {
          const res = await addShipping({ shippingMethodId: selectedShipping });
          if (res?.__typename === 'Order') {
            // setStep(3);
            await refreshCart();
            router.push(link_checkout_payment);
          } else if (
            res.__typename === 'OrderModificationError' ||
            res.__typename === 'IneligibleShippingMethodError' ||
            res.__typename === 'NoActiveOrderError'
          ) {
            toast.error(common_dictionary[res.__typename]);
          } else {
            toast.error(common_dictionary.error);
          }
        } catch (error: unknown) {
          toast.error(common_dictionary.error);
        } 
      };

      try {
        setLoading(true);
        await addShippingFunc();
        // refreshCart();
        // toast.success(t('common:success_save'))
      } catch (error: unknown) {
        toast.error(common_dictionary.UNKNOWN_ERROR);

        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  // calculate shipping price with usePrice hook

  //   if (loading) return <Loading />;

  return (
    <div >
      <RadioGroup value={selectedShipping}>
        <RadioGroup.Label className="text-lg font-medium text-gray-900">
          {common_dictionary.shipping_method}
        </RadioGroup.Label>

        <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          {eligibleShippingMethods &&
            eligibleShippingMethods.map((shippingMethod) => (
              <RadioGroup.Option
                key={shippingMethod.id}
                value={shippingMethod}
                onClick={() => setSelectedShipping && setSelectedShipping(shippingMethod.id)}
                className={({ checked, active }) =>
                  clsx(
                    checked ? 'border-transparent' : 'border-gray-300',
                    active ? 'ring-2 ring-red-500' : '',
                    'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                  )
                }
              >
                {({ active }) => {
                  const checked = selectedShipping === shippingMethod.id;
                  return (
                    <>
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <RadioGroup.Label
                            as="span"
                            className="block text-sm font-medium text-gray-900"
                          >
                            {shippingMethod.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            {shippingMethod.description.replace(/(<([^>]+)>)/gi, '')}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-6 text-sm font-medium text-gray-900 "
                          >
                            {(shippingMethod.price ?? 0) / 100} €
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
            onClick={() => router.push(link_checkout_addresses)}
          >
            {common_dictionary.back}
          </Button>
          <Button
            className="h-10 w-full"
            variant="slim"
            type="submit"
            loading={loading}
            // disabled={!customer && !orderCustomer}
            disabled={!selectedShipping}
            onClick={handleSave}
            // onClick={() => setStep(3)}
          >
            {common_dictionary.next}
          </Button>
        </div>
      </div>
    </div>
  );
}
