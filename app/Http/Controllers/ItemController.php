<?php

namespace App\Http\Controllers;

use App\Exports\ItemDailyViewExport;
use App\Helpers\ImageHelper;
use App\Helpers\TelegramHelper;
use App\Models\Item;
use App\Models\ItemBodyType;
use App\Models\ItemBrand;
use App\Models\Link;
use App\Models\ItemCategory;
use App\Models\ItemDailyView;
use App\Models\ItemImage;
use App\Models\ItemModel;
use App\Models\Province;
use App\Models\Shop;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class ItemController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:item view', only: ['index', 'show']),
            new Middleware('permission:item create', only: ['create']),
            new Middleware('permission:item update', only: ['edit']),
            // new Middleware('permission:item delete', only: ['destroy', 'destroy_image']),
        ];
    }

    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');

        $query = Item::query();

        $query->with('created_by', 'updated_by', 'images', 'category', 'shop');

        if ($status) {
            $query->where('status', $status);
        }
        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('name_kh', 'LIKE', "%{$search}%")
                    ->orWhere('id', 'LIKE', "%{$search}%");
            });
        }

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        return Inertia::render('admin/items/Index', [
            'tableData' => $tableData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('admin/items/Create', [
            'provinces' => Province::orderBy('order_index')->orderBy('name_kh')->get(),
            'itemCategories' => ItemCategory::where('status', 'active')
                ->with(['fields.options', 'brands'])
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($category) {
                    $category->image_url = $category->image
                        ? asset('assets/images/item_categories/thumb/' . $category->image)
                        : null;

                    // Retaining your existing logic for brand_ids
                    $category->brand_ids = $category->brands->pluck('id')->toArray();

                    return $category;
                }),
            'itemBrands' => ItemBrand::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($brand) {
                    $brand->image_url = $brand->image
                        ? asset('assets/images/item_brands/thumb/' . $brand->image)
                        : null;
                    return $brand;
                }),

            'itemModels' => ItemModel::where('status', 'active')
                ->orderBy('name')
                ->get()
                ->map(function ($model) {
                    $model->image_url = $model->image
                        ? asset('assets/images/item_models/thumb/' . $model->image)
                        : null;
                    return $model;
                }),

            'itemBodyTypes' => ItemBodyType::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($bodyType) {
                    $bodyType->image_url = $bodyType->image
                        ? asset('assets/images/item_body_types/thumb/' . $bodyType->image)
                        : null;
                    return $bodyType;
                }),
            'shops' => Shop::orderBy('name')->get(),
        ]);
    }
    public function user_create_product(Request $request)
    {
        return Inertia::render('admin/items/UserCreateItem', [
            'provinces' => Province::orderBy('order_index')->orderBy('name_kh')->get(),
            'itemCategories' => ItemCategory::where('status', 'active')
                ->with(['fields.options', 'brands'])
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($category) {
                    $category->image_url = $category->image
                        ? asset('assets/images/item_categories/thumb/' . $category->image)
                        : null;

                    // Retaining your existing logic for brand_ids
                    $category->brand_ids = $category->brands->pluck('id')->toArray();

                    return $category;
                }),
            'itemBrands' => ItemBrand::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($brand) {
                    $brand->image_url = $brand->image
                        ? asset('assets/images/item_brands/thumb/' . $brand->image)
                        : null;
                    return $brand;
                }),

            'itemModels' => ItemModel::where('status', 'active')
                ->orderBy('name')
                ->get()
                ->map(function ($model) {
                    $model->image_url = $model->image
                        ? asset('assets/images/item_models/thumb/' . $model->image)
                        : null;
                    return $model;
                }),

            'itemBodyTypes' => ItemBodyType::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($bodyType) {
                    $bodyType->image_url = $bodyType->image
                        ? asset('assets/images/item_body_types/thumb/' . $bodyType->image)
                        : null;
                    return $bodyType;
                }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // 1. Pre-process multipart/form-data inputs
        $input = $request->all();

        if (isset($input['attributes']) && is_string($input['attributes'])) {
            $input['attributes'] = json_decode($input['attributes'], true);
        }

        if (isset($input['is_free_delivery'])) {
            $input['is_free_delivery'] = filter_var($input['is_free_delivery'], FILTER_VALIDATE_BOOLEAN);
        }

        // 2. Validate Data (Including missing fields from your frontend form)
        // Using Validator::make(...)->validate() to auto-redirect back with errors for web requests
        $validated = Validator::make($input, [
            'code' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'short_description' => 'nullable|string',
            'long_description' => 'nullable|string',
            'link' => 'nullable|string',
            'category_code' => 'required|string|exists:item_categories,code',
            'attributes' => 'nullable|array',
            'shop_id' => 'nullable|exists:shops,id',
            'brand_code' => 'nullable|string|exists:item_brands,code',
            'model_code' => 'nullable|string|exists:item_models,code',
            'body_type_code' => 'nullable|string|exists:item_body_types,code',
            'status' => 'nullable|string|in:active,inactive',
            'is_free_delivery' => 'nullable|boolean',
            'discount' => 'nullable|numeric|min:0',
            'discount_type' => 'nullable|string|in:percentage,amount',
            'province_code' => 'nullable|string|exists:provinces,code',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120', // Increased to 5MB to match API config
        ])->validate();

        // 3. Resolve Shop ID and User ID Logic
        if (!empty($validated['shop_id'])) {
            // Admin/User provided a specific shop -> Fetch shop owner
            $shop = Shop::find($validated['shop_id']);
            $validated['shop_id'] = $shop->id;
            // Prioritize the shop owner's user ID, fallback to auth user if structure differs
            $validated['user_id'] = $shop->owner_user_id ?? $shop->user_id ?? $user->id;
        } else {
            // No shop provided -> Use auth user's shop and ID
            $validated['shop_id'] = $user->shop_id ?? null;
            $validated['user_id'] = $user->id;
        }

        $validated['created_by'] = $user->id;
        $validated['updated_by'] = $user->id;

        // Clean up empty strings to null
        foreach ($validated as $key => $value) {
            if (is_string($value) && trim($value) === '') {
                $validated[$key] = null;
            }
        }

        $image_files = $request->file('images');
        unset($validated['images']);

        $uploadedImages = [];

        // 4. Safely handle Images OUTSIDE the DB transaction
        if ($image_files) {
            try {
                foreach ($image_files as $image) {
                    $uploadedImages[] = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/items', 800);
                }
            } catch (\Exception $e) {
                // Cleanup uploaded files if the loop fails halfway
                foreach ($uploadedImages as $uploadedImage) {
                    if (file_exists(public_path($uploadedImage))) {
                        unlink(public_path($uploadedImage));
                    }
                }
                return redirect()->back()->with('error', 'Image processing failed: ' . $e->getMessage())->withInput();
            }
        }

        // 5. Database Transaction to prevent orphaned records
        try {
            DB::beginTransaction();

            $created_item = Item::create($validated);

            // Sync category to shop
            if (!empty($validated['shop_id']) && !empty($validated['category_code'])) {
                $shop = Shop::find($validated['shop_id']);
                if ($shop) {
                    $shop->categories()->syncWithoutDetaching([$validated['category_code']]);
                }
            }

            // Save Image Records
            foreach ($uploadedImages as $filename) {
                ItemImage::create([
                    'image' => $filename,
                    'item_id' => $created_item->id,
                ]);
            }

            DB::commit();

            return redirect()->back()->with('success', 'Item Created Successfully!');
        } catch (\Exception $e) {
            DB::rollBack();

            // DB failed, cleanup the newly created physical files
            foreach ($uploadedImages as $uploadedImage) {
                if (file_exists(public_path($uploadedImage))) {
                    unlink(public_path($uploadedImage));
                }
            }

            Log::error('Item creation DB failure: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create item: ' . $e->getMessage())->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        return Inertia::render('admin/items/Create', [
            'editData' => $item->load('images'),
            'readOnly' => true,
            'provinces' => Province::orderBy('order_index')->orderBy('name_kh')->get(),
            'itemCategories' => ItemCategory::where('status', 'active')
                ->with(['fields.options', 'brands'])
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($category) {
                    $category->image_url = $category->image
                        ? asset('assets/images/item_categories/thumb/' . $category->image)
                        : null;

                    // Retaining your existing logic for brand_ids
                    $category->brand_ids = $category->brands->pluck('id')->toArray();

                    return $category;
                }),
            'itemBrands' => ItemBrand::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($brand) {
                    $brand->image_url = $brand->image
                        ? asset('assets/images/item_brands/thumb/' . $brand->image)
                        : null;
                    return $brand;
                }),

            'itemModels' => ItemModel::where('status', 'active')
                ->orderBy('name')
                ->get()
                ->map(function ($model) {
                    $model->image_url = $model->image
                        ? asset('assets/images/item_models/thumb/' . $model->image)
                        : null;
                    return $model;
                }),

            'itemBodyTypes' => ItemBodyType::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($bodyType) {
                    $bodyType->image_url = $bodyType->image
                        ? asset('assets/images/item_body_types/thumb/' . $bodyType->image)
                        : null;
                    return $bodyType;
                }),
            'shops' => Shop::orderBy('name')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */

    public function edit(Item $item)
    {
        // return ($item);
        return Inertia::render('admin/items/Create', [
            'editData' => $item->load('images'),
            'provinces' => Province::orderBy('order_index')->orderBy('name_kh')->get(),
            'itemCategories' => ItemCategory::where('status', 'active')
                ->with(['fields.options', 'brands'])
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($category) {
                    $category->image_url = $category->image
                        ? asset('assets/images/item_categories/thumb/' . $category->image)
                        : null;

                    // Retaining your existing logic for brand_ids
                    $category->brand_ids = $category->brands->pluck('id')->toArray();

                    return $category;
                }),
            'itemBrands' => ItemBrand::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($brand) {
                    $brand->image_url = $brand->image
                        ? asset('assets/images/item_brands/thumb/' . $brand->image)
                        : null;
                    return $brand;
                }),

            'itemModels' => ItemModel::where('status', 'active')
                ->orderBy('name')
                ->get()
                ->map(function ($model) {
                    $model->image_url = $model->image
                        ? asset('assets/images/item_models/thumb/' . $model->image)
                        : null;
                    return $model;
                }),

            'itemBodyTypes' => ItemBodyType::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($bodyType) {
                    $bodyType->image_url = $bodyType->image
                        ? asset('assets/images/item_body_types/thumb/' . $bodyType->image)
                        : null;
                    return $bodyType;
                }),
            'shops' => Shop::orderBy('name')->get(),
        ]);
    }

    public function user_edit_product(Item $item)
    {
        // return ($item);
        $user = Auth::user();
        if (! ($user->hasAnyPermission('item update') || $user->id === $item->user_id)) {
            abort(403, 'User does not have permission to edit.');
        }

        return Inertia::render('admin/items/UserCreateItem', [
            'editData' => $item->load('images'),
            'provinces' => Province::orderBy('order_index')->orderBy('name_kh')->get(),
            'itemCategories' => ItemCategory::where('status', 'active')
                ->with(['fields.options', 'brands'])
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($category) {
                    $category->image_url = $category->image
                        ? asset('assets/images/item_categories/thumb/' . $category->image)
                        : null;

                    // Retaining your existing logic for brand_ids
                    $category->brand_ids = $category->brands->pluck('id')->toArray();

                    return $category;
                }),
            'itemBrands' => ItemBrand::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($brand) {
                    $brand->image_url = $brand->image
                        ? asset('assets/images/item_brands/thumb/' . $brand->image)
                        : null;
                    return $brand;
                }),

            'itemModels' => ItemModel::where('status', 'active')
                ->orderBy('name')
                ->get()
                ->map(function ($model) {
                    $model->image_url = $model->image
                        ? asset('assets/images/item_models/thumb/' . $model->image)
                        : null;
                    return $model;
                }),

            'itemBodyTypes' => ItemBodyType::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($bodyType) {
                    $bodyType->image_url = $bodyType->image
                        ? asset('assets/images/item_body_types/thumb/' . $bodyType->image)
                        : null;
                    return $bodyType;
                }),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $item)
    {
        $user = $request->user();

        if (! ($user->hasAnyPermission('item update') || $user->id === $item->user_id)) {
            abort(403, 'User does not have permission to update.');
        }

        // 1. Pre-process multipart/form-data inputs
        $input = $request->all();

        if (isset($input['attributes']) && is_string($input['attributes'])) {
            $input['attributes'] = json_decode($input['attributes'], true);
        }

        if (isset($input['is_free_delivery'])) {
            $input['is_free_delivery'] = filter_var($input['is_free_delivery'], FILTER_VALIDATE_BOOLEAN);
        }

        // Handle stringified numbers for discount
        if (isset($input['discount']) && is_string($input['discount'])) {
            $input['discount'] = $input['discount'] === 'null' || trim($input['discount']) === '' ? null : (float) $input['discount'];
        }

        // 2. Validate Data (Merged user fields + standardized rules)
        $validated = Validator::make($input, [
            'code' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'short_description' => 'nullable|string',
            'short_description_kh' => 'nullable|string',
            'long_description' => 'nullable|string',
            'long_description_kh' => 'nullable|string',
            'link' => 'nullable|string',
            'category_code' => 'required|string|exists:item_categories,code',
            'attributes' => 'nullable|array',
            'shop_id' => 'nullable|exists:shops,id',
            'brand_code' => 'nullable|string|exists:item_brands,code',
            'model_code' => 'nullable|string|exists:item_models,code',
            'body_type_code' => 'nullable|string|exists:item_body_types,code',
            'status' => 'nullable|string|in:active,inactive',
            'is_free_delivery' => 'nullable|boolean',
            'discount' => 'nullable|numeric|min:0',
            'discount_type' => 'nullable|string|in:percentage,amount',
            'province_code' => 'nullable|string|exists:provinces,code',
            // Images are nullable on update since they might just be editing text
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
        ])->validate();

        // 3. Resolve Shop ID and User ID Logic
        if (!empty($validated['shop_id'])) {
            // Specific shop provided -> Fetch shop owner
            $shop = Shop::find($validated['shop_id']);
            $validated['shop_id'] = $shop->id;
            $validated['user_id'] = $shop->owner_user_id ?? $shop->user_id ?? $user->id;
        } else {
            // No shop provided -> Use auth user's shop and ID
            $validated['shop_id'] = $user->shop_id ?? null;
            $validated['user_id'] = $user->id;
        }

        $validated['updated_by'] = $user->id;

        // Clean up empty strings to null
        foreach ($validated as $key => $value) {
            if (is_string($value) && trim($value) === '') {
                $validated[$key] = null;
            }
        }

        $image_files = $request->file('images');
        unset($validated['images']);

        $uploadedImages = [];

        // 4. Safely handle NEW Images OUTSIDE the DB transaction
        if ($image_files) {
            try {
                foreach ($image_files as $image) {
                    $uploadedImages[] = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/items', 800);
                }
            } catch (\Exception $e) {
                // Cleanup newly uploaded files if the loop fails halfway
                foreach ($uploadedImages as $uploadedImage) {
                    if (file_exists(public_path($uploadedImage))) {
                        unlink(public_path($uploadedImage));
                    }
                }
                return redirect()->back()->with('error', 'Image processing failed: ' . $e->getMessage())->withInput();
            }
        }

        // 5. Database Transaction to prevent orphaned records or partial updates
        try {
            DB::beginTransaction();

            $item->update($validated);

            // Sync category to shop
            if (!empty($validated['shop_id']) && !empty($validated['category_code'])) {
                $shop = Shop::find($validated['shop_id']);
                if ($shop) {
                    $shop->categories()->syncWithoutDetaching([$validated['category_code']]);
                }
            }

            // Save New Image Records
            foreach ($uploadedImages as $filename) {
                ItemImage::create([
                    'image' => $filename,
                    'item_id' => $item->id,
                ]);
            }

            DB::commit();

            return redirect()->back()->with('success', 'Item Updated Successfully!');
        } catch (\Exception $e) {
            DB::rollBack();

            // DB failed, cleanup the newly created physical files to prevent orphans
            foreach ($uploadedImages as $uploadedImage) {
                if (file_exists(public_path($uploadedImage))) {
                    unlink(public_path($uploadedImage));
                }
            }

            Log::error('Item update DB failure: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update item: ' . $e->getMessage())->withInput();
        }
    }

    public function update_status(Request $request, Item $item)
    {
        $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);
        $item->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $user = Auth::user();
        if (! ($user->hasAnyPermission('item delete') || $user->id === $item->user_id)) {
            abort(403, 'User does not have permission to delete.');
        }
        $item->delete();
        return redirect()->back()->with('success', 'Item deleted successfully.');
    }

    public function destroy_image(ItemImage $image)
    {
        $user = Auth::user();
        if (! ($user->hasAnyPermission('item delete') || $user->id === $image->item->user_id)) {
            abort(403, 'User does not have permission to delete.');
        }
        $image->delete();
        return redirect()->back()->with('success', 'Image deleted successfully.');
    }


    public function item_view_counts(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'view_date');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');
        $from_date = $request->input('from_date', null);
        $to_date = $request->input('to_date', null);


        $from_date = $from_date
            ? Carbon::parse($from_date)->setTimezone('Asia/Bangkok')->startOfDay()->toDateString()
            : Carbon::now()->setTimezone('Asia/Bangkok')->startOfYear()->toDateString();
        $to_date = $to_date
            ? Carbon::parse($to_date)->setTimezone('Asia/Bangkok')->endOfDay()->toDateString()
            : now()->endOfDay()->toDateString();

        $query = ItemDailyView::query();


        if ($from_date) {
            // dd($from_date);
            $query->where('view_date', '>=', $from_date);
        }

        if ($to_date) {
            $query->where('view_date', '<=', $to_date);
        }

        if ($status) {
            $query->where('status', $status);
        }
        $query->orderBy($sortBy, $sortDirection);

        $query->with('item');

        if ($search) {
            $query->whereHas('item', function ($subQuery) use ($search) {
                $subQuery->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('id', 'LIKE', "%{$search}%");
            });
        }
        // Clone the query for total views calculation
        $totalViews = (clone $query)->sum('view_counts');

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        return Inertia::render('admin/items/ItemViewCount', [
            'tableData' => $tableData,
            'totalViews' => $totalViews,
            'from_date' => $from_date,
            'to_date' => $to_date,
        ]);
    }

    public function item_view_counts_export(Request $request)
    {
        // dd($request->all());
        $from_date = $request->input('from_date', null);
        $to_date = $request->input('to_date', null);

        $from_date = $from_date
            ? Carbon::parse($from_date)->setTimezone('Asia/Bangkok')->startOfDay()->toDateString()
            : Carbon::now()->setTimezone('Asia/Bangkok')->startOfYear()->toDateString();
        $to_date = $to_date
            ? Carbon::parse($to_date)->setTimezone('Asia/Bangkok')->endOfDay()->toDateString()
            : now()->endOfDay()->toDateString();
        // dd($from_date, $to_date);

        $filters = [
            'search' => $request->input('search', ''),
            'status' => $request->input('status'),
            'sortBy' => $request->input('sortBy', 'view_date'),
            'sortDirection' => $request->input('sortDirection', 'desc'),
            'from_date' => $from_date,
            'to_date' => $to_date,
        ];

        return Excel::download(new ItemDailyViewExport($filters), 'item_views.xlsx');
    }
}
