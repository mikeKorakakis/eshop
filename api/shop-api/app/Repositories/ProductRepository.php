<?php

namespace App\Repositories;

use App\Interfaces\IProductRepository;
use App\Models\Product;

class ProductRepository implements IProductRepository
{
    public function index(){
        return Product::all();
    }
    public function getById($id) {
        return Product::findOrFail($id);
    }
    public function store(array $data){
        return Product::create($data);
    }
    public function update(array $data,$id){
        return Product::where("id",$id)->update($data);
    }
    public function delete($id){
        return Product::destroy($id);
    }
}