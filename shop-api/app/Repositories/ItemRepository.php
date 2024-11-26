<?php

namespace App\Repositories;

use App\Models\Item;
use App\Repositories\BaseRepository;

class ItemRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'name',
        'description',
        'price',
        'added_date',
        'country_of_origin',
        'status',
        'rating',
        'is_approved',
        'category_id',
        'owner_id',
        'image_url',
        'contact_info'
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return Item::class;
    }
}
