<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\MediaRequest;
use App\Http\Resources\MediaResource;
use App\Interfaces\IMediaRepository;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Str;


class MediaController extends Controller
{
    private IMediaRepository $mediaRepository;
    public function __construct(IMediaRepository $mediaRepository)
    {
        $this->mediaRepository = $mediaRepository;
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

            \Log::info('Uploading file to MinIO: ' . $filePath);
            Storage::disk('minio')->put($filePath, file_get_contents($file), 'public');
            $details['path'] = $filePath;
            $media = $this->mediaRepository->store($details);
            $url = Storage::disk('minio')->url($filePath);
            \Log::info('File URL: ' . $url);
            DB::commit();
            return ApiResponseClass::sendResponse(new MediaResource($media), 'Media Created', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            DB::rollBack();
            return ApiResponseClass::rollback($ex);
        }
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
}
