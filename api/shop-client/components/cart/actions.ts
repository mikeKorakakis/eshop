'use server';

// import { adjustOrderLineMutation, removeOrderLineMutation } from '@/lib/vendure/shop/orders/order';
import { TAGS } from 'lib/constants';
import { revalidateTag } from 'next/cache';

export async function updateItem({ lineId, quantity }: { lineId: string; quantity: number }) {
//   await adjustOrderLineMutation(lineId, quantity);
  revalidateTag(TAGS.order);
}

export async function removeItem({ lineId }: { lineId: string }) {
//   await removeOrderLineMutation(lineId);
  revalidateTag(TAGS.order);
}
