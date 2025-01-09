import { LanguageProps } from '@/lib/types';
import { getDictionary } from '@/lib/get-dictionary';
import OrderView from '@/components/order/OrderView';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { client } from '@/lib/client';
import { Order } from '@/types/types';
import { getOrder } from '@/lib/actions';

type Props = {
	params: { id: number };
	searchParams?: { [key: string]: string | string[] | undefined };
} & LanguageProps;

export default async function CheckoutConfirmation({ params: { lng, id }, searchParams }: Props) {
	const dictionary = await getDictionary(lng);

	const order = await getOrder({ order_id: id })

	const common_dictionary = dictionary.common;
	const order_dictionary = dictionary.order;
	const redirect_status = searchParams?.redirect_status as string;
	// get route and query params
	return (
		<>
			<div className="absolute  z-10 mt-6 w-full">
				<div className="relative mx-auto max-w-screen-2xl px-6">
					<BreadCrumbs
						navigation={[
							{ name: common_dictionary.home!, href: '/' },
							{ name: order_dictionary.order_confirmation, href: '#' }
						]}
					/>
				</div>
			</div>
			<div>
				<OrderView
					order={order}
					dictionary={dictionary}
					redirect_status={redirect_status}
					lng={lng}
				/>
			</div>
		</>
	);
}
