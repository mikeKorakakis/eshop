<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductGallery extends Model
{
    public $table = 'product_gallery';
    protected $primaryKey = 'gallery_id';
    public $timestamps = false;
    public $fillable = [
        'media_id',
        'name',
        'product_id',
        'size'
    ];
    public $casts = [
        'name' => 'string',
        'size' => 'integer'
    ];
    public static array $rules = [
        'media_id' => 'required',
        'name' => 'nullable',
        'product_id' => 'required',
        'size' => 'nullable',
    ];
}
