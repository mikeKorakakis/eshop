"use client"
import Steps from '@/components/ui/Steps';
import { Dictionary } from '@/lib/get-dictionary';
import { usePathname } from 'next/navigation';

type Props = {
  dictionary: Dictionary;
};
export default function CheckoutSteps({ dictionary }: Props) {
  const checkout_dictionary = dictionary.checkout;
  const pathname = usePathname();

  const getStepStatus = (
    step: number,
    currentStep: number
  ): 'complete' | 'current' | 'upcoming' => {
    if (step < currentStep) return 'complete';
    if (step === currentStep) return 'current';
    return 'upcoming';
  };
  let currentStep = 0;

  const testPathname = pathname.split('checkout/')[1];

  switch (testPathname) {
    case 'general':
      currentStep = 0;
      break;
  
    case 'payment':
      currentStep = 1;
      break;
    default:
      currentStep = 0;
  }

  const steps = [
    {
      id: 0,
      name: checkout_dictionary.customer_info,
      href: '#',
      status: getStepStatus(0, currentStep)
    },
 
    {
      id: 1,
      name: checkout_dictionary.payment,
      href: '#',
      status: getStepStatus(1, currentStep)
    }
  ];
//   switch (testPathname) {
//     case 'general':
//       currentStep = 0;
//       break;
//     case 'addresses':
//       currentStep = 1;
//       break;
//     case 'shipping':
//       currentStep = 2;
//       break;
//     case 'payment':
//       currentStep = 3;
//       break;
//     default:
//       currentStep = 0;
//   }

//   const steps = [
//     {
//       id: 0,
//       name: checkout_dictionary.customer_info,
//       href: '#',
//       status: getStepStatus(0, currentStep)
//     },
//     {
//       id: 1,
//       name: checkout_dictionary.addresses,
//       href: '#',
//       status: getStepStatus(1, currentStep)
//     },
//     {
//       id: 2,
//       name: checkout_dictionary.shipping_method,
//       href: '#',
//       status: getStepStatus(2, currentStep)
//     },
//     {
//       id: 3,
//       name: checkout_dictionary.payment,
//       href: '#',
//       status: getStepStatus(3, currentStep)
//     }
//   ];
  return <Steps steps={steps} />;
}
