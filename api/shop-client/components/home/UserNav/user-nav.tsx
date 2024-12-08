'use client'
import { Dictionary } from "@/lib/get-dictionary";
import UserNavClient from "./user-nav-client";



// type Props = LanguageProps
type Props = {
	dictionary: Dictionary
};

export default function UserNav({ dictionary }: Props) {
	const customer = {email: 'bob@test.com'}
	return <UserNavClient dictionary={dictionary} customer={customer} />;
}
