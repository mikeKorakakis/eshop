<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:65535',
            'price' => 'required|numeric',
            'added_date' => 'required',
            'country_of_origin' => 'required|string|max:255',
            'status' => 'required|string|max:50',
            'rating' => 'required',
            'is_approved' => 'required|boolean',
            'category_id' => 'required',
            'owner_id' => 'required',
            'image_url' => 'required|string|max:255',
            'contact_info' => 'required|string|max:255',
            'media_id' => 'nullable|integer'
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