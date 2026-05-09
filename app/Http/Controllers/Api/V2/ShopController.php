<?php

namespace App\Http\Controllers\Api\V2;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $query = Shop::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('address', 'LIKE', "%$search%")
                    ->orWhere('short_description', 'LIKE', "%$search%");
            });
        }

        $query->where('status', 'approved');
        $query->orderBy('order_index');
        $query->orderBy('id', 'desc');

        $shops = $query->paginate(20);

        // Transform the collection inside the paginator
        $shops->getCollection()->transform(function ($item) {
            // Map the new URL fields
            $item->logo_url = $item->logo ? asset('assets/images/shops/' . $item->logo) : null;
            $item->banner_url = $item->banner ? asset('assets/images/shops/' . $item->banner) : null;

            return $item;
        });

        return response()->json($shops);
    }
    public function show(Request $request, string $id)
    {
        // 1. Find the specific shop by ID and ensure it is approved
        $shop = Shop::where('status', 'approved')->find($id);

        // 2. Handle 404 if the shop doesn't exist or isn't approved
        if (!$shop) {
            return response()->json(['message' => 'Shop not found'], 404);
        }

        // 3. Transform the single object (No need for transform() on a collection)
        $shop->logo_url = $shop->logo ? asset('assets/images/shops/' . $shop->logo) : null;
        $shop->banner_url = $shop->banner ? asset('assets/images/shops/' . $shop->banner) : null;

        return response()->json($shop);
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

        // Flutter multipart sends booleans as strings ("true" / "false")
        if (isset($input['is_verified'])) {
            $input['is_verified'] = filter_var($input['is_verified'], FILTER_VALIDATE_BOOLEAN);
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
        $owner = User::find($validated['owner_user_id']);

        if (!$owner) {
            return response()->json([
                'success' => false,
                'message' => 'Owner user not found.'
            ], 404);
        }

        if ($owner->shop_id !== null) {
            return response()->json([
                'success' => false,
                'message' => 'User already has a shop.'
            ], 409); // 409 Conflict is standard for "already exists" states
        }

        // 4. Database Transaction
        return DB::transaction(function () use ($request, $validated, $owner) {

            // Clean empty strings to null
            foreach ($validated as $key => $value) {
                if (is_string($value) && trim($value) === '') {
                    $validated[$key] = null;
                }
            }

            // Assign Authorship (Fallback to 1 if auth is bypassed during testing)
            $userId = $request->user() ? $request->user()->id : 1;
            $validated['owner_user_id'] = $userId;
            $validated['created_by'] = $userId;
            $validated['updated_by'] = $userId;
            $validated['status'] = 'pending';
            $validated['order_index'] = 10000;

            $validated['expired_at'] = now()->addYears(2)->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();

            // Process Images
            if ($request->hasFile('logo')) {
                try {
                    $validated['logo'] = ImageHelper::uploadAndResizeImageWebp($request->file('logo'), 'assets/images/shops', 600);
                } catch (\Exception $e) {
                    // Throwing an exception rolls back the DB transaction automatically
                    throw new \Exception('Failed to upload logo: ' . $e->getMessage());
                }
            } else {
                unset($validated['logo']); // Prevent null override if not required
            }

            if ($request->hasFile('banner')) {
                try {
                    $validated['banner'] = ImageHelper::uploadAndResizeImageWebp($request->file('banner'), 'assets/images/shops', 1200);
                } catch (\Exception $e) {
                    throw new \Exception('Failed to upload banner: ' . $e->getMessage());
                }
            } else {
                unset($validated['banner']);
            }

            // Create the Shop
            $shop = Shop::create($validated);

            // Update the User's shop_id (Using the $owner instance we already queried)
            $owner->update([
                'shop_id' => $shop->id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Shop created successfully!',
                'data' => $shop
            ], 201);
        });
    }
}
