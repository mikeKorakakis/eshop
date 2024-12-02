// import Search from '@components/search/search'
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { LanguageProps } from '@/lib/types';
import { getDictionary } from '@/lib/get-dictionary';
import Search from '@/components/search/search';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
} & LanguageProps;

export default async function SearchPage({ searchParams, params }: Props) {
  // language
  //   const wishlist = await getWishlistQuery();
  const lang = params.lang;
  const dictionary = await getDictionary(lang);

//   const [wishlist, dictionary] = await Promise.all([getWishlistQuery(), getDictionary(lang)]);

  const common_dictionary = dictionary.common;

  return (
    <>
      <div className="absolute  z-10 mt-6 w-full">
        <div className="relative mx-auto max-w-screen-2xl px-6">
          <BreadCrumbs
            navigation={[
              { name: common_dictionary.home!, href: '/' },
              { name: common_dictionary.shop, href: '#' },
              { name: common_dictionary.search, href: '#' }
            ]}
          />
        </div>
      </div>
      <div className="pt-16">
        {/* <Search dictionary={dictionary} searchParams={searchParams} wishlist={wishlist} /> */}
      </div>
    </>
  );
}
