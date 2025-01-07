<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'order_id' => $this->order_id,
            'user_id' => $this->user_id,
            'order_date' => $this->order_date,
            'total_amount' => $this->total_amount,
            'order_status' => $this->order_status,
			'items' => OrderItemResource::collection($this->items) // Include items
        ];
    }
}