import { LanguageProps } from '@/lib/types';
import { getDictionary } from '@/lib/get-dictionary';
import { refreshCart } from '@/components/checkout/actions';
import OrderView from '@/components/order/OrderView';
import { getOrderByCodeQuery } from '@/lib/vendure/shop/orders/order';
import BreadCrumbs from '@/components/ui/BreadCrumbs';

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
} & LanguageProps;

export default async function CheckoutConfirmation({ params: { lang, id }, searchParams }: Props) {
  //   const dictionary = await getDictionary(lang);
  //   const order = await getOrderByCodeQuery(id);

  const [order, dictionary] = await Promise.all([getOrderByCodeQuery(id), getDictionary(lang)]);
  const common_dictionary = dictionary.common;
  const order_dictionary = dictionary.order;
  const redirect_status = searchParams?.redirect_status as string;
  // get route and query params
  await refreshCart();
  return (
    <>
      <div className="absolute  z-10 mt-6 w-full">
        <div className="relative mx-auto max-w-screen-2xl px-6">
          <BreadCrumbs
            navigation={[
              { name: common_dictionary.home!, href: '/' },
              { name: order_dictionary.order_confirmation, href: '#' }
            ]}
          />
        </div>
      </div>
      <div>
        <OrderView
          order={order}
          dictionary={dictionary}
          redirect_status={redirect_status}
          lang={lang}
        />
      </div>
    </>
  );
}
