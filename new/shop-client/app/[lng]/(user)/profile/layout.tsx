import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { LINKS } from '@/lib/constants';
import { LanguageProps } from '@/types';
import { getDictionary } from '@/lib/get-dictionary';
import { redirect } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import SidebarNavigation from '@/components/profile/sidebar-navigation';
import Spinner from '@/components/ui/Spinner';

const { link_profile } = LINKS;

type Props = {
  children: ReactNode;
  params: {
    slug: string;
  };
} & LanguageProps;

export default async function ProfileLayout({ params: { lng, slug }, children }: Props) {
    const dictionary = await getDictionary(lng);
	const customer = {email: 'bob@test.com'}
  //   const customer = await getActiveCustomerQuery();

  const profile_dictionary = await dictionary.profile;
  const common_dictionary = await dictionary.common;
  if (!customer) redirect('/');
  return (
    <>
      <div className="absolute z-10 w-full pt-6">
        <div className="relative mx-auto max-w-screen-2xl px-6">
          <BreadCrumbs
            navigation={[
              { name: common_dictionary.home!, href: '/' },
              { name: common_dictionary.profile, href: link_profile },
              {
                name: profile_dictionary[
                  (`${slug}` as 'profile', 'addresses', 'password', 'orders')
                ],
                href: '#'
              }
            ]}
          />
        </div>
      </div>
      <div className="pt-16">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <div className="overflow-hidden rounded-lg bg-white shadow-outline-normal ">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
              <aside className="py-6 lg:col-span-3">
                <SidebarNavigation dictionary={dictionary} />
              </aside>
              <div className="min-h-[600px] lg:col-span-9">
                <Suspense fallback={<Spinner centered />}>{children}</Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
