import { ReactNode } from 'react';

import { Toaster } from 'react-hot-toast';
import { LanguageProps } from '@/lib/types';

interface Props extends LanguageProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
