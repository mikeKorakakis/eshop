import OrderView from '@/components/order/OrderView';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import Spinner from '@/components/ui/Spinner';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types';
import { getOrderByCodeQuery } from '@/lib/vendure/shop/orders/order';
import React, { Suspense } from 'react';

type Props = {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
} & LanguageProps;

export default async function OrderPage({ params: { id, lang } }: Props) {
    const dictionary = await getDictionary(lang);
    const order = await getOrderByCodeQuery(id);
//   const [dictionary, order] = await Promise.all([getDictionary(lang), getOrderByCodeQuery(id)]);
  const order_dictionary = dictionary.order;
  const common_dictionary = dictionary.common;
  
  return (
    <>
      <div className="absolute  z-10 mt-6 w-full">
        <div className="relative mx-auto max-w-screen-2xl px-6">
          <BreadCrumbs
            navigation={[
              { name: common_dictionary.home!, href: '/' },
              { name: order_dictionary.order, href: '#' }
            ]}
          />
        </div>
      </div>
      <div>
        <Suspense fallback={<Spinner centered />}>
          <OrderView dictionary={dictionary} order={order} lang={lang} />
        </Suspense>
      </div>
    </>
  );
}
