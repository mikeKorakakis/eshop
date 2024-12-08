import { Customer, Orders } from "@/components/common/Table/table";
import { Dictionary } from "@/lib/get-dictionary";
import { formatPrice } from "@/lib/utils";


interface Props {
	values: { customer_id: number, total_amount: number, id: number }[];
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
									{values?.map((value) => (
										<tr key={value?.id}>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
												<Customer customer_id={value?.customer_id} />
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
												{formatPrice(value?.total_amount, "EUR")}
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
												<Orders order_id={value?.id} />
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