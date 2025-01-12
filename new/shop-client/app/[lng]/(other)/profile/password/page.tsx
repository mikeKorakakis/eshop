import ChangePasswordView from '@/components/profile/ChangePasswordView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner'
import { getCustomer } from '@/lib/actions';

type Props = LanguageProps;

export default async function ProfileOrdersPage({ params: { lng } }: Props) {
	const dictionary = await getDictionary(lng);
	const customer = await getCustomer({ customer_id: 2 })
	return (
		<Suspense fallback={<Spinner centered />}>
			<ChangePasswordView dictionary={dictionary} customer={customer}/>
		</Suspense>
	);
}
