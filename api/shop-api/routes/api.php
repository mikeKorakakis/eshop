<?php

use App\Http\Controllers\MediaController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;


//Authentication
Route::post('/login', [AuthController::class, 'login']);
//Users
Route::apiResource('/users', UserController::class);

Route::middleware('jwt.auth')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    //Categories
    Route::apiResource('/categories', CategoryController::class);
    //Media
    Route::apiResource('/media', MediaController::class);
    Route::get('media/{media_id}/url', [MediaController::class, 'stream']);
    Route::get('media/{media_id}', [MediaController::class, 'show']);
    Route::post('media/product/assign', [MediaController::class, 'assignToProduct']);
    //Products
    Route::apiResource('/items', ProductController::class);
    Route::get('/items/category/{category_id}', [ProductController::class, 'getProductsOfCategory']);
    //Orders
    Route::apiResource('/orders', OrderController::class);
    Route::get('/orders/products/{order_id}', [OrderController::class, 'getItemsOfOrder']);
    Route::put('/orders/cost/update', [OrderController::class, 'updateCost']);
    //Order Items
    Route::apiResource('/orderItems', OrderItemController::class);
});





