<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $table = 'categories';

    public $fillable = [
        'name',
        'description',
        'parent_id',
        'ordering',
        'is_visible',
        'allow_comments',
        'allow_ads'
    ];

    protected $casts = [
        'name' => 'string',
        'description' => 'string',
        'is_visible' => 'boolean',
        'allow_comments' => 'boolean',
        'allow_ads' => 'boolean'
    ];

    public static array $rules = [
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:65535',
        'parent_id' => 'nullable',
        'ordering' => 'nullable',
        'is_visible' => 'required|boolean',
        'allow_comments' => 'required|boolean',
        'allow_ads' => 'required|boolean'
    ];
    public function parentCategory()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function childCategories()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
}
