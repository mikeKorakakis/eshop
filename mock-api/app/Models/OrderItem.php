<?php

namespace App\Models;

use Eloquent as Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class OrderItem
 * @package App\Models
 * @version November 25, 2024, 6:09 pm UTC
 *
 * @property \App\Models\Order $order
 * @property \App\Models\Item $item
 * @property integer $order_id
 * @property integer $item_id
 * @property integer $quantity
 * @property number $price_at_purchase
 */
class OrderItem extends Model
{

    use HasFactory;

    public $table = 'order_items';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';




    public $fillable = [
        'order_id',
        'item_id',
        'quantity',
        'price_at_purchase'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'order_item_id' => 'integer',
        'order_id' => 'integer',
        'item_id' => 'integer',
        'quantity' => 'integer',
        'price_at_purchase' => 'decimal:2'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'order_id' => 'required|integer',
        'item_id' => 'required|integer',
        'quantity' => 'required|integer',
        'price_at_purchase' => 'required|numeric'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function order()
    {
        return $this->belongsTo(\App\Models\Order::class, 'order_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function item()
    {
        return $this->belongsTo(\App\Models\Item::class, 'item_id');
    }
}
