<?php

namespace App\Http\Controllers\Api\V2;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Garage;
use App\Models\GaragePost;
use App\Models\Province;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class GaragePostController extends Controller
{
    public function index(Request $request, string $id)
    {
        $query = GaragePost::query();

        // $query->where('garage_id', $id);
        $query->where('status', 'active');

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
                // (e.g., 'item_id', 'post_id', or 'garage_post_id')
                'item_id' => $img->garage_post_id,
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
}
