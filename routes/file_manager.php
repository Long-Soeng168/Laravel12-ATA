<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\R2FileController;
use App\Models\Video;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

Route::middleware('auth')->group(function () {
    // Project Route
    // Route::resource('api/file_manager/files', FileController::class);
    // Route::resource('api/file_manager/folders', FolderController::class);

    // Route::get('/r2', [R2FileController::class, 'index']);
    // Route::post('/r2/upload', [R2FileController::class, 'upload']);
    // Route::delete('/r2/delete', [R2FileController::class, 'delete']);
    // Route::post('/r2/folder', [R2FileController::class, 'createFolder']);
    // Route::get('/r2/view', [R2FileController::class, 'view'])->name('r2.view');
});





// Move File
// Route::get('/move_video_file_to_r2', function () {
//     // Prevent timeout and memory exhaustion for large video files
//     set_time_limit(0);
//     ini_set('memory_limit', '-1');

//     $videos = Video::all();

//     $results = [
//         'success' => [],
//         'missing' => [],
//         'errors'  => [],
//         'skipped' => [] // For videos already on R2
//     ];

//     foreach ($videos as $video) {
//         $filename = $video->video_file;

//         if (!$filename) {
//             continue;
//         }

//         // 1. Skip if it's already an R2 path (starts with 'Videos/')
//         if (str_starts_with($filename, 'Videos/')) {
//             $results['skipped'][] = "ID {$video->id}: Already on R2 ({$filename})";
//             continue;
//         }

//         // 2. Determine local path.
//         // It checks if your DB stored just 'video.mp4' or 'assets/files/videos/video.mp4'
//         $localPath = public_path('assets/files/videos/' . basename($filename));

//         if (!File::exists($localPath)) {
//             // Fallback in case the exact path is different
//             $localPath = public_path($filename);
//             if (!File::exists($localPath)) {
//                 $results['missing'][] = "ID {$video->id}: File not found locally at {$localPath}";
//                 continue;
//             }
//         }

//         try {
//             // 3. Define the new R2 path
//             $r2Path = 'Videos/' . basename($filename);

//             // 4. Open file as a stream to prevent RAM crashes on large videos
//             $stream = fopen($localPath, 'r+');

//             // 5. Upload stream directly to R2
//             $uploaded = Storage::disk('s3')->put($r2Path, $stream);

//             // Close stream immediately
//             if (is_resource($stream)) {
//                 fclose($stream);
//             }

//             if ($uploaded) {
//                 // 6. Update database with new R2 path
//                 $video->update(['video_file' => $r2Path]);

//                 // Optional: Delete local file after successful upload to save space
//                 // File::delete($localPath);

//                 $results['success'][] = "ID {$video->id}: Moved to {$r2Path}";
//             } else {
//                 $results['errors'][] = "ID {$video->id}: Upload to R2 failed for {$filename}";
//             }
//         } catch (\Exception $e) {
//             $results['errors'][] = "ID {$video->id}: Exception - " . $e->getMessage();
//         }
//     }

//     // Return the JSON summary
//     return response()->json([
//         'total_records' => $videos->count(),
//         'summary' => [
//             'success_count' => count($results['success']),
//             'missing_count' => count($results['missing']),
//             'error_count'   => count($results['errors']),
//             'skipped_count' => count($results['skipped']),
//         ],
//         'details' => $results
//     ]);
// });
