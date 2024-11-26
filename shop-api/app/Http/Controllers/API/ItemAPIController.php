<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateItemAPIRequest;
use App\Http\Requests\API\UpdateItemAPIRequest;
use App\Models\Item;
use App\Repositories\ItemRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;

/**
 * Class ItemController
 */

class ItemAPIController extends AppBaseController
{
    private ItemRepository $itemRepository;

    public function __construct(ItemRepository $itemRepo)
    {
        $this->itemRepository = $itemRepo;
    }

    /**
     * @OA\Get(
     *      path="/items",
     *      summary="getItemList",
     *      tags={"Item"},
     *      description="Get all Items",
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
     *                  @OA\Items(ref="#/components/schemas/Item")
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
        $items = $this->itemRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($items->toArray(), 'Items retrieved successfully');
    }

    /**
     * @OA\Post(
     *      path="/items",
     *      summary="createItem",
     *      tags={"Item"},
     *      description="Create Item",
     *      @OA\RequestBody(
     *        required=true,
     *        @OA\JsonContent(ref="#/components/schemas/Item")
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
     *                  ref="#/components/schemas/Item"
     *              ),
     *              @OA\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateItemAPIRequest $request): JsonResponse
    {
        $input = $request->all();

        $item = $this->itemRepository->create($input);

        return $this->sendResponse($item->toArray(), 'Item saved successfully');
    }

    /**
     * @OA\Get(
     *      path="/items/{id}",
     *      summary="getItemItem",
     *      tags={"Item"},
     *      description="Get Item",
     *      @OA\Parameter(
     *          name="id",
     *          description="id of Item",
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
     *                  ref="#/components/schemas/Item"
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
        /** @var Item $item */
        $item = $this->itemRepository->find($id);

        if (empty($item)) {
            return $this->sendError('Item not found');
        }

        return $this->sendResponse($item->toArray(), 'Item retrieved successfully');
    }

    /**
     * @OA\Put(
     *      path="/items/{id}",
     *      summary="updateItem",
     *      tags={"Item"},
     *      description="Update Item",
     *      @OA\Parameter(
     *          name="id",
     *          description="id of Item",
     *           @OA\Schema(
     *             type="integer"
     *          ),
     *          required=true,
     *          in="path"
     *      ),
     *      @OA\RequestBody(
     *        required=true,
     *        @OA\JsonContent(ref="#/components/schemas/Item")
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
     *                  ref="#/components/schemas/Item"
     *              ),
     *              @OA\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateItemAPIRequest $request): JsonResponse
    {
        $input = $request->all();

        /** @var Item $item */
        $item = $this->itemRepository->find($id);

        if (empty($item)) {
            return $this->sendError('Item not found');
        }

        $item = $this->itemRepository->update($input, $id);

        return $this->sendResponse($item->toArray(), 'Item updated successfully');
    }

    /**
     * @OA\Delete(
     *      path="/items/{id}",
     *      summary="deleteItem",
     *      tags={"Item"},
     *      description="Delete Item",
     *      @OA\Parameter(
     *          name="id",
     *          description="id of Item",
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
        /** @var Item $item */
        $item = $this->itemRepository->find($id);

        if (empty($item)) {
            return $this->sendError('Item not found');
        }

        $item->delete();

        return $this->sendSuccess('Item deleted successfully');
    }
}
