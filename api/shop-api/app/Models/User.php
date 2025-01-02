<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject//Model
{
    public $table = "users";

    protected $primaryKey = "user_id";

    public $fillable = [
        'username',
        'password',
        'email',
        'full_name',
        'group_id',
        'trust_status',
        'registration_status',
        'registration_date',
        'avatar_url',
        'media_id'
    ];

    protected $casts = [
        'username' => 'string',
        'password' => 'string',
        'email' => 'string',
        'full_name' => 'string',
        'registration_status' => 'boolean',
        'registration_date' => 'date',
        'avatar_url' => 'string',
        'media_id' => 'integer'
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
        'avatar_url' => 'required|string|max:255',
        'media_id' => 'nullable|integer'
    ];

    protected $hidden = ['password'];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
}
