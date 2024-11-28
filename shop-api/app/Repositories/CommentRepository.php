<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Repositories\BaseRepository;

class CommentRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'content',
        'status',
        'created_date',
        'item_id',
        'user_id'
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return Comment::class;
    }
}
