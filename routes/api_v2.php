<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V2\ItemController;
use App\Http\Controllers\ItemCategoryController;

/*
|--------------------------------------------------------------------------
| API Routes - Version 2
|--------------------------------------------------------------------------
*/

// /api/v2/...
// http://127.0.0.1:8000/api/v2/items?category_code=BRAKE
// http://127.0.0.1:8000/api/v2/items/123
// http://127.0.0.1:8000/api/v2/items-form-data
Route::prefix('v2')->group(function () {

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
