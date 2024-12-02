<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="Comment",
 *      required={"content","status","created_date","item_id","user_id"},
 *      @OA\Property(
 *          property="content",
 *          description="Comment text",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="status",
 *          description="Approval status of comment",
 *          readOnly=false,
 *          nullable=false,
 *          type="boolean",
 *      ),
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
        'status',
        'created_date',
        'item_id',
        'user_id'
    ];

    protected $casts = [
        'content' => 'string',
        'status' => 'boolean',
        'created_date' => 'date'
    ];

    public static array $rules = [
        'content' => 'required|string|max:65535',
        'status' => 'required|boolean',
        'created_date' => 'required',
        'item_id' => 'required',
        'user_id' => 'required'
    ];

    public function item(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\Item::class, 'item_id');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }
}
