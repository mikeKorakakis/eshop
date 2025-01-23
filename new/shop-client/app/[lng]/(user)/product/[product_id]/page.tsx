import { getDictionary } from '@/lib/get-dictionary';
import { LINKS } from '@/lib/constants';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import ProductView from '@/components/product/ProductView/product-view';
import { LanguageProps } from '@/types';
import { Metadata } from 'next/types';
import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/actions';
import { client } from '@/lib/client';
import { Product } from '@/types';
import placeholderImg  from '@/assets/images/product-img-placeholder.svg';

const { link_search } = LINKS;

type Props = {
	params: {
		product_id: number;
	};
} & LanguageProps;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { product_id } = params;
	const res = await client('').get(`products/${product_id}`).json<Product>();

	const product = res;
	if (!product) return notFound();


	const { name, description, media } = product;
	//   const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);
	const image_url = media ? media?.path : null;

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
		openGraph: image_url 
			? {
				images: [
					{
						url: image_url,
						width: 400,
						height: 400,
						alt: name
					}
				]
			}
			: placeholderImg
	};
}

export async function generateStaticParams() {
	const products = await client('').get(`products`).json<Product[]>();

	return products.map((product) => ({
		params: {
			product_id: product.product_id
		}
	}));

}

export default async function ProductPage({ params: { product_id, lng } }: Props) {
	const dictionary = await getDictionary(lng);
	const product = await getProduct({ product_id })
	const common_dictionary = dictionary.common;

	return (
		<>
			<div className="absolute  z-10 mt-6 w-full">
				<div className="relative mx-auto max-w-screen-2xl px-6">
					<BreadCrumbs
						navigation={[
							{ name: common_dictionary.home!, href: '/' },
							{ name: common_dictionary.shop, href: link_search },
							{ name: product.name!, href: '#' }
						]}
					/>
				</div>
			</div>
			<div className="mt-16">
				<ProductView
					dictionary={dictionary}
					product={product}
				/>
			</div>
		</>
	);
}
