<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateModelNameAPIRequest;
use App\Http\Requests\API\UpdateModelNameAPIRequest;
use App\Models\ModelName;
use App\Repositories\ModelNameRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use App\Http\Resources\ModelNameResource;
use Response;

/**
 * Class ModelNameController
 * @package App\Http\Controllers\API
 */

class ModelNameAPIController extends AppBaseController
{
    /** @var  ModelNameRepository */
    private $modelNameRepository;

    public function __construct(ModelNameRepository $modelNameRepo)
    {
        $this->modelNameRepository = $modelNameRepo;
    }

    /**
     * Display a listing of the ModelName.
     * GET|HEAD /modelNames
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $modelNames = $this->modelNameRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(ModelNameResource::collection($modelNames), 'Model Names retrieved successfully');
    }

    /**
     * Store a newly created ModelName in storage.
     * POST /modelNames
     *
     * @param CreateModelNameAPIRequest $request
     *
     * @return Response
     */
    public function store(CreateModelNameAPIRequest $request)
    {
        $input = $request->all();

        $modelName = $this->modelNameRepository->create($input);

        return $this->sendResponse(new ModelNameResource($modelName), 'Model Name saved successfully');
    }

    /**
     * Display the specified ModelName.
     * GET|HEAD /modelNames/{id}
     *
     * @param int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var ModelName $modelName */
        $modelName = $this->modelNameRepository->find($id);

        if (empty($modelName)) {
            return $this->sendError('Model Name not found');
        }

        return $this->sendResponse(new ModelNameResource($modelName), 'Model Name retrieved successfully');
    }

    /**
     * Update the specified ModelName in storage.
     * PUT/PATCH /modelNames/{id}
     *
     * @param int $id
     * @param UpdateModelNameAPIRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateModelNameAPIRequest $request)
    {
        $input = $request->all();

        /** @var ModelName $modelName */
        $modelName = $this->modelNameRepository->find($id);

        if (empty($modelName)) {
            return $this->sendError('Model Name not found');
        }

        $modelName = $this->modelNameRepository->update($input, $id);

        return $this->sendResponse(new ModelNameResource($modelName), 'ModelName updated successfully');
    }

    /**
     * Remove the specified ModelName from storage.
     * DELETE /modelNames/{id}
     *
     * @param int $id
     *
     * @throws \Exception
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var ModelName $modelName */
        $modelName = $this->modelNameRepository->find($id);

        if (empty($modelName)) {
            return $this->sendError('Model Name not found');
        }

        $modelName->delete();

        return $this->sendSuccess('Model Name deleted successfully');
    }
}
