import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { LanguageProps } from '@/lib/types';
import { getDictionary } from '@/lib/get-dictionary';
import CategoryProductsSection from '@/components/home/category-products-section';
import { getCategories } from '@/lib/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';


type Props = {
} & LanguageProps

export default async function CategoryPage({ params: { lng } }: Props) {
	const dictionary = await getDictionary(lng);
	const categories = await getCategories();

	if (!categories) return notFound();

	const common_dictionary = dictionary.common;
	return (
		<>
			<div className="absolute  z-10 mt-6 w-full">
				<div className="relative mx-auto max-w-screen-2xl px-6">
					<BreadCrumbs
						navigation={[
							{ name: common_dictionary.home!, href: '/' },
							{ name: common_dictionary.categories, href: '#' }
						]}
					/>
				</div>
			</div>
			<div className="z-0">
				<div id="racing_preparation" />
				<div className="overflow-hidden bg-white ">
					{categories?.map((category) =>
						<section
							key={category.category_id}
							aria-labelledby="collection-heading"
							className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
						>

							<h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-gray-900">
								<Link href={`/categories/${category.category_id}`}>
									{category.name}
								</Link>

							</h2>
							<p className="mt-4 text-base text-gray-500">{category.description}</p>

							<div className="mt-10 space-y-12 lg:grid lg:gap-x-8 lg:space-y-0">
								<CategoryProductsSection category_id={category.category_id!} dictionary={dictionary} />

							</div>
						</section>
					)}
				</div>
			</div>
		</>
	);
}
