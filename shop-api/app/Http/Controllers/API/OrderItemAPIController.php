<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateOrderItemAPIRequest;
use App\Http\Requests\API\UpdateOrderItemAPIRequest;
use App\Models\OrderItem;
use App\Repositories\OrderItemRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;

/**
 * Class OrderItemController
 */

class OrderItemAPIController extends AppBaseController
{
    private OrderItemRepository $orderItemRepository;

    public function __construct(OrderItemRepository $orderItemRepo)
    {
        $this->orderItemRepository = $orderItemRepo;
    }

    /**
     * @OA\Get(
     *      path="/order-items",
     *      summary="getOrderItemList",
     *      tags={"OrderItem"},
     *      description="Get all OrderItems",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @OA\Property(
     *                  property="data",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/OrderItem")
     *              ),
     *              @OA\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $orderItems = $this->orderItemRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($orderItems->toArray(), 'Order Items retrieved successfully');
    }

    /**
     * @OA\Post(
     *      path="/order-items",
     *      summary="createOrderItem",
     *      tags={"OrderItem"},
     *      description="Create OrderItem",
     *      @OA\RequestBody(
     *        required=true,
     *        @OA\JsonContent(ref="#/components/schemas/OrderItem")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/components/schemas/OrderItem"
     *              ),
     *              @OA\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateOrderItemAPIRequest $request): JsonResponse
    {
        $input = $request->all();

        $orderItem = $this->orderItemRepository->create($input);

        return $this->sendResponse($orderItem->toArray(), 'Order Item saved successfully');
    }

    /**
     * @OA\Get(
     *      path="/order-items/{id}",
     *      summary="getOrderItemItem",
     *      tags={"OrderItem"},
     *      description="Get OrderItem",
     *      @OA\Parameter(
     *          name="id",
     *          description="id of OrderItem",
     *           @OA\Schema(
     *             type="integer"
     *          ),
     *          required=true,
     *          in="path"
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/components/schemas/OrderItem"
     *              ),
     *              @OA\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function show($id): JsonResponse
    {
        /** @var OrderItem $orderItem */
        $orderItem = $this->orderItemRepository->find($id);

        if (empty($orderItem)) {
            return $this->sendError('Order Item not found');
        }

        return $this->sendResponse($orderItem->toArray(), 'Order Item retrieved successfully');
    }

    /**
     * @OA\Put(
     *      path="/order-items/{id}",
     *      summary="updateOrderItem",
     *      tags={"OrderItem"},
     *      description="Update OrderItem",
     *      @OA\Parameter(
     *          name="id",
     *          description="id of OrderItem",
     *           @OA\Schema(
     *             type="integer"
     *          ),
     *          required=true,
     *          in="path"
     *      ),
     *      @OA\RequestBody(
     *        required=true,
     *        @OA\JsonContent(ref="#/components/schemas/OrderItem")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/components/schemas/OrderItem"
     *              ),
     *              @OA\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateOrderItemAPIRequest $request): JsonResponse
    {
        $input = $request->all();

        /** @var OrderItem $orderItem */
        $orderItem = $this->orderItemRepository->find($id);

        if (empty($orderItem)) {
            return $this->sendError('Order Item not found');
        }

        $orderItem = $this->orderItemRepository->update($input, $id);

        return $this->sendResponse($orderItem->toArray(), 'OrderItem updated successfully');
    }

    /**
     * @OA\Delete(
     *      path="/order-items/{id}",
     *      summary="deleteOrderItem",
     *      tags={"OrderItem"},
     *      description="Delete OrderItem",
     *      @OA\Parameter(
     *          name="id",
     *          description="id of OrderItem",
     *           @OA\Schema(
     *             type="integer"
     *          ),
     *          required=true,
     *          in="path"
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @OA\Property(
     *                  property="data",
     *                  type="string"
     *              ),
     *              @OA\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function destroy($id): JsonResponse
    {
        /** @var OrderItem $orderItem */
        $orderItem = $this->orderItemRepository->find($id);

        if (empty($orderItem)) {
            return $this->sendError('Order Item not found');
        }

        $orderItem->delete();

        return $this->sendSuccess('Order Item deleted successfully');
    }
}
