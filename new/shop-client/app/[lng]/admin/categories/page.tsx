import CategoriesView from '@/components/admin/CategoriesView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/types'
import React from 'react'

export default async function CategoriesAdminPage({ params: { lng } }: LanguageProps) {
	const dictionary = await getDictionary(lng);
	return (
		<CategoriesView dictionary={dictionary} />
	)
}
