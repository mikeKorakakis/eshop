<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingMethod extends Model
{
    use HasFactory;

    protected $table = 'shipping_methods';
    protected $primaryKey = 'shipping_method_id';
    public $timestamps = false;

    protected $fillable = [
        'method_name',
        'cost',
    ];
}
