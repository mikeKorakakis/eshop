<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="User",
 *      required={},
 *    @OA\Property(
 * 	  property="user_id",
 * 	  description="User id",
 * 	  readOnly=true,
 * 	  nullable=false,
 * 	  type="integer",
 * 	),
 * 	@OA\Property(
 * 		property="group_id",
 * 		description="Group id",
 * 		readOnly=false,
 * 		nullable=false,
 * 		type="integer",
 * 	),
 *      @OA\Property(
 *          property="username",
 *          description="Username for login",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="password",
 *          description="Hashed password",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="email",
 *          description="User email",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="full_name",
 *          description="Full name of user",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="registration_date",
 *          description="Date of registration",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *          format="date-time"
 *      ),
 *      @OA\Property(
 *          property="avatar_url",
 *          description="URL to avatar image",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      )
 * )
 */class User extends Model
{
    public $table = 'users';

    protected $primaryKey = 'user_id';

    public $timestamps = false;

    public $fillable = [
        'username',
        'password',
        'email',
        'full_name',
        'group_id',
        'registration_date',
        'avatar_url'
    ];

    protected $casts = [
        'username' => 'string',
        'password' => 'string',
        'email' => 'string',
        'full_name' => 'string',
        'registration_date' => 'datetime',
        'avatar_url' => 'string'
    ];

    public static array $rules = [
        'username' => 'required|string|max:255',
        'password' => 'required|string|max:255',
        'email' => 'required|string|max:255',
        'full_name' => 'required|string|max:255',
        'group_id' => 'required',
        'registration_date' => 'required',
        'avatar_url' => 'required|string|max:255'
    ];

    public function categories(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Category::class, 'products');
    }

    public function orders(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(\App\Models\Order::class, 'user_id');
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Product::class, 'comments');
    }

    public function creditCards(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(\App\Models\CreditCard::class, 'user_id');
    }
}
