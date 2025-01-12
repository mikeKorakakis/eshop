'use client'
import cn from 'clsx';
import React, { forwardRef, ButtonHTMLAttributes, JSXElementConstructor, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import s from './button.module.css';
import LoadingDots from '@/components/ui/LoadingDots/loading-dots';
import clsx from 'clsx';

export interface ImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	
	className?: string;
	icon: React.ReactElement;
}

// eslint-disable-next-line react/display-name
const ImageButton = (props: ImageButtonProps) => {
	return (
		<button
			type="button"
			className={clsx("rounded-full bg-red-600 p-1 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600", props.className)}
			{...props}
		>
			{props.icon}
		</button>
	)
}

export default ImageButton;
