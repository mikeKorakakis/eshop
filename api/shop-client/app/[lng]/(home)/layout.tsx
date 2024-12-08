import { ReactNode } from 'react';

import Layout from '@/components/common/Layout/layout';
import { LanguageProps } from '@/lib/types';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n } from '@/i18n-config';

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
        <Layout dictionary={dictionary} lng={lng}>
          {children}
        </Layout>
    </>
  );
}
