<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Models\ShippingMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ShippingMethodController extends Controller
{
    // GET /api/shipping-methods
    public function index()
    {
        $methods = ShippingMethod::all();
        // or use a Resource class if you prefer
        return ApiResponseClass::sendResponse($methods, 'All shipping methods', 200);
    }

    // POST /api/shipping-methods
  
}
