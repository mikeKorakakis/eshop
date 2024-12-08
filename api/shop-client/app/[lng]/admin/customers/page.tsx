import CustomersView from '@/components/admin/CustomersView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types'
import React from 'react'

export default async function ProductsAdminPage({ params: { lng } }: LanguageProps) {
	const dictionary = await getDictionary(lng);
  return (
	<CustomersView dictionary={dictionary}/>
  )
}
