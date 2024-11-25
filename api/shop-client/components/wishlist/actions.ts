'use server';

import { TAGS } from '@/lib/constants';
import { toggleWishlistItemMutation } from '@/lib/vendure/shop/wishlist/wishlist';
import { revalidateTag } from 'next/cache';

export async function toggleFavorite({ productId }: { productId: string }) {
  const res = await toggleWishlistItemMutation(productId);
  revalidateTag(TAGS.wishlist);
  return res;
}
