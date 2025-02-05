<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    protected $table = 'shipping'; // if not using the plural "shippings"

    protected $primaryKey = 'shipping_id';

    public $timestamps = false; // if you don’t have created_at / updated_at in shipping

    protected $fillable = [
        'shipping_method_id',
        'address',
        'city',
        'postal_code',
    ];

    // relationships
    public function method()
    {
        return $this->belongsTo(ShippingMethod::class, 'shipping_method_id', 'shipping_method_id');
    }
}
