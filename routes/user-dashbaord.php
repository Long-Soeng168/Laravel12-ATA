<?php

use App\Http\Controllers\UserDashboardController;
use Illuminate\Support\Facades\Route;


Route::get('/user-dashboard', [UserDashboardController::class, 'index']);
