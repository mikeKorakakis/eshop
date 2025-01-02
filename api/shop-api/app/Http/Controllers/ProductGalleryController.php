<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ProductGalleryResource;
use App\Interfaces\IProductGalleryRepository;
use App\Http\Requests\ProductGalleryRequest;

class ProductGalleryController extends Controller
{
    private IProductGalleryRepository $productGalleryRepository;

    public function __construct(IProductGalleryRepository $productGalleryRepository)
    {
        $this->productGalleryRepository = $productGalleryRepository;
    }

    public function index()
    {
        $data = $this->productGalleryRepository->index();
        return ApiResponseClass::sendResponse(ProductGalleryResource::collection($data), '', ApiResponseClass::HTTP_OK);
    }
    public function create()
    {
    }
    public function store(ProductGalleryRequest $request)
    {
        $details = [
            'media_id' => $request->media_id,
            'name' => $request->name,
            'product_id' => $request->product_id,
            'size' => $request->size
        ];

        DB::beginTransaction();

        try {
            $productGallery = $this->productGalleryRepository->store($details);
            DB::commit();
            return ApiResponseClass::sendResponse(new ProductGalleryResource($productGallery), 'Item added to gallery', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            DB::rollBack();
            return ApiResponseClass::rollback($ex);
        }
    }
    public function show($gallery_id)
    {
        $productGallery = $this->productGalleryRepository->getById($gallery_id);
        return ApiResponseClass::sendResponse(new ProductGalleryResource($productGallery), '', ApiResponseClass::HTTP_OK);
    }
    public function destroy($gallery_id)
    {
        $this->productGalleryRepository->delete($gallery_id);
        return ApiResponseClass::sendResponse('Deleted', '', ApiResponseClass::HTTP_NO_CONTENT);
    }
    public function update(ProductGalleryRequest $request, $gallery_id)
    {
        $updateDetails = [
            'media_id' => $request->media_id,
            'name' => $request->name,
            'product_id' => $request->product_id,
            'size' => $request->size
        ];
        DB::beginTransaction();

        try {
            $productGallery = $this->productGalleryRepository->update($updateDetails, $gallery_id);
            DB::commit();
            return ApiResponseClass::sendResponse('Gallery item updated', '', ApiResponseClass::HTTP_NO_CONTENT);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }
    public function getMediaOfProduct($productId)
    {
        $productGallery = $this->productGalleryRepository->getByProduct($productId);
        return ApiResponseClass::sendResponse(ProductGalleryResource::collection($productGallery), '', ApiResponseClass::HTTP_OK);
    }
}
