<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="Comment",
 *      required={"content","created_date","product_id","user_id"},
 *      @OA\Property(
 *          property="content",
 *          description="Comment text",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 * 	@OA\Property(
 * 		property="comment_id",
 * 		description="Comment ID",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="number",
 * 	),
 * 	@OA\Property(
 * 		property="product_id",
 * 		description="Product ID",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="number",
 * 	),
 * 	@OA\Property(
 * 		property="user_id",
 * 		description="User ID",
 * 	
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="number",
 * 	),
 *      @OA\Property(
 *          property="created_date",
 *          description="Date comment was created",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *          format="date"
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
        'created_date' => 'date'
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
