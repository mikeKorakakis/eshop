<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShippingMethodResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "shipping_method_id" => $this->shipping_method_id,
            'method_name' => $this->method_name,
			'cost' => $this->cost,
			
        ];
    }
}
