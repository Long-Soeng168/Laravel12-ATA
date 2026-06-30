<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\Province;
use App\Models\Shop;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:shop view', only: ['index', 'show', 'all_shops']),
            new Middleware('permission:shop create', only: ['create']),
            new Middleware('permission:shop update', only: ['edit', 'update_status']),
            new Middleware('permission:shop delete', only: ['destroy', 'destroy_image']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');

        $query = Shop::query();

        $query->with('created_by', 'updated_by', 'owner');

        if ($status) {
            $query->where('status', $status);
        }
        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('id', 'LIKE', "%{$search}%")
                    ->orWhere('address', 'LIKE', "%{$search}%")
                    ->orWhere('short_description', 'LIKE', "%{$search}%");
            });
        }

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        return Inertia::render('admin/shops/Index', [
            'tableData' => $tableData,
        ]);
    }

    public function all_shops()
    {
        $query = Shop::query();

        $tableData = $query->where('status', 'approved')->orderBy('id', 'desc')->get();

        return response()->json($tableData);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function show(Shop $shop)
    {
        $all_users = User::orderBy('id', 'desc')
            ->where('shop_id', null)
            ->get();
        // return ($all_users);
        // return $shop->load('owner');
        return Inertia::render('admin/shops/Create', [
            'editData' => $shop->load('owner', 'categories'),
            'all_users' => $all_users,
            'readOnly' => true,
            'provinces' => Province::orderBy('order_index')
                ->orderBy('name')
                ->get(),
            'categories' => ItemCategory::orderBy('order_index')->orderBy('name')->get(),
        ]);
    }
    public function edit(Shop $shop)
    {
        $all_users = User::where(function ($q) use ($shop) {
            $q->whereNull('shop_id')
                ->orWhere('shop_id', $shop->id);
        })->orderByDesc('id')->get();
        return Inertia::render('admin/shops/Create', [
            'editData' => $shop->load('owner', 'categories'),
            'all_users' => $all_users,
            'provinces' => Province::orderBy('order_index')
                ->orderBy('name')
                ->get(),
            'categories' => ItemCategory::orderBy('order_index')->orderBy('name')->get(),
        ]);
    }
    public function user_edit_shop()
    {
        $shop = Shop::findOrFail(Auth::user()->shop_id);
        // return ($shop->load('owner', 'categories'));
        return Inertia::render('admin/shops/UserCreateShop', [
            'is_user_create_or_edit_shop' => true,
            'editData' => $shop->load('owner', 'categories'),
            'provinces' => Province::orderBy('order_index')
                ->orderBy('name')
                ->get(),
            'categories' => ItemCategory::orderBy('order_index')->orderBy('name')->get(),
        ]);
    }

    public function create()
    {
        $all_users = User::orderBy('id', 'desc')
            ->where('shop_id', null)
            ->get();
        // return ($all_users);
        return Inertia::render('admin/shops/Create', [
            'all_users' => $all_users,
            'provinces' => Province::orderBy('order_index')
                ->orderBy('name')
                ->get(),
            'categories' => ItemCategory::orderBy('order_index')->orderBy('name')->get(),
        ]);
    }
    public function user_create_shop()
    {
        return Inertia::render('admin/shops/UserCreateShop', [
            'is_user_create_or_edit_shop' => true,
            'provinces' => Province::orderBy('order_index')
                ->orderBy('name')
                ->get(),
            'categories' => ItemCategory::orderBy('order_index')->orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'owner_user_id' => 'nullable|exists:users,id',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|numeric|digits_between:8,15',
            'other_phones' => 'nullable|array',
            'other_phones.*' => [
                'nullable',
                'string',
                'regex:/^(0|\+855)(\d{8,9})$/',
            ],
            'short_description' => 'nullable|string|max:1000',
            'short_description_kh' => 'nullable|string|max:1000',
            'order_index' => 'nullable|numeric',
            'expired_at' => 'nullable|date',
            'status' => 'nullable|string|in:pending,approved,suspended,rejected',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_verified' => 'nullable|boolean',
            'address' => 'nullable|string|max:255',
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'province_code' => ['required', 'string', 'exists:provinces,code'],
            'category_codes' => ['nullable', 'array', 'min:1'],
            'category_codes.*' => ['nullable', 'string', 'exists:item_categories,code'],
        ]);

        $currentUser = $request->user();

        // 1. Safely determine the Owner (No frontend boolean needed)
        // If an owner ID was provided in the validated request, use it. Otherwise, assume the logged-in user.
        $ownerUserId = $validated['owner_user_id'] ?? $currentUser->id;
        $owner = User::find($ownerUserId);

        if (!$owner) {
            return redirect()->back()->with('error', 'Owner user not found.');
        }

        if ($owner->shop_id !== null) {
            return redirect()->back()->with('error', 'User already has a shop.');
        }

        // Optional Security Check: Prevent normal users from creating shops for other people
        if (!$request->boolean('is_user_create_or_edit_shop') && !$currentUser->hasAnyPermission('garage create')) {
            abort(403, 'You do not have permission to assign a garage to another user.');
        }

        // 2. Format Dates and Meta
        $validated['expired_at'] = !empty($validated['expired_at'])
            ? Carbon::parse($validated['expired_at'])->setTimezone('Asia/Bangkok')->startOfDay()->format('Y-m-d')
            : null;

        $validated['created_by'] = $currentUser->id;
        $validated['updated_by'] = $currentUser->id;
        $validated['owner_user_id'] = $owner->id; // Ensure this is explicitly set in the data payload

        // 3. Process File Uploads FIRST
        $image_file = $request->file('logo');
        $banner_file = $request->file('banner');
        unset($validated['logo'], $validated['banner']);

        try {
            if ($image_file) {
                $validated['logo'] = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/shops', 600);
            }
            if ($banner_file) {
                $validated['banner'] = ImageHelper::uploadAndResizeImageWebp($banner_file, 'assets/images/shops', 1200);
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
        }

        // 4. Safely extract category codes from the VALIDATED array
        $categoryCodes = $validated['category_codes'] ?? [];
        unset($validated['category_codes']);

        // 5. Execute DB writes inside ONE Transaction
        DB::transaction(function () use ($validated, $owner, $categoryCodes) {
            $shop = Shop::create($validated);

            $shop->categories()->sync($categoryCodes);

            $owner->update([
                'shop_id' => $shop->id,
            ]);

            Item::where('user_id', $owner->id)->update([
                'shop_id' => $shop->id
            ]);
        });

        // 6. Dynamic Redirect
        // If the user created the shop for themselves, send them to the profile. Otherwise, send them back.
        if ($owner->id === $currentUser->id) {
            return redirect('/profile')->with('success', 'Shop created successfully!');
        }

        return redirect()->back()->with('success', 'Shop created successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shop $shop)
    {
        $validated = $request->validate([
            'owner_user_id' => 'nullable|exists:users,id',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|numeric|digits_between:8,15',
            'other_phones' => 'nullable|array',
            'other_phones.*' => [
                'nullable',
                'string',
                'regex:/^(0|\+855)(\d{8,9})$/',
            ],
            'short_description' => 'nullable|string|max:1000',
            'short_description_kh' => 'nullable|string|max:1000',
            'order_index' => 'nullable|numeric',
            'expired_at' => 'nullable|date',
            'status' => 'nullable|string|in:pending,approved,suspended,rejected',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_verified' => 'nullable|boolean',
            'address' => 'nullable|string|max:255',
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'province_code' => ['required', 'string', 'exists:provinces,code'],
            'category_codes' => ['nullable', 'array'],
            'category_codes.*' => ['nullable', 'string', 'exists:item_categories,code'],
        ]);

        // 1. Clean, secure Authorization
        $user = $request->user();
        $isOwner = $user->shop_id === $shop->id;
        $hasPermission = $user->hasAnyPermission('shop update');

        if ($request->boolean('is_user_create_or_edit_shop') && !$isOwner) {
            abort(403, 'Cannot Update Shop.');
        }
        if (!$request->boolean('is_user_create_or_edit_shop') && !$hasPermission) {
            abort(403, 'Cannot Update Shop.');
        }

        // 2. Format Dates and Meta
        if (!empty($validated['expired_at'])) {
            $validated['expired_at'] = Carbon::parse($validated['expired_at'])
                ->setTimezone('Asia/Bangkok')
                ->format('Y-m-d');
        } else {
            $validated['expired_at'] = null;
        }

        $validated['updated_by'] = $user->id;

        // 3. Process File Uploads FIRST
        $image_file = $request->file('logo');
        $banner_file = $request->file('banner');
        unset($validated['logo'], $validated['banner']);

        try {
            if ($image_file) {
                $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/shops', 600);
                $validated['logo'] = $created_image_name;
                if ($shop->logo && $created_image_name) {
                    ImageHelper::deleteImage($shop->logo, 'assets/images/shops');
                }
            }

            if ($banner_file) {
                $created_banner_name = ImageHelper::uploadAndResizeImageWebp($banner_file, 'assets/images/shops', 1200);
                $validated['banner'] = $created_banner_name;
                if ($shop->banner && $created_banner_name) {
                    ImageHelper::deleteImage($shop->banner, 'assets/images/shops');
                }
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
        }

        // 4. Extract categories safely from VALIDATED data, not raw request
        $categoryCodes = $validated['category_codes'] ?? [];
        unset($validated['category_codes']);

        // 5. Execute ALL Database writes inside ONE Transaction
        DB::transaction(function () use ($validated, $shop, $categoryCodes) {

            // Safely check if owner_user_id was actually passed in the request
            if (array_key_exists('owner_user_id', $validated) && !is_null($validated['owner_user_id'])) {
                User::where('id', $validated['owner_user_id'])
                    ->whereNull('shop_id')
                    ->update(['shop_id' => $shop->id]);
            }

            Item::where('user_id', $shop->owner_user_id)
                ->whereNull('shop_id')
                ->update(['shop_id' => $shop->id]);

            Item::where('shop_id', $shop->id)
                ->whereNull('user_id')
                ->update(['user_id' => $shop->owner_user_id]);

            $shop->update($validated);
            $shop->categories()->sync($categoryCodes);
        });

        return redirect()->back()->with('success', 'Shop updated successfully!');
    }


    public function update_status(Request $request, Shop $shop)
    {
        $request->validate([
            'status' => 'required|string|in:pending,approved,suspended,rejected',
        ]);

        DB::transaction(function () use ($request, $shop) {

            // Optional optimization: Only run the update if it wasn't ALREADY approved
            if ($request->status === 'approved' && $shop->status !== 'approved') {
                Item::where('user_id', $shop->owner_user_id)
                    ->whereNull('shop_id') // Safety check: Only grab items that don't have a shop yet
                    ->update([
                        'shop_id' => $shop->id
                    ]);
                Item::where('shop_id', $shop->id)
                    ->whereNull('user_id') // Safety check: Only grab items that don't have a shop yet
                    ->update([
                        'user_id' => $shop->owner_user_id
                    ]);
            }

            $shop->update([
                'status' => $request->status,
            ]);
        });

        return redirect()->back()->with('success', 'Status updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shop $shop)
    {

        if ($shop->logo) {
            ImageHelper::deleteImage($shop->logo, 'assets/images/shops');
        }
        if ($shop->banner) {
            ImageHelper::deleteImage($shop->banner, 'assets/images/shops');
        }
        $shop->delete();
        $owner = User::where('id', $shop->owner_user_id)->first();
        if ($owner) {
            $owner->removeRole('Shop');
            $owner->update([
                'shop_id' => null,
            ]);
        }
        return redirect()->back()->with('success', 'Shop deleted successfully.');
    }
}
