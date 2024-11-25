import { i18n } from '@/i18n-config';
import { validateEnvironmentVariables } from '@/lib/utils';
import { getAllProducts } from '@/lib/vendure/shop/products/products';
import { MetadataRoute } from 'next';

type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
  ? `https://${process.env.NEXT_PUBLIC_FRONTEND_URL}`
  : 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();
  const locales = i18n.locales;

  const routesMap = locales.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString()
  }));

  const productsToFetch = 100;
  let fetchedRoutes: Route[] = [];

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
    const slugs = products.items.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: product.updatedAt
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
