<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\NokorTechController;
use App\Models\Garage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [NokorTechController::class, 'index']);
Route::get('/about-us', [NokorTechController::class, 'about']);
Route::get('/download-app', [NokorTechController::class, 'download_app']);
Route::get('/privacy', [NokorTechController::class, 'privacy']);
Route::get('/about-us-webview', [NokorTechController::class, 'about_webview']);
Route::get('/privacy-webview', [NokorTechController::class, 'privacy_webview']);
Route::get('/contact-us-webview', [NokorTechController::class, 'contact_webview']);

Route::get('/contact-us', [NokorTechController::class, 'contact']);
Route::post('/submit-message', [MessageController::class, 'store']);

Route::get('/online_trainings', [NokorTechController::class, 'online_trainings']);
Route::get('/online_trainings/{id}', [NokorTechController::class, 'online_training_show']);

Route::get('/blogs', [NokorTechController::class, 'blogs']);
Route::get('/blogs/{id}', [NokorTechController::class, 'blog_show']);

Route::get('/products', [NokorTechController::class, 'products']);
Route::get('/products/{id}', [NokorTechController::class, 'product_show']);

Route::get('/shops', [NokorTechController::class, 'shops']);
Route::get('/shops/{id}', [NokorTechController::class, 'shop_show']);

Route::get('/garages', [NokorTechController::class, 'garages']);
Route::get('/garages/{id}', [NokorTechController::class, 'garage_show']);

Route::get('/shopping-cart', [NokorTechController::class, 'shopping_cart']);
Route::middleware('auth')->group(function () {
    Route::get('/checkout', [NokorTechController::class, 'checkout']);
});
Route::get('/checkout_success', [NokorTechController::class, 'success']);

Route::get('/documents', [NokorTechController::class, 'documents']);

Route::get('/garages_map', function () {
    $locationsData = Garage::get();
    // return $tableData;
    return Inertia::render('nokor-texh/GaragesMap', [
        'locationsData' => $locationsData,
    ]);
});
