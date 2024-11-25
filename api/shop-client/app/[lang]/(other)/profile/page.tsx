import { LINKS } from '@/lib/constants';
import { LanguageProps } from '@/lib/types';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
} & LanguageProps;

export default async function Product({ params: { lang } }: Props) {
  redirect(`/${lang}${LINKS.link_profile_profile}`);
}
