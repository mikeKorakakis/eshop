<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CreditCard extends Model
{
    public $table = 'credit_cards';

    protected $primaryKey = 'credit_card_id';

    public $timestamps = false;

    public $fillable = [
        'user_id',
        'card_number',
        'cardholder_name',
        'expiration_date',
        'cvv',
        'balance'
    ];

    protected $casts = [
        'card_number' => 'string',
        'cardholder_name' => 'string',
        'expiration_date' => 'date',
        'cvv' => 'string',
        'balance' => 'decimal:2'
    ];

    public static array $rules = [
        'user_id' => 'required',
        'card_number' => 'required|string|max:16',
        'cardholder_name' => 'required|string|max:255',
        'expiration_date' => 'required',
        'cvv' => 'required|string|max:3',
        'balance' => 'required|numeric'
    ];
}
