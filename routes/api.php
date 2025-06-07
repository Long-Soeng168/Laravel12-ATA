<?php

use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\BodyTypeController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\DtcController;
use App\Http\Controllers\Api\FileExploreController;
use App\Http\Controllers\Api\LinkController;
use App\Http\Controllers\Api\ModelController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ShopController;
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

// Shop Route
// Route::resource('shops', ShopController::class);

// Product Route
Route::resource('products', ProductController::class);
Route::get('related_products/{id}', [ProductController::class, 'relatedProducts']);
Route::resource('shops', ShopController::class);
Route::resource('categories', CategoryController::class);
Route::resource('body_types', BodyTypeController::class);
Route::resource('brands', BrandController::class);
Route::resource('models', ModelController::class);
// Route::get('get_products_by_shop/{shop_id}', [ProductController::class, 'getProductsByShop']);
// Route::get('get_products_by_category/{category_id}', [ProductController::class, 'getProductsByCategory']);
// Route::get('get_products_by_body_type/{body_type_id}', [ProductController::class, 'getProductsByBodyType']);
// Route::get('get_products_by_brand/{brand_id}', [ProductController::class, 'getProductsByBrand']);
// Route::get('get_products_by_model/{model_id}', [ProductController::class, 'getProductsByModel']);
// 
// 
// Route::get('get_models_by_brand/{brand_id}', [ModelController::class, 'getModelsByBrand']);
