import { i18n } from '@/i18n-config';
import { getProducts } from '@/lib/actions';
import { MetadataRoute } from 'next';

type Route = {
  url: string;
};

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
  ? `https://${process.env.NEXT_PUBLIC_FRONTEND_URL}`
  : 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = i18n.locales;

  const routesMap = locales.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString()
  }));

  const productsToFetch = 100;
  let fetchedRoutes: Route[] = [];

  const products = await getProducts();
  const totalProducts = products.length;
  const productPages = Math.ceil(totalProducts / productsToFetch);
  new Array({ length: productPages }).forEach(async () => {
    const products = await getProducts();
    const slugs = products.map((product) => ({
      url: `${baseUrl}/product/${product.product_id}`,
    }));
    fetchedRoutes = [...fetchedRoutes, ...slugs];
  });

  // const productsPromise = getAllProducts({
  //   take: productsToFetch,
  //   buildTime: true,
  //   languageCode: locales[0]
  // }).then((products) =>
  //   products.items.map((product) => ({
  //     url: `${baseUrl}/product/${product.slug}`,
  //     lastModified: product.updatedAt
  //   }))
  // );

  return [...routesMap, ...fetchedRoutes];
}
