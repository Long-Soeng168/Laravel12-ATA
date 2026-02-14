<?php

use App\Http\Controllers\StreamFileController;
use App\Http\Controllers\StreamR2FileController;
use App\Models\Garage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Default Homepage
Route::get('/', function () {
   // return Inertia::render('LaravelDefaultPage');
   return redirect('/dashboard');
})->name('home');

Route::get('/normal-blade', function () {
   return view('normalblade');
});

// Switch Language
Route::get('/lang/{locale}', function ($locale) {
   if (!in_array($locale, ['en', 'kh'])) {
      abort(404);
   }
   session(['locale' => $locale]);
   return redirect()->back();
});

// Stream File
// Route::get('show_pdf_file/{path}', [StreamFileController::class, 'streamPdf'])->where('path', '.*');
Route::get('show_pdf_file/{path}', [StreamR2FileController::class, 'streamPdf'])->where('path', '.*');

Route::get('/test_google_map', function () {
   return Inertia::render('test_google_map');
});
Route::get('/test_google_map_marker', function () {
   $locationsData = Garage::get();
   // return $tableData;
   return Inertia::render('test_google_map_markers', [
      'locationsData' => $locationsData,
   ]);
});


// ========= Client =========
require __DIR__ . '/nokor_tech.php';



// ========= Admin =========
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

require __DIR__ . '/user-dashboard.php';
require __DIR__ . '/admin.php';

require __DIR__ . '/file_manager.php';
require __DIR__ . '/order.php';


// ========= Telegram Testing Route =========
require __DIR__ . '/telegram.php';

use App\Http\Controllers\R2FileController;

Route::get('/r2', [R2FileController::class, 'index']);
Route::post('/r2/upload', [R2FileController::class, 'upload']);
Route::delete('/r2/delete', [R2FileController::class, 'delete']);
Route::post('/r2/folder', [R2FileController::class, 'createFolder']);
Route::get('/r2/view', [R2FileController::class, 'view'])->name('r2.view');

