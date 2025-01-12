"use server"

import { TAGS } from '@/lib/constants';
import { revalidateTag } from 'next/cache';

export async function refreshCart() {
  //   const res = await addItemToOrderMutation(productVariantId, quantity);
  revalidateTag(TAGS.order);
  //   return res;
}
