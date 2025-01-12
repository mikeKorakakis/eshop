'use server';

import { TAGS } from '@/lib/constants';
import { addItemToOrderMutation } from '@/lib/vendure/shop/orders/order';
import { revalidateTag } from 'next/cache';

export async function addProductToCart({
  productVariantId,
  quantity
}: {
  productVariantId: string;
  quantity: number;
}) {
  const res = await addItemToOrderMutation(productVariantId, quantity);
  revalidateTag(TAGS.order);
  return res;
}

export async function refreshCart() {
  //   const res = await addItemToOrderMutation(productVariantId, quantity);
  await revalidateTag(TAGS.order);
  //   return res;
  return true
}
