<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    public $table = 'media';
    protected $primaryKey = 'media_id';
    public $timestamps = false;
    public $fillable = [
        'name',
        'path',
        'size'
    ];
    protected $casts = [
        'name' => 'string',
        'path' => 'string',
        'size' => 'integer',
    ];
    public static array $rules = [
        'name' => 'nullable',
        'path' => 'nullable',
        'size' => 'nullable'
    ];

	
}
