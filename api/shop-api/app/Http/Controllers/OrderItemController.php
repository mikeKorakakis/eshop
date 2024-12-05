<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\OrderItemRequest;
use App\Http\Resources\OrderItemResource;
use App\Interfaces\IOrderItemRepository;
use Illuminate\Support\Facades\DB;
use App\Models\OrderItem;

class OrderItemController extends Controller
{
    private IOrderItemRepository $orderItemRepository;

    public function __construct(IOrderItemRepository $orderItemRepository)
    {
        $this->orderItemRepository = $orderItemRepository;
    }
    public function index()
    {
        $data = $this->orderItemRepository->index();
        return ApiResponseClass::sendResponse(OrderItemResource::collection($data), '', ApiResponseClass::HTTP_OK);
    }
    public function create()
    {

    }
    public function store(OrderItemRequest $request)
    {
        $details = [
            'order_id' => $request->order_id,
            'item_id' => $request->item_id,
            'quantity' => $request->quantity,
            'price_at_purchase' => $request->price_at_purchase,
        ];
        DB::beginTransaction();

        try {
            $orderItem = $this->orderItemRepository->store($details);
            DB::commit();
            return ApiResponseClass::sendResponse(new OrderItemResource($orderItem), 'Order item created', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    public function show($order_item_id)
    {
        $orderItem = $this->orderItemRepository->getById($order_item_id);
        return ApiResponseClass::sendResponse(new OrderItemResource($orderItem), '', ApiResponseClass::HTTP_OK);
    }
    public function edit(OrderItem $orderItem)
    {

    }
    public function update(OrderItemRequest $request, $order_item_id)
    {
        $updateDetails = [
            'order_id' => $request->order_id,
            'item_id' => $request->item_id,
            'quantity' => $request->quantity,
            'price_at_purchase' => $request->price_at_purchase,
        ];
        DB::beginTransaction();
        try {
            $orderItem = $this->orderItemRepository->update($updateDetails, $order_item_id);
            return ApiResponseClass::sendResponse('Order updated', '', ApiResponseClass::HTTP_NO_CONTENT);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    public function destroy($order_item_id)
    {
        $this->orderItemRepository->delete($order_item_id);
        return ApiResponseClass::sendResponse('Deleted', '', ApiResponseClass::HTTP_NO_CONTENT);
    }
}
