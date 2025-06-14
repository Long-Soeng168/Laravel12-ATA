<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\GaragePost;
use App\Models\GaragePostImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Image;

class GaragePostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $garageId = $request->garageId;

        // Start building the query using query()
        $query = GaragePost::query();
        $query->with([
            'images' => function ($q) {
                $q->orderBy('id', 'desc');
            },
        ]);

        // Apply search filter if search term is provided
        if ($search) {
            $query->where('title', 'LIKE', "%$search%");
        }

        // Apply garageId filter if provided
        if ($garageId) {
            $query->where('garage_id', $garageId);
        }

        // Paginate the results
        $garageposts = $query->orderBy('id', 'desc')->paginate(20);

        // Return the results as JSON
        return response()->json($garageposts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'description' => 'required|string|max:1000',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4000',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,svg,webp|max:4048',
        ]);

        // return $request->all();

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }

        $userId = $request->user()->id;
        $garageId = $request->user()->garage_id;

        try {

            $created_post = GaragePost::create([
                'title' => $request->input('title') ?? 'N/A',
                'short_description' => $request->input('description'),
                'garage_id' => $garageId,
                "status" => 'active',
                "created_by" => $request->user()->id,
                "updated_by" => $request->user()->id,
            ]);

            $image_files = $request->file('images');
            $image_file = $request->file('image');
            // Multi Image
            if ($image_files) {
                try {
                    foreach ($image_files as $image) {
                        $created_image_name = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/garage_posts', 600);
                        GaragePostImage::create([
                            'image' => $created_image_name,
                            'post_id' => $created_post->id,
                        ]);
                    }
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to save image.',
                    ], 500);
                }
            }
            // Single Image
            if ($image_file) {
                try {
                    $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/garage_posts', 600);
                    GaragePostImage::create([
                        'image' => $created_image_name,
                        'post_id' => $created_post->id,
                    ]);
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to save image.',
                    ], 500);
                }
            }


            return response()->json([
                'success' => true,
                'message' => 'Post created successfully',
                'post' => $created_post
            ], 200);
        } catch (\Exception $e) {
            // Handle any error during the process
            return response()->json([
                'success' => false,
                'message' => 'Error creating post: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate incoming request 
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'description' => 'required|string|max:1000',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4000',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,svg,webp|max:4048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }

        try {
            // Find the post by ID
            $post = GaragePost::findOrFail($id);
            if ($post->garage_id != $request->user()->garage_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorize!'
                ], 401);
            }

            // Only authorized users can update the post
            if ($request->user()->garage_id !== $post->garage_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to update this post'
                ], 403);
            }

            // Update the image if provided
            $image_files = $request->file('images');
            $image_file = $request->file('image');
            // Multi Image
            if ($image_files) {
                try {
                    foreach ($image_files as $image) {
                        $created_image_name = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/garage_posts', 600);
                        GaragePostImage::create([
                            'image' => $created_image_name,
                            'post_id' => $post->id,
                        ]);
                    }
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to save image.',
                    ], 500);
                }
            }
            // Single Image
            if ($image_file) {
                try {
                    $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/garage_posts', 600);
                    GaragePostImage::create([
                        'image' => $created_image_name,
                        'post_id' => $post->id,
                    ]);
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to save image.',
                    ], 500);
                }
            }

            // Update the description
            $post->title = $request->input('title') ?? 'N/A';
            $post->short_description = $request->input('description');
            $post->updated_by = $request->user()->id;
            $post->save();

            return response()->json([
                'success' => true,
                'message' => 'Post updated successfully',
                'post' => $post
            ], 200);
        } catch (\Exception $e) {
            // Handle any error during the process
            return response()->json([
                'success' => false,
                'message' => 'Error updating post: ' . $e->getMessage()
            ], 500);
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $garagepost = GaragePost::findOrFail($id);
        return response()->json($garagepost);
    }

    public function getPostsByGarage($id)
    {
        $garageposts = GaragePost::where("garage_id", $id)->paginate(10);
        return response()->json($garageposts);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the post by ID
        $post = GaragePost::find($id);



        // Check if post exists
        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found',
            ], 404);
        }

        try {
            if (count($post->images) > 0) {
                foreach ($post->images as $image) {
                    ImageHelper::deleteImage($image->image, 'assets/images/garage_posts');
                }
            }
            $post->delete();

            // Return a success response
            return response()->json([
                'success' => true,
                'message' => 'Post deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            // Handle any error during the process
            return response()->json([
                'success' => false,
                'message' => 'Error deleting post: ' . $e->getMessage(),
            ], 500);
        }
    }
}
