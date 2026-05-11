<?php

use App\Http\Controllers\Api\V2\BannerController;
use App\Http\Controllers\Api\V2\GarageController;
use App\Http\Controllers\Api\V2\GaragePostController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V2\ItemController;
use App\Http\Controllers\Api\V2\ShopController;
use App\Http\Controllers\Api\V2\UserController;
use App\Http\Controllers\Api\V2\VideoController;
use App\Http\Controllers\ItemCategoryController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes - Version 2
|--------------------------------------------------------------------------
*/

// /api/v2/...
// http://127.0.0.1:8000/api/v2/items?category_code=BRAKE
// http://127.0.0.1:8000/api/v2/items/123
// http://127.0.0.1:8000/api/v2/items-form-data


// === For Logined Route ===
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/users/{id}', [UserController::class, 'update']);
});

Route::prefix('v2')->group(function () {

    Route::get('/banners', [BannerController::class, 'index']);

    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);

    Route::get('/shops', [ShopController::class, 'index']);
    Route::get('/shops/{id}', [ShopController::class, 'show']);
    Route::post('/shops', [ShopController::class, 'store']);
    Route::post('/shops/{id}', [ShopController::class, 'update']);

    Route::get('/garages', [GarageController::class, 'index']);
    Route::get('/garages/{id}', [GarageController::class, 'show']);
    Route::post('/garages', [GarageController::class, 'store']);
    Route::post('/garages/{id}', [GarageController::class, 'update']);
    Route::get('/garages_for_map', [GarageController::class, 'garages_for_map']);
    Route::get('/provinces', [GarageController::class, 'provinces']);

    Route::get('/garage-posts', [GaragePostController::class, 'index']);
    Route::post('/garage-posts', [GaragePostController::class, 'store']);
    Route::get('/garage-posts/{id}', [GaragePostController::class, 'show']);
    Route::post('/garage-posts/{id}', [GaragePostController::class, 'update']);
    Route::delete('/garage-posts/{id}', [GaragePostController::class, 'destroy']); // Delete item


    Route::get('/video-playlists', [VideoController::class, 'video_playlists']);

    Route::get('/items-categories', [ItemCategoryController::class, 'getFieldsByCategory']);
    Route::get('/categories_fields/{cate_id}', [ItemCategoryController::class, 'getFieldsByCategory']);

    // Get all items (Supports ?category_id=10&condition=new etc.)
    Route::get('/items', [ItemController::class, 'index']);
    // Get a single item detail
    Route::get('/items/{id}', [ItemController::class, 'show']);
    Route::get('/items/{id}/related', [ItemController::class, 'related_items']);

    Route::get('/items-form-data', [ItemController::class, 'form_data']);
    Route::post('/items', [ItemController::class, 'store']);         // Store item
    Route::post('/items/{id}', [ItemController::class, 'update']);   // Update (Use POST for images)
    Route::delete('/items/{id}', [ItemController::class, 'destroy']); // Delete item

    // Specific Actions
    Route::post('/items/{id}/status', [ItemController::class, 'updateStatus']);
    Route::delete('/item-images/{id}', [ItemController::class, 'destroyImage']);
});

Route::post('/test-errors', function (Request $request) {
    // A dictionary of common errors mapped to their status codes
    $errorScenarios = [
        400 => ['message' => 'Bad Request. The data sent was malformed or missing entirely.'],
        401 => ['message' => 'Unauthenticated. Your token has expired or is invalid.'],
        403 => ['message' => 'Forbidden. You do not have permission to create items in this shop.'],
        404 => ['message' => 'Not Found. The category you selected no longer exists.'],
        422 => [
            'message' => 'The given data was invalid.',
            'errors' => [
                'name' => ['This product name is already taken in your shop.'],
                'price' => ['The price must be at least 0.01.'],
                'images' => ['The uploaded file is corrupt or not a valid image.']
            ]
        ],
        429 => ['message' => 'Too Many Requests. Please wait 60 seconds before trying again.'],
        500 => ['message' => 'Internal Server Error. Unable to connect to the database.'],
        503 => ['message' => 'Service Unavailable. We are currently performing scheduled maintenance.']
    ];

    // Pick a random status code from the list
    $statusCodes = array_keys($errorScenarios);
    $randomCode = $statusCodes[array_rand($statusCodes)];

    // Construct the response
    $responseData = [
        'success' => false,
        'message' => $errorScenarios[$randomCode]['message'],
    ];

    // If it's a 422, attach the specific field errors so your UI can highlight them
    if ($randomCode === 422) {
        $responseData['errors'] = $errorScenarios[$randomCode]['errors'];
    }

    // Optional: Log it so you know which one was randomly chosen
    \Illuminate\Support\Facades\Log::info("Testing Random Error: Triggered a $randomCode");

    return response()->json($responseData, $randomCode);
});
