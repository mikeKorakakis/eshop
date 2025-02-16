<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'order_item_id' => $this->order_item_id,
            'order_id' => $this->order_id,
            'product_id' => $this->product_id,
            'quantity' => $this->quantity,
            'price_at_purchase' => $this->price_at_purchase,
			'product' => new ProductResource($this->product) // Include product
        ];
    }
}
