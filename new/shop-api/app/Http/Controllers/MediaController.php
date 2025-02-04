<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\MediaRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\MediaResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\UserResource;
use App\Interfaces\IMediaRepository;
use App\Interfaces\IProductRepository;
use App\Interfaces\IUserRepository;
use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class MediaController extends Controller
{
    private IMediaRepository $mediaRepository;
    private IProductRepository $productRepository;
    private IUserRepository $userRepository;
    private CategoryRepositoryInterface $categoryRepository;
    public function __construct(IMediaRepository $mediaRepository, IProductRepository $productRepository, IUserRepository $userRepository, CategoryRepositoryInterface $categoryRepository)
    {
        $this->mediaRepository = $mediaRepository;
        $this->productRepository = $productRepository;
        $this->userRepository = $userRepository;
        $this->categoryRepository = $categoryRepository;
    }
    public function index()
    {
        $data = $this->mediaRepository->index();
        return ApiResponseClass::sendResponse(MediaResource::collection($data), '', ApiResponseClass::HTTP_OK);
    }
    public function create()
    {

    }

    public function store(MediaRequest $request)
    {

        $details = [
            'name' => $request->name,
            'size' => $request->file('file')->getSize(),
        ];

        DB::beginTransaction();

        try {
            $file = $request->file('file');
            $fileName = uniqid() . '_' . $file->getClientOriginalName();
            $filePath = 'uploads/' . $fileName;

            Log::info('Uploading file to MinIO: ' . $filePath);
            Storage::disk('minio')->put($filePath, file_get_contents($file), 'public');
            $details['path'] = $filePath;
            $media = $this->mediaRepository->store($details);
            $url = Storage::disk('minio')->url($filePath);
            Log::info('File URL: ' . $url);
            DB::commit();
            return ApiResponseClass::sendResponse(new MediaResource($media), 'Media Created', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            DB::rollBack();
            return ApiResponseClass::rollback($ex);
        }
    }
    public function stream($media_id)
    {
        $media = $this->mediaRepository->getById($media_id);
        if (!$media) {
            return ApiResponseClass::error("Error", 'Media not found', ApiResponseClass::HTTP_NOT_FOUND);
        }
        $filePath = $media->path;
        $fileUrl = Storage::disk('minio')->url($filePath);
        return ApiResponseClass::sendResponse($fileUrl, '', ApiResponseClass::HTTP_OK);
    }
    public function show($media_id)
    {
        $media = $this->mediaRepository->getById($media_id);
        return ApiResponseClass::sendResponse(new MediaResource($media), '', ApiResponseClass::HTTP_OK);
    }
    public function edit(Media $media)
    {

    }
    public function update(MediaRequest $request, $media_id)
    {
        $updateDetails = [
            'name' => $request->name,
            'path' => $request->path,
            'size' => $request->size,
        ];
        DB::beginTransaction();
        try {
            $media = $this->mediaRepository->update($updateDetails, $media_id);
            DB::commit();
            return ApiResponseClass::sendResponse('Media Updated', '', ApiResponseClass::HTTP_NO_CONTENT);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }
    public function destroy($media_id)
    {
        $this->mediaRepository->delete($media_id);
        return ApiResponseClass::sendResponse('Deleted', '', ApiResponseClass::HTTP_NO_CONTENT);
    }
    public function assignToProduct(Request $request)
    {
        $request->validate([
            'media_id' => 'required',
            'product_id' => 'required',
        ]);

        $media_id = $request->input('media_id');
        $product_id = $request->input('product_id');

        try {
            $media = $this->mediaRepository->getById($media_id);
            if (!$media) {
                return ApiResponseClass::error('Not found', 'Media not found', ApiResponseClass::HTTP_NOT_FOUND);
            }
            $product = $this->productRepository->getById($product_id);
            if (!$product) {
                return ApiResponseClass::error('Not found', 'Product not found', ApiResponseClass::HTTP_NOT_FOUND);
            }
            $product->media_id = $media->media_id;
            $product->save();
            return ApiResponseClass::sendResponse(new ProductResource($product), 'Media assigned to product', ApiResponseClass::HTTP_OK);
        } catch (\Exception $ex) {
            ApiResponseClass::error('Not found', 'Product or media not found', ApiResponseClass::HTTP_NOT_FOUND);
        }

    }

    public function assignToCategory(Request $request)
    {
        $request->validate([
            'media_id' => 'required',
            'category_id' => 'required',
        ]);
        $media_id = $request->input('media_id');
        $category_id = $request->input('category_id');

        try {
            $media = $this->mediaRepository->getById($media_id);
            if (!$media) {
                return ApiResponseClass::error('Not found', 'Media not found', ApiResponseClass::HTTP_NOT_FOUND);
            }
            $category = $this->categoryRepository->getById($category_id);
            if (!$category) {
                return ApiResponseClass::error('Not found', 'Category not found', ApiResponseClass::HTTP_NOT_FOUND);
            }

            $category->media_id = $media->media_id;
            $category->save();
            return ApiResponseClass::sendResponse(new CategoryResource($category), 'Media assigned to category', ApiResponseClass::HTTP_OK);
        } catch (\Exception $ex) {
            ApiResponseClass::error('Not found', 'Category or media not found', ApiResponseClass::HTTP_NOT_FOUND);
        }
    }

    public function assignToUser(Request $request)
    {
        $request->validate([
            'media_id' => 'required',
            'user_id' => 'required',
        ]);
        $media_id = $request->input('media_id');
        $user_id = $request->input('user_id');

        try {
            $media = $this->mediaRepository->getById($media_id);
            if (!$media) {
                return ApiResponseClass::error('Not found', 'Media not found', ApiResponseClass::HTTP_NOT_FOUND);
            }
            $user = $this->userRepository->getById($user_id);
            if (!$user) {
                return ApiResponseClass::error('Not found', 'User not found', ApiResponseClass::HTTP_NOT_FOUND);
            }
            $user->media_id = $media->media_id;
            $user->save();
            return ApiResponseClass::sendResponse(new UserResource($user), 'Media assigned to user', ApiResponseClass::HTTP_OK);
        } catch (\Exception $ex) {
            ApiResponseClass::error('Not found', 'User or media not found', ApiResponseClass::HTTP_NOT_FOUND);
        }
    }
}
