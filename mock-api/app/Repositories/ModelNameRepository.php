<?php

namespace App\Repositories;

use App\Models\ModelName;
use App\Repositories\BaseRepository;

/**
 * Class ModelNameRepository
 * @package App\Repositories
 * @version November 25, 2024, 12:23 pm UTC
*/

class ModelNameRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'description',
        'parent_id',
        'ordering',
        'is_visible',
        'allow_comments',
        'allow_ads'
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
        return ModelName::class;
    }
}
