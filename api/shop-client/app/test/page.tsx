import { getCategories } from '@/lib/actions';
import { client } from '@/lib/client';

const ProductsPage = async () => {
	
	const categories = await getCategories();

	return (
		<div>
			{categories?.map((product) => (
				<div key={product.name}>{product.name}</div>
			))}
		</div>
	);
};

export default ProductsPage;
