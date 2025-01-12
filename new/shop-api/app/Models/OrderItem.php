<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
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

	public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
