<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Resources\CreditCardResource;
use App\Interfaces\ICreditCardRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\CreditCard;
use App\Http\Requests\CreditCardRequest;

class CreditCardController extends Controller
{
    private ICreditCardRepository $creditCardRepository;

    public function __construct(ICreditCardRepository $creditCardRepository)
    {
        $this->creditCardRepository = $creditCardRepository;
    }

    public function index()
    {
        $data = $this->creditCardRepository->index();
        return ApiResponseClass::sendResponse(CreditCardResource::collection($data), '', ApiResponseClass::HTTP_OK);
    }

    public function create()
    {
    }

    public function store(CreditCardRequest $request)
    {
        $details = [
            'user_id' => $request->user_id,
            'card_number' => $request->card_number,
            'cardholder_name' => $request->cardholder_name,
            'expiration_date' => $request->expiration_date,
            'cvv' => $request->cvv,
            'balance' => $request->balance
        ];

        DB::beginTransaction();

        try {
            $creditCard = $this->creditCardRepository->store($details);
            DB::commit();
            return ApiResponseClass::sendResponse(new CreditCardResource($creditCard), 'Credit card added', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            DB::rollBack();
            return ApiResponseClass::rollback($ex);
        }
    }

    public function show($credit_card_id)
    {
        $creditCard = $this->creditCardRepository->getById($credit_card_id);
        return ApiResponseClass::sendResponse(new CreditCardResource($creditCard), '', ApiResponseClass::HTTP_OK);
    }

    public function update(CreditCardRequest $request, $credit_card_id)
    {
        $updateDetails = [
            'user_id' => $request->user_id,
            'card_number' => $request->card_number,
            'cardholder_name' => $request->cardholder_name,
            'expiration_date' => $request->expiration_date,
            'cvv' => $request->cvv,
            'balance' => $request->balance
        ];
        DB::beginTransaction();
        try {
            $creditCard = $this->creditCardRepository->update($updateDetails, $credit_card_id);
            DB::commit();
            return ApiResponseClass::sendResponse('Card info updated', '', ApiResponseClass::HTTP_NO_CONTENT);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }


}
