<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/profile', function () {
    if (!Auth::check()) {
        return Inertia::render('frontpage/Profile/ShowLoginAndRegisterPage');
    }

    $user = Auth::user();

    // return [
    //     'userShop' => $user->shop,
    //     'userGarage' => $user->garage,
    // ];
    return Inertia::render('frontpage/Profile/Index', [
        'userShop' => $user->shop,
        'userGarage' => $user->garage,
    ]);
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/user-settings');

    Route::get('/user-settings', function () {
        return Inertia::render('frontpage/Profile/SettingsPage');
    });

    Route::get('/user-settings/profile', function () {
        return Inertia::render('frontpage/Profile/EditProfilePage');
    });
    Route::post('/user-settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/settings/profile/update', [ProfileController::class, 'update']);

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});
