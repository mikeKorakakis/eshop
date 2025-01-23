import OrdersView from '@/components/profile/OrdersView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/types';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'
import { me } from '@/lib/actions';

type Props = LanguageProps;

export default async function ProfileAddresesPage({ params: { lng } }: Props) {
  const dictionary = await getDictionary(lng);
  const customer = await me()
  if (!customer) {
	return null
  }
  return (
    <Suspense fallback={<Spinner centered/>}>
      <OrdersView dictionary={dictionary} customer={customer}  />
    </Suspense>
  );
}
