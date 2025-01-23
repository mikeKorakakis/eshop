import { Dictionary } from "@/lib/get-dictionary";
import { formatImage, formatPrice } from "@/lib/helpers";
import { OrderItem, User } from "@/types";
import Image from "next/image";
import placeholderImg from '@/assets/images/product-img-placeholder.svg';



interface Props {
	values: { user: string, items: OrderItem[], total_amount: number, id: number }[];
	dictionary: Dictionary;
	header: string;
}

export default function DashboardOrdersTable({ values, header, dictionary, }: Props) {
	const common_dictionary = dictionary.common;
	return (
		<div className="px-4 sm:px-6 lg:px-8">

			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-gray-50">
									<tr >
										<th scope="col" colSpan={3} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 col-span-2">
											{common_dictionary.latest_6} {header}
										</th>

									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{values?.map((value, i) => (
										<tr key={value?.id}>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
												<span>{value.user}</span>
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
												{formatPrice(value?.total_amount, "EUR")}
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
												{value.items.map(({product}: any) => <div className='flex items-center' key={product?.product_id}>
													<Image
														src={product?.media?.path ? formatImage(product?.media?.path!) : placeholderImg}
														width={40}
														height={40}
														alt="image"
														className="w-8 mr-2" />
													<span className="mr-2">{product?.name}</span>
													<span >{formatPrice(product?.price, "EUR")}</span>
												</div >)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}