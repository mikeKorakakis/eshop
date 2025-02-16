<?php

namespace App\Repositories;

use App\Interfaces\IProductRepository;
use App\Models\Product;

class ProductRepository implements IProductRepository
{
    public function index()
    {
        return Product::all();
    }
    public function getById($id)
    {
        return Product::with('media')->findOrFail($id);
    }
    public function store(array $data)
    {
        return Product::create($data);
    }
    public function update(array $data, $product_id): bool
    {
        return Product::where("product_id", $product_id)->update($data);
    }
    public function delete($id)
    {
        return Product::destroy($id);
    }
    public function getByCategory($categoryId)
    {
        return Product::where("category_id", $categoryId)->with(['category'])->get();
    }
}