<?php

namespace App\Repositories;

use App\Models\Order;
use App\Repositories\BaseRepository;

class OrderRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'user_id',
        'order_date',
        'total_amount',
        'order_status'
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return Order::class;
    }
}
