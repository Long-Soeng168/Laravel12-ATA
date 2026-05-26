<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\FrontPageController;
use App\Models\Garage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontPageController::class, 'index']);

Route::get('/products', function () {
    return Inertia::render('frontpage/ProductListingPage', []);
});
Route::get('/shops', function () {
    return Inertia::render('frontpage/ShopListingPage', []);
});

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

// Route::get('/products', [FrontPageController::class, 'products']);
Route::get('/products/{id}', [FrontPageController::class, 'product_show']);

// Route::get('/shops', [FrontPageController::class, 'shops']);
Route::get('/shops/{id}', [FrontPageController::class, 'shop_show']);

Route::get('/garages', [FrontPageController::class, 'garages']);
Route::get('/garages/{id}', [FrontPageController::class, 'garage_show']);

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
