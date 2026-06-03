<?php

use App\Http\Controllers\FrontPage\GarageController;
use App\Http\Controllers\FrontPage\ProductController;
use App\Http\Controllers\FrontPage\ShopController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\FrontPageController;
use App\Models\Garage;
use App\Models\ItemCategory;
use App\Models\Province;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontPageController::class, 'index']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/shops', [ShopController::class, 'index']);
Route::get('/shops/{id}', [ShopController::class, 'show']);

Route::get('/garages', [GarageController::class, 'index']);
Route::get('/garages/{id}', [GarageController::class, 'show']);

Route::get('/about', [FrontPageController::class, 'about']);
Route::get('/contact', [FrontPageController::class, 'contact']);

Route::get('/download-app', [FrontPageController::class, 'download_app']);
Route::get('/privacy', [FrontPageController::class, 'privacy']);

Route::get('/about-us-webview', [FrontPageController::class, 'about_webview']);
Route::get('/privacy-webview', [FrontPageController::class, 'privacy_webview']);
Route::get('/contact-us-webview', [FrontPageController::class, 'contact_webview']);

Route::post('/submit-message', [MessageController::class, 'store']);

Route::get('/online_trainings', [FrontPageController::class, 'online_trainings']);
Route::get('/online_trainings/{id}', [FrontPageController::class, 'online_training_show']);

Route::get('/blogs', [FrontPageController::class, 'blogs']);
Route::get('/blogs/{id}', [FrontPageController::class, 'blog_show']);

Route::get('/shopping-cart', [FrontPageController::class, 'shopping_cart']);
Route::middleware('auth')->group(function () {
    Route::get('/checkout', [FrontPageController::class, 'checkout']);
});
Route::get('/checkout_success', [FrontPageController::class, 'success']);

Route::get('/documents', [FrontPageController::class, 'documents']);

Route::get('/garages_map', function () {
    $locationsData = Garage::get();
    // return $tableData;
    return Inertia::render('frontpage/GaragesMap', [
        'locationsData' => $locationsData,
    ]);
});
