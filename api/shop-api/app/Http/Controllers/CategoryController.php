<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Classes\ApiResponseClass;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    private CategoryRepositoryInterface $categoryRepositoryInterface;

    public function __construct(CategoryRepositoryInterface $categoryRepositoryInterface)
    {
        $this->categoryRepositoryInterface = $categoryRepositoryInterface;
    }
    public function index()
    {
        $data = $this->categoryRepositoryInterface->index();

        return ApiResponseClass::sendResponse(CategoryResource::collection($data), '', 200);
    }

    public function create()
    {
    }

    public function store(StoreCategoryRequest $request)
    {
        $details = [
            'name' => $request->name,
            'description' => $request->description,
            'parent_id' => $request->parent_id,
            'ordering' => $request->ordering,
            'is_visible' => $request->is_visible,
            'allow_comments' => $request->allow_comments,
            'allow_ads' => $request->allow_ads
        ];
        DB::beginTransaction();
        try {
            $category = $this->categoryRepositoryInterface->store($details);

            DB::commit();
            return ApiResponseClass::sendResponse(new CategoryResource($category), 'Category created', 201);

        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }
    public function show($id)
    {
        $category = $this->categoryRepositoryInterface->getById($id);

        return ApiResponseClass::sendResponse(new CategoryResource($category), '', 200);
    }
    public function edit(Category $category)
    {
        //
    }

    public function update(UpdateCategoryRequest $request, $id)
    {
        $updateDetails = [
            'name' => $request->name,
            'description' => $request->description,
            'parent_id' => $request->parent_id,
            'ordering' => $request->ordering,
            'is_visible' => $request->is_visible,
            'allow_comments' => $request->allow_comments,
            'allow_ads' => $request->allow_ads
        ];
        DB::beginTransaction();
        try {
            $category = $this->categoryRepositoryInterface->update($updateDetails, $id);
            DB::commit();
            return ApiResponseClass::sendResponse('Category updated', '', 201);

        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }
    public function destroy($id)
    {
        $this->categoryRepositoryInterface->delete($id);

        return ApiResponseClass::sendResponse('Deleted', '', 204);
    }
}
