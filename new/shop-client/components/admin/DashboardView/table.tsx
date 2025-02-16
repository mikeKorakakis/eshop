import { Dictionary } from "@/lib/get-dictionary";


  interface Props {
	values: {id: number, name: string}[];
	dictionary: Dictionary;
	header: string;
	editAction?: (id: number) => void;
  }
  
  export default function DashboardTable({ values, header, dictionary, editAction }: Props) {
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
					  <th scope="col" colSpan={2} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 col-span-2">
						 {common_dictionary.latest_6} {header}
					  </th>
					 
					</tr>
				  </thead>
				  <tbody className="divide-y divide-gray-200 bg-white">
					{values?.map((value) => (
					  <tr key={value?.id}>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
						  {value?.name}
						</td>
						
						<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
						{editAction &&  <button type="button" onClick={() => editAction(value?.id)} className="text-red-600 hover:text-red-900">
							{common_dictionary.edit}<span className="sr-only">, {value?.name}</span>
						  </button>}
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