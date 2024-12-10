import React from 'react';
import ProductCard from '../ProductCard';

import { Dictionary } from '@/lib/get-dictionary';
import { Product } from '@/types/types';

interface Props {
  products: Product[];
  title?: string;
  dictionary: Dictionary;
}

export default function ProductList({ products, title, dictionary }: Props) {
  return (
    <section className="mb-10">
      <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((p) => (
            <ProductCard
              dictionary={dictionary}
              key={p.product_id}
              product={p}
              imgProps={{
                alt: p.name!,
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
