
import { LINKS } from '@/lib/constants';
import { LanguageProps } from '@/lib/types';
import { getDictionary } from '@/lib/get-dictionary';
import { ReactNode } from 'react';
import CheckoutLayout from './checkout-layout';

const { link_search } = LINKS;

type Props = { children: ReactNode } & LanguageProps;



export default async function CheckoutLayoutMain({ params: { lang }, children }: Props) {
	const dictionary = await getDictionary(lang);
	
	return (
		<CheckoutLayout dictionary={dictionary}>
			{children}
		</CheckoutLayout>
	);
}
