import { LINKS } from '@/lib/constants';
import { LanguageProps } from '@/lib/types';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
} & LanguageProps;

export default async function CheckoutPage({ params: { lang } }: Props) {
  redirect(`/${lang}${LINKS.link_checkout_general}`);
}
