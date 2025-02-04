<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
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
}
