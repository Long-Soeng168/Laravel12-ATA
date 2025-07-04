<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth API Route
Route::get('/test-api-auth', function (Request $request) {
    return 'Working';
});



Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/update_users/{user}', [AuthController::class, 'update']);
    Route::post('/delete_users/{user}', [AuthController::class, 'destroy']);
});
