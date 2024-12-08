<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="Product",
 *      required={"name","description","price","country_of_origin","category_id","owner_id","image_url"},
 * 	@OA\Property(
 * 		property="product_id",
 * 		description="Product ID",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="number",
 * 	),
 * 	@OA\Property(
 * 		property="category_id",
 * 		description="Category ID",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="number",
 * 	),
 * 	@OA\Property(
 * 		property="owner_id",
 * 		description="Owner ID",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="number",
 * 	),
 *      @OA\Property(
 *          property="name",
 *          description="Name of the product",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="description",
 *          description="Description of the product",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="price",
 *          description="Price of the product",
 *          readOnly=false,
 *          nullable=false,
 *          type="number",
 *          format="number"
 *      ),
 *      @OA\Property(
 *          property="added_date",
 *          description="Date product was added",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *          format="date"
 *      ),
 *      @OA\Property(
 *          property="country_of_origin",
 *          description="Country where product was made",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="image_url",
 *          description="URL to product image",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      )
 * )
 */class Product extends Model
{
    public $table = 'products';

    protected $primaryKey = 'product_id';

    public $timestamps = false;

    public $fillable = [
        'name',
        'description',
        'price',
        'added_date',
        'country_of_origin',
        'category_id',
        'owner_id',
        'image_url'
    ];

    protected $casts = [
        'name' => 'string',
        'description' => 'string',
        'price' => 'decimal:2',
        'added_date' => 'date',
        'country_of_origin' => 'string',
        'image_url' => 'string'
    ];

    public static array $rules = [
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:65535',
        'price' => 'required|numeric',
        'added_date' => 'required',
        'country_of_origin' => 'required|string|max:255',
        'category_id' => 'required',
        'owner_id' => 'required',
        'image_url' => 'required|string|max:255'
    ];

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\Category::class, 'category_id');
    }

    public function owner(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'owner_id');
    }

    public function user1s(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(\App\Models\User::class, 'comments');
    }

    public function orders(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Order::class, 'order_items');
    }
}
