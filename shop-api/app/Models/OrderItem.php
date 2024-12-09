<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="OrderItem",
 *      required={},
 *      @OA\Property(
 *          property="price_at_purchase",
 *          description="Price at the time of purchase",
 *          readOnly=false,
 *          nullable=false,
 *          type="number",
 *          format="number"
 *      ),
 *    @OA\Property(
 * 		property="order_item_id",
 * 		description="Order item id",
 * 		readOnly=true,
 * 		nullable=false,
 * 		type="integer",
 * 	),
 * 	@OA\Property(
 * 		property="order_id",
 * 		description="Order id",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="integer",
 * 	),
 * 	@OA\Property(
 * 		property="product_id",
 * 		description="Product id",
 * 		readOnly=false,
 * 
 * 		nullable=false,
 * 		type="integer",
 * 	),
 * 	@OA\Property(
 * 		property="quantity",
 * 		description="Quantity of product",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="integer",
 * 	),
 * )
 */class OrderItem extends Model
{
    public $table = 'order_items';

    protected $primaryKey = 'order_item_id';

    public $timestamps = false;

    public $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price_at_purchase'
    ];

    protected $casts = [
        'price_at_purchase' => 'decimal:2'
    ];

    public static array $rules = [
        'order_id' => 'required',
        'product_id' => 'required',
        'quantity' => 'required',
        'price_at_purchase' => 'required|numeric'
    ];

    public function order(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\Order::class, 'order_id');
    }

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\Product::class, 'product_id');
    }
}
