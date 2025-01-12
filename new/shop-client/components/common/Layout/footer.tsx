'use client'
import React, { useEffect, useState } from 'react';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Dictionary } from '@/lib/get-dictionary';
import { getCategories } from '@/lib/actions';
import { Category } from '@/types/types';


interface Props {
	dictionary: Pick<Dictionary, 'common'>;
}

export default function Footer({ dictionary }: Props) {
	//   const { data: customer } = useCustomer();
	const common_dictionary = dictionary.common;


	const [categories, setCategories] = useState<Category[]>([]); // Initialize as an empty array
	useEffect(() => {
		const getCats = async () => {
			try {
				const categories = await getCategories();
				if(!categories) return;
				setCategories(categories);
			} catch (err) {
				console.error(err);
			}
		};
		getCats();
	}
	, []);


	const footerNavigation = {
		
		connect: [
			{
				name: 'Email',
				href: 'mailto:info@uniwa.gr <info@uniwa.gr>;'
			},
			{
				name: 'Facebook',
				href: '#'
			},
			{
				name: 'Youtube',
				href: '#'
			}
		]
	};

	return (
		<>
			<footer aria-labelledby="footer-heading" className="bg-gray-900 ">
				<h2 id="footer-heading" className="sr-only">
					Footer
				</h2>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="py-20 xl:grid grid-cols-1 sm:grid-cols-3 xl:gap-8">
						<div className="mt-12 md:mt-16 xl:mt-0">
							<h3 className="text-sm font-medium text-white">
								{common_dictionary.categories}
							</h3>
							<ul role="list" className="mt-6 space-y-6">
								{categories?.map((category) => (
									<li key={category.name} className="text-sm">
										<Link href={`/categories/${category.category_id}`} className="text-gray-300 hover:text-white">
											{category.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="mt-12 md:mt-16 xl:mt-0">

							<h3 className="text-sm font-medium text-white">
								{common_dictionary.footer_connect}
							</h3>
							<ul role="list" className="mt-6 space-y-6">
								{footerNavigation.connect.map((item) => (
									<li key={item.name} className="text-sm">
										<Link href={item.href} className="text-gray-300 hover:text-white">
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="mt-12 md:mt-16 xl:mt-0">
							<h3 className="text-sm font-medium text-white">{common_dictionary.footer_contact}</h3>
							<Link
								className="mt-6 flex items-center text-sm text-gray-300 "
								href="mailto:info@zen1one.gr <info@zen1one.gr>;"
							>
								<EnvelopeIcon className="h-4" />
								<span className="pl-2">info@uniwa.gr</span>
							</Link>
							<p className="mt-6 flex items-center text-sm text-gray-300 ">
								<PhoneIcon className="h-4" />
								<span className="pl-2">210-1234567</span>
							</p>
							<p className="mt-6 flex items-center text-sm text-gray-300 ">
								<PhoneIcon className="h-4" />
								<span className="pl-2"> 210-1234567 </span>
							</p>
							<Link
								className="mt-6 flex items-center text-sm text-gray-300 "
								href="https://www.google.com/maps/place/%CE%9B%CE%B5%CF%89%CF%86.+%CE%91%CE%BB%CE%AF%CE%BC%CE%BF%CF%85+76,+%CE%91%CF%81%CE%B3%CF%85%CF%81%CE%BF%CF%8D%CF%80%CE%BF%CE%BB%CE%B7+164+52/@37.908825,23.738453,16z/data=!4m5!3m4!1s0x14a1be74d8ceaeed:0xf50d0b6757f34193!8m2!3d37.9088253!4d23.7384527?hl=el-GR"
							>
								<MapPinIcon className="h-4" />
								<span className="pl-2"> {common_dictionary.footer_location}</span>
							</Link>
						</div>

					</div>

					<div className="border-t border-gray-800 py-10">
						<p className="text-sm text-gray-400">Copyright &copy; 2025 UNIWA TEAM.</p>
					</div>
				</div>
			</footer>
		</>
	);
}
