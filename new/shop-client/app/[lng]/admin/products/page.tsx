import ProductsView from '@/components/admin/ProductsView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/types'
import React from 'react'

export default async function ProductsAdminPage({ params: { lng } }: LanguageProps) {
	const dictionary = await getDictionary(lng);
  return (
	<ProductsView dictionary={dictionary}/>
  )
}
