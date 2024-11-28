import { FC } from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import //   getProductVariant,
//   selectDefaultOptionFromProduct,
//   SelectedOptions,
'../helpers';
import placeholderImg from '@/assets/images/product-img-placeholder.svg';
import { cloudinaryImageLoader } from '@/lib/cloudinary-image-loader';
import {
  Customer,
  FavoriteList,
  ListedProductFragment
} from '@/lib/vendure/generated/graphql-shop';
import { Dictionary } from '@/lib/get-dictionary';
import { formatPrice } from '@/lib/utils';
import ProductButton from './product-button';
import WishlistButton from '@/components/wishlist/WishlistButton';

interface Props {
  dictionary: Dictionary;
  priority?: boolean;
  className?: string;
  product: ListedProductFragment;
  noNameTag?: boolean;
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>;
  variant?: 'default' | 'slim' | 'simple';
  wishlist: FavoriteList | null;
  customer: Customer | null;
}
// const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  priority,
  dictionary,
  customer,
  wishlist
}) => {


  return (
    <div className="delay-10 flex h-full flex-col rounded-md p-2 shadow transition ease-in-out hover:-translate-y-1  hover:scale-105 hover:shadow-lg">
      <Link href={`/product/${product.slug}`} aria-label={product.productName}>
        <div key={product.productId} className="relative">
          {process.env.NEXT_PUBLIC_WISHLIST_ENABLED && (
            <div className="absolute -left-6 -top-2 z-10">
              <WishlistButton
                wishlist={wishlist}
                dictionary={dictionary}
                productId={product?.productId}
                variantId={product?.productVariantId}
                customer={customer}
              />
            </div>
          )}
          <div className="group relative">
            <div className="relative h-72 w-full overflow-hidden rounded-lg">
              {product?.productAsset && (
                <>
                  <Image
                    className="h-full w-full object-cover object-center"
                    loader={cloudinaryImageLoader}
                    unoptimized
                    src={product?.productAsset?.preview || placeholderImg}
                    alt={product.productName || 'Product Image'}
                    width={500}
                    height={500}
                    priority={priority}
                    {...imgProps}
                  />
                </>
              )}
            </div>
            <div className="group relative mt-4">
              <h3 className="text-sm font-medium text-gray-900">{product.productName}</h3>
            </div>

            <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
              />
              <p className="relative text-lg font-semibold text-white">
                {formatPrice((product?.priceWithTax as any).min || 0, product.currencyCode)}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex grow"></div>
      <div className="mt-6 mb-2">
        <ProductButton product={product} dictionary={dictionary} />
      </div>
    </div>
  );
};

export default ProductCard;
