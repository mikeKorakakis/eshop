import CommentsView from '@/components/admin/CommentsView';
import { getDictionary } from '@/lib/get-dictionary';
import { LanguageProps } from '@/lib/types'
import React from 'react'

export default async function CommentsAdminPage({ params: { lng } }: LanguageProps) {
	const dictionary = await getDictionary(lng);
  return (
	<CommentsView dictionary={dictionary}/>
  )
}
