'use server';

import { TAGS } from '@/lib/constants';
import { revalidateTag } from 'next/cache';

export async function addProductToCart({
  productVariantId,
  quantity
}: {
  productVariantId: string;
  quantity: number;
}) {
//   const res = await addItemToOrderMutation(productVariantId, quantity);
  revalidateTag(TAGS.order);
//   return res;
}

