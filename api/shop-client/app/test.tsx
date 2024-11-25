import { useAPI } from '@/hooks/useAPI';

const Products = () => {
  const { data, error, isLoading } = useAPI('/products');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      {data?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default Products;
