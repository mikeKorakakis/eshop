import { getDictionary } from '@/lib/get-dictionary';
import { LINKS } from '@/lib/constants';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import ProductView from '@/components/product/ProductView/product-view';
import { LanguageProps } from '@/lib/types';
import { Metadata } from 'next/types';
import { notFound } from 'next/navigation';
import { i18n } from '@/i18n-config';
import { client } from '@/lib/client';
import { Item } from '@/types/types';

const { link_search } = LINKS;

type Props = {
	params: {
		item_id: number;
	};
} & LanguageProps;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const res = await client.GET(`/items/{id}`, {
		params: {
			 path: {id: params.item_id!}
		}		
	});

	let product = res.data?.data as Item;

	if (!product) return notFound();

	
	const { name, description, image_url } = product;
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
		openGraph: image_url
			? {
				images: [
					{
						url: image_url,
						width:400,
						height:400,
						alt: name
					}
				]
			}
			: null
	};
}

export async function generateStaticParams() {
	const res = await client.GET(`/items`);
	let products = res.data?.data as Item[];	

	return products.map((product) => ({
		params: {
			item_id: product.item_id
		}
	}));

}

export default async function Product({ params: { item_id, lang } }: Props) {
	    const dictionary = await getDictionary(lang);
		const res = await client.GET(`/items/{id}`, {
			params: {
				 path: {id: item_id!}
			}		
		});
	
		let product = res.data?.data as Item;
	//   const customer = await getActiveCustomerQuery();
	//   const randomProducts = await search({ take: 4, skip: 0 });
	//   const wishlist = await getWishlistQuery();

	
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
					dictionary={dictionary}
					product={product}
				//  relatedProducts={relatedProducts}
				/>
			</div>
		</>
	);
}
