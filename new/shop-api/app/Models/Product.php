<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public $table = 'products';

	protected $primaryKey = "product_id";
    public $timestamps = false;

    public $fillable = [
        'name',
        'description',
        'price',
        'added_date',
        'country_of_origin',
        'category_id',
        'owner_id',
        'media_id'
    ];
    protected $casts = [
        'name' => 'string',
        'description' => 'string',
        'price' => 'decimal:2',
        'added_date' => 'date',
        'country_of_origin' => 'string',
        'media_id' => 'integer'
    ];

    public static array $rules = [
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:65535',
        'price' => 'required|numeric',
        'added_date' => 'required',
        'country_of_origin' => 'required|string|max:255',
        'category_id' => 'required',
        'owner_id' => 'required',
        'media_id' => 'nullable|integer'
    ];

	public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

	public function media() 
	{
		return $this->belongsTo(Media::class, 'media_id');
	}
}
