<?php

namespace App\Repositories;

use App\Models\ProductGallery;
use App\Interfaces\IProductGalleryRepository;

class ProductGalleryRepository implements IProductGalleryRepository
{
    public function index()
    {
        return ProductGallery::all();
    }
    public function getById($id)
    {
        return ProductGallery::findOrFail($id);
    }
    public function store(array $data)
    {
        return ProductGallery::create($data);
    }
    public function update(array $data, $id): bool
    {
        return ProductGallery::where("gallery_id", $id)->update($data);
    }
    public function delete($id)
    {
        return ProductGallery::destroy($id);
    }
    public function getByProduct($productId)
    {
        return ProductGallery::where("product_id", $productId)->get();
    }
}