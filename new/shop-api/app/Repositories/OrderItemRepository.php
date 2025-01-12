<?php

namespace App\Repositories;

use App\Models\OrderItem;
use App\Interfaces\IOrderItemRepository;

class OrderItemRepository implements IOrderItemRepository
{
    public function index()
    {
        return OrderItem::all();
    }
    public function getById($id)
    {
        return OrderItem::findOrFail($id);
    }
    public function store(array $data)
    {
        return OrderItem::create($data);
    }
    public function update(array $data, $id): bool
    {
        return OrderItem::where("order_item_id", $id)->update($data);
    }
    public function delete($id)
    {
        return OrderItem::destroy($id);
    }
    public function getProducts($order_id)
    {
        return OrderItem::where('order_id', $order_id)->get();
    }
}