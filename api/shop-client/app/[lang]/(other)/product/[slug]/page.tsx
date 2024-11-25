import { getDictionary } from '@/lib/get-dictionary';
import { LINKS } from '@/lib/constants';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import ProductView from '@/components/product/ProductView/product-view';
import { LanguageProps } from '@/lib/types';
import { getAllProducts, getProductBySlug, search } from '@/lib/vendure/shop/products/products';
import { getActiveCustomerQuery } from '@/lib/vendure/shop/customer/customer';
import { getWishlistQuery } from '@/lib/vendure/shop/wishlist/wishlist';
import { Metadata } from 'next/types';
import { notFound } from 'next/navigation';
import { i18n } from '@/i18n-config';

const { link_search } = LINKS;

type Props = {
  params: {
    slug: string;
  };
} & LanguageProps;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) return notFound();

  const { preview, width, height } = product.featuredAsset || {};
  const { name, description } = product;
  //   const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: name ?? 'empty title',
    description: description ?? 'empty description',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    },
    openGraph: preview
      ? {
          images: [
            {
              url: preview,
              width,
              height,
              alt: name
            }
          ]
        }
      : null
  };
}

export async function generateStaticParams() {
  const productsToFetch = 100;
  let productSlugs: string[] = [];

  const products = await getAllProducts({
    take: 1,
    buildTime: true,
    languageCode: i18n.locales[0]
  });
  const totalProducts = products.totalItems;
  const productPages = Math.ceil(totalProducts / productsToFetch);
  new Array({ length: productPages }).forEach(async () => {
    const products = await getAllProducts({
      take: productsToFetch,
      buildTime: true,
      languageCode: i18n.locales[0]
    });
    const slugs = products.items.map((product) => product.slug);
    productSlugs = [...productSlugs, ...slugs];
  });

  return productSlugs.map((slug) => ({
    params: {
      slug: slug
    }
  }));

}

export default async function Product({ params: { slug, lang } }: Props) {
  //     const dictionary = await getDictionary(lang);
  //   const product = await getProductBySlug(slug);
  //   const customer = await getActiveCustomerQuery();
  //   const randomProducts = await search({ take: 4, skip: 0 });
  //   const wishlist = await getWishlistQuery();

  const [dictionary, product, randomProducts, customer, wishlist] = await Promise.all([
    getDictionary(lang),
    getProductBySlug(slug),
    search({ take: 4, skip: 0 }),
    getActiveCustomerQuery(),
    getWishlistQuery()
  ]);
  const common_dictionary = dictionary.common;

  return (
    <>
      <div className="absolute  z-10 mt-6 w-full">
        <div className="relative mx-auto max-w-screen-2xl px-6">
          <BreadCrumbs
            navigation={[
              { name: common_dictionary.home!, href: '/' },
              { name: common_dictionary.shop, href: link_search },
              { name: product.name, href: '#' }
            ]}
          />
        </div>
      </div>
      <div className="mt-16">
        <ProductView
          wishlist={wishlist}
          customer={customer}
          dictionary={dictionary}
          product={product}
          randomProducts={randomProducts.items}
          //  relatedProducts={relatedProducts}
        />
      </div>
    </>
  );
}
