'use client';
import { Dictionary } from '@/lib/get-dictionary';

import { useEffect, useState } from 'react';
// import s from './product-view.module.css';
import Lightbox from 'yet-another-react-lightbox';
import Image from 'next/image';
import ProductSidebar from '../ProductSidebar/product-sidebar';
import 'yet-another-react-lightbox/styles.css';
import { Product } from '@/types';
import { formatImage } from '@/lib/helpers';
import CommentList from '../Comment/comment-list';
import { me } from '@/lib/actions';
import placeholderImg from '@/assets/images/placeholder.png';

type Props = {
	dictionary: Dictionary;
	product: Product;
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
		src: formatImage(product?.media?.path!) ?? placeholderImg,
		key: `${index}`,
		alt: `product image ${product.name}`
	}]

	return (
		<>
			<div className='pb-20'>
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
										fill={true}
										style={{ objectFit: 'contain' }}
										src={image.slide.src ?? placeholderImg}
										quality={100}
										// width={200}
										// height={200}
										alt={image?.slide.alt ?? ""}
									/>
								</div>
							);
						}
					}}
				/>
				<div className="bg-transparent">
					<div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8">
						<div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
							<span className=" inset-0 overflow-hidden rounded-md">
								<Image
									onClick={() => setOpen(true)}
									priority
									width={500}
									height={500}
									src={product?.media?.path ? formatImage(product?.media?.path!) : placeholderImg}
									alt=""
									className="h-[500px]  object-contain object-center" // hover:scale-110 transition ease-in-out duration-500"
								/>
							</span>
							<ProductSidebar
								dictionary={dictionary}
								key={product.product_id}
								product={product}
							/>
						</div>

					</div>
				</div>
			</div>
			<CommentList product_id={product.product_id!} dictionary={dictionary} />
		</>
	);
}
