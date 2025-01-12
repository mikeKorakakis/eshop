import { LINKS } from '@/lib/constants';
import { LanguageProps } from '@/lib/types';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
} & LanguageProps;

export default async function Product({ params: { lng } }: Props) {
  redirect(`/${lng}${LINKS.link_profile_profile}`);
}
