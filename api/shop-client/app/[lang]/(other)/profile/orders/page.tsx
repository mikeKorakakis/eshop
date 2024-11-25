import OrdersView from '@/components/profile/OrdersView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'

type Props = LanguageProps;

export default async function ProfileAddresesPage({ params: { lang } }: Props) {
  const dictionary = await getDictionary(lang);
  return (
    <Suspense fallback={<Spinner centered/>}>
      <OrdersView dictionary={dictionary}  />
    </Suspense>
  );
}
