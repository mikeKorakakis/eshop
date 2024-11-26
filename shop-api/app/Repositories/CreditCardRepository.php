<?php

namespace App\Repositories;

use App\Models\CreditCard;
use App\Repositories\BaseRepository;

class CreditCardRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'user_id',
        'card_number',
        'cardholder_name',
        'expiration_date',
        'cvv',
        'balance'
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return CreditCard::class;
    }
}
