<?php

namespace App\Repositories;

use App\Models\OrderItem;
use App\Repositories\BaseRepository;

class OrderItemRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'order_id',
        'item_id',
        'quantity',
        'price_at_purchase'
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return OrderItem::class;
    }
}
