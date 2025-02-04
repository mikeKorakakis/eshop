<?php

namespace App\Http\Requests;

use App\Models\CreditCard;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
class CreditCardRequest extends FormRequest
{
       public function authorize(): bool
    {
        return true;
    }

    public function rules():array
    {
        return CreditCard::$rules;
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
