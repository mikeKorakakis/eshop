<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public $table = 'orders';
    protected $primaryKey = 'order_id';
    public $timestamps = false;

    public $fillable = [
        'user_id',
        'order_date',
        'total_amount',
        'order_status',
		'shipping_id',
    ];
    protected $casts = [
        'order_date' => 'datetime',
        'total_amount' => 'decimal:2',
        'order_status' => 'string',
		'shipping_id' => 'integer',
    ];
    public static array $rules = [
        'user_id' => 'required',
        'order_date' => 'required',
        'total_amount' => 'required|numeric',
        'order_status' => 'required|string|max:50',
		'shipping_id' => 'required|integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

	public function shipping()
	{
		return $this->belongsTo(Shipping::class, 'shipping_id');
	}

	public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }
}
