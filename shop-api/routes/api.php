<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('users', App\Http\Controllers\API\UserAPIController::class)
    ->except(['create', 'edit']);

Route::resource('categories', App\Http\Controllers\API\CategoryAPIController::class)
    ->except(['create', 'edit']);

Route::resource('credit-cards', App\Http\Controllers\API\CreditCardAPIController::class)
    ->except(['create', 'edit']);

Route::resource('items', App\Http\Controllers\API\ItemAPIController::class)
    ->except(['create', 'edit']);

Route::resource('orders', App\Http\Controllers\API\OrderAPIController::class)
    ->except(['create', 'edit']);

Route::resource('order-items', App\Http\Controllers\API\OrderItemAPIController::class)
    ->except(['create', 'edit']);