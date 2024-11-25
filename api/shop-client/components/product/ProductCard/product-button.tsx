import Button from '@/components/ui/Button';
import { useUI } from '@/components/ui/context';
import { Dictionary } from '@/lib/get-dictionary';
import { ListedProductFragment } from '@/lib/vendure/generated/graphql-shop';
import { useRouter } from 'next/navigation';
import { refreshCart } from '../actions';
import { useState } from 'react';
import { addItemToOrderMutation } from '@/lib/vendure/shop/orders/order';
import { wait } from '@/lib/utils';

type Props = {
  dictionary: Dictionary;
  product: ListedProductFragment;
};
export default function ProductButton({ dictionary, product }: Props) {
  const router = useRouter();
  const { setSidebarView, openSidebar } = useUI();
  const [loading, setLoading] = useState(false);
  const common_dictionary = dictionary.common;
  const addToCart = async () => {
    setLoading(true);
    try {
      await addItemToOrderMutation(product.productVariantId, 1);
      const res = await refreshCart();
      //   await addProductToCart({ productVariantId: product.productVariantId, quantity: 1 });
      if (res) {
        await wait(1200)
        setSidebarView('CART_VIEW');
        openSidebar();
      }
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };
  //   const hasVariant = (product?.priceWithTax as any)?.min;
  const hasVariant = false;
  return (
    <Button
      //    href={product.href}
      onClick={hasVariant ? () => router.push(`/product/${product.slug}`) : () => addToCart()}
      // onClick={()=>alert(JSON.stringify(product))}
      className="w-full"
      loading={loading}
      disabled={!product.inStock}
      // className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
    >
      {hasVariant ? common_dictionary.show : common_dictionary.add_to_cart}
      <span className="sr-only">, {product.productName}</span>
    </Button>
  );
}
