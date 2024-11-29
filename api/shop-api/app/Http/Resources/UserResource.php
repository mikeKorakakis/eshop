<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "user_id" => $this->user_id,
            'username' => $this->username,
            'password' => $this->password,
            'email' => $this->email,
            'full_name' => $this->full_name,
            'group_id' => $this->group_id,
            'trust_status' => $this->trust_status,
            'registration_status' => $this->registration_status,
            'registration_date' => $this->registration_date,
            'avatar_url' => $this->avatar_url,
        ];
    }
}
