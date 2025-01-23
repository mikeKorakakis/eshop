import UserInfoView from '@/components/checkout/UserInfoView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/types';
import { me } from '@/lib/actions';


export default async function UserInfoPage({ params: { lng } }: LanguageProps) {
  const dictionary = await getDictionary(lng);
  const user = await me();

  return (
      <UserInfoView
        dictionary={dictionary}
		customer={user}
      />
  );
}
