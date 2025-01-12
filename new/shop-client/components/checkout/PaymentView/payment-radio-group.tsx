import { Dispatch, SetStateAction } from 'react';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { PaymentMethodQuote } from '@/lib/vendure/generated/graphql-shop';
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/outline';

type Props = {
  paymentMethods: PaymentMethodQuote[];
  selectedPayment?: string;
  setSelectedPayment: Dispatch<SetStateAction<string | undefined>>;
};

const icons = {
  stripe: CreditCardIcon,
  braintree: CreditCardIcon,
  'pay-in-store': BanknotesIcon
};

export default function PaymentRadioGroup({
  paymentMethods,
  setSelectedPayment,
  selectedPayment
}: Props) {
  return (
    <RadioGroup value={selectedPayment} onChange={setSelectedPayment} defaultValue={selectedPayment}>
      <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
      <div className="relative -space-y-px rounded-md bg-white">
        {paymentMethods.map((paymentMethod, planIdx) => (
          <RadioGroup.Option
            key={paymentMethod.id}
            value={paymentMethod.code}
            defaultValue={paymentMethod.code}
            className={({ checked }) =>
              clsx(
                planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                planIdx === paymentMethods.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                checked ? 'z-10 border-red-200 bg-red-50' : 'border-gray-200',
                'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6'
              )
            }
          >
            {({ active, checked }) => {
              const Icon = icons[(paymentMethod?.code as 'stripe' | 'braintree' | 'pay-in-store') || 'pay-in-store'];
              return (
                <>
                  <span className="flex items-center text-sm">
                    <span
                      className={clsx(
                        checked ? 'border-transparent bg-red-600' : 'border-gray-300 bg-white',
                        active ? 'ring-2 ring-red-600 ring-offset-2' : '',
                        'flex h-4 w-4 items-center justify-center rounded-full border'
                      )}
                      aria-hidden="true"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <RadioGroup.Label
                      as="span"
                      className={clsx(
                        checked ? 'text-red-900' : 'text-gray-900',
                        'ml-3 font-medium'
                      )}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </RadioGroup.Label>
                  </span>
                  {/* <RadioGroup.Description as="span" className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
                  <span className={clsx(checked ? 'text-red-900' : 'text-gray-900', 'font-medium')}>
                    ${plan.priceMonthly} / mo
                  </span>{' '}
                  <span className={checked ? 'text-red-700' : 'text-gray-500'}>(${plan.priceYearly} / yr)</span>
                </RadioGroup.Description> */}
                  <RadioGroup.Description
                    as="span"
                    className={clsx(
                      checked ? 'text-red-700' : 'text-gray-500',
                      'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center'
                    )}
                  >
                    {paymentMethod.name}
                  </RadioGroup.Description>
                </>
              );
            }}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
