<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public $table = 'orders';
    protected $primaryKey = 'order_id';

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
}
