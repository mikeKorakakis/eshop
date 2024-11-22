<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    // Define the fillable attributes to allow mass assignment
    protected $fillable = ['title', 'mediaId', 'parentId', 'isParent'];

    // Define relationships if needed
    public function parentCategory()
    {
        return $this->belongsTo(Category::class, 'parentId');
    }

    public function childCategories()
    {
        return $this->hasMany(Category::class, 'parentId');
    }
}
