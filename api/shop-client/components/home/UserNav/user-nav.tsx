import { Dictionary } from "@/lib/get-dictionary";
import UserNavClient from "./user-nav-client";
import { getActiveCustomerQuery } from '@/lib/vendure/shop/customer/customer';
import { Order } from "@/lib/vendure/generated/graphql-shop";


// type Props = LanguageProps
type Props = {
  dictionary: Dictionary
  order: Order
};

export default async function UserNav({dictionary, order}: Props) {

    const customer = await getActiveCustomerQuery()


  return <UserNavClient dictionary={dictionary} customer={customer} order={order} />;
}
