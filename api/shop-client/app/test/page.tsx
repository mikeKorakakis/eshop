import { client } from '@/lib/client';

const ProductsPage = async () => {
	const res = await client.GET("/categories");

	const categories = res.data?.data

	return (
		<div>
			{categories?.map((product) => (
				<div key={product.name}>{product.name}</div>
			))}
		</div>
	);
};

export default ProductsPage;
