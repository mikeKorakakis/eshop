<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\UserResource;
use App\Interfaces\IUserRepository;

class UserController extends Controller
{
    private IUserRepository $userRepository;

    public function __construct(IUserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function index()
    {
        $data = $this->userRepository->index();
        return ApiResponseClass::sendResponse(UserResource::collection($data), '', ApiResponseClass::HTTP_OK);
    }
    public function create()
    {

    }
    public function store(UserRequest $request)
    {
        $details = [
            'username' => $request->username,
            'password' => $request->password,
            'email' => $request->email,
            'full_name' => $request->full_name,
            'group_id' => $request->group_id,
            'trust_status' => $request->trust_status,
            'registration_status' => $request->registration_status,
            'registration_date' => $request->registration_date,
            'avatar_url' => $request->avatar_url,
        ];
        DB::beginTransaction();

        try {
            $user = $this->userRepository->store($details);
            DB::commit();
            return ApiResponseClass::sendResponse(new UserResource($user), 'User Created', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }
    public function show($user_id)
    {
        $user = $this->userRepository->getById($user_id);
        return ApiResponseClass::sendResponse(new UserResource($user), '', ApiResponseClass::HTTP_OK);
    }
    public function edit(User $user)
    {
    }
    public function update(UserRequest $request, $user_id)
    {
        $updateDetails = [
            'username' => $request->username,
            'password' => $request->password,
            'email' => $request->email,
            'full_name' => $request->full_name,
            'group_id' => $request->group_id,
            'trust_status' => $request->trust_status,
            'registration_status' => $request->registration_status,
            'registration_date' => $request->registration_date,
            'avatar_url' => $request->avatar_url,
        ];
        DB::beginTransaction();
        try {
            $user = $this->userRepository->update($updateDetails, $user_id);
            DB::commit();
            return ApiResponseClass::sendResponse('User Updated', '', ApiResponseClass::HTTP_NO_CONTENT);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }

    }
    public function destroy($user_id)
    {
        $this->userRepository->delete($user_id);
        return ApiResponseClass::sendResponse('Deleted', '', ApiResponseClass::HTTP_NO_CONTENT);
    }
}
