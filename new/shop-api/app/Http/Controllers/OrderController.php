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
use App\Models\CreditCard;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Shipping;
use Illuminate\Support\Facades\Log;

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
		Log::info($data);
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

	public function showByUser($user_id)
    {
        $orders = $this->orderRepository->getByUserId($user_id);

        // Return a collection of orders as resources
        return ApiResponseClass::sendResponse(
            OrderResource::collection($orders), 
            '', 
            ApiResponseClass::HTTP_OK
        );
    }

	public function showByCurrentUser()
    {
		$user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $orders = $this->orderRepository->getByUserId($user->user_id);
        // Return a collection of orders as resources
        return ApiResponseClass::sendResponse(
            OrderResource::collection($orders), 
            '', 
            ApiResponseClass::HTTP_OK
        );
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

	public function makePurchase(Request $request)
    {
        $request->validate([
            'card_number' => 'required|string',
            'total_amount' => 'required|numeric|min:0',
            'products' => 'required|array',
            'products.*.product_id' => 'required|exists:products,product_id',
            'products.*.quantity' => 'required|numeric|min:1'
        ]);

		$shipping = Shipping::create([
			'shipping_method_id' => $request->shipping_method_id,
			'address'            => $request->address,
			'city'               => $request->city,
			'postal_code'        => $request->postal_code,
		]);


        // Extract request data
        $card_number = $request->card_number;
        $total_amount = $request->total_amount;
        $products = $request->products;

        // Fetch the current user (assuming you have user authentication)
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Retrieve the user's credit card
        $userCreditCard = CreditCard::where('user_id', $user->user_id)
            ->where('card_number', str_replace(' ', '', $card_number))
            ->first();

        if (!$userCreditCard || $userCreditCard->balance < $total_amount) {
            return response()->json(['message' => 'Payment failed or declined'], 400);
        }

        DB::beginTransaction();

        try {
            // Deduct the balance
            $new_balance = $userCreditCard->balance - $total_amount;
            $userCreditCard->balance = $new_balance;
            $userCreditCard->save();

            // Create the order
            $order = Order::create([
                'user_id' => $user->user_id,
                'total_amount' => $total_amount,
                'order_date' => now(),
                'order_status' => 'pending',
				'shipping_id' => $shipping->shipping_id,
            ]);

            // Add the products to the order
            foreach ($products as $product) {
                $productDetails = Product::find($product['product_id']);
                OrderItem::create([
                    'order_id' => $order->order_id,
                    'product_id' => $product['product_id'],
                    'price_at_purchase' => $productDetails->price,
                    'quantity' => $product['quantity']
                ]);
            }

            DB::commit();

            return response()->json( $order, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong. Please try again.', 'error' => $e->getMessage()], 500);
        }
	}
}
