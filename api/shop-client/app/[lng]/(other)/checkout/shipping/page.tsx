import ShippingView from '@/components/checkout/ShippingView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { getEligibleShippingMethodsQuery } from '@/lib/vendure/shop/checkout/checkout';
import { getActiveOrderQuery } from '@/lib/vendure/shop/orders/order';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';

export default async function UserInfoPage({ params: { lng } }: LanguageProps) {
//   const dictionary = await getDictionary(lng);
//   const order = await getActiveOrderQuery();
//   const eligibleShippingMethods = await getEligibleShippingMethodsQuery();
  const [dictionary, order, eligibleShippingMethods] = await Promise.all([
    getDictionary(lng),
    getActiveOrderQuery(),
    getEligibleShippingMethodsQuery()
  ]);

  return (
    <Suspense fallback={<Spinner centered />}>
      <ShippingView
        dictionary={dictionary}
        eligibleShippingMethods={eligibleShippingMethods}
        order={order}
      />
    </Suspense>
  );
}
