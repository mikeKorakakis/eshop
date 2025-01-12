import React from 'react';
import ProductCard from '../ProductCard';
import {
    Customer,
  FavoriteList,
  ListedProductFragment
} from '@/lib/vendure/generated/graphql-shop';
import { Dictionary } from '@/lib/get-dictionary';

interface Props {
  products: ListedProductFragment[];
  title?: string;
  dictionary: Dictionary;
  wishlist: FavoriteList | null;
  customer: Customer | null;
}

export default function ProductList({ products, title, dictionary, wishlist, customer }: Props) {
  return (
    <section className="mb-10 py-12">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((p) => (
            <ProductCard
              customer={customer}
              wishlist={wishlist}
              dictionary={dictionary}
              key={p.productId}
              product={p}
              imgProps={{
                alt: p.productName,
                width: 300,
                height: 300
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
