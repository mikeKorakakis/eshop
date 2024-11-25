<?php

namespace App\Models;

use Eloquent as Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class User
 * @package App\Models
 * @version November 25, 2024, 6:09 pm UTC
 *
 * @property \Illuminate\Database\Eloquent\Collection $items
 * @property \Illuminate\Database\Eloquent\Collection $creditCards
 * @property \Illuminate\Database\Eloquent\Collection $categories
 * @property \Illuminate\Database\Eloquent\Collection $orders
 * @property string $username
 * @property string $password
 * @property string $email
 * @property string $full_name
 * @property integer $group_id
 * @property integer $trust_status
 * @property boolean $registration_status
 * @property string $registration_date
 * @property string $avatar_url
 */
class User extends Model
{

    use HasFactory;

    public $table = 'users';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';




    public $fillable = [
        'username',
        'password',
        'email',
        'full_name',
        'group_id',
        'trust_status',
        'registration_status',
        'registration_date',
        'avatar_url'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'integer',
        'username' => 'string',
        'password' => 'string',
        'email' => 'string',
        'full_name' => 'string',
        'group_id' => 'integer',
        'trust_status' => 'integer',
        'registration_status' => 'boolean',
        'registration_date' => 'date',
        'avatar_url' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'username' => 'required|string|max:255',
        'password' => 'required|string|max:255',
        'email' => 'required|string|max:255',
        'full_name' => 'required|string|max:255',
        'group_id' => 'required|integer',
        'trust_status' => 'required|integer',
        'registration_status' => 'required|boolean',
        'registration_date' => 'required',
        'avatar_url' => 'required|string|max:255'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     **/
    public function items()
    {
        return $this->belongsToMany(\App\Models\Item::class, 'comments');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function creditCards()
    {
        return $this->hasMany(\App\Models\CreditCard::class, 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     **/
    public function categories()
    {
        return $this->belongsToMany(\App\Models\Category::class, 'items');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function orders()
    {
        return $this->hasMany(\App\Models\Order::class, 'user_id');
    }
}
