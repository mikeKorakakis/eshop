
import WishlistCard from '../WishlistCard'
import { Dictionary } from '@/lib/get-dictionary'
import { Favorite, FavoriteList } from '@/lib/vendure/generated/graphql-shop'


type Props = {
    dictionary: Dictionary
    wishlist: FavoriteList
}

export default function WishlistView({dictionary, wishlist}: Props) {
    const wishlist_dictionary = dictionary.wishlist

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-5xl py-16 sm:px-6 sm:py-24">
          <div className="px-4 sm:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {wishlist_dictionary.header}
            </h1>
            <p className="mt-2 text-sm text-gray-500">{wishlist_dictionary.description}</p>
          </div>

          <div className="mt-16">
            <h2 className="sr-only"> {wishlist_dictionary.description}</h2>

            <div className="space-y-8 sm:space-y-16">
              {wishlist?.items && wishlist?.totalItems > 0 ? (
                wishlist?.items.map((item: Favorite) => (
                  <WishlistCard key={item.id} item={item} dictionary={dictionary}/>
                ))
              ) : (
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {wishlist_dictionary.no_items}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
