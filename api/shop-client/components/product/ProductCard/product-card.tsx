import { FC } from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import //   getProductVariant,
//   selectDefaultOptionFromProduct,
//   SelectedOptions,
'../helpers';
import placeholderImg from '@/assets/images/product-img-placeholder.svg';
import { Dictionary } from '@/lib/get-dictionary';
import { formatPrice } from '@/lib/utils';
import ProductButton from './product-button';
import { Product } from '@/types/types';
import { imageUrl } from '@/lib/helpers';

interface Props {
  dictionary: Dictionary;
  priority?: boolean;
  className?: string;
  product: Product;
  noNameTag?: boolean;
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>;
}
// const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  priority,
  dictionary,
}) => {


  return (
    <div className="delay-10 flex h-full flex-col rounded-md p-2 shadow transition ease-in-out hover:-translate-y-1  hover:scale-105 hover:shadow-lg">
      <Link href={`/product/${product.product_id}`} aria-label={product.name}>
        <div key={product.product_id} className="relative">         
          <div className="group relative">
            <div className="relative h-72 w-full overflow-hidden rounded-lg">
              {product?.image_url && (
                <>
                  <Image
                    className="h-full w-full object-cover object-center"
                    // loader={cloudinaryImageLoader}
                    // unoptimized
                    src={ imageUrl(product.image_url) ||  placeholderImg}
                    // src={product?.image_url || placeholderImg}
                    alt={'Product Image'}
                    width={500}
                    height={500}
                    priority={priority}
                    {...imgProps}
                  />
                </>
              )}
            </div>
            <div className="group relative mt-4">
              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            </div>

            <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
              />
              <p className="relative text-lg font-semibold text-white">
                {formatPrice(product?.price , "EUR" )}
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
