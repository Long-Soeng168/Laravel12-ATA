<?php

use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\BodyTypeController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\DtcController;
use App\Http\Controllers\Api\FileExploreController;
use App\Http\Controllers\Api\GarageController;
use App\Http\Controllers\Api\GaragePostController;
use App\Http\Controllers\Api\LinkController;
use App\Http\Controllers\Api\ModelController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ShopController;
use App\Http\Controllers\Api\SlideController;
use App\Http\Controllers\Api\VideoController;
use Illuminate\Support\Facades\Route;

use App\Models\Garage;
use App\Models\Shop;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

Route::get('/links', [LinkController::class, 'index']);
Route::get('/banners', [BannerController::class, 'index']);
Route::get('/pages', [PageController::class, 'index']);

// Post Route
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
Route::resource('shops', ShopController::class);

// Garage Route
Route::resource('garages', GarageController::class);
Route::resource('garages_posts', GaragePostController::class);

// Product Route
Route::resource('products', ProductController::class);
Route::get('related_products/{id}', [ProductController::class, 'relatedProducts']);
Route::resource('categories', CategoryController::class);
Route::resource('body_types', BodyTypeController::class);
Route::resource('brands', BrandController::class);
Route::resource('models', ModelController::class);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user_garage', function (Request $request) {
        $user = Auth::user();
        $garage = Garage::where('id', $user->garage_id)->with('expert')->first();
        if (!$garage) {
            return response()->json(['message' => 'No garage found for this user'], 404);
        }
        return response()->json($garage);
    });

    Route::post('user_shop', [ShopController::class, 'user_shop']);
    Route::post('shops', [ShopController::class, 'store']);
    Route::post('shops/{id}', [ShopController::class, 'update']);
    Route::post('products', [ShopController::class, 'storeProduct']);
    Route::post('products/{id}', [ShopController::class, 'updateProduct']);
    Route::get('products/{id}/delete', [ShopController::class, 'deleteProduct']);
});


// Auth API Route
require __DIR__ . '/api_auth.php';
