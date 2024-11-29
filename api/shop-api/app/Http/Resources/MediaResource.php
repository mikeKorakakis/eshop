<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'media_id' => $this->media_id,
            'name' => $this->name,
            'path' => $this->path,
            'size' => $this->size
        ];
    }
}
