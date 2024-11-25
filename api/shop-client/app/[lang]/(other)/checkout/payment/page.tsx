import PaymentView from '@/components/checkout/PaymentView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { getEligiblePaymentMethodsQuery } from '@/lib/vendure/shop/checkout/checkout';
import { getActiveOrderQuery } from '@/lib/vendure/shop/orders/order';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'

export default async function UserInfoPage({ params: { lang } }: LanguageProps) {
//   const dictionary = await getDictionary(lang);
//   const order = await getActiveOrderQuery();
//   const eligiblePaymentMethods = await getEligiblePaymentMethodsQuery();
  const [dictionary, order, eligiblePaymentMethods] = await Promise.all([
    getDictionary(lang),
    getActiveOrderQuery(),
    getEligiblePaymentMethodsQuery()
  ]);
  
  return (
    <Suspense fallback={<Spinner centered/>}>
      <PaymentView
        eligiblePaymentMethods={eligiblePaymentMethods}
        dictionary={dictionary}
        order={order}
      />
    </Suspense>
  );
}
