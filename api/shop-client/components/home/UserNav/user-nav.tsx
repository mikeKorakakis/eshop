import { Dictionary } from "@/lib/get-dictionary";
import UserNavClient from "./user-nav-client";



// type Props = LanguageProps
type Props = {
  dictionary: Dictionary
};

export default async function UserNav({dictionary}: Props) {


	const customer = null


  return <UserNavClient dictionary={dictionary} customer={customer} />;
}
