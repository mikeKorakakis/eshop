<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="OrderItem",
 *      required={"order_id","item_id","quantity","price_at_purchase"},
 *      @OA\Property(
 *          property="price_at_purchase",
 *          description="Price at the time of purchase",
 *          readOnly=false,
 *          nullable=false,
 *          type="number",
 *          format="number"
 *      ),
 *      @OA\Property(
 *          property="item_id",
 *          description="id of the item",
 *          readOnly=false,
 *          nullable=false,
 *          type="number",
 *          format="number"
 *      ),
 *      @OA\Property(
 *          property="quantity",
 *          description="quantity of the item",
 *          readOnly=false,
 *          nullable=false,
 *          type="number",
 *          format="number"
 *      )
 * )
 */ class OrderItem extends Model
{
	public $table = 'order_items';

	protected $primaryKey = 'order_item_id';

	public $timestamps = false;

	public $fillable = [
		'order_id',
		'item_id',
		'quantity',
		'price_at_purchase'
	];

	protected $casts = [
		'price_at_purchase' => 'decimal:2'
	];

	public static array $rules = [
		'order_id' => 'required',
		'item_id' => 'required',
		'quantity' => 'required',
		'price_at_purchase' => 'required|numeric'
	];

	public function order(): \Illuminate\Database\Eloquent\Relations\BelongsTo
	{
		return $this->belongsTo(\App\Models\Order::class, 'order_id');
	}

	public function item(): \Illuminate\Database\Eloquent\Relations\BelongsTo
	{
		return $this->belongsTo(\App\Models\Item::class, 'item_id');
	}
}
