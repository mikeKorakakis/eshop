<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\UserResource;
use App\Interfaces\IUserRepository;
use Illuminate\Support\Facades\Hash;



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
		Log::info($request);
        $details = [
            'username' => $request->username,
            'email' => $request->email,
            'full_name' => $request->full_name,
            'group_id' => $request->group_id,
            'registration_date' => date('Y-m-d', strtotime(now())),
            'media_id' => $request->media_id,
        ];

		if (!empty($request->password)) {
			$details['password'] = Hash::make($request->password);
		}
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
            
            'email' => $request->email,
            'full_name' => $request->full_name,
            'group_id' => $request->group_id,
            'media_id' => $request->media_id,
        ];

		if (!empty($request->password)) {
			$updateDetails['password'] = Hash::make($request->password);
		}
		


        DB::beginTransaction();
        try {
            $user = $this->userRepository->update($updateDetails, $user_id);
            DB::commit();
            return ApiResponseClass::sendResponse('User Updated', '', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }

    }
    public function destroy($user_id)
    {
        $this->userRepository->delete($user_id);
        return ApiResponseClass::sendResponse('Deleted', '', ApiResponseClass::HTTP_OK);
    }
}
