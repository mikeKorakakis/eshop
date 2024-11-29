<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'parent_id' => $this->parent_id,
            'ordering' => $this->ordering,
            'is_visible' => $this->is_visible,
            'allow_comments' => $this->allow_comments,
            'allow_ads' => $this->allow_ads,
        ];
    }
}
