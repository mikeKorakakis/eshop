'use client';
import { Dictionary } from '@/lib/get-dictionary';

import { useState } from 'react';
// import s from './product-view.module.css';
import Lightbox from 'yet-another-react-lightbox';
import Image from 'next/image';
import { cloudinaryImageLoader } from '@/lib/cloudinary-image-loader';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import ProductSidebar from '../ProductSidebar/product-sidebar';
import { ProductList } from '../ProductList';
import 'yet-another-react-lightbox/styles.css';
import { Item } from '@/types/types';

type Props = {
  dictionary: Dictionary;
  product: Item;
};

export default function ProductView({
  product,
  dictionary,
}: Props) {
  const product_dictionary = dictionary.product;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const photos = [{
      //   src: placeholderImg,
      src: product.image_url,
      key: `${index}`,
      alt: `product image ${product.name}`
    }]
  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={photos}
        index={index}
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .8)' } }}
        render={{
          slide: (image) => {
            return (
              <div className="h-full w-full">
                <Image
                  fill
                  loader={cloudinaryImageLoader}
                  style={{ objectFit: 'contain' }}
                  src={image.slide.src}
                  //   blurDataURL={image.src}
                  //   src={placeholderImg}
                  quality={100}
                  loading="eager"
                  //   placeholder="blur"
                  alt={image?.slide.alt ?? ''}
                />
              </div>
            );
          }
        }}
      />
      <div className="bg-transparent">
        <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          
            <ProductSidebar
              dictionary={dictionary}
              key={product.item_id}
              product={product}
              customer={customer}
              wishlist={wishlist}
            />
          </div>
       
        </div>
      </div>
      {/* <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      /> */}
    </>
  );
}
