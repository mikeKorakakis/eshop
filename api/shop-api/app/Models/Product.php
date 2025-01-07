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
        'status',
        'rating',
        'is_approved',
        'category_id',
        'owner_id',
        'image_url',
        'contact_info',
        'media_id'
    ];
    protected $casts = [
        'name' => 'string',
        'description' => 'string',
        'price' => 'decimal:2',
        'added_date' => 'date',
        'country_of_origin' => 'string',
        'status' => 'string',
        'is_approved' => 'boolean',
        'image_url' => 'string',
        'contact_info' => 'string',
        'media_id' => 'integer'
    ];

    public static array $rules = [
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:65535',
        'price' => 'required|numeric',
        'added_date' => 'required',
        'country_of_origin' => 'required|string|max:255',
        'status' => 'required|string|max:50',
        'rating' => 'required',
        'is_approved' => 'required|boolean',
        'category_id' => 'required',
        'owner_id' => 'required',
        'image_url' => 'required|string|max:255',
        'contact_info' => 'required|string|max:255',
        'media_id' => 'nullable|integer'
    ];
}
