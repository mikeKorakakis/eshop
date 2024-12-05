<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Http\Resources\OrderItemResource;
use App\Interfaces\IOrderRepository;
use App\Interfaces\IOrderItemRepository;
use App\Classes\ApiResponseClass;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    private IOrderRepository $orderRepository;
    private IOrderItemRepository $orderItemRepository;

    public function __construct(IOrderRepository $orderRepository, IOrderItemRepository $orderItemRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->orderItemRepository = $orderItemRepository;
    }
    public function index()
    {
        $data = $this->orderRepository->index();
        return ApiResponseClass::sendResponse(OrderResource::collection($data), "", ApiResponseClass::HTTP_OK);
    }
    public function create()
    {
    }
    public function store(OrderRequest $request)
    {
        $details = [
            'user_id' => $request->user_id,
            'order_date' => $request->order_date,
            'total_amount' => $request->total_amount,
            'order_status' => $request->order_status
        ];
        DB::beginTransaction();

        try {
            $order = $this->orderRepository->store($details);
            DB::commit();
            return ApiResponseClass::sendResponse(new OrderResource($order), 'Order Created', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }
    public function show($order_id)
    {
        $order = $this->orderRepository->getById($order_id);
        return ApiResponseClass::sendResponse(new OrderResource($order), '', ApiResponseClass::HTTP_OK);
    }
    public function edit(Order $order)
    {

    }
    public function update(OrderRequest $request, $order_id)
    {
        $updateDetails = [
            'user_id' => $request->user_id,
            'order_date' => $request->order_date,
            'total_amount' => $request->total_amount,
            'order_status' => $request->order_status
        ];
        DB::beginTransaction();
        try {
            $order = $this->orderRepository->update($updateDetails, $order_id);
            DB::commit();
            return ApiResponseClass::sendResponse('Order updated', '', ApiResponseClass::HTTP_NO_CONTENT);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }
    public function destroy($order_id)
    {
        $this->orderRepository->delete($order_id);
        return ApiResponseClass::sendResponse('Deleted', '', ApiResponseClass::HTTP_NO_CONTENT);
    }
    public function getItemsOfOrder($order_id)
    {
        $orderItems = $this->orderItemRepository->getProducts($order_id);  //$this->orderRepository->getItems($order_id);
        if (count($orderItems) == 0) {
            return ApiResponseClass::error('Error', 'Not Found', ApiResponseClass::HTTP_NOT_FOUND);
        }
        return ApiResponseClass::sendResponse(OrderItemResource::collection($orderItems), '', ApiResponseClass::HTTP_OK);
    }
    public function updateCost(Request $request)
    {
        $request->validate([
            'order_id' => 'required',
        ]);
        $order_id = $request->input('order_id');
        $order = $this->orderRepository->getById($order_id);

        $orderItems = $this->orderItemRepository->getProducts($order_id);
        if (count($orderItems) == 0) {
            return ApiResponseClass::error('Error', 'Not Found', ApiResponseClass::HTTP_NOT_FOUND);
        }
        try {
            $sum = 0;
            foreach ($orderItems as $orderItem) {
                $price = $orderItem->price_at_purchase;
                $quantity = $orderItem->quantity;
                $sum += (double) $price * $quantity;
            }
            $order->total_amount = $sum;
            $order->save();
            return ApiResponseClass::sendResponse(new OrderResource($order), 'Order price updated', ApiResponseClass::HTTP_OK);
        } catch (\Exception $ex) {
            ApiResponseClass::error('Not found', 'Order not found', ApiResponseClass::HTTP_NOT_FOUND);
        }

    }
}
