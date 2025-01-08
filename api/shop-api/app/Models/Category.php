<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $table = 'categories';

	protected $primaryKey = 'category_id';

	protected $hidden = ['description'];
    public $timestamps = false;

    public $fillable = [
        'name',
        'description',
        'parent_id',
        'ordering',

        'media_id'
    ];

    protected $casts = [
        'name' => 'string',
        'description' => 'string',

        'media_id' => 'integer'
    ];

    public static array $rules = [
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:65535',
        'parent_id' => 'nullable',
        'ordering' => 'nullable',

        'media_id' => 'nullable|integer'
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
