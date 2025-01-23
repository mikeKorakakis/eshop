import AddressView from '@/components/checkout/AddressView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/types';

import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';

export default async function UserInfoPage({ params: { lng } }: LanguageProps) {
  //   const dictionary = await getDictionary(lng);
  //   const order = await getActiveOrderQuery();
  //   const addresses = await getActiveCustomerAddressesQuery();

  return (
    <Suspense fallback={<Spinner centered />}>
      {/* <AddressView dictionary={dictionary} order={order} addresses={addresses} /> */}
    </Suspense>
  );
}
