import PaymentView from '@/components/checkout/PaymentView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'

export default async function UserInfoPage({ params: { lang } }: LanguageProps) {
  const dictionary = await getDictionary(lang);
//   const order = await getActiveOrderQuery();
//   const eligiblePaymentMethods = await getEligiblePaymentMethodsQuery();
//   const [dictionary, order, eligiblePaymentMethods] = await Promise.all([
//     getDictionary(lang),
//     getActiveOrderQuery(),
//     getEligiblePaymentMethodsQuery()
//   ]);
  
  return (
    <Suspense fallback={<Spinner centered/>}>
      <PaymentView
        dictionary={dictionary}
      />
    </Suspense>
  );
}
