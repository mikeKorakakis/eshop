import AddressView from '@/components/profile/AddressesView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { getActiveCustomerAddressesQuery } from '@/lib/vendure/shop/customer/customer';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'

type Props = LanguageProps;

export default async function ProfileAddresesPage({ params: { lang } }: Props) {
//   const dictionary = await getDictionary(lang);
//   const addresses = await getActiveCustomerAddressesQuery();

  const [dictionary, addresses] = await Promise.all(
    [getDictionary(lang), getActiveCustomerAddressesQuery()]
  );
  
  return (
    <Suspense fallback={<Spinner centered/>}>
      <AddressView dictionary={dictionary} addresses={addresses} />
    </Suspense>
  );
}
