<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateCreditCardAPIRequest;
use App\Http\Requests\API\UpdateCreditCardAPIRequest;
use App\Models\CreditCard;
use App\Repositories\CreditCardRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;

/**
 * Class CreditCardController
 */

class CreditCardAPIController extends AppBaseController
{
    private CreditCardRepository $creditCardRepository;

    public function __construct(CreditCardRepository $creditCardRepo)
    {
        $this->creditCardRepository = $creditCardRepo;
    }

    /**
     * @OA\Get(
     *      path="/credit-cards",
     *      summary="getCreditCardList",
     *      tags={"CreditCard"},
     *      description="Get all CreditCards",
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
     *                  @OA\Items(ref="#/components/schemas/CreditCard")
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
        $creditCards = $this->creditCardRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($creditCards->toArray(), 'Credit Cards retrieved successfully');
    }

    /**
     * @OA\Post(
     *      path="/credit-cards",
     *      summary="createCreditCard",
     *      tags={"CreditCard"},
     *      description="Create CreditCard",
     *      @OA\RequestBody(
     *        required=true,
     *        @OA\JsonContent(ref="#/components/schemas/CreditCard")
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
     *                  ref="#/components/schemas/CreditCard"
     *              ),
     *              @OA\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateCreditCardAPIRequest $request): JsonResponse
    {
        $input = $request->all();

        $creditCard = $this->creditCardRepository->create($input);

        return $this->sendResponse($creditCard->toArray(), 'Credit Card saved successfully');
    }

    /**
     * @OA\Get(
     *      path="/credit-cards/{id}",
     *      summary="getCreditCardItem",
     *      tags={"CreditCard"},
     *      description="Get CreditCard",
     *      @OA\Parameter(
     *          name="id",
     *          description="id of CreditCard",
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
     *                  ref="#/components/schemas/CreditCard"
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
        /** @var CreditCard $creditCard */
        $creditCard = $this->creditCardRepository->find($id);

        if (empty($creditCard)) {
            return $this->sendError('Credit Card not found');
        }

        return $this->sendResponse($creditCard->toArray(), 'Credit Card retrieved successfully');
    }

    /**
     * @OA\Put(
     *      path="/credit-cards/{id}",
     *      summary="updateCreditCard",
     *      tags={"CreditCard"},
     *      description="Update CreditCard",
     *      @OA\Parameter(
     *          name="id",
     *          description="id of CreditCard",
     *           @OA\Schema(
     *             type="integer"
     *          ),
     *          required=true,
     *          in="path"
     *      ),
     *      @OA\RequestBody(
     *        required=true,
     *        @OA\JsonContent(ref="#/components/schemas/CreditCard")
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
     *                  ref="#/components/schemas/CreditCard"
     *              ),
     *              @OA\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateCreditCardAPIRequest $request): JsonResponse
    {
        $input = $request->all();

        /** @var CreditCard $creditCard */
        $creditCard = $this->creditCardRepository->find($id);

        if (empty($creditCard)) {
            return $this->sendError('Credit Card not found');
        }

        $creditCard = $this->creditCardRepository->update($input, $id);

        return $this->sendResponse($creditCard->toArray(), 'CreditCard updated successfully');
    }

    /**
     * @OA\Delete(
     *      path="/credit-cards/{id}",
     *      summary="deleteCreditCard",
     *      tags={"CreditCard"},
     *      description="Delete CreditCard",
     *      @OA\Parameter(
     *          name="id",
     *          description="id of CreditCard",
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
        /** @var CreditCard $creditCard */
        $creditCard = $this->creditCardRepository->find($id);

        if (empty($creditCard)) {
            return $this->sendError('Credit Card not found');
        }

        $creditCard->delete();

        return $this->sendSuccess('Credit Card deleted successfully');
    }
}
