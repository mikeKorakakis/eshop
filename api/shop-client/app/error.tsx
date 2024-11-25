'use client';
import { Dictionary } from '@/lib/get-dictionary';
import { getDictionaryServer } from '@/lib/actions';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { LINKS } from '@/lib/constants';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    const lang = (pathname.split('/')[1] || 'el') as 'en' | 'el';
    const dict = async () => {
      const dictionary = await getDictionaryServer({ lang });
      setDictionary(dictionary);
    };
    dict();
  }, [pathname]);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const error_dictionary = dictionary?.error;
  return (
    <>
      <div className=" min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-red-600 sm:text-5xl">500</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  {error_dictionary?.header}
                </h1>
                <p className="mt-1 text-base text-gray-500">{error_dictionary?.description}</p>
              </div>
              <div className="mt-4 flex w-full space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <div className='w-52'>
                  <Button
                    onClick={() => reset()}
                    //   className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    {error_dictionary?.retry}
                  </Button>
                </div>
                <div className="flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <Link
                    href={LINKS.link_home}
                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    {error_dictionary?.back}
                  </Link>
                  {/* <a
                  href="#"
                  className="inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Contact support
                </a> */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
