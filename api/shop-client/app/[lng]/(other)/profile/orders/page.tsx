import OrdersView from '@/components/profile/OrdersView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'
import { test_user_id } from '@/lib/constants';
import { getCustomer } from '@/lib/actions';

type Props = LanguageProps;

export default async function ProfileAddresesPage({ params: { lng } }: Props) {
  const dictionary = await getDictionary(lng);
  const customer = await getCustomer({ customer_id:  test_user_id })
  return (
    <Suspense fallback={<Spinner centered/>}>
      <OrdersView dictionary={dictionary} customer={customer}  />
    </Suspense>
  );
}
