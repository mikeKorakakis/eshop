import cn from 'clsx';
import Link from 'next/link';
import s from './cart-sidebar-view.module.css';
import CartItem from '../CartItem';
import Button from '@/components/ui/Button/button';
import { useUI } from '@/components/ui/context';
// import useCart from '@framework/cart/use-cart'
// import usePrice from '@framework/product/use-price'
import SidebarLayout from '@/components/common/SidebarLayout';
// import { useTranslation } from 'next-i18next'
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { LINKS } from '@/lib/constants';
import { Dictionary } from '@/lib/get-dictionary';
import { useState } from 'react';
import { Order } from '@/lib/vendure/generated/graphql-shop';
import { formatPrice } from '@/lib/utils';
// import { useRouter } from 'next/router'

const { link_cart, link_checkout } = LINKS;

interface Props {
  dictionary: Dictionary;
  order: Order;
}

const CartSidebarView = ({ dictionary, order }: Props) => {
  //   const { locale } = useRouter()
  //   const { t } = useTranslation('common')
  const common_dictionary = dictionary.common;
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  const [calculating, setCalculating] = useState(false);

  //   const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const { closeSidebar } = useUI();
  const activeOrder = order;


  const emptyCart = !activeOrder || activeOrder?.lines?.length === 0;

 
  const total = activeOrder?.totalWithTax;
  const subTotal = activeOrder?.subTotal;
  const currency = activeOrder?.currencyCode;

  const taxPrice = activeOrder?.taxSummary[0]?.taxTotal;

  //   const subTotal = activeOrder?.subTotal;
  //   const { subTotal, total, taxPrice } = { subTotal: 10, total: 20, taxPrice: 30 };
  const handleClose = () => closeSidebar();
  //   const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  return (
    <SidebarLayout
      className={cn({
        [s.empty as string]:  emptyCart // || error || loading
      })}
      handleClose={handleClose}
      dictionary={dictionary}
    >
      {false ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          {/* <span className="border border-dashed border-black rounded-full flex items-center justify-center w-16 h-16 p-12"> */}

          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">loading</h3>
          </div>
        </div>
      ) : emptyCart ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          {/* <span className="border border-dashed border-black rounded-full flex items-center justify-center w-16 h-16 p-12"> */}
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-100">
            <ShoppingBagIcon className="h-6 w-6 text-zinc-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {common_dictionary.empty_cart}
            </h3>
          </div>
        </div>
      )  : (
        activeOrder && (
          <>
            <div className="flex h-full flex-1 flex-col overflow-hidden px-4 sm:px-6">
              <Link href={link_cart}>
                <h1
                  className="mb-2 cursor-pointer pb-2 pt-1 text-2xl font-bold tracking-wide"
                  onClick={handleClose}
                >
                  {common_dictionary.cart}
                </h1>
              </Link>
              <ul className="no-scrollbar w-full flex-grow space-y-6  overflow-auto border-slate-200 py-4 sm:space-y-0 sm:divide-y sm:divide-slate-200 sm:py-0">
                {activeOrder?.lines.map((item: any, i) => (
                  <CartItem
                    key={i}
                    item={item}
                    currencyCode={activeOrder!.currencyCode}
                    dictionary={dictionary}
                    setCalculating={setCalculating}
                    // setActiveOrder={setActiveOrder}
                  />
                ))}
              </ul>
              <div className="left-0 right-0 z-20 w-full flex-shrink-0 border-t  px-3 py-6 text-sm sm:px-3">
                <ul className="pb-2">
                  <li className="flex justify-between py-1">
                    <span>{common_dictionary.subtotal}</span>
                    <span>
                      {calculating
                        ? common_dictionary.calculating
                        : subTotal && formatPrice(subTotal, currency)}
                    </span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span>{common_dictionary.taxes}</span>
                    <span>
                      {calculating
                        ? common_dictionary.calculating
                        : taxPrice && formatPrice(taxPrice, currency)}
                    </span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span>{common_dictionary.shipping}</span>
                    <span className="font-bold tracking-wide">
                      {common_dictionary.calculated_at_checkout}
                    </span>
                  </li>
                </ul>
                <div className="mb-2 flex justify-between border-t border-slate-200 py-3 font-bold">
                  <span>{common_dictionary.total}</span>
                  <span>
                    {calculating
                      ? common_dictionary.calculating
                      : total && formatPrice(total, currency)}
                  </span>
                </div>
                <div>
                  {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                    <Button
                      Component="a"
                      width="100%"
                      className="cursor-pointer"
                      href={link_checkout}
                      //   onClick={goToCheckout}
                    >
                      {common_dictionary.checkout_proceed} ({total})
                    </Button>
                  ) : (
                    <Button href={link_checkout} Component="a" width="100%">
                      {common_dictionary.checkout_proceed}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )
      )}
    </SidebarLayout>
  );
};

export default CartSidebarView;
