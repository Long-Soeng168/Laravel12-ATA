<?php

namespace App\Http\Controllers\Api\V2;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Garage;
use App\Models\GaragePost;
use App\Models\GaragePostImage;
use App\Models\Province;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class GaragePostController extends Controller
{
    public function index(Request $request)
    {
        $query = GaragePost::query();

        $query->where('status', 'active');

        $query->where('garage_id', $request->garage_id);

        if ($request->filled('q')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->q . '%')
                    ->orWhere('short_description', 'like', '%' . $request->q . '%');
            });
        }

        $posts = $query->orderByDesc('id')->paginate(16);

        $posts->getCollection()->transform(function ($item) {

            // --- Image Optimization for Flutter List ---
            $firstImage = $item->images->first();

            $item->image_url = $firstImage
                ? asset('assets/images/garage_posts/' . $firstImage->image)
                : asset('assets/images/placeholder.webp');

            $item->total_images = $item->images->count();

            $item->makeHidden(['images']);

            return $item;
        });

        return response()->json($posts);
    }
    public function show(Request $request, string $id)
    {
        // 1. Fetch the post and eager load images
        $post = GaragePost::with('images')
            ->where('id', $id)
            ->where('status', 'active')
            ->first();

        // 2. Handle 404 cleanly via API
        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Garage post not found or is inactive.'
            ], 404);
        }

        $post->increment('total_view_counts');

        // 3. Convert the model to an array so we can safely inject our custom formats
        $formattedPost = $post->toArray();

        // 4. Format the images array exactly as requested
        $formattedPost['images'] = $post->images->map(function ($img) {
            return [
                'id' => $img->id,
                'image' => $img->image,
                // Note: I used 'garage_posts' folder based on your first snippet. 
                // Change it to 'items' if that's where they are actually stored!
                'url' => asset('assets/images/garage_posts/' . $img->image),
                // Update this foreign key to match your actual database column 
                // (e.g., 'item_id', 'post_id', or 'post_id')
                'item_id' => $img->post_id,
            ];
        });

        // 5. Keep your root-level image helpers for Flutter (optional, but good for list-style previews)
        $firstImage = $post->images->first();

        $formattedPost['image_url'] = $firstImage
            ? asset('assets/images/garage_posts/' . $firstImage->image)
            : asset('assets/images/placeholder.webp');

        $formattedPost['total_images'] = $post->images->count();

        // 6. Return the perfectly formatted JSON
        return response()->json($formattedPost);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        // 1. Critical Security Check: Ensure user is authenticated immediately
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.'
            ], 401);
        }

        // 2. Pre-Check: Does the user actually have a valid garage to post to?
        if (!$user->garage_id) {
            return response()->json([
                'success' => false,
                'message' => 'You must own a garage before creating a post.'
            ], 403);
        }

        // Optional but recommended: Verify their garage hasn't been soft-deleted
        $garage = Garage::withTrashed()->find($user->garage_id);
        if (!$garage || $garage->trashed()) {
            return response()->json([
                'success' => false,
                'message' => 'Your garage is missing or deactivated.'
            ], 403);
        }

        // 3. Validate Data
        $validator = Validator::make($request->all(), [
            'title'             => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'images'            => 'required|array|min:1',
            'images.*'          => 'required|image|mimes:jpeg,png,jpg,webp|max:5120', // Added 'required' to the array items
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        // 4. Database Transaction with Try/Catch
        try {
            return DB::transaction(function () use ($request, $validated, $user) {

                // Create the GaragePost dynamically using the authenticated user's data
                $post = GaragePost::create([
                    'title'             => $validated['title'],
                    'short_description' => $validated['short_description'] ?? null,
                    'status'            => 'active',
                    'garage_id'         => $user->garage_id, // Dynamically assigned!
                    'created_by'        => $user->id,        // Dynamically assigned!
                    'updated_by'        => $user->id,        // Dynamically assigned!
                ]);

                // 5. Handle Image Uploads
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        // Upload and Resize
                        $filename = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/garage_posts', 800);

                        // Save to your GaragePostImage model
                        GaragePostImage::create([
                            'post_id' => $post->id,
                            'image'   => $filename,
                        ]);
                    }
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Garage post created successfully.',
                    'data'    => $post->load('images') // Assuming you have a `public function images()` relation on GaragePost
                ], 201);
            });
        } catch (\Exception $e) {
            // Catch any image upload or DB errors safely
            return response()->json([
                'success' => false,
                'message' => 'Failed to create garage post. ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        $user = $request->user();

        // 1. Critical Security Check: Ensure user is authenticated
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.'
            ], 401);
        }

        // 2. Find the post
        $post = GaragePost::find($id); // find() is cleaner than where('id', $id)->first()

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Garage post not found.'
            ], 404);
        }

        // 3. Ownership Authorization Check (Fail Fast)
        // Ensures the user updating the post is the one who created it (or owns the garage)
        if ($post->created_by !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to update this post.'
            ], 403);
        }

        // 4. Pre-process multipart/form-data strings from Flutter
        $input = $request->all();

        // Flutter often sends arrays as JSON strings in multipart requests
        if (isset($input['deleted_image_ids']) && is_string($input['deleted_image_ids'])) {
            $input['deleted_image_ids'] = json_decode($input['deleted_image_ids'], true);
        }

        // 5. Validate Data
        $validator = Validator::make($input, [
            'title'               => 'required|string|max:255',
            'short_description'   => 'nullable|string',
            'images'              => 'nullable|array',
            'images.*'            => 'image|mimes:jpeg,png,jpg,webp|max:5120',
            'deleted_image_ids'   => 'nullable|array',
            'deleted_image_ids.*' => 'integer|exists:garage_post_images,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors'  => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        // 6. Database Transaction with Try/Catch
        try {
            return DB::transaction(function () use ($request, $validated, $post, $user) {

                // Update basic info using VALIDATED data (not raw request data)
                $post->update([
                    'title'             => $validated['title'],
                    'short_description' => $validated['short_description'] ?? null,
                    'updated_by'        => $user->id, // Track who made the update
                ]);

                // 7. Handle Image Deletions
                if (!empty($validated['deleted_image_ids'])) {
                    // Fetch images securely scoped to this post
                    $imagesToDelete = GaragePostImage::where('post_id', $post->id)
                        ->whereIn('id', $validated['deleted_image_ids'])
                        ->get();

                    foreach ($imagesToDelete as $imageModel) {
                        // Tip: You can add code here to physically delete the image from storage
                        // Storage::delete($imageModel->image);
                        $imageModel->delete();
                    }
                }

                // 8. Handle New Image Uploads
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $filename = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/garage_posts', 1000);

                        GaragePostImage::create([
                            'post_id' => $post->id,
                            'image'   => $filename,
                        ]);
                    }
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Garage post updated successfully.',
                    'data'    => $post->load('images') // Returns the updated post with its fresh relationship
                ], 200);
            });
        } catch (\Exception $e) {
            // Safely catch any image upload or DB errors
            return response()->json([
                'success' => false,
                'message' => 'Failed to update garage post. ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Request $request, string $id)
    {
        $user = $request->user();

        // 1. Critical Security Check: Ensure user is authenticated
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.'
            ], 401);
        }

        // 2. Find the post and eager load the images
        $post = GaragePost::with('images')->find($id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Garage post not found.'
            ], 404);
        }

        // 3. Ownership Authorization Check (Fail Fast)
        if ($post->created_by !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to delete this post.'
            ], 403);
        }

        // 4. Safely Delete Database Records First
        try {
            // Store image paths in an array in memory before we delete the DB records
            $imagePaths = $post->images->pluck('image')->toArray();

            DB::transaction(function () use ($post) {
                // Delete the related image rows in the database (Prevents orphaned rows)
                $post->images()->delete();

                // Delete the main post
                $post->delete();
            });

            // 5. Delete physical files ONLY after the DB transaction safely commits
            foreach ($imagePaths as $path) {
                ImageHelper::deleteImage($path, 'assets/images/garage_posts');
                ImageHelper::deleteImage($path, 'assets/images/garage_posts/thumb');
            }

            return response()->json([
                'success' => true,
                'message' => 'Garage post and associated images deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            // Safely catch DB errors and prevent partial deletions
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete post. ' . $e->getMessage()
            ], 500);
        }
    }
}
