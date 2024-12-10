<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="Comment",
 *      required={},
 *      @OA\Property(
 *          property="content",
 *          description="Comment text",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
  *	  @OA\Property(
 *          property="comment_id",
 * 		description="Comment id",
 * 		readOnly=true,
 * 		nullable=false,
 * 		type="integer",
 * 	),
 * 	@OA\Property(
 * 		property="product_id",
 * 		description="Product id",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="integer",
 * 	),
 * 	@OA\Property(
 * 		property="user_id",
 * 		description="User id",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="integer",

 * 	),

 *      @OA\Property(
 *          property="created_date",
 *          description="Date comment was created",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *          format="date-time"
 *      )
 * )
 */class Comment extends Model
{
    public $table = 'comments';

    protected $primaryKey = 'comment_id';

    public $timestamps = false;

    public $fillable = [
        'content',
        'created_date',
        'product_id',
        'user_id'
    ];

    protected $casts = [
        'content' => 'string',
        'created_date' => 'datetime'
    ];

    public static array $rules = [
        'content' => 'required|string|max:65535',
        'created_date' => 'required',
        'product_id' => 'required',
        'user_id' => 'required'
    ];

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\Product::class, 'product_id');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }
}
