// import { useAddItem } from '@framework/cart';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { useUI } from '@/components/ui/ui-context';
import Rating from '@/components/ui/Rating';

// import { getProductVariant, selectDefaultOptionFromProduct, SelectedOptions } from '../helpers';
import ErrorMessage from '@/components/ui/ErrorMessage';
// import usePrice from '@framework/product/use-price';
import { RATINGS_ENABLED } from '@/lib/constants';
import Link from 'next/link';
import ShareButtons from '@/components/ui/ShareButtons';
import { Dictionary } from '@/lib/get-dictionary';

import { Item } from '@/types/types';
import { useCart } from '@/components/ui/cart-context';

interface Props {
  product: Item;
  dictionary: Dictionary;
}

const ProductSidebar = ({ product, dictionary }: Props) => {
  const common_dictionary = dictionary.common;
  const product_dictionary = dictionary.product;
  const {addToCart} = useCart()
  //   const addItem = useAddItem();
  const { openSidebar, setSidebarView } = useUI();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [truncateText, setTruncateText] = useState(true);
  const showMore = () => setTruncateText((truncateText) => !truncateText);




  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);
    try {
	  addToCart({
		id: product.item_id!,
		imageUrl: product.image_url,
		name: product.name,
		price: product.price,
	  })
      setSidebarView('CART_VIEW');
      openSidebar();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        console.error(err);
        setError({
          ...err,
          message: common_dictionary.product_cart_insufficient_stock
        });
      }
    }
  };

  return (
    <>
      <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

        <div className="mt-3">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">
            {product.price}
          </p>{' '}
     
        </div>

        {/* Reviews */}
        <div className="mt-8">
          {RATINGS_ENABLED && (
            <>
              <h3 className="sr-only">{product_dictionary.reviews}</h3>
              <Rating value={4} />
            </>
          )}
        </div>

        <div>
          <h3 className="sr-only">{product_dictionary.description}</h3>

          <div
            className="space-y-6 text-base text-gray-700"
            dangerouslySetInnerHTML={{
              __html: truncateText
                ? product.description.substring(0, 800) + '...'
                : product.description
            }}
          />
          {product.description.length > 800 && (
            <div className="mt-2 w-fit">
              {' '}
              <button
                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                // variant="slim"
                onClick={showMore}
              >
                {truncateText ? common_dictionary.read_more : common_dictionary.read_less}
              </button>
            </div>
          )}
        </div>

        <form className="mt-6">
        

          <div className="mt-10">
            {error && <ErrorMessage error={error} className="my-5" />}
            <div className="sm:flex-col1 flex  max-w-xs">
                <Button
                  aria-label="Add to Cart"
                  type="button"
                  onClick={handleAddToCart}
                  loading={loading}
                  //   disabled={variant?.availableForSale === false}
                >
                  {common_dictionary.add_to_cart}
                  {/* {variant?.availableForSale === false
                    ? common_dictionary.not_available
                    : common_dictionary.add_to_cart} */}
                </Button>
              
            </div>
          </div>
        </form>

        <section aria-labelledby="details-heading" className="mt-12">
          <h2 id="details-heading" className="sr-only">
            {product_dictionary.additional_details}
          </h2>

          <div className="divide-y divide-gray-200 border-t">
         
           
            {product?.country_of_origin && (
              <ul className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                  <li className="text-sm font-medium text-gray-500">Country of Origin</li>
                  <div className="w-96">
                    <li className="floa mt-1 list-disc text-sm text-gray-900 sm:col-span-2 sm:mt-0	">
                      {product?.country_of_origin}
                    </li>
                  </div>
                </div>
              </ul>
            )}
			 {product?.added_date && (
              <ul className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                  <li className="text-sm font-medium text-gray-500">Added Date</li>
                  <div className="w-96">
                    <li className="floa mt-1 list-disc text-sm text-gray-900 sm:col-span-2 sm:mt-0	">
                      {product?.added_date}
                    </li>
                  </div>
                </div>
              </ul>
            )}
          </div>
          <div className="mt-10">
            <ShareButtons />
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductSidebar;
