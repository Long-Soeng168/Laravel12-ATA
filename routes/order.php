<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;


Route::post('/orders', [OrderController::class, 'store']);
Route::post('/store_online_training_order', [OrderController::class, 'store_online_training_order']);
