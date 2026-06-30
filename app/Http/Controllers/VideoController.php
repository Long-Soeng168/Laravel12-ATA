<?php

namespace App\Http\Controllers;

use App\Helpers\FileHelper;
use App\Helpers\ImageHelper;
use App\Models\Video;
use App\Models\VideoPlayList;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class VideoController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:video view', only: ['index', 'show']),
            new Middleware('permission:video create', only: ['create', 'store']),
            new Middleware('permission:video update', only: ['edit', 'update', 'update_status']),
            new Middleware('permission:video delete', only: ['destroy', 'destroy_image']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');

        $query = Video::query()->with('playlist');

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                $sub_query->where('playlist_code', 'LIKE', "%{$search}%")
                    ->orWhere('title', 'LIKE', "%{$search}%")
                    ->orWhere('title_kh', 'LIKE', "%{$search}%")
                    ->orWhere('id', 'LIKE', "%{$search}%");
            });
        }

        $query->orderBy('id', 'desc');
        // $query->orderBy('playlist_code');
        $query->orderBy($sortBy, $sortDirection);

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        // Map over the paginated items to append the R2 temporary URL
        $tableData->through(function ($video) {
            if ($video->video_file) {
                // Because we stored the full path (e.g. 'Videos/filename.mp4') in the DB
                // during the upload/migration, we can pass $video->video_file directly.
                $video->video_url = \Illuminate\Support\Facades\Storage::disk('s3')->temporaryUrl(
                    $video->video_file,
                    now()->addMinutes(60)
                );
            } else {
                $video->video_url = null;
            }

            return $video;
        });

        return Inertia::render('admin/videos/Index', [
            'tableData' => $tableData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $playlists = VideoPlayList::where('status', 'active')
            ->orderBy('id', 'desc')
            ->get();
        // dd($playlists);

        return Inertia::render('admin/videos/Create', [
            'playlists' => $playlists,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        set_time_limit(3600);
        // dd($request->all());
        $validated = $request->validate([
            'is_free' => 'nullable|boolean',
            'title' => 'required|string|max:255',
            'title_kh' => 'nullable|string|max:255',
            'video_file' => 'required|file|mimes:mp4|max:1258291', // 300MB
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'playlist_code' => 'nullable|string|max:255',
            'order_index' => 'required|numeric|min:1|max:255',
            'status' => 'nullable|string|in:active,inactive',
            'short_description' => 'nullable|string',
            'short_description_kh' => 'nullable|string',
            'total_view_counts' => 'nullable|integer|min:0',
        ]);

        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;

        $image_file = $request->file('image');
        $video_file = $request->file('video_file');
        unset($validated['image']);
        unset($validated['video_file']);

        if ($image_file) {
            try {
                $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/videos', 600);
                $validated['image'] = $created_image_name;
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
            }
        }

        if ($video_file) {
            try {
                // Upload directly to Cloudflare R2 (s3 disk) into the 'Videos' directory
                $path = \Illuminate\Support\Facades\Storage::disk('s3')->putFile('Videos', $video_file);
                $validated['video_file'] = $path;
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to upload video to R2: ' . $e->getMessage());
            }
        }

        // if ($video_file) {
        //     try {
        //         $created_video_file  = FileHelper::uploadFile($video_file, 'assets/files/videos', true);
        //         $validated['video_file'] = $created_video_file;
        //     } catch (\Exception $e) {
        //         return redirect()->back()->with('error', 'Failed to upload video: ' . $e->getMessage());
        //     }
        // }

        \Illuminate\Support\Facades\DB::transaction(function () use ($validated) {
            Video::create($validated);
        });

        return redirect()->back()->with('success', 'Video created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        // Append the R2 temporary URL so the frontend can preview the current video
        if ($video->video_file) {
            $video->video_url = \Illuminate\Support\Facades\Storage::disk('s3')->temporaryUrl(
                $video->video_file,
                now()->addMinutes(60)
            );
        } else {
            $video->video_url = null;
        }

        return Inertia::render('admin/videos/Create', [
            'editData' => $video,
            'playlists' => VideoPlayList::where('status', 'active')->orderBy('id', 'desc')->get(),
            'readOnly' => true,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Video $video)
    {
        // Append the R2 temporary URL so the frontend can preview the current video
        if ($video->video_file) {
            $video->video_url = \Illuminate\Support\Facades\Storage::disk('s3')->temporaryUrl(
                $video->video_file,
                now()->addMinutes(60)
            );
        } else {
            $video->video_url = null;
        }

        return Inertia::render('admin/videos/Create', [
            'editData' => $video,
            'playlists' => VideoPlayList::where('status', 'active')->orderBy('id', 'desc')->get(),
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video)
    {
        set_time_limit(3600);
        $validated = $request->validate([
            'is_free' => 'nullable|boolean',
            'title' => 'required|string|max:255',
            'title_kh' => 'nullable|string|max:255',
            'playlist_code' => 'nullable|string|max:255',
            'order_index' => 'required|numeric|min:1|max:255',
            'status' => 'nullable|string|in:active,inactive',
            'short_description' => 'nullable|string',
            'short_description_kh' => 'nullable|string',
            'total_view_counts' => 'nullable|integer|min:0',
        ]);
        $validated['updated_by'] = $request->user()->id;

        $image_file = $request->file('image');
        unset($validated['image']);

        foreach ($validated as $key => $value) {
            if ($value === '') {
                $validated[$key] = null;
            }
        }

        if ($image_file) {
            try {
                $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/videos', 600);
                $validated['image'] = $created_image_name;

                if ($video->image && $created_image_name) {
                    ImageHelper::deleteImage($video->image, 'assets/images/videos');
                }
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
            }
        }
        // if ($video_file = $request->file('video_file')) {
        //     try {
        //         $created_video_file  = FileHelper::uploadFile($video_file, 'assets/files/videos', true);
        //         $validated['video_file'] = $created_video_file;

        //         // if ($video->video_file && $created_video_file) {
        //         //     FileHelper::deleteFile($video->video_file, 'assets/files/videos');
        //         // }
        //     } catch (\Exception $e) {
        //         return redirect()->back()->with('error', 'Failed to upload video: ' . $e->getMessage());
        //     }
        // }
        if ($video_file = $request->file('video_file')) {
            try {
                // Upload new video directly to Cloudflare R2 (s3 disk)
                $path = \Illuminate\Support\Facades\Storage::disk('s3')->putFile('Videos', $video_file);
                $validated['video_file'] = $path;

                // Delete the old video from R2 if it exists
                if ($video->video_file && $path) {
                    \Illuminate\Support\Facades\Storage::disk('s3')->delete($video->video_file);
                }
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to upload video to R2: ' . $e->getMessage());
            }
        }
        \Illuminate\Support\Facades\DB::transaction(function () use ($validated, $video) {
            $video->update($validated);
        });

        return redirect()->back()->with('success', 'Video updated successfully!');
    }
    public function update_status(Request $request, Video $video)
    {
        $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);
        $video->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }
    public function videos_free_status(Request $request, Video $video)
    {
        $request->validate([
            'status' => 'required|string|in:free,purchase',
        ]);
        $video->update([
            'is_free' => $request->status == 'free',
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        // Delete image if exists
        // if ($video->image) {
        //     ImageHelper::deleteImage($video->image, 'assets/images/videos');
        // }
        // if ($video->video_file) {
        //     FileHelper::deleteFile($video->video_file, 'assets/files/videos');
        // }
        $video->delete();

        return redirect()->route('videos.index')->with('success', 'Video deleted successfully!');
    }
}
