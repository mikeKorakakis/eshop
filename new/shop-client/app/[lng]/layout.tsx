import { ReactNode, Suspense } from 'react';

import { ManagedUIContext } from '@/lib/context/ui-context';
import Layout from '@/components/common/Layout';
import { LanguageProps } from '@/types';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n } from '@/i18n-config';
import { ManagedCartContext } from '@/lib/context/cart-context';
import { ManagedAuthContext } from '@/lib/context/auth-context';
import { Toaster } from 'react-hot-toast';

interface Props extends LanguageProps {
	children: ReactNode;
}

export async function generateStaticParams() {
	return i18n.locales.map((lng) => {
		lng;
	});
}

export default async function RootLayout({ children, params }: Props) {
	const lng = params.lng;
	const dictionary = await getDictionary(lng);
	return (
		<>
			{/* <Navbar /> */}
			<Suspense>
				<ManagedAuthContext>
					<ManagedUIContext>
						<ManagedCartContext>
							<Layout dictionary={dictionary} lng={lng}>
								{children}
								<Toaster />
							</Layout>
						</ManagedCartContext>
					</ManagedUIContext>
				</ManagedAuthContext>
			</Suspense>
		</>
	);
}
