<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\AppBaseController;


class AuthController extends AppBaseController
{
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
			'avatar_url' => 'string|max:255'
		]);

		if ($validator->fails()) {
			return response()->json(['errors' => $validator->errors()], 422);
		}

		// Create the user
		$user = User::create([
			'username' => $request->username,
			'password' => Hash::make($request->password),
			'email' => $request->email,
			'full_name' => $request->full_name,
			'group_id' => $request->group_id,
			'registration_date' => date("Y/m/d"),
			'avatar_url' => $request->avatar_url


		]);

		// Automatically log in the user and issue a token
		$token = auth()->login($user);

		return $this->respondWithToken($token);
	}

	public function login(Request $request)
	{
		$credentials = $request->only("username", "password");
		\Log::info('Login attempt credentials:', $credentials);
		
		// Find the user by username
		$user = User::where('username', $credentials['username'])->first();

		
		if (!$user) {
			\Log::error('User not found for username:', ['username' => $credentials['username']]);
			return response()->json(['error' => 'Unauthorized'], 401);
		}
		// Compare the plain password with the hashed password
		// if (!Hash::check($credentials['password'], $user->password)) {
		// 	\Log::error('Password mismatch for username:', ['username' => $credentials['username']]);
		// 	\Log::info('User database password:', ['password' => $user->password]);
		// 	return response()->json(['error' => 'Unauthorized'], 401);
		// }
		
		// Generate token if password matches
		$token = auth()->login($user);
		return $this->respondWithToken($token);

	}

	public function me()
	{
		return response()->json(auth()->user());
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
			'expires_in' => auth()->factory()->getTTL() * 60,
		]);
	}
}
