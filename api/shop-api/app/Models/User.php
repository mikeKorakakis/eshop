<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable implements JWTSubject//Model
{
    public $table = "users";

    protected $primaryKey = "user_id";

    public $timestamps = false;
    public $fillable = [
        'username',
        'password',
        'email',
        'full_name',
        'group_id',
        'registration_date',
        'avatar_url',
        'media_id'
    ];

    protected $casts = [
        'username' => 'string',
        'password' => 'string',
        'email' => 'string',
        'full_name' => 'string',
        'registration_date' => 'date',
        'avatar_url' => 'string',
        'media_id' => 'integer'
    ];

    public static array $rules = [
        'username' => 'required|string|max:255',
        'password' => 'nullable|string|max:255',
        'email' => 'required|string|max:255',
        'full_name' => 'required|string|max:255',
        'group_id' => 'required',
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
        $this->attributes['password'] = Hash::make($value, [
			'rounds' => 10
		]);
    }

	public function media()
    {
        return $this->belongsTo(Media::class, 'media_id');
    }
}
