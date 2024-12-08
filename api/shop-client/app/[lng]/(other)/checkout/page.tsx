
import { LINKS } from '@/lib/constants';
import { LanguageProps } from '@/lib/types';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
} & LanguageProps;

export default function CheckoutPage({ params: { lng } }: Props) {
  
}
