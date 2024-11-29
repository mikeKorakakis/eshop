'use client'

import { client } from "@/lib/client";

const ProductsList = async () => {
  const res = await client.GET("/categories");

  const categories = res.data?.data

  console.log('data', categories)
  return (
    <div>
      {categories?.map((product) => (
        <div key={product.name}>{product.name}</div>
      ))}
    </div>
  );
};

export default ProductsList;
