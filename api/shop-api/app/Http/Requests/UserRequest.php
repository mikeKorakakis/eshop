<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
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
    }
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors()
        ]));
    }
}