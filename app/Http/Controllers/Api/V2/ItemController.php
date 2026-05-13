<?php

namespace App\Http\Controllers\Api\V2;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Item; // Assuming your model for products/items is Item
use App\Models\ItemBodyType;
use App\Models\ItemBrand;
use App\Models\ItemCategory;
use App\Models\ItemCategoryField;
use App\Models\ItemImage;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    /**
     * GET /api/v2/items
     * Get paginated items with full translated attributes and dynamic filtering
     */
    public function index(Request $request)
    {
        if ($request->is_owner == 1) {
            //  No Implement Cach is is_owner == 1
        }
        $query = Item::with(['category', 'brand', 'images']);

        $query->where('status', 'active');

        // Filter by Category Code and Dynamic Attributes
        if ($request->filled('category_code')) {
            $categoryCode = $request->category_code;
            $query->where('category_code', $categoryCode);

            // Fetch valid fields for this category to prevent SQL injection or bad queries
            $category = ItemCategory::where('code', $categoryCode)->first();

            if ($category) {
                $validFields = ItemCategoryField::where('category_id', $category->id)
                    ->pluck('field_key')
                    ->toArray();

                // Loop through request inputs to match valid JSON attributes
                foreach ($request->all() as $key => $value) {
                    if (in_array($key, $validFields) && $request->filled($key)) {
                        // Assuming 'attributes' is cast to an array/json in your Item model
                        $query->where("attributes->$key", $value);
                    }
                }
            }
        }

        // Standard Filters
        if ($request->filled('shop_id')) {
            $shop = Shop::find($request->shop_id);
            if ($shop) {
                $query->where(function ($q) use ($shop) {
                    $q->where('user_id', $shop->owner_user_id)
                        ->orWhere('shop_id', $shop->id);
                });
            } else {
                $query->where('shop_id', $request->shop_id);
            }
        }
        if ($request->filled('user_id')) {
            $user = User::find($request->user_id);
            if ($user) {
                $query->where(function ($q) use ($user) {
                    $q->where('shop_id', $user->shop_id)
                        ->orWhere('user_id', $user->id);
                });
            } else {
                $query->where('user_id', $request->user_id);
            }
        }

        if ($request->filled('brand_code')) {
            $query->where('brand_code', $request->brand_code);
        }

        if ($request->filled('model_code')) {
            $query->where('model_code', $request->model_code);
        }

        if ($request->filled('body_type_code')) {
            $query->where('body_type_code', $request->body_type_code);
        }

        if ($request->filled('q')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->q . '%')
                    ->orWhere('name_kh', 'like', '%' . $request->q . '%');
            });
        }

        // 2. Paginate & Sort (Removed latest() to prevent conflicting with orderByDesc)
        $items = $query->orderByDesc('id')->paginate(16);

        // 3. Pre-fetch mappings for attributes (Optimized)
        // We get the IDs from the already eager-loaded categories instead of running a new query!
        $categoryIds = $items->pluck('category.id')->filter()->unique();

        $categoryMaps = ItemCategoryField::whereIn('category_id', $categoryIds)
            ->with('options')
            ->get()
            ->groupBy('category_id');

        // 4. Transform Collection
        $items->getCollection()->transform(function ($item) use ($categoryMaps) {

            // --- Image Optimization for Flutter List ---
            $firstImage = $item->images->first();

            $item->image_url = $firstImage
                ? asset('assets/images/items/' . $firstImage->image)
                : asset('assets/images/placeholder.webp');

            $item->total_images = $item->images->count();

            $item->thumbnail_image = $firstImage ? [
                'id' => $firstImage->id,
                'image' => $firstImage->image,
                'image_url' => asset('assets/images/items/' . $firstImage->image),
            ] : null;

            // --- Attribute Display Logic ---
            $categoryId = $item->category?->id;
            $fields = $categoryMaps->get($categoryId);
            $displayAttributes = [];

            if ($fields && is_array($item->attributes)) {
                foreach ($item->attributes as $key => $storedValue) {
                    $field = $fields->where('field_key', $key)->first();
                    $option = $field ? $field->options->where('option_value', $storedValue)->first() : null;

                    $displayAttributes[$key] = [
                        'label' => $field->label ?? $key,
                        'label_kh' => $field->label_kh ?? $key,
                        'value' => $storedValue,
                        'value_label_en' => $option->label_en ?? $storedValue,
                        'value_label_kh' => $option->label_kh ?? $storedValue,
                    ];
                }
            }

            $item->display_attributes = $displayAttributes;

            // Correct Laravel way to hide relationships from the final JSON payload
            $item->makeHidden(['images']);

            return $item;
        });

        return response()->json($items);
    }

    /**
     * GET FORM DATA (For Flutter Dropdowns)
     */
    public function form_data()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'itemCategories' => ItemCategory::where('status', 'active')
                    ->with(['fields.options', 'brands'])
                    ->orderBy('order_index')
                    ->orderBy('name')
                    ->get()
                    ->map(function ($item) {
                        $item->image_url = $item->image ? asset('assets/images/item_categories/' . $item->image) : null;
                        $item->brand_ids = $item->brands->pluck('id')->toArray();
                        return $item;
                    }),

                'itemBrands' => ItemBrand::where('status', 'active')
                    ->orderBy('order_index')
                    ->orderBy('name')
                    ->with(['brand_models' => function ($query) {
                        $query->where('status', 'active')->orderBy('name');
                    }])
                    ->get()
                    ->map(function ($brand) {
                        // 1. Add image_url for the Brand
                        $brand->image_url = $brand->image
                            ? asset('assets/images/item_brands/' . $brand->image)
                            : null;

                        // 2. Map through the nested models to add their image_url
                        $brand->brand_models->map(function ($model) {
                            $model->image_url = $model->image
                                ? asset('assets/images/item_models/' . $model->image)
                                : null;
                            return $model;
                        });

                        return $brand;
                    }),

                'itemBodyTypes' => ItemBodyType::where('status', 'active')
                    ->orderBy('order_index')
                    ->orderBy('name')
                    ->get()
                    ->map(function ($item) {
                        $item->image_url = $item->image ? asset('assets/images/item_body_types/' . $item->image) : null;
                        return $item;
                    }),
            ]
        ]);
    }

    /**
     * SHOW ITEM (Formatted for Mobile)
     */
    public function show(Request $request, $id)
    {

        $item = Item::with(['images', 'brand', 'model', 'body_type', 'shop', 'owner', 'category.fields.options'])->findOrFail($id);

        if ($request->is_owner == 1) {
            //  No Implement Cach is is_owner == 1
            // $responseData = [
            //     'success' => false,
            //     'message' => 'Test Error',
            // ];

            // return response()->json($responseData, 500);
        } else {
            $item->increment('total_view_counts');
        }


        // 1. Convert the basic item to an array
        $formattedItem = $item->toArray();

        // 2. Cast numerical values for Flutter/Dart type safety
        $formattedItem['price'] = (float) $item->price;
        $formattedItem['cost'] = (float) $item->cost;
        $formattedItem['discount'] = (float) $item->discount;

        // 3. Generate display_attributes logic
        $displayAttributes = [];
        $attributes = $item->attributes ?? [];

        if ($item->category && $item->category->fields) {
            foreach ($item->category->fields as $field) {
                $key = $field->field_key;
                $currentValue = $attributes[$key] ?? null;

                $displayData = [
                    'label' => $field->label,
                    'label_kh' => $field->label_kh,
                    'value' => $currentValue,
                    'value_label_en' => $currentValue,
                    'value_label_kh' => $currentValue,
                ];

                if (in_array($field->field_type, ['select', 'radio'])) {
                    $option = $field->options->where('option_value', $currentValue)->first();
                    if ($option) {
                        $displayData['value_label_en'] = $option->label_en;
                        $displayData['value_label_kh'] = $option->label_kh;
                    }
                } elseif ($field->field_type === 'checkbox') {
                    $isChecked = ($currentValue === true || $currentValue === '1' || $currentValue === 1);
                    $displayData['value_label_en'] = $isChecked ? 'Yes' : 'No';
                    $displayData['value_label_kh'] = $isChecked ? 'បាទ/ចាស' : 'ទេ';
                }

                if (is_null($currentValue) || $currentValue === '') {
                    $displayData['value_label_en'] = null;
                    $displayData['value_label_kh'] = null;
                }

                $displayAttributes[$key] = $displayData;
            }
        }

        // 4. CLEANUP: Remove the heavy 'fields' from the category object
        // This reduces the JSON size significantly.
        if (isset($formattedItem['category'])) {
            unset($formattedItem['category']['fields']);
        }

        $formattedItem['display_attributes'] = $displayAttributes;

        // 5. Format images with absolute URLs
        $formattedItem['images'] = $item->images->map(function ($img) {
            return [
                'id' => $img->id,
                'image' => $img->image,
                'url' => asset('assets/images/items/' . $img->image),
                'item_id' => $img->item_id,
            ];
        });

        // 5. Format images and related profiles with absolute URLs

        // Item Images
        $formattedItem['images'] = $item->images->map(function ($img) {
            return [
                'id' => $img->id,
                'image' => $img->image,
                'url' => asset('assets/images/items/' . $img->image),
                'item_id' => $img->item_id,
            ];
        });

        // Shop Image URL
        if ($item->shop) {
            $formattedItem['shop']['logo_url'] = $item->shop->logo
                ? asset('assets/images/shops/thumb/' . $item->shop->logo)
                : null;
            $formattedItem['shop']['banner_url'] = $item->shop->banner
                ? asset('assets/images/shops/thumb/' . $item->shop->banner)
                : null;
        }

        // User (owner) Image/Avatar URL
        if ($item->owner) {
            $formattedItem['owner']['logo_url'] = $item->owner->image
                ? asset('assets/images/users/thumb/' . $item->owner->image)
                : null;
        }

        // Also handle Brand/Model/BodyType images if you have them
        // if ($item->brand) {
        //     $formattedItem['brand']['image_url'] = $item->brand->image
        //         ? asset('assets/images/brands/' . $item->brand->image)
        //         : null;
        // }

        return response()->json([
            'success' => true,
            'data' => $formattedItem
        ]);

        return response()->json([
            'success' => true,
            'data' => $formattedItem
        ]);
    }
    public function related_items($id)
    {
        // 1. Find the base item to relate to
        $baseItem = Item::find($id);

        if (!$baseItem) {
            return response()->json([
                'success' => false,
                'message' => 'Item not found.',
                'data' => []
            ], 404);
        }

        // 2. Start the Query for Related Items with relationships
        $query = Item::with(['category', 'images'])
            ->where('id', '!=', $baseItem->id); // Exclude the current item

        $query->where('status', 'active');

        // Define what makes an item "related" (e.g., same category, brand, or model)
        $query->where(function ($q) use ($baseItem) {
            if ($baseItem->category_code) {
                $q->orWhere('category_code', $baseItem->category_code);
            }
            if ($baseItem->brand_code) {
                $q->orWhere('brand_code', $baseItem->brand_code);
            }
            if ($baseItem->model_code) {
                $q->orWhere('model_code', $baseItem->model_code);
            }
        });

        // 3. Get results without pagination (limit to 10 or 15 items for a related carousel)
        $items = $query->orderByDesc('id')->take(10)->get();

        // 4. Pre-fetch mappings for attributes (Optimized)
        $categoryIds = $items->pluck('category.id')->filter()->unique();

        $categoryMaps = ItemCategoryField::whereIn('category_id', $categoryIds)
            ->with('options')
            ->get()
            ->groupBy('category_id');

        // 5. Transform Collection
        // Note: Because we used get() instead of paginate(), $items is already a Collection, 
        // so we call transform() directly instead of $items->getCollection()->transform()
        $items->transform(function (Item $item) use ($categoryMaps) {

            // --- Image Optimization for Flutter List ---
            $firstImage = $item->images->first();

            $item->image_url = $firstImage
                ? asset('assets/images/items/' . $firstImage->image)
                : asset('assets/images/placeholder.webp');

            $item->total_images = $item->images->count();

            $item->thumbnail_image = $firstImage ? [
                'id' => $firstImage->id,
                'image' => $firstImage->image,
                'image_url' => asset('assets/images/items/' . $firstImage->image),
            ] : null;

            // --- Attribute Display Logic ---
            $categoryId = $item->category?->id;
            $fields = $categoryMaps->get($categoryId);
            $displayAttributes = [];

            if ($fields && is_array($item->attributes)) {
                foreach ($item->attributes as $key => $storedValue) {
                    $field = $fields->where('field_key', $key)->first();
                    $option = $field ? $field->options->where('option_value', $storedValue)->first() : null;

                    $displayAttributes[$key] = [
                        'label' => $field->label ?? $key,
                        'label_kh' => $field->label_kh ?? $key,
                        'value' => $storedValue,
                        'value_label_en' => $option->label_en ?? $storedValue,
                        'value_label_kh' => $option->label_kh ?? $storedValue,
                    ];
                }
            }

            $item->display_attributes = $displayAttributes;

            // Correct Laravel way to hide relationships from the final JSON payload
            $item->makeHidden(['images', 'category']);

            return $item;
        });

        return response()->json([
            'success' => true,
            'data' => $items
        ]);
    }

    /**
     * STORE ITEM
     */
    public function store(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized.'], 401);
        }

        // 1. Pre-process multipart/form-data strings from Flutter
        $input = $request->all();

        if (isset($input['attributes']) && is_string($input['attributes'])) {
            $input['attributes'] = json_decode($input['attributes'], true);
        }

        if (isset($input['is_free_delivery'])) {
            $input['is_free_delivery'] = filter_var($input['is_free_delivery'], FILTER_VALIDATE_BOOLEAN);
        }

        // 2. Dynamic Validation for Category Attributes
        $dynamicRules = [];
        if (!empty($input['category_code'])) {
            $category = ItemCategory::where('code', $input['category_code'])->first();
            if ($category) {
                $requiredFields = ItemCategoryField::where('category_id', $category->id)
                    ->where('is_required', true)
                    ->get();

                foreach ($requiredFields as $field) {
                    $dynamicRules["attributes.{$field->field_key}"] = 'required';
                }
            }
        }

        // 3. Validate Data (Merged base rules + dynamic rules)
        $validator = Validator::make($input, array_merge([
            'code' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'price' => 'required|numeric|decimal:0,2|max:999999999',
            'category_code' => 'required|string|exists:item_categories,code',
            'brand_code' => 'nullable|string|exists:item_brands,code',
            'model_code' => 'nullable|string|exists:item_models,code',
            'body_type_code' => 'nullable|string|exists:item_body_types,code',
            'status' => 'nullable|string|in:active,inactive',
            'is_free_delivery' => 'nullable|boolean', // Added the new field
            'attributes' => 'nullable|array',
            'images' => 'required|array|min:1',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB limit
            'discount' => [
                'nullable',
                'numeric',
                'min:0',
                function ($attribute, $value, $fail) use ($request) {
                    // If it's a percentage, it cannot be greater than 100
                    if ($request->input('discount_type') === 'percentage' && $value > 100) {
                        $fail('The discount percentage cannot exceed 100.');
                    }

                    // Optional: If it's a fixed amount, it shouldn't exceed the actual price
                    if ($request->input('discount_type') === 'amount' && $value > $request->input('price')) {
                        $fail('The discount amount cannot be greater than the price.');
                    }
                },
            ],
            'discount_type' => 'nullable|in:percentage,amount|required_with:discount',
        ], $dynamicRules));

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        // Use only validated data moving forward to prevent mass-assignment vulnerabilities
        $validated = $validator->validated();

        // 4. Database Transaction
        try {
            return DB::transaction(function () use ($request, $validated, $user) {

                $validated['created_by'] = $user->id;
                $validated['user_id']    = $user->id;
                $validated['shop_id']    = $user->shop_id ?? null;

                // Prevent images array from hitting the items table insert
                unset($validated['images']);

                $item = Item::create($validated);

                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        // Using 800px resize per your updated logic
                        $filename = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/items', 800);
                        ItemImage::create([
                            'item_id' => $item->id,
                            'image' => $filename,
                        ]);
                    }
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Item created.',
                    'data' => $item->load('images')
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create item. ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * UPDATE ITEM
     */
    public function update(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized.'], 401);
        }

        // 1. Find the existing item safely
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Item not found.'], 404);
        }

        if ($item->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }

        // 2. Pre-process multipart/form-data strings from Flutter
        $input = $request->all();

        if (isset($input['attributes']) && is_string($input['attributes'])) {
            $input['attributes'] = json_decode($input['attributes'], true);
        }

        if (isset($input['is_free_delivery'])) {
            $input['is_free_delivery'] = filter_var($input['is_free_delivery'], FILTER_VALIDATE_BOOLEAN);
        }

        // Handle stringified numbers for discount
        if (isset($input['discount']) && is_string($input['discount'])) {
            $input['discount'] = $input['discount'] === 'null' || $input['discount'] === '' ? null : (float) $input['discount'];
        }

        // 3. Dynamic Validation for Category Attributes
        $dynamicRules = [];

        // Ensure the attributes array and all its children are allowed through initially
        $dynamicRules["attributes"] = 'nullable|array';
        $dynamicRules["attributes.*"] = 'nullable';

        if (!empty($input['category_code'])) {
            $category = ItemCategory::where('code', $input['category_code'])->first();

            if ($category) {
                $categoryFields = ItemCategoryField::where('category_id', $category->id)->get();

                foreach ($categoryFields as $field) {
                    $key = "attributes.{$field->field_key}";
                    $rules = [];

                    // 1. Check for Required
                    if ($field->is_required) {
                        $rules[] = 'required';
                    } else {
                        $rules[] = 'nullable';
                    }

                    // 2. Specific Validation for 'year'
                    if ($field->field_key === 'year') {
                        $rules[] = 'integer';
                        $rules[] = 'min:1900';
                        $rules[] = 'max:' . (date('Y') + 1);
                    }

                    // Only add to dynamicRules if we actually defined rules for this specific key
                    if (!empty($rules)) {
                        $dynamicRules[$key] = implode('|', $rules);
                    }
                }
            }
        }

        // 4. Validate Data
        $validator = Validator::make($input, array_merge([
            'code' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'price' => 'required|numeric|decimal:0,2|max:999999999',
            'discount' => 'nullable|numeric|min:0',
            'discount_type' => 'nullable|string|in:percentage,amount',
            'category_code' => 'required|string|exists:item_categories,code',
            'brand_code' => 'nullable|string|exists:item_brands,code',
            'model_code' => 'nullable|string|exists:item_models,code',
            'body_type_code' => 'nullable|string|exists:item_body_types,code',
            'status' => 'nullable|string|in:active,inactive',
            'is_free_delivery' => 'nullable|boolean',
            'attributes' => 'nullable|array',

            // Arrays for images
            'deleted_image_ids' => 'nullable|array',
            'deleted_image_ids.*' => 'integer|exists:item_images,id',

            // Images are NO LONGER strictly required here, because they might just be updating text
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
        ], $dynamicRules));

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        // 5. Database Transaction for safe updating
        try {
            return DB::transaction(function () use ($request, $validated, $item, $user) {

                $validated['updated_by'] = $user->id;

                // Prevent arrays from hitting the items table update
                unset($validated['images']);
                unset($validated['deleted_image_ids']);

                // Update the core item record
                $item->update($validated);

                // --- HANDLE DELETED IMAGES ---
                if ($request->has('deleted_image_ids') && is_array($request->deleted_image_ids)) {
                    // Fetch images that belong to this specific item to prevent deleting other users' images
                    $imagesToDelete = ItemImage::where('item_id', $item->id)
                        ->whereIn('id', $request->deleted_image_ids)
                        ->get();

                    foreach ($imagesToDelete as $imageModel) {
                        // Optional: Delete the physical file from your server storage to save space
                        // \Illuminate\Support\Facades\Storage::disk('public')->delete($imageModel->image); // Adjust path if needed

                        // Delete the database record
                        $imageModel->delete();
                    }
                }

                // --- HANDLE NEW IMAGES ---
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $filename = \App\Helpers\ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/items', 800);
                        ItemImage::create([
                            'item_id' => $item->id,
                            'image' => $filename,
                        ]);
                    }
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Item updated successfully.',
                    'data' => $item->load('images')
                ], 200); // 200 OK
            });
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update item. ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * DELETE IMAGE (Specific for Flutter Edit screen)
     */
    public function destroyImage($imageId)
    {
        $image = ItemImage::find($imageId);
        if (!$image) return response()->json(['success' => false, 'message' => 'Not found'], 404);

        ImageHelper::deleteImage($image->image, 'assets/images/items');
        $image->delete();

        return response()->json(['success' => true, 'message' => 'Image removed']);
    }

    /**
     * DELETE ITEM
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        // 1. Critical Security Checks (Fail Fast)
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized.'], 401);
        }

        // Use with('images') to prevent N+1 query problems when fetching paths
        $item = Item::with('images')->find($id);

        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Item not found.'], 404);
        }

        // Ensure the user owns the shop that this item belongs to
        if ($item->user_id !== $user->id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized action.'], 403);
        }

        // 2. Safe Deletion Process
        try {
            // Don't delete the images as it just soft delete
            // $imagePaths = $item->images->pluck('image')->toArray();

            // DB::transaction(function () use ($item) {
            //     $item->images()->delete();

            //     $item->delete();
            // });

            // foreach ($imagePaths as $path) {
            //     ImageHelper::deleteImage($path, 'assets/images/items');
            //     ImageHelper::deleteImage($path, 'assets/images/items/thumb');
            // }

            return response()->json([
                'success' => true,
                'message' => 'Item deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            // Catch DB errors safely
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete item. ' . $e->getMessage()
            ], 500);
        }
    }
}
