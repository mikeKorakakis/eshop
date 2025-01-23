<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Interfaces\IProductRepository;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    private IProductRepository $productRepository;

    public function __construct(IProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    public function index()
    {
        $data = $this->productRepository->index();
        return ApiResponseClass::sendResponse(ProductResource::collection($data), '', 200);
    }
    public function create()
    {
    }
    public function store(StoreProductRequest $request)
    {
		$user = auth()->user();
		Log::info($user);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $details = [
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'added_date' => date('Y-m-d', strtotime(now())),
            'country_of_origin' => $request->country_of_origin,
            'category_id' => $request->category_id,
            'owner_id' => $user->user_id
           
        ];

		

		if ($request->has('media_id')) {
			$details['media_id'] = $request->media_id;
		}
		
        DB::beginTransaction();

        try {
            $product = $this->productRepository->store($details);
            DB::commit();
            return ApiResponseClass::sendResponse(new ProductResource($product), 'Product Created', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            Log::error('Error creating product: ' . $ex->getMessage());
            return ApiResponseClass::rollback($ex);
        }
    }
    public function show($id)
    {
        $product = $this->productRepository->getById($id);
        return ApiResponseClass::sendResponse(new ProductResource($product), '', ApiResponseClass::HTTP_OK);
    }
    public function edit(Product $product)
    {

    }
    public function update(UpdateProductRequest $request, $id)
    {
		$updateDetails = [
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'country_of_origin' => $request->country_of_origin,
            'category_id' => $request->category_id
        ];
		if ($request->has('media_id')) {
			$updateDetails['media_id'] = $request->media_id;
		}
		
        DB::beginTransaction();
        try {
            $product = $this->productRepository->update($updateDetails, $id);
            DB::commit();
            return ApiResponseClass::sendResponse('Product updated', '', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }
    public function destroy($id)
    {
        $this->productRepository->delete($id);
        return ApiResponseClass::sendResponse('Deleted', '', ApiResponseClass::HTTP_NO_CONTENT);
    }
    public function getProductsOfCategory($categoryId)
    {
        $products = $this->productRepository->getByCategory($categoryId);
        return ApiResponseClass::sendResponse(ProductResource::collection($products), '', ApiResponseClass::HTTP_OK);
    }
}
