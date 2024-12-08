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
	return i18n.locales.map((lng) => {
		lng;
	});
}

export default async function RootLayout({ children, params }: Props) {
	const lng = params.lng;
	const dictionary = await getDictionary(lng);
	return (
		<>
			<Suspense>
				<ManagedUIContext>
					<ManagedCartContext>
						<Layout dictionary={dictionary} lng={lng}>
							<div className='w-full '>
								<div className='mt-16 mb-40 max-w-7xl  mx-auto'>
									{children}
								</div>
							</div>
						</Layout>
					</ManagedCartContext>
				</ManagedUIContext>
			</Suspense>
		</>
	);
}
