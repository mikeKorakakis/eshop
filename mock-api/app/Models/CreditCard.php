<?php

namespace App\Models;

use Eloquent as Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class CreditCard
 * @package App\Models
 * @version November 25, 2024, 6:09 pm UTC
 *
 * @property \App\Models\User $user
 * @property integer $user_id
 * @property string $card_number
 * @property string $cardholder_name
 * @property string $expiration_date
 * @property string $cvv
 * @property number $balance
 */
class CreditCard extends Model
{

    use HasFactory;

    public $table = 'credit_cards';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';




    public $fillable = [
        'user_id',
        'card_number',
        'cardholder_name',
        'expiration_date',
        'cvv',
        'balance'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'credit_card_id' => 'integer',
        'user_id' => 'integer',
        'card_number' => 'string',
        'cardholder_name' => 'string',
        'expiration_date' => 'date',
        'cvv' => 'string',
        'balance' => 'decimal:2'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'user_id' => 'required|integer',
        'card_number' => 'required|string|max:16',
        'cardholder_name' => 'required|string|max:255',
        'expiration_date' => 'required',
        'cvv' => 'required|string|max:3',
        'balance' => 'required|numeric'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }
}
