import AddressView from '@/components/checkout/AddressView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { getActiveCustomerAddressesQuery } from '@/lib/vendure/shop/customer/customer';
import { getActiveOrderQuery } from '@/lib/vendure/shop/orders/order';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';

export default async function UserInfoPage({ params: { lang } }: LanguageProps) {
  //   const dictionary = await getDictionary(lang);
  //   const order = await getActiveOrderQuery();
  //   const addresses = await getActiveCustomerAddressesQuery();
  const [dictionary, order, addresses] = await Promise.all([
    getDictionary(lang),
    getActiveOrderQuery(),
    getActiveCustomerAddressesQuery()
  ]);
  
  return (
    <Suspense fallback={<Spinner centered />}>
      <AddressView dictionary={dictionary} order={order} addresses={addresses} />
    </Suspense>
  );
}
