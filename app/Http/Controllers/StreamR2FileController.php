<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class StreamR2FileController extends Controller
{
    public function streamPdf($path)
    {
        // Convert ~ back to / if you are passing paths from your FileExploreController
        $path = str_replace('~', '/', $path);

        if (!Storage::disk('s3')->exists($path)) {
            abort(404, "PDF not found in R2");
        }

        // Get file metadata from R2
        $size = Storage::disk('s3')->size($path);
        $mime = Storage::disk('s3')->mimeType($path) ?? 'application/pdf';

        return response()->stream(function () use ($path) {
            $stream = Storage::disk('s3')->readStream($path);
            fpassthru($stream);
            if (is_resource($stream)) {
                fclose($stream);
            }
        }, 200, [
            'Content-Type' => $mime,
            'Content-Length' => $size,
            'Content-Disposition' => 'inline; filename="' . basename($path) . '"',
        ]);
    }

    public function streamVideo($fileName)
    {

        // Ensure that only authorized users can access the stream
        // if (!auth()->check()) {
        //     abort(403);
        // }

        $filePath = storage_path('videos/original/' . $fileName);

        // return $filePath;
        if (!file_exists($filePath)) {
            abort(404); // File not found
        }

        $stream = new \Symfony\Component\HttpFoundation\StreamedResponse(function () use ($filePath) {
            $stream = fopen($filePath, 'r');
            fpassthru($stream);
            fclose($stream);
        });

        $stream->headers->set('Content-Type', 'video/mp4');
        $stream->headers->set('Content-Length', filesize($filePath));

        return $stream;
    }
}
