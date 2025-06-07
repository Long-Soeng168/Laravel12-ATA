<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GaragePost;
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
            'description' => 'required|string|max:1000',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4000',
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
            // Store the image if provided
            $imageName = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $fileName = time() . '_' . $image->getClientOriginalName();
                $imagePath = public_path('assets/images/garageposts/' . $fileName);
                $thumbPath = public_path('assets/images/garageposts/thumb/' . $fileName);

                try {
                    // Create an image instance and save the original image
                    $uploadedImage = Image::make($image->getRealPath())->save($imagePath);

                    // Resize image to create a thumbnail
                    $uploadedImage->resize(500, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($thumbPath);

                    // Store the filename
                    $imageName = $fileName;
                } catch (Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to save image.',
                    ], 500);
                }
            }

            // Create a post entry in the database
            $post = GaragePost::create([
                'description' => $request->input('description'),
                'image' => $imageName, // Save the image filename
                'garage_id' => $garageId, // Garage ID
                'create_by_user_id' => $userId, // Associated user
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Post created successfully',
                'post' => $post
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
            'description' => 'required|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4000', // Image is optional for updates
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

            // Only authorized users can update the post
            if ($request->user()->garage_id !== $post->garage_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to update this post'
                ], 403);
            }

            // Update the image if provided
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $fileName = time() . '_' . $image->getClientOriginalName();
                $imagePath = public_path('assets/images/garageposts/' . $fileName);
                $thumbPath = public_path('assets/images/garageposts/thumb/' . $fileName);

                try {
                    // Create an image instance and save the original image
                    $uploadedImage = Image::make($image->getRealPath())->save($imagePath);

                    // Resize image to create a thumbnail
                    $uploadedImage->resize(500, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($thumbPath);

                    // Delete the old image files if they exist
                    if ($post->image) {
                        $oldImagePath = public_path('assets/images/garageposts/' . $post->image);
                        $oldThumbPath = public_path('assets/images/garageposts/thumb/' . $post->image);
                        if (file_exists($oldImagePath)) {
                            unlink($oldImagePath);
                        }
                        if (file_exists($oldThumbPath)) {
                            unlink($oldThumbPath);
                        }
                    }

                    // Update the image filename in the post
                    $post->image = $fileName;
                } catch (Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to save image.',
                    ], 500);
                }
            }

            // Update the description
            $post->description = $request->input('description');
            $post->save();

            return response()->json([
                'success' => true,
                'message' => 'Post updated successfully',
                'post' => $post
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found'
            ], 404);
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
            // Optionally delete the image if it exists
            if ($post->image) {
                $imagePath = public_path('assets/images/garageposts/' . $post->image);
                $thumbPath = public_path('assets/images/garageposts/thumb/' . $post->image);

                // Delete image and thumbnail from server
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
                if (file_exists($thumbPath)) {
                    unlink($thumbPath);
                }
            }

            // Delete the post
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
