'use client'
import Button from '@/components/ui/Button'
import { Dictionary } from '@/lib/get-dictionary'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
	productId: number,
	dictionary: Dictionary
}

export default function ProductButton({ productId, dictionary }: Props) {
	const router = useRouter()
	const order_dictionary = dictionary.order
	return (
		<Button
			type="button"
			onClick={() => router.push(`/product/${productId}`)}
		>
			{order_dictionary.buy_again}
		</Button>
	)
}
