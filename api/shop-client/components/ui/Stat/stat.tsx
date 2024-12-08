import { Dictionary } from '@/lib/get-dictionary';
import React from 'react'

interface Props {
	children: React.ReactElement;
	name: string;
	stat: number;
	dictionary: Dictionary;
	link: string
}

export default function Stat({ children, name, stat,dictionary, link }: Props) {
	const common_dictionary = dictionary.common;
	return (

		<div
			className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
		>
			<dt>
				<div className="absolute rounded-md bg-red-500 p-3">
					{children}
				</div>
				<p className="ml-16 truncate text-sm font-medium text-gray-500">{name}</p>
			</dt>
			<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
				<p className="text-2xl font-semibold text-gray-900">{stat}</p>

				<div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
					<div className="text-sm">
						<a href={link} className="font-medium text-red-600 hover:text-red-500">
							{common_dictionary.view_all}<span className="sr-only"> {name} stats</span>
						</a>
					</div>
				</div>
			</dd>
		</div>

	)
}
