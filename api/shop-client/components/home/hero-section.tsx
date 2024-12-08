import React from 'react';
import { Dictionary } from '@/lib/get-dictionary';
import Slider from './slider';

interface Props {
	dictionary: Dictionary;
}

export default async function HeroSection({ dictionary }: Props) {
	const home_dictionary = dictionary.home;

	return (
		<div className="relative">
			{/* Decorative image and overlay */}
			<div aria-hidden="true" className="-z-10 inset-0 overflow-hidden">
				<Slider />

			</div>
			<div aria-hidden="true" className="absolute inset-0 opacity-30 " />


		</div>

	);
}
