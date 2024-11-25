import UserInfoView from '@/components/checkout/UserInfoView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { getActiveCustomerQuery } from '@/lib/vendure/shop/customer/customer';
import { getActiveOrderQuery } from '@/lib/vendure/shop/orders/order';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'


export default async function UserInfoPage({ params: { lang } }: LanguageProps) {
//   const dictionary = await getDictionary(lang);
//   const customer = await getActiveCustomerQuery();
//   const order = await getActiveOrderQuery();
  const [dictionary, customer, order] = await Promise.all([
    getDictionary(lang),
    getActiveCustomerQuery(),
    getActiveOrderQuery()
  ]);

  return (
    <Suspense fallback={<Spinner centered/>}>
      <UserInfoView
        // setStep={setCurrentStep}
        dictionary={dictionary}
        customer={customer}
        order={order}
      />
    </Suspense>
  );
}
