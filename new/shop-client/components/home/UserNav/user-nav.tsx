// 'use client'
import { Dictionary } from "@/lib/get-dictionary";
import UserNavClient from "./user-nav-client";
import { useAuth } from "@/lib/context/auth-context";



// type Props = LanguageProps
type Props = {
	dictionary: Dictionary
};

export default  function UserNav({ dictionary }: Props) {
	
	
	return <UserNavClient dictionary={dictionary} />;
}
