import { getDictionary } from '@/lib/get-dictionary';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function NotFound() {
  const c = await cookies();
  const lng = c.get('X-Language-Preference')?.value;
  const dictionary = await getDictionary(lng as 'en' | 'el');
  const not_found_dictionary = dictionary.not_found;
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}

      <div className=" min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-red-600 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  {not_found_dictionary.header}
                </h1>
                <p className="mt-1 text-base text-gray-500">{not_found_dictionary.description}</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  {not_found_dictionary.back}
                </Link>
                {/* <a
                  href="#"
                  className="inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Contact support
                </a> */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
