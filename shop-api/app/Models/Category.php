<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="Category",
 *      required={"name","description","is_visible","allow_comments","allow_ads"},
 *      @OA\Property(
 *          property="name",
 *          description="Category name",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="description",
 *          description="Category description",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="is_visible",
 *          description="Visibility status",
 *          readOnly=false,
 *          nullable=false,
 *          type="boolean",
 *      ),
 *      @OA\Property(
 *          property="allow_comments",
 *          description="Allow comments in category",
 *          readOnly=false,
 *          nullable=false,
 *          type="boolean",
 *      ),
 *      @OA\Property(
 *          property="allow_ads",
 *          description="Allow ads in category",
 *          readOnly=false,
 *          nullable=false,
 *          type="boolean",
 *      )
 * )
 */class Category extends Model
{
    public $table = 'categories';

    public $fillable = [
        'name',
        'description',
        'parent_id',
        'ordering',
        'is_visible',
        'allow_comments',
        'allow_ads'
    ];

    protected $casts = [
        'name' => 'string',
        'description' => 'string',
        'is_visible' => 'boolean',
        'allow_comments' => 'boolean',
        'allow_ads' => 'boolean'
    ];

    public static array $rules = [
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:65535',
        'parent_id' => 'nullable',
        'ordering' => 'nullable',
        'is_visible' => 'required|boolean',
        'allow_comments' => 'required|boolean',
        'allow_ads' => 'required|boolean'
    ];

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(\App\Models\User::class, 'items');
    }
}
