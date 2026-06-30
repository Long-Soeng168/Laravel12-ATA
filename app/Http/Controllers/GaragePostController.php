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
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class GaragePostController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:garage view', only: ['index', 'show']),
            new Middleware('permission:garage create', only: ['create']),
            new Middleware('permission:garage update', only: ['edit', 'update_status']),
            new Middleware('permission:garage delete', only: ['destroy']),
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
    public function user_create_garage_post(Request $request)
    {
        return Inertia::render('admin/garage_posts/UserCreatePost', [
            'types' => Type::where(['status' => 'active', 'type_of' => 'post'])->orderBy('id', 'desc')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 1. Validate Data (Directly using $request->validate)
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'post_date' => 'nullable|date',
            'title_kh' => 'nullable|string|max:255',
            'short_description' => 'required|string|max:500',
            'short_description_kh' => 'nullable|string|max:500',
            'garage_id' => 'nullable|exists:garages,id',
            'type' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
        ]);

        $user = $request->user();

        // 2. Resolve Garage ID safely
        // Use the provided garage_id if it exists, otherwise fall back to the user's garage
        $garageId = $validated['garage_id'] ?? $user->garage_id;

        if (!$garageId) {
            return redirect()->back()->with('error', 'No garage associated with this post.')->withInput();
        }

        $garage = Garage::find($garageId);

        if (!$garage) {
            return redirect()->back()->with('error', 'Garage not found.')->withInput();
        }

        // Authorization: Prevent normal users from creating posts for other people's garages
        if ($validated['garage_id'] && !$user->hasAnyPermission('garage create')) {
            abort(403, 'You do not have permission to create a post for this garage.');
        }

        // 3. Format Dates and Meta
        $validated['garage_id'] = $garage->id;
        $validated['created_by'] = $user->id;
        $validated['updated_by'] = $user->id;

        if (!empty($validated['post_date'])) {
            $validated['post_date'] = Carbon::parse($validated['post_date'])
                ->setTimezone('Asia/Bangkok')->startOfDay()->format('Y-m-d');
        } else {
            $validated['post_date'] = Carbon::now()->setTimezone('Asia/Bangkok')->startOfDay()->format('Y-m-d');
        }

        // 4. Safely handle Images FIRST (outside DB transaction)
        $image_files = $request->file('images');
        unset($validated['images']);

        $uploadedImages = [];
        $imagePath = 'assets/images/garage_posts'; // Defined here so we can reuse it safely

        if ($image_files) {
            try {
                foreach ($image_files as $image) {
                    $uploadedImages[] = ImageHelper::uploadAndResizeImageWebp($image, $imagePath, 800);
                }
            } catch (\Exception $e) {
                // Cleanup uploaded files if the loop fails halfway (Fixed path issue here)
                foreach ($uploadedImages as $filename) {
                    if (file_exists(public_path("{$imagePath}/{$filename}"))) {
                        unlink(public_path("{$imagePath}/{$filename}"));
                    }
                }
                return redirect()->back()->with('error', 'Image processing failed: ' . $e->getMessage())->withInput();
            }
        }

        // 5. Execute DB writes inside ONE Transaction
        try {
            DB::transaction(function () use ($validated, $uploadedImages) {
                $created_post = GaragePost::create($validated);

                foreach ($uploadedImages as $filename) {
                    GaragePostImage::create([
                        'image' => $filename,
                        'post_id' => $created_post->id,
                    ]);
                }
            });
        } catch (\Exception $e) {
            // DB failed, cleanup the newly created physical files (Fixed path issue here too)
            foreach ($uploadedImages as $filename) {
                if (file_exists(public_path("{$imagePath}/{$filename}"))) {
                    unlink(public_path("{$imagePath}/{$filename}"));
                }
            }

            Log::error('Garage post creation DB failure: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create post: ' . $e->getMessage())->withInput();
        }

        // 6. Dynamic Redirect based on ownership
        if ($user->garage_id === $garage->id) {
            return redirect("/garage-profile/{$garage->id}#posts")->with('success', 'Post Created Successfully!');
        }

        // Fallback for Admins who created a post for someone else
        return redirect()->back()->with('success', 'Post Created Successfully!');
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
    public function user_edit_garage_post(String $id)
    {
        $post = GaragePost::findOrFail($id);

        $user = Auth::user();

        // Authorization: Prevent normal users from update posts
        if ($user->garage_id !== $post->garage_id) {
            abort(403, 'You do not have permission to update a post.');
        }

        return Inertia::render('admin/garage_posts/UserCreatePost', [
            'editData' => $post->load('images'),
            'types' => Type::where(['status' => 'active', 'type_of' => 'post'])->orderBy('id', 'desc')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GaragePost $garage_post)
    {
        // 1. Validate Data (Directly using $request->validate)
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'post_date' => 'nullable|date',
            'title_kh' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'short_description_kh' => 'nullable|string|max:500',
            'garage_id' => 'nullable|exists:garages,id',
            'type' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
        ]);

        $user = $request->user();

        // 2. Resolve Garage ID & Authorize
        // Use the provided garage_id, otherwise fallback to the post's current garage
        $garageId = $validated['garage_id'] ?? $garage_post->garage_id;
        $garage = Garage::find($garageId);

        if (!$garage) {
            return redirect()->back()->with('error', 'Garage not found.')->withInput();
        }

        // Authorization Check: Prevent normal users from editing posts they don't own
        // or moving posts to a garage they don't own.
        if ($user->garage_id !== $garage->id && !$user->hasAnyPermission('garage update')) {
            abort(403, 'You do not have permission to update this post.');
        }

        // 3. Format Dates and Meta
        $validated['garage_id'] = $garage->id;
        $validated['updated_by'] = $user->id;

        if (!empty($validated['post_date'])) {
            $validated['post_date'] = Carbon::parse($validated['post_date'])
                ->setTimezone('Asia/Bangkok')->startOfDay()->format('Y-m-d');
        } else {
            $validated['post_date'] = $garage_post->post_date ?? Carbon::now()->setTimezone('Asia/Bangkok')->startOfDay()->format('Y-m-d');
        }

        // 4. Safely handle NEW Images FIRST (outside DB transaction)
        $image_files = $request->file('images');
        unset($validated['images']);

        $uploadedImages = [];
        $imagePath = 'assets/images/garage_posts'; // Defined here so we can reuse it safely

        if ($image_files) {
            try {
                foreach ($image_files as $image) {
                    $uploadedImages[] = ImageHelper::uploadAndResizeImageWebp($image, $imagePath, 800);
                }
            } catch (\Exception $e) {
                // Cleanup newly uploaded files if the loop fails halfway (Path bug fixed here)
                foreach ($uploadedImages as $filename) {
                    if (file_exists(public_path("{$imagePath}/{$filename}"))) {
                        unlink(public_path("{$imagePath}/{$filename}"));
                    }
                }
                return redirect()->back()->with('error', 'Image processing failed: ' . $e->getMessage())->withInput();
            }
        }

        // 5. Execute DB writes inside ONE Transaction
        try {
            DB::transaction(function () use ($validated, $uploadedImages, $garage_post) {
                $garage_post->update($validated);

                foreach ($uploadedImages as $filename) {
                    GaragePostImage::create([
                        'image' => $filename,
                        'post_id' => $garage_post->id,
                    ]);
                }
            });
        } catch (\Exception $e) {
            // DB failed, cleanup the newly created physical files to prevent orphans (Path bug fixed here)
            foreach ($uploadedImages as $filename) {
                if (file_exists(public_path("{$imagePath}/{$filename}"))) {
                    unlink(public_path("{$imagePath}/{$filename}"));
                }
            }

            Log::error('Garage post update DB failure: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update post: ' . $e->getMessage())->withInput();
        }

        // 6. Dynamic Redirect based on ownership
        if ($user->garage_id === $garage->id) {
            return redirect("/garage-profile/{$garage->id}#posts")->with('success', 'Post Updated Successfully!');
        }

        // Fallback for Admins who updated a post for someone else
        return redirect()->back()->with('success', 'Post Updated Successfully!');
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
        $user = Auth::user();

        // Authorization Check: 
        // Abort ONLY IF they are NOT from this garage AND they DO NOT have admin permission.
        if ($user->garage_id !== $garage_post->garage_id && !$user->hasAnyPermission('garage update')) {
            abort(403, 'You do not have permission to delete this post.');
        }

        // Delete associated physical images
        if (count($garage_post->images) > 0) {
            foreach ($garage_post->images as $image) {
                ImageHelper::deleteImage($image->image, 'assets/images/garage_posts');
            }
        }

        // Delete the database record (this will also delete the image records if you have cascading deletes set up)
        $garage_post->delete();

        return redirect()->back()->with('success', 'Post deleted successfully.');
    }

    public function user_delete_garage_post(String $id)
    {
        $garage_post = GaragePost::findOrFail($id);
        $user = Auth::user();
        if ($user->garage_id !== $garage_post->garage_id) {
            abort(403, 'You do not have permission to update this post.');
        }

        if (count($garage_post->images) > 0) {
            foreach ($garage_post->images as $image) {
                ImageHelper::deleteImage($image->image, 'assets/images/garage_posts');
            }
        }
        $garage_post->delete();
        return redirect()->back()->with('success', 'Post deleted successfully.');
    }

    public function destroy_image(GaragePostImage $image)
    {
        $user = Auth::user();

        // Failsafe: Ensure the post relationship exists before checking garage_id
        if (!$image->post) {
            abort(404, 'Parent post not found.');
        }

        $garageId = $image->post->garage_id;

        // Authorization Check: 
        // Abort ONLY IF they are NOT from this garage AND they DO NOT have admin permission.
        if ($user->garage_id !== $garageId && !$user->hasAnyPermission('garage update')) {
            abort(403, 'You do not have permission to delete this image.');
        }

        // Delete the physical file via helper
        ImageHelper::deleteImage($image->image, 'assets/images/garage_posts');

        // Delete the database record
        $image->delete();

        return redirect()->back()->with('success', 'Image deleted successfully.');
    }
}
