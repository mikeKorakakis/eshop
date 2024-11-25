import ChangePasswordView from '@/components/profile/ChangePasswordView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'

type Props = LanguageProps;

export default async function ProfileOrdersPage({ params: { lang } }: Props) {
  const dictionary = await getDictionary(lang);
  return (
    <Suspense fallback={<Spinner centered/>}>
      <ChangePasswordView dictionary={dictionary} />
    </Suspense>
  );
}
