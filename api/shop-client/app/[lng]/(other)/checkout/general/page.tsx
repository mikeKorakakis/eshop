import UserInfoView from '@/components/checkout/UserInfoView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'


export default async function UserInfoPage({ params: { lng } }: LanguageProps) {
  const dictionary = await getDictionary(lng);

  return (
    <Suspense fallback={<Spinner centered/>}>
      <UserInfoView
        dictionary={dictionary}
      />
    </Suspense>
  );
}
