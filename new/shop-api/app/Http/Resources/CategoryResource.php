<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "category_id" => $this->category_id,
            'name' => $this->name,
            'description' => $this->description,
            'parent_id' => $this->parent_id,
            'ordering' => $this->ordering,

            'media_id' => $this->media_id,
			'media' => new MediaResource($this->media)
        ];
    }
}
