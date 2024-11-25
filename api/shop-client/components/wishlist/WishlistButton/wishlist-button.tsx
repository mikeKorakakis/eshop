import React, { FC, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useUI } from '@/components/ui/context';
// import { Heart } from '@/components/icons'
// import useAddItem from '@framework/wishlist/use-add-item'
// import useCustomer from '@framework/customer/use-customer'
// import useWishlist from '@framework/wishlist/use-wishlist'
// import useRemoveItem from '@framework/wishlist/use-remove-item'
// import useToggleItem from '@framework/wishlist/use-toggle-item'
// import type { Product, ProductVariant } from '@commerce/types/product'
import { HeartIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Dictionary } from '@/lib/get-dictionary';
import { Customer, Favorite, FavoriteList, Product } from '@/lib/vendure/generated/graphql-shop';
import { toggleFavorite } from '../actions';

type Props = {
  productId: Product['id'];
  variantId: string;
  dictionary: Dictionary;
  wishlist: FavoriteList | null;
  customer: Customer | null;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const WishlistButton: FC<Props> = ({
  productId,
  variantId,
  className,
  dictionary,
  wishlist,
  customer,
  ...props
}) => {
  const common_dictionary = dictionary.common;
  const [itemInWishlist, setItemInWishlist] = useState(false);

  useEffect(() => {
    const itemInWishlist = wishlist?.items?.find((item: Favorite) => {
      return item?.product?.id === productId || item?.product?.id === variantId;
    });
    setItemInWishlist(!!itemInWishlist);
  }, [wishlist, productId, variantId]);
  //   const [customer, setCustomer] = useState<Customer>();

  //   useEffect(() => {
  //     const fetchCustomer = async () => {
  //       const customer = await getActiveCustomerQuery();
  //       setCustomer(customer);
  //     };
  //     fetchCustomer();
  //   }, []);

  //   const { data } = useWishlist()
  //   const addItem = useAddItem()
  //   const removeItem = useRemoveItem()
  //   const toggleItem = useToggleItem()

  const { openModal, setModalView } = useUI();
  const [loading, setLoading] = useState(false);

  //   const itemInWishlist = wishlist?.items?.find((item: Favorite) => {
  //     return item?.product?.id === productId || item?.product?.id === variantId;
  //   });

  const handleWishlistChange = async (e: any) => {
    e.preventDefault();

    if (loading) return;

    // A login is required before adding an item to the wishlist
    if (!customer) {
      setModalView('LOGIN_VIEW');
      return openModal();
    }

    setLoading(true);

    try {
      const pid = productId ?? variantId!;
      const res = await toggleFavorite({ productId: pid });
      if (res) {
        if (!itemInWishlist) toast.success(common_dictionary.wishlist_added);
        else toast.success(common_dictionary.wishlist_removed);
      }
    } catch (err) {
      toast.error(common_dictionary.wishlist_error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <button
        aria-hidden="true"
        aria-label="Add to wishlist"
        className=" ml-4 flex items-center justify-center rounded-full bg-slate-100/60 px-1 py-1  text-gray-400"
        onClick={handleWishlistChange}
        {...props}
      >
        <HeartIcon
          className={clsx(
            'hover:fill-pink-200 h-6 w-6 flex-shrink-0 transition-all',
            loading || (!itemInWishlist && 'fill-red-100'),
            itemInWishlist && 'fill-red-500 text-red-500 hover:fill-red-400'
          )}
        />
      </button>
    </div>
  );
};

export default WishlistButton;
