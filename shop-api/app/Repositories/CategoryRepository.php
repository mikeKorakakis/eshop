<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\BaseRepository;

class CategoryRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'name',
        'description',
        'parent_id',
        'ordering',
        'is_visible',
        'allow_comments',
        'allow_ads'
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return Category::class;
    }
}
