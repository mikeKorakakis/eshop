'use client'
import { useState } from 'react';
import cn from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import s from './wishlist-card.module.css';
import { Trash } from '@/components/icons';
import Button from '@/components/ui/Button';

import { useUI } from '@/components/ui/context';
import { cloudinaryImageLoader } from '@/lib/cloudinary-image-loader';
import { Favorite } from '@/lib/vendure/generated/graphql-shop';
import { Product } from '@/lib/types';
import { Dictionary } from '@/lib/get-dictionary';
import { addItemToOrderMutation } from '@/lib/vendure/shop/orders/order';
import { formatPrice } from '@/lib/utils';
import { toggleWishlistItemMutation } from '@/lib/vendure/shop/wishlist/wishlist';
import { useRouter } from 'next/navigation';

const placeholderImg = '/product-img-placeholder.svg';

type Props = {
  item: Favorite;
  dictionary: Dictionary;
};
export default function WishlistCard({ item, dictionary }: Props) {
  const common_dicitonary = dictionary.common;
  const product = item.product as Product;
  const router = useRouter();
  
  const toggleItem = async ({ productId }: { productId: string }) => {
    return await toggleWishlistItemMutation(productId);
  };
  //   const removeItem = useRemoveItem({ wishlist: { includeProducts: true } })
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const { openSidebar, setSidebarView  } = useUI();

  const handleRemove = async () => {
    setRemoving(true);

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await toggleItem({ productId: String(product.id) });
      setRemoving(false);
      await router.refresh()
    } catch (error) {
      setRemoving(false);
    }
  };

  const addToCart = async () => {
    setLoading(true);
    try {
      addItemToOrderMutation(item?.id, 1);
      setSidebarView('CART_VIEW')
      openSidebar();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const p = product.variants[0]?.priceWithTax;
  const c = product.variants[0]?.currencyCode;
  const price = formatPrice(p, c);

  return (
    <div className={cn(s.root, { 'pointer-events-none opacity-75': removing })}>
      <div className={s.imageWrapper}>
        <Image
          loader={cloudinaryImageLoader}
          width={230}
          height={230}
          src={product.featuredAsset?.preview || placeholderImg}
          alt={product.featuredAsset?.id || 'Product Image'}
          className={s.image}
          unoptimized
        />
      </div>

      <div className={s.description}>
        <div className="mb-2 flex-1">
          <h3 className="-mt-1  text-xl font-medium text-gray-900">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <div
            className="prose  mb-4 line-clamp-4 text-gray-500"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>
        <div>
          <Button
            width={260}
            aria-label="Add to Cart"
            type="button"
            variant="slim"
            onClick={addToCart}
            loading={loading}
          >
            {common_dicitonary.add_to_cart}
          </Button>
        </div>
      </div>
      <div className={s.actions}>
        <div className="flex justify-end font-bold">{price}</div>
        <div className="mt-4 flex justify-end lg:mt-0">
          <button onClick={handleRemove}>
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
}
