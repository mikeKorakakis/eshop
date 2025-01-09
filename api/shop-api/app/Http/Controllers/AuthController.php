<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Classes\ApiResponseClass;
use App\Interfaces\IUserRepository;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{

	private IUserRepository $userRepository;

	public function __construct(IUserRepository $userRepository)
	{
		$this->userRepository = $userRepository;
	}
	public function login(Request $request)
	{
		$credentials = $request->only("username", "password");
		$credentials = $request->only("username", "password");


		if (!$token = auth()->attempt($credentials)) {
			return response()->json(['error' => 'Unauthorized'], 401);
		}
		return $this->respondWithToken($token);
	}

	public function me()
	{
		$user = auth()->user();
		$userWithImage = $this->userRepository->getById($user->user_id);
		Log::info($userWithImage);
		return response()->json($userWithImage);
	}

	public function logout()
	{
		auth()->logout();
		return response()->json(['message' => 'Successfully logged out']);
	}

	public function refresh()
	{
		return $this->respondWithToken(auth()->refresh());
	}

	protected function respondWithToken($token)
	{
		return response()->json([
			'access_token' => $token,
			'token_type' => 'bearer',
			'expires_in' => auth()->factory()->getTTL() * 60
		]);
	}

	public function register(Request $request)
	{
		// Validate the request
		$validator = Validator::make($request->all(), [
			'username' => 'required|string|max:255',
			'password' => 'required|string|max:255',
			'email' => 'required|string|max:255',
			'full_name' => 'required|string|max:255',
			'group_id' => 'required',
			'registration_date' => '',
			'media_id' => 'nullable|exists:media,media_id'
		]);

		if ($validator->fails()) {
			return response()->json(['errors' => $validator->errors()], 422);
		}

		// Create the user
		$userData = [
			'username' => $request->username,
			'password' => $request->password,
			'email' => $request->email,
			'full_name' => $request->full_name,
			'group_id' => $request->group_id,
			'registration_date' => date("Y/m/d"),
		];

		if (!empty($request->media_id)) {
			$userData['media_id'] = $request->media_id;
		}

		$user = User::create($userData);

		$image_url =


			// Automatically log in the user and issue a token
			$token = auth()->login($user);

		return $this->respondWithToken($token);
	}

	public function changePassword(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'current_password' => 'required|string|max:255',
			'new_password' => 'required|string|max:255',
		]);

		if ($validator->fails()) {
			return response()->json(['errors' => $validator->errors()], 422);
		}

		$user = auth()->user();
		if (!Hash::check($request->current_password, $user->password)) {
			return response()->json(['error' => 'Unauthorized'], 401);
		}

		$user->password = $request->new_password;
		$user->save();

		return ApiResponseClass::sendResponse('Password changed successfully', '', ApiResponseClass::HTTP_OK);

		// return response()->json(['message' => 'Password changed successfully']);
	}
}
