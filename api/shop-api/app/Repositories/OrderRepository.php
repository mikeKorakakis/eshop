<?php

namespace App\Repositories;

use App\Models\Order;
use App\Interfaces\IOrderRepository;

class OrderRepository implements IOrderRepository
{
    public function index()
    {
        return Order::all();
    }
    public function getById($id)
    {
        return Order::findOrFail($id);
    }
    public function store(array $data)
    {
        return Order::create($data);
    }
    public function update(array $data, $id): bool
    {
        return Order::where("order_id", $id)->update($data);
    }
    public function delete($id)
    {
        return Order::destroy($id);
    }
	public function getByUserId($id)
	{
		return Order::where('user_id', $id)->with(['items.product'])->get();
	}
}