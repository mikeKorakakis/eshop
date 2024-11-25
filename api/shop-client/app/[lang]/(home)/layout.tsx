import { ReactNode } from 'react';

import { ManagedUIContext } from '@/components/ui/context';
import Layout from '@/components/common/Layout/layout';
import { LanguageProps } from '@/lib/types';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n } from '@/i18n-config';

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
      {/* <Suspense fallback={"loading"}> */}
      <ManagedUIContext>
        <Layout dictionary={dictionary} pathname={'/'}>
          {children}
        </Layout>
      </ManagedUIContext>
      {/* </Suspense> */}
    </>
  );
}
