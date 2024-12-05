<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
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
            'image_url' => $this->image_url,
            'contact_info' => $this->contact_info,
            'media_id' => $this->media_id
        ];
    }
}