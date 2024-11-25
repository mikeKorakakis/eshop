<?php

namespace App\Models;

use Eloquent as Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class Item
 * @package App\Models
 * @version November 25, 2024, 6:09 pm UTC
 *
 * @property \App\Models\Category $category
 * @property \App\Models\User $owner
 * @property \Illuminate\Database\Eloquent\Collection $user1s
 * @property \Illuminate\Database\Eloquent\Collection $orders
 * @property string $name
 * @property string $description
 * @property number $price
 * @property string $added_date
 * @property string $country_of_origin
 * @property string $status
 * @property integer $rating
 * @property boolean $is_approved
 * @property integer $category_id
 * @property integer $owner_id
 * @property string $image_url
 * @property string $contact_info
 */
class Item extends Model
{

    use HasFactory;

    public $table = 'items';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';




    public $fillable = [
        'name',
        'description',
        'price',
        'added_date',
        'country_of_origin',
        'status',
        'rating',
        'is_approved',
        'category_id',
        'owner_id',
        'image_url',
        'contact_info'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'item_id' => 'integer',
        'name' => 'string',
        'description' => 'string',
        'price' => 'decimal:2',
        'added_date' => 'date',
        'country_of_origin' => 'string',
        'status' => 'string',
        'rating' => 'integer',
        'is_approved' => 'boolean',
        'category_id' => 'integer',
        'owner_id' => 'integer',
        'image_url' => 'string',
        'contact_info' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'added_date' => 'required',
        'country_of_origin' => 'required|string|max:255',
        'status' => 'required|string|max:50',
        'rating' => 'required',
        'is_approved' => 'required|boolean',
        'category_id' => 'required|integer',
        'owner_id' => 'required|integer',
        'image_url' => 'required|string|max:255',
        'contact_info' => 'required|string|max:255'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function category()
    {
        return $this->belongsTo(\App\Models\Category::class, 'category_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function owner()
    {
        return $this->belongsTo(\App\Models\User::class, 'owner_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     **/
    public function user1s()
    {
        return $this->belongsToMany(\App\Models\User::class, 'comments');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     **/
    public function orders()
    {
        return $this->belongsToMany(\App\Models\Order::class, 'order_items');
    }
}
