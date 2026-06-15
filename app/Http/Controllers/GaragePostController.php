<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Models\Garage;
use App\Models\Link;
use App\Models\GaragePost;
use App\Models\PostCategory;
use App\Models\GaragePostImage;
use App\Models\Type;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class GaragePostController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:garage view', only: ['index', 'show']),
            new Middleware('permission:garage create', only: ['create', 'store']),
            new Middleware('permission:garage update', only: ['edit', 'update', 'update_status']),
            new Middleware('permission:garage delete', only: ['destroy', 'destroy_image']),
        ];
    }

    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');

        $query = GaragePost::query();

        $query->with('created_by', 'updated_by', 'images', 'garage');

        if ($status) {
            $query->where('status', $status);
        }
        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('title_kh', 'LIKE', "%{$search}%");
            });
        }

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        return Inertia::render('admin/garage_posts/Index', [
            'tableData' => $tableData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('admin/garage_posts/Create', [
            'links' => Link::orderBy('title')->where('status', 'active')->get(),
            'postCategories' => PostCategory::where('status', 'active')->orderBy('id', 'desc')->get(),
            'allGarages' => Garage::orderBy('order_index')->orderBy('id', 'desc')->get(),
            'types' => Type::where(['status' => 'active', 'type_of' => 'post'])->orderBy('id', 'desc')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // 1. Validate Data (Using Validator::make for better error redirection on web)
        $validated = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'post_date' => 'nullable|date', // Made nullable in case the frontend doesn't send it
            'title_kh' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'short_description_kh' => 'nullable|string|max:500',
            'garage_id' => 'nullable|exists:garages,id',
            'type' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120', // Standardized to 5MB max
        ])->validate();

        // 2. Resolve Garage ID (Admin vs User Auth)
        if (!empty($validated['garage_id'])) {
            // Admin or specific selection provided
            $garage = Garage::find($validated['garage_id']);
            $validated['garage_id'] = $garage->id;
        } else {
            // Fallback to the authenticated user's attached garage
            $validated['garage_id'] = $user->garage_id ?? null;
        }

        // Fail early if no garage could be determined
        if (empty($validated['garage_id'])) {
            return redirect()->back()->with('error', 'No garage associated with this post.')->withInput();
        }

        $validated['created_by'] = $user->id;
        $validated['updated_by'] = $user->id;

        // Safely parse post_date or default to today
        if (!empty($validated['post_date'])) {
            $validated['post_date'] = Carbon::parse($validated['post_date'])
                ->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();
        } else {
            $validated['post_date'] = now()->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();
        }

        // Clean up empty strings to null
        foreach ($validated as $key => $value) {
            if (is_string($value) && trim($value) === '') {
                $validated[$key] = null;
            }
        }

        $image_files = $request->file('images');
        unset($validated['images']);

        $uploadedImages = [];

        // 3. Safely handle Images OUTSIDE the DB transaction
        if ($image_files) {
            try {
                foreach ($image_files as $image) {
                    // Standardized to 800px to match Item images, or adjust back to 600 if preferred
                    $uploadedImages[] = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/garage_posts', 800);
                }
            } catch (\Exception $e) {
                // Cleanup uploaded files if the loop fails halfway
                foreach ($uploadedImages as $uploadedImage) {
                    if (file_exists(public_path($uploadedImage))) {
                        unlink(public_path($uploadedImage));
                    }
                }
                return redirect()->back()->with('error', 'Image processing failed: ' . $e->getMessage())->withInput();
            }
        }

        // 4. Database Transaction to prevent orphaned records
        try {
            DB::beginTransaction();

            $created_post = GaragePost::create($validated);

            // Save Image Records
            foreach ($uploadedImages as $filename) {
                GaragePostImage::create([
                    'image' => $filename,
                    'post_id' => $created_post->id,
                ]);
            }

            DB::commit();

            return redirect()->back()->with('success', 'Post Created Successfully!');
        } catch (\Exception $e) {
            DB::rollBack();

            // DB failed, cleanup the newly created physical files
            foreach ($uploadedImages as $uploadedImage) {
                if (file_exists(public_path($uploadedImage))) {
                    unlink(public_path($uploadedImage));
                }
            }

            Log::error('Garage post creation DB failure: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create post: ' . $e->getMessage())->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(GaragePost $garage_post)
    {
        return Inertia::render('admin/garage_posts/Create', [
            'links' => Link::orderBy('title')->where('status', 'active')->get(),
            'editData' => $garage_post->load('images'),
            'allGarages' => Garage::orderBy('order_index')->orderBy('id', 'desc')->get(),
            'postCategories' => PostCategory::where('status', 'active')->orderBy('id', 'desc')->get(),
            'types' => Type::where(['status' => 'active', 'type_of' => 'post'])->orderBy('id', 'desc')->get(),
            'readOnly' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */

    public function edit(GaragePost $garage_post)
    {
        return Inertia::render('admin/garage_posts/Create', [
            'links' => Link::orderBy('title')->where('status', 'active')->get(),
            'editData' => $garage_post->load('images'),
            'allGarages' => Garage::orderBy('order_index')->orderBy('id', 'desc')->get(),
            'postCategories' => PostCategory::where('status', 'active')->orderBy('id', 'desc')->get(),
            'types' => Type::where(['status' => 'active', 'type_of' => 'post'])->orderBy('id', 'desc')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GaragePost $garage_post)
    {
        $user = $request->user();

        // 1. Validate Data
        $validated = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'post_date' => 'nullable|date',
            'title_kh' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'short_description_kh' => 'nullable|string|max:500',
            'garage_id' => 'nullable|exists:garages,id',
            'type' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120', // Standardized to 5MB
        ])->validate();

        // 2. Resolve Garage ID
        if (!empty($validated['garage_id'])) {
            $garage = Garage::find($validated['garage_id']);
            $validated['garage_id'] = $garage->id;
        } else {
            // If missing from request, retain the existing garage_id, or fallback to auth user
            $validated['garage_id'] = $garage_post->garage_id ?? $user->garage_id;
        }

        $validated['updated_by'] = $user->id;

        // Safely parse post_date or retain the existing one
        if (!empty($validated['post_date'])) {
            $validated['post_date'] = Carbon::parse($validated['post_date'])
                ->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();
        } else {
            $validated['post_date'] = $garage_post->post_date ?? now()->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();
        }

        // Clean up empty strings to null safely
        foreach ($validated as $key => $value) {
            if (is_string($value) && trim($value) === '') {
                $validated[$key] = null;
            }
        }

        $image_files = $request->file('images');
        unset($validated['images']);

        $uploadedImages = [];

        // 3. Safely handle NEW Images OUTSIDE the DB transaction
        if ($image_files) {
            try {
                foreach ($image_files as $image) {
                    // Standardized to 800px to match previous logic
                    $uploadedImages[] = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/garage_posts', 800);
                }
            } catch (\Exception $e) {
                // Cleanup newly uploaded files if the loop fails halfway
                foreach ($uploadedImages as $uploadedImage) {
                    if (file_exists(public_path($uploadedImage))) {
                        unlink(public_path($uploadedImage));
                    }
                }
                return redirect()->back()->with('error', 'Image processing failed: ' . $e->getMessage())->withInput();
            }
        }

        // 4. Database Transaction to prevent partial updates
        try {
            DB::beginTransaction();

            $garage_post->update($validated);

            // Save New Image Records
            foreach ($uploadedImages as $filename) {
                GaragePostImage::create([
                    'image' => $filename,
                    'post_id' => $garage_post->id,
                ]);
            }

            DB::commit();

            return redirect()->back()->with('success', 'Post Updated Successfully!');
        } catch (\Exception $e) {
            DB::rollBack();

            // DB failed, cleanup the newly created physical files to prevent orphans
            foreach ($uploadedImages as $uploadedImage) {
                if (file_exists(public_path($uploadedImage))) {
                    unlink(public_path($uploadedImage));
                }
            }

            Log::error('Garage post update DB failure: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update post: ' . $e->getMessage())->withInput();
        }
    }

    public function update_status(Request $request, GaragePost $garage_post)
    {
        $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);
        $garage_post->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GaragePost $garage_post)
    {
        if (count($garage_post->images) > 0) {
            foreach ($garage_post->images as $image) {
                ImageHelper::deleteImage($image->image, 'assets/images/garage_posts');
            }
        }
        $garage_post->delete();
        return redirect()->back()->with('success', 'post deleted successfully.');
    }

    public function destroy_image(GaragePostImage $image)
    {
        // Debugging (Check if model is found)
        if (!$image) {
            return redirect()->back()->with('error', 'Image not found.');
        }

        // Call helper function to delete image
        ImageHelper::deleteImage($image->image, 'assets/images/garage_posts');

        // Delete from DB
        $image->delete();

        return redirect()->back()->with('success', 'Image deleted successfully.');
    }
}
