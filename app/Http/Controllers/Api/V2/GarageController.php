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

class GarageController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $province_code = $request->input('province_code');
        $query = Garage::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('address', 'LIKE', "%$search%")
                    ->orWhere('short_description', 'LIKE', "%$search%");
            });
        }

        $query->with('province');
        $query->where('status', 'approved');
        $query->orderBy('order_index');
        $query->orderBy('name');

        if ($province_code) {
            $query->where('province_code', $province_code);
        }

        $garages = $query->paginate(20);

        // Transform the collection inside the paginator
        $garages->getCollection()->transform(function ($item) {
            // Map the new URL fields
            $item->logo_url = $item->logo ? asset('assets/images/garages/thumb/' . $item->logo) : null;
            $item->banner_url = $item->banner ? asset('assets/images/garages/thumb/' . $item->banner) : null;

            return $item;
        });

        return response()->json($garages);
    }

    public function show(Request $request, string $id)
    {
        // 1. Find the specific shop by ID and ensure it is approved
        $garage = Garage::find($id);

        // 2. Handle 404 if the shop doesn't exist or isn't approved
        if (!$garage) {
            return response()->json(['message' => 'Garage not found'], 404);
        }

        // 3. Transform the single object (No need for transform() on a collection)
        $garage->logo_url = $garage->logo ? asset('assets/images/garages/' . $garage->logo) : null;
        $garage->banner_url = $garage->banner ? asset('assets/images/garages/' . $garage->banner) : null;

        return response()->json($garage);
    }
    public function posts(Request $request, string $id)
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
    public function post_show(Request $request, string $id)
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

    public function garages_for_map(Request $request)
    {
        $search   = $request->input('search');
        $province_code = $request->input('province_code');

        // New parameters for spatial filtering
        $lat    = $request->input('lat');
        $lng    = $request->input('lng');
        $radius = $request->input('radius', 50); // Default 50km

        $query = Garage::with('province')->where('status', 'approved');

        // Optimization: Spatial Filter (Haversine Formula)
        if ($lat && $lng) {
            $query->selectRaw("*, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance", [$lat, $lng, $lat])
                ->having('distance', '<=', $radius);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('address', 'LIKE', "%$search%");
            });
        }

        if ($province_code) {
            $query->where('province_code', $province_code);
        }

        $query->orderBy('order_index');

        // limit results to 100 for map performance
        $garages = $query->paginate(100);

        $garages->getCollection()->transform(function ($item) {
            // Map the new URL fields
            $item->logo_url = $item->logo ? asset('assets/images/garages/thumb/' . $item->logo) : null;
            $item->banner_url = $item->banner ? asset('assets/images/garages/thumb/' . $item->banner) : null;

            return $item;
        });

        return response()->json($garages);
    }

    public function provinces()
    {
        $provinces = Province::orderBy('order_index')->orderBy('name_kh')->get();
        return response()->json($provinces);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        // 1. Critical Security Check: Ensure user is authenticated
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized or user not found.'
            ], 401);
        }

        // 2. Pre-Database Logical Checks (Fail fast before validation)
        if ($user->garage_id !== null) {
            $garage = Garage::withTrashed()->find($user->garage_id);

            if (!$garage) {
                // The ID exists on the user, but the garage was hard-deleted. Clean it up.
                $user->update(['garage_id' => null]);
            } elseif ($garage->trashed()) {
                // Garage exists but is soft-deleted
                return response()->json([
                    'success' => false,
                    'message' => 'You already have a garage, but it is currently disabled/deleted.'
                ], 409);
            } else {
                // Garage is active
                return response()->json([
                    'success' => false,
                    'message' => 'User already has an active garage.'
                ], 409);
            }
        }

        // 3. Pre-process multipart/form-data strings from Flutter
        $input = $request->all();
        if (isset($input['other_phones']) && is_string($input['other_phones'])) {
            $input['other_phones'] = json_decode($input['other_phones'], true);
        }

        // 4. Validate Data
        $validator = Validator::make($input, [
            'name' => 'required|string|max:255',
            'phone' => 'required|numeric|digits_between:8,15',
            'other_phones' => 'nullable|array',
            'other_phones.*' => ['nullable', 'string', 'regex:/^(0|\+855)(\d{8,10})$/'],
            'short_description' => 'nullable|string|max:1000',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            'banner' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            'address' => 'required|string|max:255',
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'province_code' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        // 5. Database Transaction
        try {
            return DB::transaction(function () use ($request, $validated, $user) {

                // Assign Authorship
                $validated['owner_user_id'] = $user->id;
                $validated['created_by']    = $user->id;
                $validated['updated_by']    = $user->id;
                $validated['status']        = 'pending';
                $validated['order_index']   = 10000;
                $validated['expired_at']    = now()->addYears(2)->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();

                // Process Images (No 'else' needed because validation guarantees they exist)
                $validated['logo']   = ImageHelper::uploadAndResizeImageWebp($request->file('logo'), 'assets/images/garages', 600);
                $validated['banner'] = ImageHelper::uploadAndResizeImageWebp($request->file('banner'), 'assets/images/garages', 1200);

                // Create the Garage
                $garage = Garage::create($validated);

                // Update the User's garage_id 
                $user->update([
                    'garage_id' => $garage->id,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Garage created successfully!',
                    'data' => $garage
                ], 201);
            });
        } catch (\Exception $e) {
            // Safely catch any upload or DB errors and return a proper JSON response
            return response()->json([
                'success' => false,
                'message' => 'Failed to create garage. ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();

        // 1. Critical Security Check: Ensure user is authenticated immediately
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.'
            ], 401);
        }

        // 2. Find the Garage
        $garage = Garage::find($id);

        if (!$garage) {
            return response()->json([
                'success' => false,
                'message' => 'Garage not found.'
            ], 404);
        }

        // 3. Authorization Check (Fail fast before heavy processing)
        if ($garage->owner_user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to update this garage.'
            ], 403);
        }

        // 4. Pre-process multipart/form-data strings from Flutter
        $input = $request->all();
        if (isset($input['other_phones']) && is_string($input['other_phones'])) {
            $input['other_phones'] = json_decode($input['other_phones'], true);
        }

        // 5. Validate Data
        $validator = Validator::make($input, [
            'name' => 'required|string|max:255',
            'phone' => 'required|numeric|digits_between:8,15',
            'other_phones' => 'nullable|array',
            'other_phones.*' => ['nullable', 'string', 'regex:/^(0|\+855)(\d{8,10})$/'],
            'short_description' => 'nullable|string|max:1000',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            'address' => 'required|string|max:255',
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'province_code' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        if (!$request->has('other_phones')) {
            $validated['other_phones'] = null; // Note: Change to [] if your DB column requires an array instead of null
        }

        // 6. Database Transaction with Try/Catch
        try {
            return DB::transaction(function () use ($request, $validated, $garage, $user) {

                // Set the updater ID
                $validated['updated_by'] = $user->id;

                // Process Images
                if ($request->hasFile('logo')) {
                    // Tip: Add logic here to delete $garage->logo from storage if it exists
                    $validated['logo'] = ImageHelper::uploadAndResizeImageWebp($request->file('logo'), 'assets/images/garages', 600);
                } else {
                    unset($validated['logo']); // Prevent overwriting existing logo with null
                }

                if ($request->hasFile('banner')) {
                    // Tip: Add logic here to delete $garage->banner from storage if it exists
                    $validated['banner'] = ImageHelper::uploadAndResizeImageWebp($request->file('banner'), 'assets/images/garages', 1200);
                } else {
                    unset($validated['banner']); // Prevent overwriting existing banner with null
                }

                // Update the existing Garage model
                $garage->update($validated);

                return response()->json([
                    'success' => true,
                    'message' => 'Garage updated successfully!',
                    'data' => $garage->fresh()
                ], 200);
            });
        } catch (\Exception $e) {
            // Safely catch any errors and return a JSON response
            return response()->json([
                'success' => false,
                'message' => 'Failed to update garage. ' . $e->getMessage()
            ], 500);
        }
    }
}
