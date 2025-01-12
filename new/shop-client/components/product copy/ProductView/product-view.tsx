'use client';
import { Dictionary } from '@/lib/get-dictionary';
import {
  Customer,
  FavoriteList,
  ListedProductFragment,
  Product
} from '@/lib/vendure/generated/graphql-shop';
import { useState } from 'react';
// import s from './product-view.module.css';
import Lightbox from 'yet-another-react-lightbox';
import Image from 'next/image';
import { cloudinaryImageLoader } from '@/lib/cloudinary-image-loader';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import ProductSidebar from '../ProductSidebar/product-sidebar';
import { ProductList } from '../ProductList';
import { mapRelatedProductsToSearchResult } from '@/lib/vendure/shop/products/products';
import 'yet-another-react-lightbox/styles.css';

type Props = {
  dictionary: Dictionary;
  product: Product;
  randomProducts: ListedProductFragment[];
  wishlist: FavoriteList;
  customer: Customer;
};

export default function ProductView({
  product,
  dictionary,
  randomProducts,
  wishlist,
  customer
}: Props) {
  const product_dictionary = dictionary.product;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const relatedProducts = product?.customFields?.relatedProducts?.map((product) => product);

  const photos = product.assets.map((photo, index) => {
    return {
      //   src: placeholderImg,
      src: photo.preview,
      key: `${index}`,
      alt: `product image ${product.name}`
    };
  });
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
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product.assets.map((image, i) => (
                    <Tab
                      key={i}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none "
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only"> {image.name} </span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <Image
                              loader={cloudinaryImageLoader}
                              priority
                              width={100}
                              height={100}
                              //   src={placeholderImg}
                              src={image.preview}
                              alt=""
                              className="h-full w-full object-contain object-center" // hover:scale-110 transition ease-in-out duration-500"
                            />
                          </span>
                          <span
                            className={clsx(
                              selected ? 'ring-red-500' : 'ring-transparent',
                              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {product.assets.map((image, i) => (
                  <Tab.Panel
                    key={i}
                    onClick={() => {
                      setOpen(true);
                      setIndex(i);
                    }}
                  >
                    {/* <div
                      className="overflow-hidden "
                      onClick={() => setOpen(true)}
                    > */}
                    <Image
                      loader={cloudinaryImageLoader}
                      width={1000}
                      height={1000}
                      //   src={placeholderImg}
                      src={image.preview}
                      alt={image.name || 'Product Image'}
                      className=" h-full w-full  object-contain object-center sm:rounded-lg"
                      unoptimized
                    />
                    {/* </div> */}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}

            <ProductSidebar
              dictionary={dictionary}
              key={product.id}
              product={product}
              customer={customer}
              wishlist={wishlist}
            />
          </div>
          <ProductList
            customer={customer}
            wishlist={wishlist}
            dictionary={dictionary}
            products={
              relatedProducts ? mapRelatedProductsToSearchResult(relatedProducts) : randomProducts
            }
            title={
              relatedProducts
                ? product_dictionary.related_products!
                : product_dictionary.related_products!.split(' ')[1]
            }
          />
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
