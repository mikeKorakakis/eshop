<?php

namespace App\Models;

use Eloquent as Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class Category
 * @package App\Models
 * @version November 25, 2024, 6:09 pm UTC
 *
 * @property \Illuminate\Database\Eloquent\Collection $users
 * @property string $name
 * @property string $description
 * @property integer $parent_id
 * @property integer $ordering
 * @property boolean $is_visible
 * @property boolean $allow_comments
 * @property boolean $allow_ads
 */
class Category extends Model
{

    use HasFactory;

    public $table = 'categories';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';




    public $fillable = [
        'name',
        'description',
        'parent_id',
        'ordering',
        'is_visible',
        'allow_comments',
        'allow_ads'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'category_id' => 'integer',
        'name' => 'string',
        'description' => 'string',
        'parent_id' => 'integer',
        'ordering' => 'integer',
        'is_visible' => 'boolean',
        'allow_comments' => 'boolean',
        'allow_ads' => 'boolean'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'parent_id' => 'nullable|integer',
        'ordering' => 'nullable|integer',
        'is_visible' => 'required|boolean',
        'allow_comments' => 'required|boolean',
        'allow_ads' => 'required|boolean'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     **/
    public function users()
    {
        return $this->belongsToMany(\App\Models\User::class, 'items');
    }
}
