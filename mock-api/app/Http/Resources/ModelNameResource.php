<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ModelNameResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'category_id' => $this->category_id,
            'name' => $this->name,
            'description' => $this->description,
            'parent_id' => $this->parent_id,
            'ordering' => $this->ordering,
            'is_visible' => $this->is_visible,
            'allow_comments' => $this->allow_comments,
            'allow_ads' => $this->allow_ads
        ];
    }
}
