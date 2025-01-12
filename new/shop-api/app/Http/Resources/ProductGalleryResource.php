<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductGalleryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'gallery_id' => $this->gallery_id,
            'media_id' => $this->media_id,
            'name' => $this->name,
            'product_id' => $this->product_id,
            'size' => $this->size
        ];
    }
}
