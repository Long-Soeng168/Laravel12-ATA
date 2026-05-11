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
        $query->orderBy('id', 'desc');

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
        // =========================================================================
        // 🧪 RANDOM ERROR GENERATOR FOR FLUTTER TESTING
        // Set to 'false' when you are done testing!
        // =========================================================================
        $testingMode = false;

        if ($testingMode) {
            $chance = rand(1, 100);

            if ($chance <= 15) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            } elseif ($chance <= 30) {
                return response()->json(['message' => 'This action is unauthorized.'], 403);
            } elseif ($chance <= 45) {
                return response()->json(['message' => 'The requested resource was not found.'], 404);
            } elseif ($chance <= 60) {
                return response()->json([
                    'success' => false,
                    'message' => 'Server Error',
                    'error' => 'SQLSTATE[HY000] [2002] Connection refused'
                ], 500);
            } elseif ($chance <= 100) {
                return response()->json([
                    'success' => false,
                    'message' => 'The given data was invalid.',
                    'errors' => [
                        'phone' => ['The phone number must be between 8 and 15 digits.'],
                        'logo' => ['The logo failed to upload.'],
                    ]
                ], 422);
            }
        }
        // =========================================================================
        // END TESTING BLOCK
        // =========================================================================

        // 1. Pre-process multipart/form-data strings from Flutter
        $input = $request->all();

        // Flutter multipart often sends arrays as JSON strings
        if (isset($input['other_phones']) && is_string($input['other_phones'])) {
            $input['other_phones'] = json_decode($input['other_phones'], true);
        }

        // 2. Validate Data using Validator::make for custom JSON response
        $validator = Validator::make($input, [
            'name' => 'required|string|max:255',
            'phone' => 'required|numeric|digits_between:8,15',
            'other_phones' => 'nullable|array',
            'other_phones.*' => [
                'nullable',
                'string',
                'regex:/^(0|\+855)(\d{8,9})$/', // Validates Khmer format for each entry
            ],
            'short_description' => 'nullable|string|max:1000',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            'banner' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            'address' => 'required|string|max:255',
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        // 3. Pre-Database Logical Checks
        $userId = $request->user() ? $request->user()->id : 1;
        $owner = User::find($userId);

        if (!$owner) {
            return response()->json([
                'success' => false,
                'message' => 'Owner user not found.'
            ], 404);
        }

        if ($owner->garage_id !== null) {
            return response()->json([
                'success' => false,
                'message' => 'User already has a garage.'
            ], 409); // 409 Conflict is standard for "already exists" states
        }

        // 4. Database Transaction
        return DB::transaction(function () use ($request, $validated, $owner, $userId) {

            // Clean empty strings to null
            foreach ($validated as $key => $value) {
                if (is_string($value) && trim($value) === '') {
                    $validated[$key] = null;
                }
            }

            // Assign Authorship (Fallback to 1 if auth is bypassed during testing)
            $validated['owner_user_id'] = $userId;
            $validated['created_by'] = $userId;
            $validated['updated_by'] = $userId;
            $validated['status'] = 'pending';
            $validated['order_index'] = 10000;

            $validated['expired_at'] = now()->addYears(2)->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();

            // Process Images
            if ($request->hasFile('logo')) {
                try {
                    $validated['logo'] = ImageHelper::uploadAndResizeImageWebp($request->file('logo'), 'assets/images/garages', 600);
                } catch (\Exception $e) {
                    // Throwing an exception rolls back the DB transaction automatically
                    throw new \Exception('Failed to upload logo: ' . $e->getMessage());
                }
            } else {
                unset($validated['logo']); // Prevent null override if not required
            }

            if ($request->hasFile('banner')) {
                try {
                    $validated['banner'] = ImageHelper::uploadAndResizeImageWebp($request->file('banner'), 'assets/images/garages', 1200);
                } catch (\Exception $e) {
                    throw new \Exception('Failed to upload banner: ' . $e->getMessage());
                }
            } else {
                unset($validated['banner']);
            }

            // Create the Garage
            $garage = Garage::create($validated);

            // Update the User's garage_id (Using the $owner instance we already queried)
            $owner->update([
                'garage_id' => $garage->id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Garage created successfully!',
                'data' => $garage
            ], 201);
        });
    }

    public function update(Request $request, $id)
    {
        // 1. Find the Garage
        $garage = Garage::find($id);

        if (!$garage) {
            return response()->json([
                'success' => false,
                'message' => 'Garage not found.'
            ], 404);
        }

        // 2. Pre-process multipart/form-data strings from Flutter
        $input = $request->all();

        // Flutter multipart sends arrays as JSON strings
        if (isset($input['other_phones']) && is_string($input['other_phones'])) {
            $input['other_phones'] = json_decode($input['other_phones'], true);
        }

        // 3. Validate Data
        $validator = Validator::make($input, [
            'name' => 'required|string|max:255',
            'phone' => 'required|numeric|digits_between:8,15',
            'other_phones' => 'nullable|array',
            'other_phones.*' => [
                'nullable',
                'string',
                'regex:/^(0|\+855)(\d{8,9})$/',
            ],
            'short_description' => 'nullable|string|max:1000',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            'address' => 'required|string|max:255',
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        // 4. Authorization Check
        $userId = $request->user() ? $request->user()->id : 1;

        // Ensure the user updating the garage actually owns it
        if ($garage->owner_user_id !== $userId) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to update this garage.'
            ], 403);
        }

        // 5. Database Transaction
        return DB::transaction(function () use ($request, $validated, $garage, $userId) {

            // Clean empty strings to null
            foreach ($validated as $key => $value) {
                if (is_string($value) && trim($value) === '') {
                    $validated[$key] = null;
                }
            }

            // Only update the 'updated_by' field. 
            // We DO NOT touch 'created_by', 'owner_user_id', 'status', or 'expired_at' on a standard update.
            $validated['updated_by'] = $userId;

            // Process Images
            if ($request->hasFile('logo')) {
                try {
                    // Tip: You can optionally add code here to delete the old image using Storage::delete()
                    $validated['logo'] = ImageHelper::uploadAndResizeImageWebp($request->file('logo'), 'assets/images/garages', 600);
                } catch (\Exception $e) {
                    throw new \Exception('Failed to upload logo: ' . $e->getMessage());
                }
            } else {
                unset($validated['logo']); // Prevent overwriting the existing logo with null
            }

            if ($request->hasFile('banner')) {
                try {
                    // Tip: You can optionally add code here to delete the old image using Storage::delete()
                    $validated['banner'] = ImageHelper::uploadAndResizeImageWebp($request->file('banner'), 'assets/images/garages', 1200);
                } catch (\Exception $e) {
                    throw new \Exception('Failed to upload banner: ' . $e->getMessage());
                }
            } else {
                unset($validated['banner']); // Prevent overwriting the existing banner with null
            }

            // Update the existing Garage model
            $garage->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Garage updated successfully!',
                'data' => $garage->fresh() // Returns the updated model
            ], 200); // 200 OK is standard for successful updates
        });
    }
}
