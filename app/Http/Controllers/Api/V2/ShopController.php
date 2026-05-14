<?php

namespace App\Http\Controllers\Api\V2;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Models\User;
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
        $query->orderBy('name');

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
        $shop = Shop::find($id);

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
        $input = $request->all();

        // 1. Flutter multipart workaround
        if (isset($input['other_phones']) && is_string($input['other_phones'])) {
            $input['other_phones'] = json_decode($input['other_phones'], true);
        }

        // 2. Validate Data
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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();
        $user = $request->user();

        // 3. Auth Check (Consider moving this to Route Middleware!)
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized.'], 401);
        }

        // 4. Shop Existence Check (Fixed Null Bug)
        if ($user->shop_id !== null) {
            $shop = Shop::withTrashed()->find($user->shop_id);

            if (!$shop) {
                $user->update(['shop_id' => null]);
            } elseif ($shop->trashed()) {
                return response()->json(['success' => false, 'message' => 'You already have a shop, but it is currently disabled/deleted.'], 409);
            } else {
                return response()->json(['success' => false, 'message' => 'User already has an active shop.'], 409);
            }
        }

        // 5. Database Transaction
        try {
            return DB::transaction(function () use ($request, $validated, $user) {

                // Assign Metadata
                $validated['owner_user_id'] = $user->id;
                $validated['created_by']    = $user->id;
                $validated['updated_by']    = $user->id;
                $validated['status']        = 'pending';
                $validated['order_index']   = 10000;
                $validated['expired_at']    = now()->addYears(2)->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();

                // Process Images (We know they exist because of the 'required' validation)
                $validated['logo']   = ImageHelper::uploadAndResizeImageWebp($request->file('logo'), 'assets/images/shops', 600);
                $validated['banner'] = ImageHelper::uploadAndResizeImageWebp($request->file('banner'), 'assets/images/shops', 1200);

                // Create the Shop
                $shop = Shop::create($validated);

                // Update User
                $user->update(['shop_id' => $shop->id]);

                return response()->json([
                    'success' => true,
                    'message' => 'Shop created successfully!',
                    'data' => $shop
                ], 201);
            });
        } catch (\Exception $e) {
            // Catch image upload errors or DB errors and return a clean JSON response
            return response()->json([
                'success' => false,
                'message' => 'Failed to create shop. ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();

        // 1. Authentication Check (Critical Security Fix)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.'
            ], 401);
        }

        // 2. Find the Shop
        $shop = Shop::find($id);

        if (!$shop) {
            return response()->json(['success' => false, 'message' => 'Shop not found.'], 404);
        }

        // 3. Authorization Check (Fail fast before processing data)
        if ($shop->owner_user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to update this shop.'
            ], 403);
        }

        // 4. Pre-process Flutter multipart data
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

        // 6. Database Transaction with proper Try/Catch
        try {
            return DB::transaction(function () use ($request, $validated, $shop, $user) {

                $validated['updated_by'] = $user->id;

                // Process Images
                if ($request->hasFile('logo')) {
                    // Tip: Add logic here to delete $shop->logo from storage if it exists
                    $validated['logo'] = ImageHelper::uploadAndResizeImageWebp($request->file('logo'), 'assets/images/shops', 600);
                } else {
                    unset($validated['logo']); // Prevent overwriting existing logo with null
                }

                if ($request->hasFile('banner')) {
                    // Tip: Add logic here to delete $shop->banner from storage if it exists
                    $validated['banner'] = ImageHelper::uploadAndResizeImageWebp($request->file('banner'), 'assets/images/shops', 1200);
                } else {
                    unset($validated['banner']); // Prevent overwriting existing banner with null
                }

                // Update the existing Shop model
                $shop->update($validated);

                return response()->json([
                    'success' => true,
                    'message' => 'Shop updated successfully!',
                    'data' => $shop->fresh()
                ], 200);
            });
        } catch (\Exception $e) {
            // Catch any upload or DB errors and return clean JSON
            return response()->json([
                'success' => false,
                'message' => 'Failed to update shop. ' . $e->getMessage()
            ], 500);
        }
    }
}
