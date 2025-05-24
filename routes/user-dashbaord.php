<?php

use App\Http\Controllers\UserDashboard\UserDashboardController;
use App\Http\Controllers\UserDashboard\UserItemController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/user-dashboard', [UserDashboardController::class, 'index']);
    // Item Route
    Route::resource('user-items', UserItemController::class);
    Route::post('user-items/{user_item}/update', [UserItemController::class, 'update']);
    Route::post('user-items/{user_item}/update_status', [UserItemController::class, 'update_status']);
    Route::delete('user-items/images/{image}', [UserItemController::class, 'destroy_image']);
    Route::get('admin/item_view_counts', [UserItemController::class, 'item_view_counts']);
});
