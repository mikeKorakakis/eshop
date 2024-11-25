<?php

namespace App\Repositories;

use App\Models\CreditCard;
use App\Repositories\BaseRepository;

/**
 * Class CreditCardRepository
 * @package App\Repositories
 * @version November 25, 2024, 6:09 pm UTC
*/

class CreditCardRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'user_id',
        'card_number',
        'cardholder_name',
        'expiration_date',
        'cvv',
        'balance'
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return CreditCard::class;
    }
}
