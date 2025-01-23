
import { LanguageProps } from '@/types';
import { getDictionary } from '@/lib/get-dictionary';
import { ReactNode } from 'react';
import CheckoutLayout from './checkout-layout';


type Props = { children: ReactNode } & LanguageProps;



export default async function CheckoutLayoutMain({ params: { lng }, children }: Props) {
	const dictionary = await getDictionary(lng);
	
	return (
		<CheckoutLayout dictionary={dictionary}>
			{children}
		</CheckoutLayout>
	);
}
