<?php

use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\LinkController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/links', [LinkController::class, 'index']);
Route::get('/banners', [BannerController::class, 'index']);
Route::get('/pages', [PageController::class, 'index']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts_most_views', [PostController::class, 'posts_most_views']);
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::get('/post_categories', [PostController::class, 'post_categories']);