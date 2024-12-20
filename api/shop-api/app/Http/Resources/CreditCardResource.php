<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreditCardResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'credit_card_id' => $this->credit_card_id,
            'user_id' => $this->user_id,
            'card_number' => $this->card_number,
            'cardholder_name' => $this->cardholder_name,
            'expiration_date' => $this->expiration_date,
            'cvv' => $this->cvv,
            'balance' => $this->balance
        ];
    }
}
