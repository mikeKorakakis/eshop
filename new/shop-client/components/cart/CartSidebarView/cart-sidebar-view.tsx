'use client';

import cn from 'clsx';
import Link from 'next/link';
import s from './cart-sidebar-view.module.css';
import CartItem from '../CartItem';
import Button from '@/components/ui/Button/button';
import { useUI } from '@/components/ui/ui-context';
import SidebarLayout from '@/components/common/SidebarLayout';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { LINKS } from '@/lib/constants';
import { Dictionary } from '@/lib/get-dictionary';
import { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/components/ui/cart-context';

const { link_cart, link_checkout } = LINKS;

interface Props {
  dictionary: Dictionary;
}

const CartSidebarView = ({ dictionary }: Props) => {
  const { items, totalAmount } = useCart();
  const { closeSidebar } = useUI();
  const common_dictionary = dictionary.common;
  const [calculating, setCalculating] = useState(false)

  const emptyCart = items.length === 0;

  const handleClose = () => closeSidebar();

  return (
    <SidebarLayout
      className={cn({
        [s.empty as string]: emptyCart,
      })}
      handleClose={handleClose}
      dictionary={dictionary}
    >
      {emptyCart ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-100">
            <ShoppingBagIcon className="h-6 w-6 text-zinc-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {common_dictionary.empty_cart}
            </h3>
          </div>
        </div>
      ) : (
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
            <ul className="no-scrollbar w-full flex-grow space-y-6 overflow-auto border-slate-200 py-4 sm:divide-y sm:divide-slate-200 sm:py-0">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode="EUR" // Replace with dynamic currency if available
                  dictionary={dictionary}
				  setCalculating={setCalculating}
                />
              ))}
            </ul>
            <div className="left-0 right-0 z-20 w-full flex-shrink-0  px-3 py-6 text-sm sm:px-3">
             
              <div className="mb-2 flex justify-between border-t border-slate-200 py-3 font-bold">
                <span>{common_dictionary.total}</span>
                <span>{formatPrice(totalAmount, 'USD')}</span>
              </div>
              <div>
                <Button href={link_checkout} Component="a" width="100%">
                  {common_dictionary.checkout_proceed}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

export default CartSidebarView;
