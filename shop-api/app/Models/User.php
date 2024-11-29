<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="User",
 *      required={"username","password","email","full_name","group_id","trust_status","registration_status","registration_date","avatar_url"},
 *      @OA\Property(
 *          property="user_id",
 *          description="Primary key: Unique identifier for the user",
 *          readOnly=true,
 *          nullable=false,
 *          type="integer",
 *      ),
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
 *          property="registration_status",
 *          description="Registration approval status",
 *          readOnly=false,
 *          nullable=false,
 *          type="boolean",
 *      ),
 *      @OA\Property(
 *          property="registration_date",
 *          description="Date of registration",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *          format="date"
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

    protected $casts = [
        'username' => 'string',
        'password' => 'string',
        'email' => 'string',
        'full_name' => 'string',
        'registration_status' => 'boolean',
        'registration_date' => 'date',
        'avatar_url' => 'string'
    ];

    public static array $rules = [
        'username' => 'required|string|max:255',
        'password' => 'required|string|max:255',
        'email' => 'required|string|max:255',
        'full_name' => 'required|string|max:255',
        'group_id' => 'required',
        'trust_status' => 'required',
        'registration_status' => 'required|boolean',
        'registration_date' => 'required',
        'avatar_url' => 'required|string|max:255'
    ];

    public function orders(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(\App\Models\Order::class, 'user_id');
    }

    public function items(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Item::class, 'comments');
    }

    public function categories(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Category::class, 'items');
    }

    public function creditCards(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(\App\Models\CreditCard::class, 'user_id');
    }
}
