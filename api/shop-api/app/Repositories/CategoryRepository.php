<?php

namespace App\Repositories;

use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Category;

class CategoryRepository implements CategoryRepositoryInterface
{
    public function index(){
        return Category::all();
    }

    public function getById($id){
       return Category::findOrFail($id);
    }

    public function store(array $data){
       return Category::create($data);
    }

    public function update(array $data,$category_id){
       return Category::where("category_id", $category_id)->update($data);
    }
    
    public function delete($id){
        return Category::destroy($id);
    }
}
