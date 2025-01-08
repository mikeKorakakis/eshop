<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "product_id" => $this->product_id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'added_date' => $this->added_date,
            'country_of_origin' => $this->country_of_origin,
            'status' => $this->status,
            'rating' => $this->rating,
            'is_approved' => $this->is_approved,
            'category_id' => $this->category_id,
            'owner_id' => $this->owner_id,
            'media_id' => $this->media_id,
			'category' => new CategoryResource($this->category)
        ];
    }
}