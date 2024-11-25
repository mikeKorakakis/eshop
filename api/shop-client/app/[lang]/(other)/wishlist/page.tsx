import BreadCrumbs from '@/components/ui/BreadCrumbs';
import WishlistView from '@/components/wishlist/WishlistView';
import { LanguageProps } from '@/lib/types';
import { getDictionary } from '@/lib/get-dictionary';
import { getWishlistQuery } from '@/lib/vendure/shop/wishlist/wishlist';

type Props = LanguageProps;
export default async function SearchPage({ params: { lang } }: Props) {
//   const dictionary = await getDictionary(lang);
//   const wishlist = await getWishlistQuery();

  const [dictionary, wishlist] = await Promise.all([
    getDictionary(lang),
    getWishlistQuery()
  ]);
  const common_dictionary = dictionary.common;
  return (
    <>
      <div className="absolute z-10 mt-6 w-full">
        <div className="relative mx-auto max-w-screen-2xl px-6">
          <BreadCrumbs
            navigation={[
              { name: common_dictionary.home!, href: '/' },
              { name: 'Wishlist', href: '#' }
            ]}
          />
        </div>
      </div>
      <div className="mt-16">
        <WishlistView wishlist={wishlist} dictionary={dictionary} />
      </div>
    </>
  );
}
