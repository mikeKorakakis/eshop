<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="Category",
 *      required={},
 *      @OA\Property(
 *          property="name",
 *          description="Category name",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 * 	@OA\Property(
 * 		property="parent_id",
 * 		description="Parent category id",
 * 		readOnly=false,
 * 		nullable=true,
 * 		type="integer",
 * 	),
 * 	@OA\Property(
 * 		property="ordering",
 * 		description="Category ordering",
 * 		readOnly=false,
 * 		nullable=true,
 * 		type="integer",
 * 	),
 * 	@OA\Property(
 * 		property="category_id",
 * 		description="Category id",
 * 		readOnly=true,
 * 		nullable=false,
 * 		type="integer",
 * 	),
 *      @OA\Property(
 *          property="description",
 *          description="Category description",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      )
 * )
 */ class Category extends Model
{
	public $table = 'categories';

	protected $primaryKey = 'category_id';

	public $timestamps = false;

	public $fillable = [
		'name',
		'description',
		'parent_id',
		'ordering'
	];

	protected $casts = [
		'name' => 'string',
		'description' => 'string'
	];

	public static array $rules = [
		'name' => 'required|string|max:255',
		'description' => 'required|string|max:65535',
		'parent_id' => 'nullable',
		'ordering' => 'nullable'
	];

	public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
	{
		return $this->belongsToMany(\App\Models\User::class, 'products');
	}
}
