<?php

namespace App\Http\Controllers\Api\V2;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $query = Shop::query();

        // FIELD: search (or q)
        // TYPE: Free type (Text)
        // OPTIONS: Any string typed by the user to search in name, address, or short_description
        $search = $request->input('search') ?? $request->input('q');
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('address', 'LIKE', "%$search%")
                    ->orWhere('short_description', 'LIKE', "%$search%");
            });
        }

        // FIELD: province_code
        // TYPE: Exact Match (Text)
        // OPTIONS: Dynamic codes from your provinces table (e.g., 'PP', 'SR')
        if ($request->filled('province_code')) {
            $query->where('province_code', $request->input('province_code'));
        }

        // FIELD: is_verified
        // TYPE: Exact Match (Number)
        // OPTIONS: '' (All Shops - ignores filter) or '1' (Verified Only)
        if ($request->input('is_verified') == '1') {
            $query->where('is_verified', 1);
        }

        // FIELD: category_code
        // TYPE: Exact Match (Text)
        // OPTIONS: Dynamic codes from your categories table
        if ($request->filled('category_code')) {
            $categoryCode = $request->input('category_code');

            // Uses your belongsToMany 'categories' relationship
            // and filters by the 'code' column on the ItemCategory model
            $query->whereHas('categories', function ($q) use ($categoryCode) {
                $q->where('code', $categoryCode);
            });
        }

        // Always only show approved shops
        $query->where('status', 'approved');

        // FIELD: sort
        // TYPE: Exact Match (Text)
        // OPTIONS: '' (Latest), 'name_asc' (Name: A-Z), 'name_desc' (Name: Z-A)
        $sort = $request->input('sort');
        if ($sort === 'name_asc') {
            $query->orderBy('name', 'asc');
        } elseif ($sort === 'name_desc') {
            $query->orderBy('name', 'desc');
        } else {
            // Default Sort (Latest)
            $query->orderBy('order_index', 'asc')
                ->orderBy('created_at', 'desc');
        }

        $shops = $query->with('province')->paginate(20);

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
        // 1. Find the specific shop by ID and eager load categories 
        // (Add 'other_phones' to the array if it's a separate related table instead of a JSON column)
        $shop = Shop::with(['categories', 'province'])->find($id);

        // 2. Handle 404 if the shop doesn't exist
        if (!$shop) {
            return response()->json([
                'success' => false,
                'message' => 'Shop not found'
            ], 404);
        }

        // 3. Transform the single object
        $shop->logo_url = $shop->logo ? asset('assets/images/shops/' . $shop->logo) : null;
        $shop->banner_url = $shop->banner ? asset('assets/images/shops/' . $shop->banner) : null;

        $shop->categories->map(function ($category) {
            $category->image_url = $category->image ? asset('assets/images/item_categories/thumb/' . $category->image) : null;
            return $category;
        });

        $shop->setAttribute('category_codes', $shop->categories->pluck('code')->toArray());

        // 4. Return standardized response matching your Flutter logic
        return response()->json([
            'success' => true,
            'data'    => $shop
        ]);
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
            'province_code' => ['required', 'string', 'exists:provinces,code'],
            'categories' => ['nullable', 'array', 'min:1'],
            'categories.*' => ['nullable', 'string', 'exists:item_categories,code'],
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

        // 1. Process Images OUTSIDE the transaction
        try {
            $logoPath = ImageHelper::uploadAndResizeImageWebp($request->file('logo'), 'assets/images/shops', 600);
            $bannerPath = ImageHelper::uploadAndResizeImageWebp($request->file('banner'), 'assets/images/shops', 1200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Image processing failed.'], 500);
        }

        // 2. Database Transaction
        try {
            $newShop = DB::transaction(function () use ($request, $validated, $user, $logoPath, $bannerPath) {

                // Assign Metadata
                $validated['owner_user_id'] = $user->id;
                $validated['created_by']    = $user->id;
                $validated['updated_by']    = $user->id;
                $validated['status']        = 'approved';
                $validated['order_index']   = 10000;
                $validated['expired_at']    = now()->addYears(2)->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();

                // Process Images
                $validated['logo']   = $logoPath;
                $validated['banner'] = $bannerPath;

                $categoryCodes = $request->input('categories', []);
                unset($validated['categories']);

                $newShop = Shop::create($validated);

                $newShop->categories()->sync($categoryCodes);

                // Update User & all items created when not having a shop
                $user->update(['shop_id' => $newShop->id]);
                Item::where('user_id', $user->id)->update([
                    'shop_id' => $newShop->id
                ]);

                return $newShop;
            });

            // 3. Return HTTP Response
            return response()->json([
                'success' => true,
                'message' => 'Shop created successfully!',
                'data' => $newShop
            ], 201);
        } catch (\Exception $e) {
            // 4. ROLLBACK CLEANUP: Delete the images if the DB fails!
            if (isset($logoPath) && file_exists(public_path($logoPath))) {
                unlink(public_path($logoPath));
            }
            if (isset($bannerPath) && file_exists(public_path($bannerPath))) {
                unlink(public_path($bannerPath));
            }

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
            'province_code' => ['required', 'string', 'exists:provinces,code'],
            'categories' => ['required', 'array'],
            'categories.*' => ['required', 'string', 'exists:item_categories,code'],
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

        // Variables to track file states
        $newLogoPath = null;
        $newBannerPath = null;
        $oldLogoToDelete = null;
        $oldBannerToDelete = null;

        // 1. Process NEW Images OUTSIDE the transaction
        try {
            if ($request->hasFile('logo')) {
                $newLogoPath = ImageHelper::uploadAndResizeImageWebp($request->file('logo'), 'assets/images/shops', 600);
                $validated['logo'] = $newLogoPath;
                $oldLogoToDelete = $shop->logo; // Queue the old one for deletion
            }

            if ($request->hasFile('banner')) {
                $newBannerPath = ImageHelper::uploadAndResizeImageWebp($request->file('banner'), 'assets/images/shops', 1200);
                $validated['banner'] = $newBannerPath;
                $oldBannerToDelete = $shop->banner; // Queue the old one for deletion
            } elseif ($request->input('remove_banner') == '1') {
                $validated['banner'] = null;
                $oldBannerToDelete = $shop->banner; // Queue the old one for deletion
            }

            // Clean up validated array before DB insertion
            unset($validated['remove_banner']);
            $categoryCodes = $request->input('categories', []);
            unset($validated['categories']);
        } catch (\Exception $e) {
            Log::error('Image processing failed during update: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Image processing failed.'], 500);
        }

        // 2. Database Transaction
        try {
            $updatedShop = DB::transaction(function () use ($validated, $shop, $user, $categoryCodes) {

                $validated['updated_by'] = $user->id;

                $shop->update($validated);
                $shop->categories()->sync($categoryCodes);

                return $shop->fresh(); // Return the fresh model instance, NOT the HTTP response
            });

            // 3. SUCCESS CLEANUP: The DB updated successfully, so delete the OLD files
            if ($oldLogoToDelete) {
                ImageHelper::deleteImage($oldLogoToDelete, 'assets/images/shops');
            }
            if ($oldBannerToDelete) {
                ImageHelper::deleteImage($oldBannerToDelete, 'assets/images/shops');
            }

            // 4. Return HTTP Response
            return response()->json([
                'success' => true,
                'message' => 'Shop updated successfully!',
                'data' => $updatedShop
            ], 200);
        } catch (\Exception $e) {
            // 5. ROLLBACK CLEANUP: The DB failed, so delete the NEW files we just uploaded
            if ($newLogoPath && file_exists(public_path($newLogoPath))) {
                unlink(public_path($newLogoPath));
                // Note: Or use ImageHelper::deleteImage($newLogoPath) if it handles public_path automatically
            }
            if ($newBannerPath && file_exists(public_path($newBannerPath))) {
                unlink(public_path($newBannerPath));
            }

            Log::error('Failed to update shop DB: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update shop. ' . $e->getMessage()
            ], 500);
        }
    }
}
