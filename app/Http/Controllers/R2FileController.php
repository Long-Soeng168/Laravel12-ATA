<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class R2FileController extends Controller
{
    private $disk = 's3';

    public function index(Request $request)
    {
        $path = $request->get('path', '');

        $folders = collect(Storage::disk($this->disk)->directories($path))
            ->map(fn($dir) => [
                'name' => basename($dir),
                'path' => $dir,
                'type' => 'folder',
            ]);

        $files = collect(Storage::disk($this->disk)->files($path))
            ->map(fn($file) => [
                'name' => basename($file),
                'path' => $file,
                'type' => 'file',
                'size' => Storage::disk($this->disk)->size($file),
                'url'  => route('r2.view', ['path' => $file]),
            ]);


        return Inertia::render('R2Manager/Index', [
            'items' => $folders->merge($files)->values(),
            'currentPath' => $path,
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:51200',
            'path' => 'nullable|string'
        ]);

        $path = $request->path ?? '';

        Storage::disk($this->disk)
            ->putFile($path, $request->file('file'));

        return back();
    }

    public function delete(Request $request)
    {
        $path = $request->path;

        if (Storage::disk($this->disk)->exists($path)) {
            Storage::disk($this->disk)->delete($path);
        } else {
            Storage::disk($this->disk)->deleteDirectory($path);
        }

        return back();
    }

    public function createFolder(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'path' => 'nullable|string'
        ]);

        $dir = trim(($request->path ? $request->path . '/' : '') . $request->name, '/');

        Storage::disk($this->disk)->makeDirectory($dir);

        return back();
    }

    public function view(Request $request)
    {
        $path = $request->get('path');

        abort_unless($path, 404);

        if (!Storage::disk('s3')->exists($path)) {
            abort(404);
        }
        $url = Storage::disk('s3')->temporaryUrl(
            $path,
            now()->addMinutes(5),
            [
                'ResponseContentDisposition' => 'inline',
            ]
        );

        return redirect($url);
    }
}
