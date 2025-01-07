<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CategoryAPIController;
use App\Http\Controllers\API\ProductAPIController;
use App\Http\Controllers\API\UserAPIController;
use App\Http\Controllers\API\OrderAPIController;
use App\Http\Controllers\API\CommentAPIController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CreditCardAPIController;
use App\Http\Controllers\API\OrderItemAPIController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::resource('categories', CategoryAPIController::class)
	->except(['create', 'edit']);

Route::resource('products', ProductAPIController::class)
	->except(['create', 'edit']);

Route::resource('comments', CommentAPIController::class)
	->except(['create', 'edit']);

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);


Route::middleware('jwt.auth')->group(function () {
	Route::resource('users', UserAPIController::class)
		->except(['create', 'edit']);
	

	Route::get('me', [AuthController::class, 'me']);
	Route::post('logout', [AuthController::class, 'logout']);
	Route::post('refresh', [AuthController::class, 'refresh']);
	//Categories

	Route::resource('credit-cards', CreditCardAPIController::class)
		->except(['create', 'edit']);

	Route::resource('orders', OrderAPIController::class)
		->except(['create', 'edit']);

	Route::resource('order-items', OrderItemAPIController::class)
		->except(['create', 'edit']);
});
