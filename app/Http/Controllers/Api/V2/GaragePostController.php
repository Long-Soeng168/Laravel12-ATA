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
        // =========================================================================
        // 🧪 RANDOM ERROR GENERATOR FOR FLUTTER TESTING
        // =========================================================================
        $testingMode = false;
        if ($testingMode) {
            $chance = rand(1, 100);
            if ($chance <= 15) return response()->json(['message' => 'Unauthenticated.'], 401);
            if ($chance <= 30) return response()->json(['message' => 'This action is unauthorized.'], 403);
            if ($chance <= 45) return response()->json(['message' => 'The requested resource was not found.'], 404);
            if ($chance <= 60) return response()->json(['success' => false, 'message' => 'Server Error'], 500);
            if ($chance <= 100) {
                return response()->json([
                    'success' => false,
                    'message' => 'The given data was invalid.',
                    'errors' => [
                        'title' => ['The title field is required.'],
                        'images' => ['Please upload at least one image.']
                    ]
                ], 422);
            }
        }

        // 1. Validate Data (Simplified for GaragePost)
        $validator = Validator::make($request->all(), [
            'title'             => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'images'            => 'required|array|min:1',
            'images.*'          => 'image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB limit
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Database Transaction
        return DB::transaction(function () use ($request) {

            // Create the GaragePost
            $post = GaragePost::create([
                'title'             => $request->title,
                'short_description' => $request->short_description,
                'status'            => 'active', // Default status
                'updated_by'           => 1,
                'created_by'           => 1,
                'garage_id'           => 888,
            ]);

            // 3. Handle Image Uploads
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    // Upload and Resize (Adjust path to garage_posts)
                    $filename = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/garage_posts', 800);

                    // Save to your GaragePostImage model
                    GaragePostImage::create([
                        'post_id' => $post->id,
                        'image'          => $filename,
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Garage post created successfully.',
                'data'    => $post->load('images')
            ], 201);
        });
    }

    public function update(Request $request, string $id)
    {
        // 1. Find the post
        $post = GaragePost::where('id', $id)->first();

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Garage post not found.'
            ], 404);
        }

        // 2. Validate Data
        $validator = Validator::make($request->all(), [
            'title'             => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'images'            => 'nullable|array', // Optional during update
            'images.*'          => 'image|mimes:jpeg,png,jpg,webp|max:5120',

            'deleted_image_ids' => 'nullable|array',
            'deleted_image_ids.*' => 'integer|exists:garage_post_images,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        // 3. Database Transaction
        return DB::transaction(function () use ($request, $post) {

            // Update basic info
            $post->update([
                'title'             => $request->title,
                'short_description' => $request->short_description,
            ]);

            // 4. Handle Image Uploads (Only if new images are provided)
            if ($request->has('deleted_image_ids') && is_array($request->deleted_image_ids)) {
                // Fetch images that belong to this specific item to prevent deleting other users' images
                $imagesToDelete = GaragePostImage::where('post_id', $post->id)
                    ->whereIn('id', $request->deleted_image_ids)
                    ->get();

                foreach ($imagesToDelete as $imageModel) {
                    $imageModel->delete();
                }
            }
            if ($request->hasFile('images')) {


                foreach ($request->file('images') as $image) {
                    $filename = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/garage_posts', 800);

                    GaragePostImage::create([
                        'post_id' => $post->id,
                        'image'          => $filename,
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Garage post updated successfully.',
                'data'    => $post->load('images')
            ], 200);
        });
    }

    public function destroy($id)
    {
        $item = GaragePost::findOrFail($id);

        foreach ($item->images as $image) {
            ImageHelper::deleteImage($image->image, 'assets/images/garage_posts');
        }

        $item->delete();
        return response()->json(['success' => true, 'message' => 'Post deleted']);
    }
}
