<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="Order",
 *      required={},
 *	  @OA\Property(
 * 		property="order_id",
 * 
 * 		description="Order id",
 * 		readOnly=true,
 * 		nullable=false,
 * 		type="integer",
 * 	),
 * 	@OA\Property(
 * 		property="user_id",
 * 		description="User id",
 * 
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="integer",
 * 	),

 *      @OA\Property(
 *          property="order_date",
 *          description="Date and time the order was placed",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *          format="date-time"
 *      ),
 *      @OA\Property(
 *          property="total_amount",
 *          description="Total amount for the order",
 *          readOnly=false,
 *          nullable=false,
 *          type="number",
 *          format="number"
 *      ),
 *      @OA\Property(
 *          property="order_status",
 *          description="Order status",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      )
 * )
 */class Order extends Model
{
    public $table = 'orders';

    protected $primaryKey = 'order_id';

    public $timestamps = false;

    public $fillable = [
        'user_id',
        'order_date',
        'total_amount',
        'order_status'
    ];

    protected $casts = [
        'order_date' => 'datetime',
        'total_amount' => 'decimal:2',
        'order_status' => 'string'
    ];

    public static array $rules = [
        'user_id' => 'required',
        'order_date' => 'required',
        'total_amount' => 'required|numeric',
        'order_status' => 'required|string|max:50'
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Product::class, 'order_items');
    }
}
