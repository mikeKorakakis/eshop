// 'use client'
import { Dictionary } from "@/lib/get-dictionary";
import UserNavClient from "./user-nav-client";
import { useEffect, useState } from "react";
import { me } from "@/lib/actions";
import { User } from "@/types/types";
import { client } from "@/lib/client";
import { cookies } from "next/headers";



// type Props = LanguageProps
type Props = {
	dictionary: Dictionary
};

export default  function UserNav({ dictionary }: Props) {
	
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const getUsr = async () => {
			const usr = await me();
			setUser(usr);

		}
		getUsr();
	}, []);
	return <UserNavClient dictionary={dictionary} customer={user} />;
}
