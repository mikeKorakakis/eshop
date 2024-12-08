<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="CreditCard",
 *      required={"user_id","card_number","cardholder_name","expiration_date","cvv","balance"},
 *      @OA\Property(
 *          property="card_number",
 *          description="16-digit card number",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 * 	@OA\Property(
 * 		property="credit_card_id",
 * 		description="Credit card ID",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="number",
 * 	),
 * 	@OA\Property(
 * 		property="user_id",
 * 		description="User ID",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="number",
 * 	),
 
 *      @OA\Property(
 *          property="cardholder_name",
 *          description="Name on the card",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="expiration_date",
 *          description="Expiration date of card",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *          format="date"
 *      ),
 *      @OA\Property(
 *          property="cvv",
 *          description="3-digit CVV",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="balance",
 *          description="Available balance",
 *          readOnly=false,
 *          nullable=false,
 *          type="number",
 *          format="number"
 *      )
 * )
 */class CreditCard extends Model
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

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }
}
