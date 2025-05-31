<?php

use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\DtcController;
use App\Http\Controllers\Api\FileExploreController;
use App\Http\Controllers\Api\LinkController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\SlideController;
use App\Http\Controllers\Api\VideoController;
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

// Documents Route
Route::get('/file-explorer/folder/{path}', [FileExploreController::class, 'folder']);

// DTC Route
Route::resource('dtcs', DtcController::class);

// Course Route
Route::resource('courses', CourseController::class);

// Slide Route
Route::resource('slides', SlideController::class);

// Video Route
Route::resource('videos', VideoController::class);
Route::get('videos_playlists', [VideoController::class, 'video_playlists']);
