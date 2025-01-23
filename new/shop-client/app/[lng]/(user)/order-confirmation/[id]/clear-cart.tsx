"use client"
import { useCart } from '@/lib/context/cart-context'
import React, { useEffect } from 'react'

export default function ClearCart() {

	const { clearCart } = useCart()
	useEffect(() => {
		clearCart()
	}, [clearCart])
	return (
		<></>
	)
}
