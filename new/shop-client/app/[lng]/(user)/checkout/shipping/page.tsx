import ShippingView from '@/components/checkout/ShippingView';
import { getDictionary } from '@/lib/get-dictionary';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';
import { LanguageProps } from '@/types';
import { getShippingMethods } from '@/lib/actions';

export default async function UserInfoPage({ params: { lng } }: LanguageProps) {
  const dictionary = await getDictionary(lng);
  const shippingMethods = await getShippingMethods();


  return (
    <Suspense fallback={<Spinner centered />}>
      <ShippingView
        dictionary={dictionary}
        shippingMethods={shippingMethods}
      />
    </Suspense>
  );
}
