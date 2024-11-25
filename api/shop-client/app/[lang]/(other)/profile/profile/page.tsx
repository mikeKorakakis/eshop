import GeneralView from '@/components/profile/GeneralView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { getActiveCustomerQuery } from '@/lib/vendure/shop/customer/customer';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'

type Props = LanguageProps;

export default async function ProfileGeneralPage({ params: { lang } }: Props) {
//   const dictionary = await getDictionary(lang);
//   const customer = await getActiveCustomerQuery();

  const [dictionary, customer] = await Promise.all([
    getDictionary(lang),
    getActiveCustomerQuery()
  ]);
  
  return (
    <Suspense fallback={<Spinner centered/>}>
      <GeneralView dictionary={dictionary} customer={customer} />
    </Suspense>
  );
}
