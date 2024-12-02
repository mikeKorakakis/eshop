import { ReactNode, Suspense } from 'react';

import { ManagedUIContext } from '@/components/ui/ui-context';
import Layout from '@/components/common/Layout/layout';
import { LanguageProps } from '@/lib/types';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n } from '@/i18n-config';
import { ManagedCartContext } from '@/components/ui/cart-context';

interface Props extends LanguageProps {
	children: ReactNode;
}

export async function generateStaticParams() {
	return i18n.locales.map((lang) => {
		lang;
	});
}

export default async function RootLayout({ children, params }: Props) {
	const lang = params.lang;
	const dictionary = await getDictionary(lang);
	return (
		<>
			{/* <Navbar /> */}
			<Suspense>
				<ManagedUIContext>
					<ManagedCartContext>
						<Layout dictionary={dictionary} pathname={'other'}>
							{children}
						</Layout>
					</ManagedCartContext>
				</ManagedUIContext>
			</Suspense>
		</>
	);
}
