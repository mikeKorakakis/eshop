<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShippingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "shipping_id" => $this->shipping_id,
            'address' => $this->address,
			'city' => $this->city,
			'postal_code' => $this->postal_code,
            'shipping_method_id' => $this->shipping_method_id,
			'method' => new ShippingMethodResource($this->method)
        ];
    }
}
